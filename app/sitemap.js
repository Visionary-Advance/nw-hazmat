// app/sitemap.js
export default function sitemap() {
  const baseUrl = 'https://nwhazmat.com';
  
  // Core pages only - guaranteed to work
  const routes = [
    { url: `${baseUrl}/`,              lastModified: new Date(), changeFrequency: 'yearly',  priority: 1.0 },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/shop`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/training`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Try to safely add dynamic content
  try {
    const { services } = require('@/data/ServicesData');
    const { training } = require('@/data/TrainingData');
    
    if (services && Array.isArray(services)) {
      services.forEach(service => {
        if (service && service.name && typeof service.name === 'string') {
          const slug = service.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-');
          
          if (slug) {
            routes.push({
              url: `${baseUrl}/shop/${slug}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.6,
            });
          }
        }
      });
    }
    
    if (training && Array.isArray(training)) {
      training.forEach(item => {
        if (item && item.name && typeof item.name === 'string') {
          const slug = item.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-+/g, '-');
          
          if (slug) {
            routes.push({
              url: `${baseUrl}/shop/${slug}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: 0.6,
            });
          }
        }
      });
    }
  } catch (error) {
    console.log('Error loading dynamic content for sitemap:', error);
    // Just continue with static routes
  }

  return routes;
}
