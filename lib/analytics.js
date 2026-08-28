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
