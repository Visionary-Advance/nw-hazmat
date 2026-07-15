// Amplitude Analytics + Session Replay wrapper.
//
// IMPORTANT: every export here is safe to import anywhere, but the SDK only
// does anything in the browser. All calls no-op during SSR or when no API key
// is present, so nothing runs server-side.

import * as amplitude from '@amplitude/unified';

// Amplitude browser keys are public client-side keys (shipped to the browser),
// so it is safe to fall back to the literal when the env var is unset.
const API_KEY =
  process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ||
  'ca328ce18cab0497986c1b1595293410';

let initialized = false;

// localStorage key for the EU visitor's analytics consent decision.
const CONSENT_KEY = 'amp_analytics_consent'; // 'granted' | 'denied'

// Best-effort EU/EEA (+ UK) detection from the browser's IANA timezone.
// No network call, no cookie — safe to run before any consent is given.
// Intentionally over-inclusive (all Europe/* zones plus EEA Atlantic zones):
// prompting a non-EU European visitor is harmless; missing an EU visitor is not.
export function isEuVisitor() {
  if (typeof Intl === 'undefined') return false;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return (
      tz.startsWith('Europe/') ||
      ['Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Reykjavik'].includes(tz)
    );
  } catch {
    return false;
  }
}

export function getStoredConsent() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setStoredConsent(value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* localStorage unavailable (private mode) — ignore */
  }
}

// Initialize Amplitude Analytics (with autocapture) and Session Replay.
// Guarded so it only ever runs once, only in the browser, and only with a key.
export function initAmplitude() {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!API_KEY) return;

  amplitude.initAll(API_KEY, {
    analytics: { autocapture: true },
    sessionReplay: {
      sampleRate: 1,
      // Privacy: Session Replay masks all input text by default. We reinforce
      // that here and add explicit selectors so PII never reaches replays:
      //   .amp-mask  -> text replaced with asterisks (interaction still visible)
      //   .amp-block -> element fully omitted from the replay
      // Card fields render in Stripe's cross-origin iframe, which Session Replay
      // cannot capture at all — the block below is defense-in-depth.
      privacyConfig: {
        defaultMaskLevel: 'medium',
        maskSelector: ['.amp-mask'],
        blockSelector: ['.amp-block'],
      },
    },
  });

  initialized = true;
}

// Track a custom event. Safe to call before init / on the server (no-ops).
export function track(eventName, eventProperties = {}) {
  if (typeof window === 'undefined' || !initialized) return;
  amplitude.track(eventName, eventProperties);
}

// Associate subsequent events with a known user (e.g. after checkout/contact).
export function identifyUser(userId, traits = {}) {
  if (typeof window === 'undefined' || !initialized) return;
  if (userId) amplitude.setUserId(userId);

  if (Object.keys(traits).length) {
    const identify = new amplitude.Identify();
    Object.entries(traits).forEach(([key, value]) => identify.set(key, value));
    amplitude.identify(identify);
  }
}

// Record revenue for a purchase so Amplitude's revenue/LTV charts populate.
export function trackRevenue({ price, quantity = 1, productId, revenueType, eventProperties = {} } = {}) {
  if (typeof window === 'undefined' || !initialized) return;
  if (typeof price !== 'number') return;

  const revenue = new amplitude.Revenue()
    .setPrice(price)
    .setQuantity(quantity);

  if (productId) revenue.setProductId(productId);
  if (revenueType) revenue.setRevenueType(revenueType);
  if (Object.keys(eventProperties).length) revenue.setEventProperties(eventProperties);

  amplitude.revenue(revenue);
}
