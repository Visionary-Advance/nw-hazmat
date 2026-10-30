// lib/ga4Server.js
// Server-side GA4 purchase events via the Measurement Protocol.
//
// The browser `purchase` event (lib/analytics.js) misses any buyer whose
// browser blocks GA (ad blockers, Brave, Safari tracking protection) and any
// payment that never returns to the checkout tab (Stripe Link). The Stripe
// webhook sees every paid order, so it reports the purchase too.
//
// Double counting: GA4 deduplicates purchases that share a transaction_id for
// the same user. Both paths use the PaymentIntent id as the transaction_id, and
// the browser stores its GA client_id on the PaymentIntent (gaClientId) so the
// server event lands on the same user.
//
// Like the browser helpers, this must never break order handling: every
// failure is logged and swallowed.

import { toGaItems } from '@/lib/analytics';

const MP_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const TIMEOUT_MS = 3000;

// Fallback when the browser couldn't read a _ga cookie (GA blocked). Same
// "random.timestamp" shape GA uses, so it reads as a new anonymous user.
function anonymousClientId(paymentIntent) {
  const random = Math.floor(Math.random() * 2147483647);
  return `${random}.${paymentIntent.created || Math.floor(Date.now() / 1000)}`;
}

function safeParse(json) {
  try {
    return json ? JSON.parse(json) : null;
  } catch {
    return null;
  }
}

/**
 * Report a paid shop PaymentIntent to GA4. Returns true when the hit was sent.
 * Skips (returns false) when GA isn't configured.
 */
export async function sendServerPurchase(paymentIntent) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA_API_SECRET;
  if (!measurementId || !apiSecret) {
    console.warn('[GA4 MP] NEXT_PUBLIC_GA_ID or GA_API_SECRET missing; skipping server purchase');
    return false;
  }

  try {
    const md = paymentIntent.metadata || {};
    const items = safeParse(md.items) || [];
    const shipping = Number(md.shippingCost) || 0;
    const sessionId = Number(md.gaSessionId) || undefined;

    const body = {
      client_id: md.gaClientId || anonymousClientId(paymentIntent),
      events: [
        {
          name: 'purchase',
          params: {
            transaction_id: paymentIntent.id,
            currency: (paymentIntent.currency || 'usd').toLowerCase(),
            value: (paymentIntent.amount_received || paymentIntent.amount || 0) / 100,
            shipping: Math.round(shipping * 100) / 100,
            items: toGaItems(items),
            payment_type: md.orderSource || 'card_payment',
            // Ties the event to the buyer's session so GA4 can attribute the
            // revenue to the traffic source that brought them.
            ...(sessionId ? { session_id: sessionId } : {}),
            event_source: 'stripe_webhook',
          },
        },
      ],
    };

    const url = `${MP_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    // The Measurement Protocol answers 2xx even for malformed events, so a
    // non-2xx means the request itself was rejected (bad secret, outage).
    if (!res.ok) {
      console.error(`[GA4 MP] purchase for pi=${paymentIntent.id} rejected: HTTP ${res.status}`);
      return false;
    }
    console.log(`[GA4 MP] purchase sent for pi=${paymentIntent.id}${md.gaClientId ? '' : ' (anonymous client_id)'}`);
    return true;
  } catch (err) {
    console.error(`[GA4 MP] purchase for pi=${paymentIntent.id} failed:`, err?.message || err);
    return false;
  }
}
