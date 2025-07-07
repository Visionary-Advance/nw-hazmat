// File: app/api/webhooks/stripe/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Update order status in database
      await handleSuccessfulPayment(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      
      // Handle failed payment
      await handleFailedPayment(failedPayment);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(paymentIntent) {
  try {
    // In production, you would:
    // 1. Update order status to 'paid'
    // 2. Send confirmation email to customer
    // 3. Update inventory
    // 4. Create shipping label
    // 5. Notify fulfillment team
    
    console.log('Processing successful payment:', paymentIntent.id);
    
    // Example: Update order status (you'd use a real database)
    const orderId = paymentIntent.metadata.orderId;
    if (orderId) {
      // Update order in database
      console.log(`Order ${orderId} marked as paid`);
      
      // Send confirmation email
      await sendOrderConfirmationEmail(orderId);
    }
  } catch (error) {
    console.error('Failed to handle successful payment:', error);
  }
}

async function handleFailedPayment(paymentIntent) {
  try {
    // Handle failed payment
    console.log('Processing failed payment:', paymentIntent.id);
    
    // In production, you might:
    // 1. Update order status to 'payment_failed'
    // 2. Send notification to customer
    // 3. Log for review
  } catch (error) {
    console.error('Failed to handle failed payment:', error);
  }
}

async function sendOrderConfirmationEmail(orderId) {
  // In production, integrate with email service like:
  // - SendGrid
  // - AWS SES
  // - Mailgun
  // - Your existing email service
  
  console.log(`Sending confirmation email for order ${orderId}`);
  
  // Example email content structure:
  const emailData = {
    to: 'customer@example.com',
    subject: 'Order Confirmation - NorthWest HazMat',
    template: 'order-confirmation',
    data: {
      orderId,
      customerName: 'John Doe',
      items: [],
      total: 0,
      shippingAddress: {}
    }
  };
}
