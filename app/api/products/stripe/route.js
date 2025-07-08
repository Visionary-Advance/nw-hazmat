import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Stripe not configured',
        message: 'Please add STRIPE_SECRET_KEY to your environment variables',
        products: [], // Return empty array so the site still works
      });
    }

    console.log('Fetching products from Stripe...');

    // Fetch products from Stripe
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    console.log(`Found ${products.data.length} products in Stripe`);

    // Transform Stripe products to your format
    const transformedProducts = products.data.map(product => {
      const price = product.default_price;
      const priceAmount = price && price.unit_amount ? (price.unit_amount / 100) : 0;
      
      return {
        id: product.id,
        name: product.name,
        description: product.description || 'No description available',
        price: priceAmount,
        currency: price ? price.currency : 'usd',
        image: product.images && product.images[0] ? product.images[0] : null,
        category: product.metadata?.category || 'General',
        stripeProductId: product.id,
        stripePriceId: price ? price.id : null,
        inStock: product.metadata?.inventory ? parseInt(product.metadata.inventory) > 0 : true,
        inventory: product.metadata?.inventory ? parseInt(product.metadata.inventory) : null,
        metadata: product.metadata || {}
      };
    });

    return NextResponse.json({
      success: true,
      products: transformedProducts,
      total: transformedProducts.length,
      debug: {
        stripeConfigured: true,
        productsFound: products.data.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Stripe API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products from Stripe',
      message: error.message,
      products: [], // Return empty array so the site still works
      debug: {
        errorType: error.type || 'Unknown',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}