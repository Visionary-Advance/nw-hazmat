// lib/orders/fulfillOrder.js
// Single post-payment pipeline: order number → Sanity order → UPS label → emails.
//
// Called from two places for the same payment:
//   1. POST /api/orders — the browser, right after confirmCardPayment resolves
//   2. POST /api/webhooks/stripe — Stripe, on payment_intent.succeeded
// The browser path is fast but unreliable (Link, closed tabs, redirects all skip
// it), so the webhook is the safety net. Whichever arrives first wins: the Sanity
// order _id is derived from the PaymentIntent id, and Sanity's create() rejects a
// duplicate _id with 409, so the loser stops before sending anything.

import { sendOrderConfirmation, sendOrderNotification } from '@/lib/email/orderEmails';
import { createUpsShipment } from '@/lib/ups/shipping';
import { getWriteClient, nextOrderNumber } from '@/lib/sanityWrite';
import { sendAlert } from '@/lib/email/alertEmail';

const STATE_NAME_TO_CODE = {
  alabama: 'AL', alaska: 'AK', arizona: 'AZ', arkansas: 'AR', california: 'CA',
  colorado: 'CO', connecticut: 'CT', delaware: 'DE', florida: 'FL', georgia: 'GA',
  hawaii: 'HI', idaho: 'ID', illinois: 'IL', indiana: 'IN', iowa: 'IA',
  kansas: 'KS', kentucky: 'KY', louisiana: 'LA', maine: 'ME', maryland: 'MD',
  massachusetts: 'MA', michigan: 'MI', minnesota: 'MN', mississippi: 'MS', missouri: 'MO',
  montana: 'MT', nebraska: 'NE', nevada: 'NV', 'new hampshire': 'NH', 'new jersey': 'NJ',
  'new mexico': 'NM', 'new york': 'NY', 'north carolina': 'NC', 'north dakota': 'ND', ohio: 'OH',
  oklahoma: 'OK', oregon: 'OR', pennsylvania: 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', tennessee: 'TN', texas: 'TX', utah: 'UT', vermont: 'VT',
  virginia: 'VA', washington: 'WA', 'west virginia': 'WV', wisconsin: 'WI', wyoming: 'WY',
  'district of columbia': 'DC',
};

function toStateCode(input) {
  if (!input) return '';
  const trimmed = String(input).trim();
  if (trimmed.length === 2) return trimmed.toUpperCase();
  return STATE_NAME_TO_CODE[trimmed.toLowerCase()] || trimmed.toUpperCase();
}

function orderDocId(paymentIntentId) {
  // Sanity ids allow [a-zA-Z0-9._-]; Stripe PI ids are pi_ + alphanumerics.
  return paymentIntentId ? `order-${paymentIntentId}` : undefined;
}

