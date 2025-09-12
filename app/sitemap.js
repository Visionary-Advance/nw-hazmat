// app/sitemap.js
import { services } from '@/data/ServicesData';
import { training } from '@/data/TrainingData';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Safe slug generator – guards undefined/null
const createSlug = (value) => {
  const s = (value ?? '').toString().trim().toLowerCase();
  if (!s) return ''; // caller will skip empty slugs
  return s
    .replace(/[^a-z0-9]+/g, '-')  // non-alphanumerics -> hyphen
    .replace(/^-+|-+$/g, '')      // trim leading/trailing hyphens
    .replace(/-+/g, '-');         // collapse multiple hyphens
};

export default function sitemap() {
  // Prefer env so preview/prod URLs are correct
  const baseUrl =
    (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000')
      .replace(/\/+$/, '');

  const allProducts = [...(services ?? []), ...(training ?? [])];

  const routes = [
    { url: `${baseUrl}/`,              lastModified: new Date(), changeFrequency: 'yearly',  priority: 1.0 },
    { url: `${baseUrl}/about`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/shop`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/contact`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/services`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/training`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Only include products that have a valid name
  const productRoutes = allProducts
    .filter(p => p && typeof p.name === 'string' && p.name.trim().length > 0)
    .map(p => {
      const slug = createSlug(p.name);
      if (!slug) return null;
      return {
        url: `${baseUrl}/shop/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    })
    .filter(Boolean);

  // Only include non-empty categories
  const categories = Array.from(
    new Set(
      allProducts
        .map(p => (p && typeof p.category === 'string' ? p.category.trim() : ''))
        .filter(Boolean)
    )
  );

  const categoryRoutes = categories
    .map(cat => {
      const slug = createSlug(cat);
      if (!slug) return null;
      return {
        url: `${baseUrl}/shop/category/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    })
    .filter(Boolean);

  return [...routes, ...productRoutes, ...categoryRoutes];
}
