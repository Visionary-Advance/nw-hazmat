// app/api/shipping/rates/route.js
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
    const stripe = getStripe();
    const { items, shippingAddress } = await request.json();

    // Calculate total weight and determine shipping class from items
    let totalWeight = 0;
    let shippingClass = 'standard';
    let requiresFreight = false;

    items.forEach(item => {
      // Each item should have weight and shipping_class from product metadata
      const weight = parseFloat(item.weight) || 0;
      totalWeight += weight * item.quantity;

      // Check for special shipping requirements
      if (item.metadata?.shipping_class === 'freight') {
        requiresFreight = true;
        shippingClass = 'freight';
      } else if (item.metadata?.shipping_class === 'express' && shippingClass !== 'freight') {
        shippingClass = 'express';
      }
    });

    // Fetch shipping rates from Stripe
    const { data: shippingRates } = await stripe.shippingRates.list({
      active: true,
      limit: 20,
    });

    // Filter shipping rates based on calculated criteria
    let applicableRates = shippingRates.filter(rate => {
      // Filter by metadata if you've tagged rates in Stripe
      const rateClass = rate.metadata?.shipping_class || 'standard';
      const maxWeight = parseFloat(rate.metadata?.max_weight) || Infinity;
      const minWeight = parseFloat(rate.metadata?.min_weight) || 0;

      // Check if rate matches shipping class
      if (requiresFreight && rateClass !== 'freight') {
        return false;
      }

      // Check weight limits
      if (totalWeight > maxWeight || totalWeight < minWeight) {
        return false;
      }

      return true;
    });

    // If no applicable rates found, return all active rates as fallback
    if (applicableRates.length === 0) {
      applicableRates = shippingRates;
    }

    // Transform rates for frontend
    const formattedRates = applicableRates.map(rate => ({
      id: rate.id,
      displayName: rate.display_name,
      description: rate.metadata?.description || '',
      amount: rate.fixed_amount?.amount / 100, // Convert cents to dollars
      currency: rate.fixed_amount?.currency || 'usd',
      deliveryEstimate: rate.delivery_estimate ? {
        minimum: rate.delivery_estimate.minimum?.value,
        maximum: rate.delivery_estimate.maximum?.value,
        unit: rate.delivery_estimate.minimum?.unit || 'business_day'
      } : null,
      metadata: rate.metadata || {}
    }));

    return NextResponse.json({
      success: true,
      rates: formattedRates,
      calculatedWeight: totalWeight,
      shippingClass: shippingClass,
      debug: {
        totalItems: items.length,
        totalWeight: totalWeight,
        requiresFreight: requiresFreight,
        availableRates: formattedRates.length
      }
    });

  } catch (error) {
    console.error('Shipping rates fetch failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch shipping rates',
        details: error.message
      },
      { status: 500 }
    );
  }
}