function safeParse(json) {
  try {
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

// Rebuild the /api/orders payload shape from a PaymentIntent's metadata, for the
// webhook path where there's no browser to send it. create-payment-intent stores
// customerInfo + items as JSON strings on the PI for exactly this purpose.
export function orderDataFromPaymentIntent(pi) {
  const md = pi.metadata || {};
  let customerInfo = safeParse(md.customerInfo);

  if (!customerInfo) {
    // Older PIs (created before customerInfo was stored) — best effort from the
    // fields that were always there.
    const [firstName = '', ...rest] = String(md.customerName || '').trim().split(/\s+/);
    const addr = safeParse(md.shippingAddress) || {};
    customerInfo = {
      firstName,
      lastName: rest.join(' '),
      email: md.customerEmail || pi.receipt_email || '',
      phone: addr.phone || '',
      address: addr.addressLine?.[0] || '',
      apartment: addr.addressLine?.[1] || '',
      city: addr.city || '',
      state: addr.region || '',
      zipCode: addr.postalCode || '',
      country: addr.country || 'US',
    };
  }

  return {
    customerInfo,
    items: safeParse(md.items) || [],
    subtotal: Number(md.subtotal) || 0,
    shippingCost: Number(md.shippingCost) || 0,
    total: (pi.amount_received || pi.amount || 0) / 100,
    paymentIntentId: pi.id,
    paymentMethod: md.orderSource === 'apple_google_pay' ? 'apple_google_pay' : 'card',
    paymentStatus: pi.status,
  };
}

// Returns { orderNumber, sanityId, shipmentTrackingNumber, duplicate }.
// duplicate === true means another caller already handled this payment.
export async function fulfillOrder(orderData, { source = 'unknown' } = {}) {
  const { customerInfo, paymentIntentId } = orderData;
  const client = getWriteClient();
  const _id = orderDocId(paymentIntentId);

  // Atomic order number from Sanity counter
  const orderNumber = await nextOrderNumber();

  // Build the Sanity order document. Note the schema splits customer info
  // (person) from shippingAddress (location) — different from the form shape.
  const orderDoc = {
    ...(_id ? { _id } : {}),
    _type: 'order',
    orderNumber,
    status: 'pending',
    customer: {
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email,
      company: customerInfo.company || '',
      phone: customerInfo.phone || '',
    },
    shippingAddress: {
      street: customerInfo.address,
      apartment: customerInfo.apartment || '',
      city: customerInfo.city,
      state: customerInfo.state,
      zipCode: customerInfo.zipCode,
      country: customerInfo.country || 'US',
    },
    items: orderData.items.map((it) => ({
      _key: String(it.id || it.name).slice(0, 64) + '-' + Math.random().toString(36).slice(2, 8),
      productId: String(it.id || ''),
      name: it.name,
      price: Number(it.price) || 0,
      quantity: Number(it.quantity) || 1,
    })),
    subtotal: Number(orderData.subtotal) || 0,
    shippingCost: Number(orderData.shippingCost) || 0,
    total: Number(orderData.total) || 0,
    paymentIntentId: paymentIntentId || '',
    paymentMethod: orderData.paymentMethod || 'card',
    createdAt: new Date().toISOString(),
  };

  // Save first — this doubles as the lock that stops the browser and the webhook
  // from both creating a UPS label and emailing the customer.
  let savedOrder;
  try {
    savedOrder = await client.create(orderDoc);
  } catch (sanityErr) {
    if (sanityErr?.statusCode === 409 && _id) {
      const existing = await client.getDocument(_id).catch(() => null);
      console.log(`[ORDER DUPLICATE] pi=${paymentIntentId} source=${source} — already fulfilled`);
      return {
        duplicate: true,
        orderNumber: existing?.orderNumber ?? null,
        sanityId: _id,
        shipmentTrackingNumber: existing?.shipmentTrackingNumber ?? null,
      };
    }
    console.error(
      `[ORDER PERSIST FAILED] orderNumber=${orderNumber} pi=${paymentIntentId} source=${source}`,
      sanityErr.message
    );
    // A paid order that didn't save is the worst case — alert immediately so it
    // can be recovered manually from Stripe. Continue to email regardless.
    sendAlert({
      subject: 'Paid order failed to save to Sanity',
      severity: 'critical',
      error: sanityErr,
      context: {
        orderNumber,
        source,
        paymentIntentId: paymentIntentId || 'n/a',
        customerEmail: customerInfo.email,
        total: orderData.total,
      },
    });
  }

  // Best-effort UPS shipment creation. Failures don't break the order.
  let labels = [];
  let shipmentTrackingNumber;
  try {
    const shipment = await createUpsShipment({
      items: orderData.items,
      destination: {
        street: customerInfo.address,
        apartment: customerInfo.apartment,
        city: customerInfo.city,
        state: toStateCode(customerInfo.state),
        zipCode: customerInfo.zipCode,
        country: customerInfo.country || 'US',
      },
      customer: customerInfo,
    });
    shipmentTrackingNumber = shipment.shipmentTrackingNumber;
    labels = shipment.labels;
  } catch (shipErr) {
    console.error(`[UPS LABEL FAILED] order=${orderNumber}`, shipErr.message);
  }

  if (savedOrder && shipmentTrackingNumber) {
    await client
      .patch(savedOrder._id)
      .set({ shipmentTrackingNumber })
      .commit()
      .catch((err) => console.error(`[ORDER TRACKING PATCH FAILED] order=${orderNumber}`, err.message));
  }

  // Email payload uses the form-shape (customerInfo flat) since that's what the
  // templates were built for. Add orderNumber + tracking so emails show the right info.
  const emailOrder = {
    ...orderData,
    id: orderNumber,
    shipmentTrackingNumber,
  };

  const emailResults = await Promise.allSettled([
    sendOrderConfirmation(emailOrder),
    sendOrderNotification(emailOrder, labels),
  ]);
  emailResults.forEach((r, i) => {
    // Resend resolves (not rejects) with { error } on API-level failures.
    const failure = r.status === 'rejected' ? r.reason : r.value?.error;
    if (failure) {
      const which = i === 0 ? 'confirmation' : 'notification';
      console.error(`[ORDER EMAIL FAILED:${which}] order=${orderNumber}`, failure);
      sendAlert({
        subject: `Order email failed to send (${which})`,
        severity: 'error',
        error: failure instanceof Error ? failure : new Error(failure?.message || String(failure)),
        context: { orderNumber, which, source, customerEmail: customerInfo.email },
      });
    }
  });

  return {
    duplicate: false,
    orderNumber,
    sanityId: savedOrder?._id || null,
    shipmentTrackingNumber: shipmentTrackingNumber || null,
  };
}
