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
      // Old WooCommerce product URLs: /shop/:category/:product → /shop/:product
      // ============================================
      {
        source: '/shop/:category/:product',
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
