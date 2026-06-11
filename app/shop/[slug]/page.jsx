import { notFound } from 'next/navigation';
import ProductPageClient from './ProductPageClient';
import { getProductBySlug, getAllProducts } from '@/lib/getProducts';

// ISR - revalidate every hour
export const revalidate = 3600;

// Pre-build all product pages at build time
export async function generateStaticParams() {
  try {
    const products = await getAllProducts();
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for products:', error);
    return [];
  }
}

// Generate metadata for each product page
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: 'Professional Hazmat Equipment | NorthWest HazMat USA',
        description: 'Buy professional hazmat equipment and safety supplies online with nationwide shipping across the United States.',
      };
    }

    const description = product.description?.substring(0, 155) ||
      `Buy ${product.name} online. Professional hazmat equipment with fast nationwide shipping. Trusted by environmental professionals, first responders, and industrial teams across the USA.`;

    return {
      title: `${product.name} | NorthWest HazMat`,
      description,
      keywords: `${product.name}, hazmat equipment, safety supplies, ${product.category}, professional safety gear, hazmat equipment USA, buy online`,
      openGraph: {
        title: `${product.name} | NorthWest HazMat`,
        description,
        url: `https://nwhazmat.com/shop/${slug}`,
        siteName: 'NorthWest HazMat, Inc.',
        type: 'website',
        images: [
          {
            url: product.image || 'https://nwhazmat.com/img/Hazmat-Services.jpg',
            width: 800,
            height: 600,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | NorthWest HazMat`,
        description,
        images: [product.image || 'https://nwhazmat.com/img/Hazmat-Services.jpg'],
      },
      alternates: {
        canonical: `https://nwhazmat.com/shop/${slug}`,
      },
      other: {
        "geo.region": "US",
        "geo.placename": "United States",
      },
    };
  } catch (error) {
    console.error('Error generating metadata for product:', error);
    return {
      title: 'Product | NorthWest HazMat Shop Oregon',
      description: 'Professional hazmat equipment and safety supplies from NorthWest HazMat in Oregon.',
    };
  }
}

export default async function ProductPage({ params }) {
  try {
    const { slug } = await params;
    const allProducts = await getAllProducts();
    const product = allProducts.find((p) => p.slug === slug);

    if (!product) {
      notFound();
    }

    const relatedProducts = allProducts
      .filter((p) => p.id !== product.id && p.category === product.category && p.inStock)
      .slice(0, 4);

    // Server-side structured data for reliable SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.images?.length ? product.images : product.image,
      "sku": product.id,
      "category": product.category,
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency?.toUpperCase() || "USD",
        "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "NorthWest HazMat, Inc.",
          "url": "https://nwhazmat.com"
        }
      },
      "brand": {
        "@type": "Brand",
        "name": "NorthWest HazMat"
      }
    };

    if (product.reviewsRating != null && product.reviewsCount != null) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": Number(product.reviewsRating).toFixed(1),
        "reviewCount": product.reviewsCount,
        "bestRating": 5,
        "worstRating": 1,
      };
    }

    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      structuredData.review = product.reviews.map((r) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.rating ?? product.reviewsRating ?? 5,
          "bestRating": 5,
        },
        "author": { "@type": "Person", "name": r.author || "Verified Buyer" },
        "datePublished": r.date,
        "reviewBody": r.text,
      }));
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ProductPageClient product={product} relatedProducts={relatedProducts} />
      </>
    );
  } catch (error) {
    console.error('Error loading product page:', error);
    notFound();
  }
}
