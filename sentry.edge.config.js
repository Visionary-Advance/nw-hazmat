// Sentry config for the Edge runtime (middleware, edge routes).
// Loaded via instrumentation.js register().
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  debug: process.env.SENTRY_DEBUG === '1',
});
