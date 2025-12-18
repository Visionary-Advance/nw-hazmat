// File: app/api/shipping/calculate/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let _stripe;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY missing');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

export async function POST(request) {
  try {
    const { items, shippingAddress } = await request.json();

    // Calculate shipping based on per-item metadata from Stripe products
    let totalWeight = 0;
    let shippingClass = 'standard';
    let requiresFreight = false;

    items.forEach(item => {
      // Use weight from item (passed from product metadata)
      const weight = parseFloat(item.weight) || 0;
      totalWeight += weight * item.quantity;

      // Check for special shipping requirements from metadata
      if (item.metadata?.shipping_class === 'freight') {
        requiresFreight = true;
        shippingClass = 'freight';
      } else if (item.metadata?.shipping_class === 'express' && shippingClass !== 'freight') {
        shippingClass = 'express';
      }

      // Legacy category check for backwards compatibility
      if (item.category === 'simulator' && !requiresFreight) {
        requiresFreight = true;
        shippingClass = 'freight';
      }
    });

    // Calculate order total for free shipping threshold
    const orderTotal = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Default shipping calculation based on weight
    let shippingCost = 0;

    if (requiresFreight) {
      // Freight shipping for large equipment
      shippingCost = 200; // Base freight cost
    } else if (totalWeight > 50) {
      // Heavy package shipping
      shippingCost = 25 + (totalWeight - 50) * 0.5;
    } else if (totalWeight > 10) {
      // Standard shipping
      shippingCost = 15;
    } else {
      // Light package
      shippingCost = 8.99;
    }

    // Free shipping for orders over $1000
    if (orderTotal >= 1000) {
      shippingCost = 0;
    }

    return NextResponse.json({
      shippingCost: Math.round(shippingCost * 100) / 100,
      estimatedDays: requiresFreight ? '5-10' : '3-5',
      method: requiresFreight ? 'Freight' : 'Standard Ground',
      debug: {
        totalWeight,
        shippingClass,
        orderTotal,
        itemCount: items.length
      }
    });
  } catch (error) {
    console.error('Shipping calculation failed:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping' },
      { status: 500 }
    );
  }
}