/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed: output: 'export' - This prevents API routes from working
  // Removed: trailingSlash: true - Not needed for server-side rendering
  
  // Optional: Add these for better performance
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
  
//   // Environment variables (optional)
//   env: {
//     CUSTOM_KEY: process.env.CUSTOM_KEY,
//   },
};

export default nextConfig;