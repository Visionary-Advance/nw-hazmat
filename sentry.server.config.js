// Sentry config for the Node.js server runtime (API routes, server components).
// Loaded via instrumentation.js register(). DSN + auth come from env vars.
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Only report from real deployments — keeps local dev noise out of the dashboard.
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
  // Performance tracing sample rate. Lower this if you exceed the free quota.
  tracesSampleRate: 0.1,
  // Don't spam the build log; set SENTRY_DEBUG=1 to troubleshoot.
  debug: process.env.SENTRY_DEBUG === '1',
});
