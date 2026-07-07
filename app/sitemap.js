import { getAllProducts } from '@/lib/getProducts';
import { getAllPosts } from '@/lib/sanity';

export default async function sitemap() {
  const baseUrl = 'https://nwhazmat.com';

  // Core pages
  const routes = [
    { url: `${baseUrl}/`,              lastModified: new Date(), changeFrequency: 'yearly',  priority: 1.0 },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/shop`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/training`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    // Standalone landing pages
    { url: `${baseUrl}/emergency-mold-removal-eugene-oregon`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/employment-application`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/chain-of-custody`,                     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`,                       lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`,                 lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // Add product pages from Stripe
  try {
    const products = await getAllProducts();
    products.forEach(product => {
      routes.push({
        url: `${baseUrl}/shop/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (error) {
    console.log('Error fetching products for sitemap:', error);
  }

  // Add blog posts from Sanity
  try {
    const posts = await getAllPosts();
    posts.forEach(post => {
      if (post?.slug?.current) {
        routes.push({
          url: `${baseUrl}/blog/${post.slug.current}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
    });
  } catch (error) {
    console.log('Error fetching blog posts for sitemap:', error);
  }

  // Add dynamic service pages
  try {
    const { services } = require('@/data/ServicesData');

    if (services && Array.isArray(services)) {
      services.forEach(service => {
        if (service && service.id) {
          routes.push({
            url: `${baseUrl}/services/${service.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.log('Error loading services for sitemap:', error);
  }

  // Add dynamic training pages
  try {
    const { training } = require('@/data/TrainingData');

    if (training && Array.isArray(training)) {
      training.forEach(item => {
        if (item && item.id) {
          routes.push({
            url: `${baseUrl}/training/${item.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      });
    }
  } catch (error) {
    console.log('Error loading training for sitemap:', error);
  }

  return routes;
}
