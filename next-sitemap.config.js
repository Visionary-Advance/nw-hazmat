/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nwhazmat.com',
  generateRobotstxt: true, // (optional)
  // optional
  exclude: ['/admin/*', '/private/*'],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
   sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  // ...other options
}