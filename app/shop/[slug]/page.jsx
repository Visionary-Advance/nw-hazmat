import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { getProductBySlug, getAllProducts } from '@/lib/getProducts';

// Generate metadata for each product page
export async function generateMetadata({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | NorthWest HazMat Shop',
      description: 'The product you are looking for could not be found.',
    };
  }

  const description = product.description?.substring(0, 155) ||
    `Buy ${product.name} from NorthWest HazMat. Professional hazmat equipment and safety supplies in Oregon.`;

  return {
    title: `${product.name} | NorthWest HazMat Shop Oregon`,
    description,
    keywords: `${product.name}, hazmat equipment, safety supplies, ${product.category}, oregon hazmat`,
    openGraph: {
      title: `${product.name} | NorthWest HazMat`,
      description,
      url: `https://nwhazmat.com/shop/${slug}`,
      siteName: 'NorthWest HazMat, Inc.',
      type: 'product',
      images: product.image ? [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | NorthWest HazMat`,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

// Generate static params for all products (optional but improves performance)
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();

    // If no products (e.g., build without Stripe), return empty array
    // This allows the build to succeed and pages will be generated on-demand
    if (!products || products.length === 0) {
      console.warn('No products available during build - pages will be generated on-demand');
      return [];
    }

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable dynamic rendering for product pages when needed
export const dynamicParams = true;

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
