// app/sitemap.js
import { services } from '@/data/ServicesData';
import { training } from '@/data/TrainingData';

// Helper function to create URL-friendly slug from product name
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

export default function sitemap() {
  const baseUrl = 'https://nwhazmat.com';
  
  // Combine all products
  const allProducts = [...services, ...training];
  
  // Core pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/training`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add product pages with direct URLs (shop/product-name)
  const productRoutes = allProducts.map((product) => ({
    url: `${baseUrl}/shop/${createSlug(product.name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Add category pages if you have them
  const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/shop/category/${createSlug(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...categoryRoutes];
}