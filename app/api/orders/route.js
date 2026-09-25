import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getWriteClient } from '@/lib/sanityWrite';
import { sendAlert } from '@/lib/email/alertEmail';
import { fulfillOrder } from '@/lib/orders/fulfillOrder';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let _stripe;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY missing (runtime)');
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

export async function POST(request) {
  try {
    const orderData = await request.json();

    const requiredFields = ['customerInfo', 'items', 'total', 'paymentIntentId'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Phone is optional: Apple/Google Pay doesn't collect it, and rejecting
    // here used to drop those orders (and their emails) entirely.
    const { customerInfo } = orderData;
    const requiredCustomerFields = ['firstName', 'email', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredCustomerFields) {
      if (!customerInfo[field]) {
        return NextResponse.json({ error: `Missing customer field: ${field}` }, { status: 400 });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Only fulfil payments Stripe says are actually paid. Anything else is left
    // to the payment_intent.succeeded webhook.
    const pi = await getStripe().paymentIntents.retrieve(orderData.paymentIntentId);
    if (pi.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment not complete (status: ${pi.status})` },
        { status: 409 }
      );
    }

    const result = await fulfillOrder(
      { ...orderData, total: (pi.amount_received || pi.amount) / 100 },
      { source: 'client' }
    );

    return NextResponse.json({
      success: true,
      orderId: result.orderNumber,
      ...result,
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    sendAlert({
      subject: 'Order creation failed (POST /api/orders)',
      severity: 'critical',
      error,
    });
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumberParam = searchParams.get('id') || searchParams.get('orderNumber');
    const client = getWriteClient();

    if (orderNumberParam) {
      const num = parseInt(orderNumberParam, 10);
      const order = await client.fetch(
        `*[_type == "order" && orderNumber == $num][0]`,
        { num }
      );
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    const orders = await client.fetch(
      `*[_type == "order"] | order(createdAt desc)[0...100]`
    );
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
