// app/api/create-payment-intent/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendAlert } from '@/lib/email/alertEmail';

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

    // Build a human-readable description from the items metadata so the
    // Stripe Dashboard shows what was purchased.
    let description;
    let itemMetadata = {};
    try {
      const itemsJson = body?.metadata?.items;
      if (itemsJson) {
        const items = JSON.parse(itemsJson);
        if (Array.isArray(items) && items.length > 0) {
          const parts = items.map(
            (it) => `${it.name}${it.quantity > 1 ? ` (×${it.quantity})` : ''}`
          );
          const summary = parts.join(', ');
          description = summary.length > 350 ? summary.slice(0, 347) + '...' : summary;

          // Also flatten first ~10 items into individual metadata keys so the
          // Dashboard renders them as a clean key/value table.
          items.slice(0, 10).forEach((it, i) => {
            itemMetadata[`item_${i + 1}`] = `${it.name} ×${it.quantity} @ $${it.price}`;
          });
        }
      }
    } catch (e) {
      console.warn('Could not parse items metadata for description:', e.message);
    }

    const params = {
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { ...(body?.metadata || {}), ...itemMetadata },
      ...(description ? { description } : {}),
    };

    const pi = await stripe.paymentIntents.create(params);
    return NextResponse.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error('create-payment-intent error:', err?.message || err);
    // Checkout can't proceed if this fails — alert so you catch a broken
    // Stripe key/config before it costs you a day of sales.
    sendAlert({
      subject: 'Stripe payment intent creation failed',
      severity: 'critical',
      error: err instanceof Error ? err : new Error(String(err)),
    });
    return NextResponse.json({ error: 'Stripe error' }, { status: 500 });
  }
}
