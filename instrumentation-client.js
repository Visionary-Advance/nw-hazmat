// Client-side Sentry init. Captures browser JS errors, unhandled rejections,
// and (optionally) session replays for any visitor session that hits an error.
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  // Record a replay only when an error occurs (cheap), plus 10% of normal sessions.
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,
  integrations: [
    Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
  ],
  debug: false,
});

// Lets Sentry tie errors to the page the user navigated to (App Router).
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
