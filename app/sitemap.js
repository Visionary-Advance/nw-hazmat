// app/sitemap.js
import { services } from '@/data/ServicesData';
import { training } from '@/data/TrainingData';

export default function sitemap() {
  const baseUrl = 'https://nwhazmat.com'; // Update to your actual domain
  
  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add service pages dynamically using id
  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Add training pages dynamically using id (with fallback to slug)
  const trainingRoutes = training.map((trainingItem) => ({
    url: `${baseUrl}/training/${trainingItem.id || trainingItem.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...routes, ...serviceRoutes, ...trainingRoutes];
}