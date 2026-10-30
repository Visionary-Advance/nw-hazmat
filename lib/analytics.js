/**
 * GA4 ecommerce events.
 *
 * GA4 is loaded by <GoogleAnalytics> in app/layout.js, which only sends
 * pageviews automatically. The shop's real funnel never changes the URL —
 * checkout is a modal over the cart — so without these explicit events GA4
 * can report shop traffic but not a single order (punch list #11).
 *
 * Every helper is a no-op when gtag is absent (SSR, ad blockers, or a missing
 * NEXT_PUBLIC_GA_ID in dev). Analytics must never break a sale, so all of this
 * is wrapped: a throw here would otherwise land in the middle of a payment.
 */

const CURRENCY = 'usd';

/** Fire a GA4 event. Silent no-op if analytics is unavailable. */
export function gaEvent(name, params = {}) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  } catch (err) {
    // Never let instrumentation surface to the customer.
    console.warn(`[analytics] ${name} failed`, err);
  }
}

/** Round to cents. GA4 rejects long floats from price * quantity math. */
function money(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}

/** Map cart/product objects to the GA4 `items` array shape. */
export function toGaItems(items = []) {
  return (Array.isArray(items) ? items : [items]).filter(Boolean).map((item, index) => ({
    item_id: item.slug || item.id,
    item_name: item.name,
    item_category: item.category || 'general',
    price: money(item.price),
    quantity: item.quantity || 1,
    index,
  }));
}

/** Sum of price * quantity across items. */
function itemsValue(items = []) {
  return money(
    items.reduce((sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1), 0)
  );
}

export function trackViewItem(product) {
  if (!product) return;
  gaEvent('view_item', {
    currency: CURRENCY,
    value: money(product.price),
    items: toGaItems([product]),
  });
}

export function trackAddToCart(product, quantity = 1) {
  if (!product) return;
  const line = { ...product, quantity };
  gaEvent('add_to_cart', {
    currency: CURRENCY,
    value: itemsValue([line]),
    items: toGaItems([line]),
  });
}

export function trackBeginCheckout(cartItems = []) {
  if (!cartItems.length) return;
  gaEvent('begin_checkout', {
    currency: CURRENCY,
    value: itemsValue(cartItems),
    items: toGaItems(cartItems),
  });
}

/**
 * A form lead that reached the server successfully. `form` names which form
 * (contact vs. landing-page lead form) and `leadType` is the visitor's own
 * category choice. Never pass name/email/phone — GA4 forbids PII.
 */
export function trackLead({ form, leadType, source } = {}) {
  gaEvent('generate_lead', {
    form_name: form,
    lead_type: leadType || 'unspecified',
    lead_source: source || (typeof window !== 'undefined' ? window.location.pathname : undefined),
  });
}

/**
 * A tap on a tel: or mailto: link. For 24-hour spill response a phone tap is
 * often the whole conversion, so these get their own events. `location` is
 * the link text or aria-label so we can tell header vs. sticky CTA vs. body.
 */
export function trackContactClick(method, location) {
  gaEvent(method === 'phone' ? 'click_to_call' : 'click_to_email', {
    link_location: location,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
  });
}

/**
 * GA's ids for this visitor, read from its cookies, for storing on the
 * PaymentIntent so the webhook's server-side purchase (lib/ga4Server.js) joins
 * the same user and session. Fields are undefined when GA is blocked.
 *   _ga           GA1.1.<random>.<timestamp>        → client_id "<random>.<timestamp>"
 *   _ga_<stream>  GS1.1.<session_id>.…  or  GS2.1.s<session_id>$o…
 */
export function getGaIds() {
  try {
    if (typeof document === 'undefined') return {};
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map((c) => {
        const i = c.indexOf('=');
        return [c.slice(0, i), c.slice(i + 1)];
      })
    );

    const gaClientId = cookies._ga?.split('.').slice(2).join('.') || undefined;

    const streamId = (process.env.NEXT_PUBLIC_GA_ID || '').replace(/^G-/, '');
    const sessionCookie = streamId ? cookies[`_ga_${streamId}`] : undefined;
    const gaSessionId =
      sessionCookie?.match(/^GS2\.\d+\.s(\d+)/)?.[1] ||
      sessionCookie?.match(/^GS1\.\d+\.(\d+)/)?.[1] ||
      undefined;

    return { gaClientId, gaSessionId };
  } catch {
    return {};
  }
}

/**
 * Fires once per completed payment. `value` is the order total including
 * shipping, which is what GA4 reports as revenue.
 */
export function trackPurchase({ transactionId, items = [], subtotal, shipping = 0 }) {
  gaEvent('purchase', {
    transaction_id: transactionId,
    currency: CURRENCY,
    value: money((subtotal ?? itemsValue(items)) + shipping),
    shipping: money(shipping),
    items: toGaItems(items),
  });
}
