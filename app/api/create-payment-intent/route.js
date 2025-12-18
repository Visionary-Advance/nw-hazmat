// app/api/create-payment-intent/route.js
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

export async function POST(req) {
  try {
    const stripe = getStripe();
    const body = await req.json();

    // Expecting { amount: number_in_dollars, currency: 'usd', metadata?: {...} }
    const amountInDollars = Number(body?.amount);
    const currency = body?.currency || 'usd';
    if (!Number.isFinite(amountInDollars) || amountInDollars <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Convert dollars to cents for Stripe (Stripe requires amounts in cents)
    const amountInCents = Math.round(amountInDollars * 100);

    const params = {
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: body?.metadata || {},
    };

    const pi = await stripe.paymentIntents.create(params);
    return NextResponse.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error('create-payment-intent error:', err?.message || err);
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
