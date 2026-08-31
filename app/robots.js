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
        // NOTE: /checkout is deliberately NOT disallowed. The route is gone
        // (it was a dead mockup) and the URL now 301s to /shop — but a
        // disallowed URL cannot be crawled, so Google would never see the
        // redirect and the stale entry would linger. Allow the crawl, let the
        // 301 resolve it (punch list #11).
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
