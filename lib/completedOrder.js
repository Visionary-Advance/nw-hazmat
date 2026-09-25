// lib/completedOrder.js
// Remembers (per browser tab) that a payment just went through, so any screen we
// land on afterwards — including the global error page — can show "order
// received" instead of a scary error. The customer has already been charged at
// this point; the confirmation email comes from the server either way.

const KEY = 'nwh_completed_order';
const MAX_AGE_MS = 30 * 60 * 1000;

export function saveCompletedOrder({ paymentIntentId, email, total, orderNumber } = {}) {
  try {
    sessionStorage.setItem(
      KEY,
      JSON.stringify({ paymentIntentId, email, total, orderNumber, at: Date.now() })
    );
  } catch {
    // Private mode / storage blocked — the in-memory success screen still works.
  }
}

export function getRecentCompletedOrder() {
  try {
    const order = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (order && Date.now() - order.at < MAX_AGE_MS) return order;
  } catch {
    // ignore
  }
  return null;
}

export function clearCompletedOrder() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
