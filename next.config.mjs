import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },

  // Image optimization for Stripe product images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        pathname: '/links/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  async redirects() {
    return [
      // ============================================
      // Spill URLs that were 404ing. These slugs were the ones people and
      // search engines were already asking for, with no page behind them
      // (punch list #2). They now land on the 24-hour spill page.
      //
      // statusCode: 301 rather than permanent: true, which emits 308. The
      // client asked for 301 specifically. Google treats the two the same, but
      // 301 is the better-understood signal across other crawlers and tools.
      // ============================================
      {
        source: '/spill-response-springfield',
        destination: '/24-hour-spill-response-oregon',
        statusCode: 301,
      },
      {
        source: '/emergency-spill-response',
        destination: '/24-hour-spill-response-oregon',
        statusCode: 301,
      },
      {
        source: '/diesel-spill',
        destination: '/24-hour-spill-response-oregon',
        statusCode: 301,
      },
      {
        source: '/services/spill-response',
        destination: '/24-hour-spill-response-oregon',
        statusCode: 301,
      },

      // ============================================
      // Dedication Services renamed to what we actually sell (punch list #8).
      // ============================================
      {
        source: '/services/dedication-services',
        destination: '/services/industrial-demolition-site-cleanup',
        statusCode: 301,
      },

      // ============================================
      // Mold consolidation (punch list #14). Two indexable mold URLs were
      // competing, and the panic page trained Google that "emergency" means
      // black mold in Eugene, which fights the spill growth we want.
      // /services/mold-remediation is the canonical mold page.
      // ============================================
      {
        source: '/emergency-mold-removal-eugene-oregon',
        destination: '/services/mold-remediation',
        statusCode: 301,
      },

      // ============================================
      // Old WooCommerce product URLs: /shop/:category/:product → /shop/:product
      // ============================================
      {
        source: '/shop/:category/:product',
        destination: '/shop/:product',
        permanent: true,
      },

      // ============================================
      // Legacy WooCommerce "add to cart" links: strip the ?add-to-cart=<id>
      // query so crawlers land on the clean product URL instead of a duplicate
      // that only resolves via the canonical tag (GSC: "Alternate page with
      // proper canonical tag"). The category variant is normalized by the rule
      // above first, so matching /shop/:product here covers both shapes.
      // ============================================
      {
        source: '/shop/:product',
        has: [{ type: 'query', key: 'add-to-cart' }],
        destination: '/shop/:product',
        permanent: true,
      },

      // ============================================
      // Product category pages → /shop
      // ============================================
      {
        source: '/product-category/:path*',
        destination: '/shop',
        permanent: true,
      },

// ============================================
      // Renamed pages
      // ============================================
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services/mold-asbestos-lab',
        destination: '/services/lab-services',
        permanent: true,
      },
      // Consolidated the Eugene mold landing page into the canonical service page
      // to resolve keyword cannibalization (both targeted "mold ... eugene").
      {
        source: '/mold-services-eugene-oregon',
        destination: '/services/mold-remediation',
        permanent: true,
      },
      {
        source: '/training/hazmat-specialist',
        destination: '/training/hazmat-technician',
        permanent: true,
      },
      {
        source: '/training/tank-truck-training',
        destination: '/training',
        permanent: true,
      },

      // ============================================
      // Old static site files (.cfm, .html)
      // ============================================
      {
        source: '/index.cfm',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/training.html',
        destination: '/training',
        permanent: true,
      },
      {
        source: '/:path*.cfm',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/',
        permanent: true,
      },

      // ============================================
      // WordPress/WooCommerce junk URLs
      // ============================================
      {
        source: '/my-account/:path*',
        destination: '/shop',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-json/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/embed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/2017/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/nomold/:path*',
        destination: '/',
        permanent: true,
      },

      // ============================================
      // Attachment URLs (WordPress media pages)
      // ============================================
      {
        source: '/home/attachment/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/:id/attachment/:path*',
        destination: '/services/:id',
        permanent: true,
      },
      {
        source: '/training/:id/attachment/:path*',
        destination: '/training/:id',
        permanent: true,
      },

      // ============================================
      // Scattered privacy-policy / terms pages
      // /privacy-policy and /terms-and-conditions are now REAL pages, so they
      // must NOT be redirected. Old/alternate variants funnel to the real pages.
      // ============================================
      {
        source: '/terms-conditions',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/:section/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/:section/terms-and-conditions',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/:section/:sub/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/:section/:sub/terms-and-conditions',
        destination: '/terms-and-conditions',
        permanent: true,
      },

      // ============================================
      // WooCommerce shop pagination
      // ============================================
      {
        source: '/shop/page/:num',
        destination: '/shop',
        permanent: true,
      },
    ];
  },
};

// Wrap with Sentry so production builds upload source maps (readable stack traces)
// and instrument server errors. Source-map upload only runs when SENTRY_AUTH_TOKEN
// is present, so local/dev builds without it are unaffected.
export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Route Sentry's browser requests through your domain to dodge ad-blockers.
  tunnelRoute: '/monitoring',
  // Tree-shake Sentry's debug logging out of the production bundle.
  webpack: { treeshake: { removeDebugLogging: true } },
});
