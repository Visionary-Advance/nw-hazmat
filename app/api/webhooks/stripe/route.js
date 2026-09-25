// app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { fulfillOrder, orderDataFromPaymentIntent } from '@/lib/orders/fulfillOrder';
import { sendAlert } from '@/lib/email/alertEmail';

// Ensure pure runtime execution (no static optimization/pre-render)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Lazy-init Stripe at request time (prevents build-time crashes)
let _stripe;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY missing (runtime)');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

function getEndpointSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET missing (runtime)');
  return secret;
}

export async function POST(request) {
  // Stripe requires the **raw** request body
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;
  try {
    const stripe = getStripe();
    const endpointSecret = getEndpointSecret();
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err?.message || err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    // Handle supported events
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        await handleSuccessfulPayment(paymentIntent);
        break;
      }
      case 'payment_intent.payment_failed': {
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        await handleFailedPayment(failedPayment);
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // ✅ Return stays INSIDE the POST function
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handling error:', err?.message || err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
}

// ----- helpers (keep these pure; no top-level side effects) -----
// Safety net for when the browser never calls /api/orders (Stripe Link, closed
// tab, redirect-based auth). fulfillOrder dedupes on the PaymentIntent id, so
// this is a no-op when the browser already handled it.
async function handleSuccessfulPayment(paymentIntent) {
  console.log('Processing successful payment:', paymentIntent.id);
  const orderData = orderDataFromPaymentIntent(paymentIntent);

  if (!orderData.customerInfo.email || orderData.items.length === 0) {
    // Not a shop checkout PI (or metadata is missing) — nothing we can email.
    console.warn(`[WEBHOOK] pi=${paymentIntent.id} has no customer email/items; skipping fulfilment`);
    sendAlert({
      subject: 'Paid PaymentIntent could not be fulfilled from webhook',
      severity: 'error',
      error: new Error('PaymentIntent metadata missing customer email or items'),
      context: { paymentIntentId: paymentIntent.id, amount: paymentIntent.amount / 100 },
    });
    return;
  }

  // Let errors propagate: a 500 makes Stripe retry the webhook later.
  const result = await fulfillOrder(orderData, { source: 'webhook' });
  console.log(
    result.duplicate
      ? `Order for ${paymentIntent.id} already fulfilled by client`
      : `Order ${result.orderNumber} fulfilled from webhook for ${paymentIntent.id}`
  );
}

async function handleFailedPayment(paymentIntent) {
  try {
    console.log('Processing failed payment:', paymentIntent.id);
    // Update order, notify customer, etc.
  } catch (error) {
    console.error('Failed to handle failed payment:', error);
  }
}
