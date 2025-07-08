export default function robots() {
  const baseUrl = 'https://nwhazmat.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/', // Block API routes from indexing
        '/_next/', // Block Next.js internals
        '/admin/', // Block admin areas if any
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}