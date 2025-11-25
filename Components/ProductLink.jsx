// Components/ProductLink.jsx
import Link from 'next/link';

// Helper function to create URL-friendly slug from product name
export const createProductSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
};

export default function ProductLink({ product, children, className = '', ...props }) {
  // Use pre-computed slug if available, otherwise generate from name
  const productSlug = product.slug || createProductSlug(product.name);

  return (
    <Link
      href={`/shop/${productSlug}`}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}

// Alternative: Direct function for generating product URLs
export const getProductUrl = (product) => {
  return `/shop/${product.slug || createProductSlug(product.name)}`;
};