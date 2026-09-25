'use client';

// Catches errors thrown while rendering the root layout / a page — the cases a
// normal error.jsx can't reach. Reports them to Sentry, then shows a fallback.
import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';
import { getRecentCompletedOrder, clearCompletedOrder } from '@/lib/completedOrder';

export default function GlobalError({ error, reset }) {
  // Read after mount — sessionStorage doesn't exist during server render.
  const [paidOrder, setPaidOrder] = useState(null);
  useEffect(() => {
    Sentry.captureException(error);
    setPaidOrder(getRecentCompletedOrder());
  }, [error]);

  // The customer was just charged — whatever broke, don't tell them "something
  // went wrong". The confirmation email is sent server-side regardless.
  if (paidOrder) {
    return (
      <html>
        <body style={{ fontFamily: 'Arial, sans-serif', padding: '48px 16px', textAlign: 'center', color: '#222' }}>
          <div style={{ fontSize: '56px', color: '#209978', lineHeight: 1, marginBottom: '16px' }}>✓</div>
          <h1 style={{ fontSize: '26px', marginBottom: '12px' }}>Order Confirmed!</h1>
          <p style={{ color: '#333', fontSize: '17px', marginBottom: '8px' }}>
            Thank you for your purchase — your payment went through
            {paidOrder.orderNumber ? <> and your order number is <strong>#{paidOrder.orderNumber}</strong></> : null}.
          </p>
          <p style={{ color: '#555', fontSize: '17px', marginBottom: '28px' }}>
            We'll send your order confirmation
            {paidOrder.email ? <> to <strong>{paidOrder.email}</strong></> : null} shortly.
            Questions? Email <a href="mailto:info@nwhazmat.com" style={{ color: '#209978' }}>info@nwhazmat.com</a>.
          </p>
          <a
            href="/shop"
            onClick={() => clearCompletedOrder()}
            style={{ background: '#209978', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
          >
            Continue Shopping
          </a>
        </body>
      </html>
    );
  }

  return (
    <html>
      <body style={{ fontFamily: 'Arial, sans-serif', padding: '48px', textAlign: 'center', color: '#222' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Something went wrong</h1>
        <p style={{ color: '#555', marginBottom: '24px' }}>
          We hit an unexpected error and have been notified. Please try again.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => reset()}
            style={{ background: '#209978', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{ background: '#fff', color: '#209978', border: '2px solid #209978', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}
          >
            Go home
          </a>
        </div>
      </body>
    </html>
  );
}
