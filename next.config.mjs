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
      // Blog pages (no blog on new site)
      // ============================================
      {
        source: '/blog/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/',
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
      // ============================================
      {
        source: '/privacy-policy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/terms-conditions',
        destination: '/',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:section/privacy-policy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:section/terms-and-conditions',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:section/:sub/privacy-policy',
        destination: '/',
        permanent: true,
      },
      {
        source: '/:section/:sub/terms-and-conditions',
        destination: '/',
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

export default nextConfig;
