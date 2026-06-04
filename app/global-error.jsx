'use client';

// Catches errors thrown while rendering the root layout / a page — the cases a
// normal error.jsx can't reach. Reports them to Sentry, then shows a fallback.
import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

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
