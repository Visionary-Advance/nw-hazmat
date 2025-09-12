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
    if (!key) throw new Error('STRIPE_SECRET_KEY missing (runtime)');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

export async function GET() {
  try {
    const stripe = getStripe();
    // Example: list Stripe products/prices and map to your app format
    const { data: products } = await stripe.products.list({ active: true, limit: 50 });
    const { data: prices } = await stripe.prices.list({ active: true, limit: 100 });

    const priceByProduct = new Map();
    for (const p of prices) {
      const arr = priceByProduct.get(p.product) || [];
      arr.push(p);
      priceByProduct.set(p.product, arr);
    }

    const out = products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      images: p.images,
      prices: priceByProduct.get(p.id) || [],
      metadata: p.metadata || {},
    }));

    return NextResponse.json(out);
  } catch (err) {
    console.error('products/stripe error:', err?.message || err);
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
