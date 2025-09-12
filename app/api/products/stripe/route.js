// app/api/products/stripe/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

let _stripe;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.error('STRIPE_SECRET_KEY is missing from environment variables');
      throw new Error('STRIPE_SECRET_KEY missing (runtime)');
    }
    console.log('Initializing Stripe with key:', key.substring(0, 7) + '...');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

export async function GET() {
  try {
    console.log('Starting Stripe API call...');
    
    // Check if Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return NextResponse.json({ 
        error: 'Stripe configuration error',
        debug: 'STRIPE_SECRET_KEY not found'
      }, { status: 500 });
    }

    const stripe = getStripe();
    console.log('Stripe instance created, fetching products...');
    
    // Fetch products and prices from Stripe
    const { data: products } = await stripe.products.list({ 
      active: true, 
      limit: 50,
      expand: ['data.default_price']
    });
    
    console.log(`Found ${products.length} products from Stripe`);

    const { data: prices } = await stripe.prices.list({ 
      active: true, 
      limit: 100 
    });
    
    console.log(`Found ${prices.length} prices from Stripe`);

    // Group prices by product
    const priceByProduct = new Map();
    for (const p of prices) {
      const arr = priceByProduct.get(p.product) || [];
      arr.push(p);
      priceByProduct.set(p.product, arr);
    }

    // Transform products into your app format
    const transformedProducts = products.map(p => {
      const productPrices = priceByProduct.get(p.id) || [];
      const defaultPrice = productPrices[0]; // Use first price as default
      
      return {
        id: p.id,
        name: p.name,
        description: p.description || '',
        images: p.images || [],
        image: p.images?.[0] || null,
        prices: productPrices,
        price: defaultPrice ? (defaultPrice.unit_amount / 100) : 0, // Convert cents to dollars
        currency: defaultPrice?.currency || 'usd',
        category: p.metadata?.category || 'general',
        inStock: p.active && (p.metadata?.stock !== '0'),
        inventory: p.metadata?.inventory ? parseInt(p.metadata.inventory) : null,
        weight: p.metadata?.weight ? parseFloat(p.metadata.weight) : null,
        metadata: p.metadata || {},
      };
    });

    console.log(`Transformed ${transformedProducts.length} products`);
    console.log('Sample product:', transformedProducts[0]);

    return NextResponse.json({
      success: true,
      products: transformedProducts,
      debug: {
        totalProducts: products.length,
        totalPrices: prices.length,
        stripeKeyPresent: !!process.env.STRIPE_SECRET_KEY,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err) {
    console.error('Stripe API error:', err);
    console.error('Error details:', {
      message: err?.message,
      type: err?.type,
      code: err?.code,
      stack: err?.stack
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch products from Stripe',
      details: err?.message || 'Unknown error',
      type: err?.type || 'unknown',
      debug: {
        stripeKeyPresent: !!process.env.STRIPE_SECRET_KEY,
        errorType: err?.constructor?.name,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}