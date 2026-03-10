export default function robots() {
  const baseUrl = 'https://nwhazmat.com';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/_next/static/',  // Allow CSS, JS, fonts, images
      ],
      disallow: [
        '/api/',          // Block API routes
        '/_next/data/',   // Block Next.js data fetches
        '/admin/',        // Block admin areas
        '/checkout',      // Block checkout page
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
