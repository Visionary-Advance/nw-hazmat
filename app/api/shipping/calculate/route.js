// File: app/api/shipping/calculate/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { items, shippingAddress } = await request.json();

    // Calculate shipping based on weight, dimensions, and destination
    let totalWeight = 0;
    let hasLargeItems = false;

    items.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        totalWeight += (product.weight || 0) * item.quantity;
        // Check if any item is large (simulator equipment)
        if (product.category === 'simulator') {
          hasLargeItems = true;
        }
      }
    });

    // Shipping calculation logic
    let shippingCost = 0;
    
    if (hasLargeItems) {
      // Freight shipping for large equipment
      shippingCost = 200; // Base freight cost
      // Add distance-based calculation here
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
    const orderTotal = items.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    if (orderTotal >= 1000) {
      shippingCost = 0;
    }

    return NextResponse.json({
      shippingCost: Math.round(shippingCost * 100) / 100,
      estimatedDays: hasLargeItems ? '5-10' : '3-5',
      method: hasLargeItems ? 'Freight' : 'Standard Ground'
    });
  } catch (error) {
    console.error('Shipping calculation failed:', error);
    return NextResponse.json(
      { error: 'Failed to calculate shipping' },
      { status: 500 }
    );
  }
}