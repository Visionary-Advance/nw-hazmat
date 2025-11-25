import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { getProductBySlug, getAllProducts } from '@/lib/getProducts';

// Force dynamic rendering for all product pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Generate metadata for each product page
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Product | NorthWest HazMat Shop Oregon',
        description: 'Professional hazmat equipment and safety supplies from NorthWest HazMat in Oregon.',
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
        type: 'website',
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
  } catch (error) {
    console.error('Error generating metadata for product:', error);
    // Return default metadata on error to prevent build failure
    return {
      title: 'Product | NorthWest HazMat Shop Oregon',
      description: 'Professional hazmat equipment and safety supplies from NorthWest HazMat in Oregon.',
    };
  }
}

// Note: generateStaticParams is removed because we're using force-dynamic
// Product pages will be generated on-demand when users visit them

export default async function ProductPage({ params }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error('Error loading product page:', error);
    notFound();
  }
}
