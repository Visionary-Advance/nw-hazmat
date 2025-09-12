// app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

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
async function handleSuccessfulPayment(paymentIntent) {
  try {
    console.log('Processing successful payment:', paymentIntent.id);
    const orderId = paymentIntent.metadata?.orderId;
    if (orderId) {
      console.log(`Order ${orderId} marked as paid`);
      await sendOrderConfirmationEmail(orderId);
    }
  } catch (error) {
    console.error('Failed to handle successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    console.log('Processing failed payment:', paymentIntent.id);
    // Update order, notify customer, etc.
  } catch (error) {
    console.error('Failed to handle failed payment:', error);
  }
}

async function sendOrderConfirmationEmail(orderId) {
  console.log(`Sending confirmation email for order ${orderId}`);
  // integrate with your email provider here
}
