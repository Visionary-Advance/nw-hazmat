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
        // NOTE: /checkout is deliberately NOT disallowed. It carries
        // robots: noindex via app/checkout/layout.jsx, and a disallowed URL
        // cannot be crawled to read that tag — which is how /checkout ended up
        // indexed in the first place (punch list #11). Allow the crawl, let the
        // noindex remove it.
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
