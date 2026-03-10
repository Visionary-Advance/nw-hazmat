// Server-side function to fetch products from Stripe
import Stripe from 'stripe';

let _stripe;
function getStripe() {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn('STRIPE_SECRET_KEY not found - product fetching will be skipped during build');
      return null;
    }
    _stripe = new Stripe(key, { apiVersion: '2024-06-20' });
  }
  return _stripe;
}

// In-memory cache to avoid redundant Stripe calls during build/revalidation
let _cache = { products: null, timestamp: 0 };
const CACHE_TTL = 60000; // 1 minute

// Helper function to create URL-friendly slug from product name
export function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

export async function getAllProducts() {
  // Return cached data if still fresh
  if (_cache.products && Date.now() - _cache.timestamp < CACHE_TTL) {
    return _cache.products;
  }

  try {
    const stripe = getStripe();

    // If Stripe is not available (e.g., during build without env vars), return empty array
    if (!stripe) {
      console.warn('Stripe not initialized - returning empty products array');
      return [];
    }

    // Fetch products and prices from Stripe
    const { data: products } = await stripe.products.list({
      active: true,
      limit: 50,
      expand: ['data.default_price']
    });

    const { data: prices } = await stripe.prices.list({
      active: true,
      limit: 100
    });

    // Group prices by product
    const priceByProduct = new Map();
    for (const p of prices) {
      const arr = priceByProduct.get(p.product) || [];
      arr.push(p);
      priceByProduct.set(p.product, arr);
    }

    // Transform products into your app format
    const transformedProducts = products.map(p => {
      const productPrices = priceByProduct.get(p.id) || [];
      const defaultPrice = productPrices[0];

      return {
        id: p.id,
        name: p.name,
        description: p.description || '',
        images: p.images || [],
        image: p.images?.[0] || null,
        prices: productPrices,
        price: defaultPrice ? (defaultPrice.unit_amount / 100) : 0,
        currency: defaultPrice?.currency || 'usd',
        category: p.metadata?.category || 'general',
        inStock: p.active && (p.metadata?.stock !== '0'),
        inventory: p.metadata?.inventory ? parseInt(p.metadata.inventory) : null,
        weight: p.metadata?.weight ? parseFloat(p.metadata.weight) : null,
        metadata: p.metadata || {},
        slug: createSlug(p.name),
      };
    });

    // Cache the results
    _cache = { products: transformedProducts, timestamp: Date.now() };

    return transformedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug) {
  const products = await getAllProducts();
  return products.find(p => p.slug === slug);
}
