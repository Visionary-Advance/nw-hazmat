/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed: output: 'export' - This prevents API routes from working
  // Removed: trailingSlash: true - Not needed for server-side rendering
  
  // Optional: Add these for better performance
  experimental: {
    optimizeCss: true,
  },
  
  // If you need image optimization
//   images: {
//     domains: [
//       'files.stripe.com', // For Stripe product images
//       'your-domain.com',  // Your domain for local images
//     ],
//   },
  
//   // Environment variables (optional)
//   env: {
//     CUSTOM_KEY: process.env.CUSTOM_KEY,
//   },
};

export default nextConfig;