'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/Components/BreadCrumbs';
import { CartProvider } from '@/Components/CartContext';
import UpdatedATCButton from '@/Components/UpdatedATCButton';
import CartButton from '@/Components/CartButton';
import CartSidebar from '@/Components/CartSidebar';
import { useProducts } from '@/hooks/useProducts';
import Button from '@/Components/Button';

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState(null);
  const [notFoundError, setNotFoundError] = useState(false);

  // Helper function to create URL-friendly slug from product name
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
  };

  useEffect(() => {
    // DEBUG: Log everything to see what's happening
   
    
    if (!loading && products.length > 0 && slug) {
      // DEBUG: Show all product names and their slugs
      
      products.forEach(p => {
        const productSlug = createSlug(p.name);
      
      });

      // Find product by comparing slugified names
      const foundProduct = products.find(p => createSlug(p.name) === slug);
   
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
      
        setNotFoundError(true);
      }
    }
  }, [products, loading, slug]);



  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error Loading Product</h1>
          <p className="text-gray-600 mt-2">Error: {error.message || error}</p>
          <p className="text-sm text-gray-500 mt-2">Slug: "{slug}"</p>
          <p className="text-sm text-gray-500">Check console for details</p>
        </div>
      </div>
    );
  }

  if (notFoundError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found (Direct Shop)</h1>
          <p className="text-gray-600 mt-2">Looking for slug: "{slug}"</p>
          <p className="text-sm text-gray-500 mt-2">Available products: {products.length}</p>
          <div className="mt-4 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold">Available product slugs:</h3>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              {products.slice(0, 10).map(p => (
                <li key={p.id || p.name}>
                  "{p.name}" → <a href={`/shop/${createSlug(p.name)}`} className="text-blue-600 underline">
                    /shop/{createSlug(p.name)}
                  </a>
                </li>
              ))}
              {products.length > 10 && (
                <li className="text-gray-400">... and {products.length - 10} more</li>
              )}
            </ul>
          </div>
          
          <div className="mt-4">
            <a href="/shop" className="text-blue-600 underline">← Back to Shop</a>
          </div>
        </div>
      </div>
    );
  }

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
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

  return (
    <CartProvider>
      <>
        {/* Update document head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.title = "${product.name} | NorthWest HazMat Shop Oregon";
              
              // Update meta description
              let metaDesc = document.querySelector('meta[name="description"]');
              if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
              }
              metaDesc.content = "${product.description?.substring(0, 150) || `Buy ${product.name} from NorthWest HazMat. Professional hazmat equipment in Oregon.`}";
              
              // Update canonical URL
              let canonical = document.querySelector('link[rel="canonical"]');
              if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
              }
              canonical.href = "https://nwhazmat.com/shop/${slug}";
            `
          }}
        />

        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Breadcrumbs />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
         
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center">
              {product.image ? (
                <img
                  src={product.image}
                  alt={`${product.name} - Professional hazmat equipment`}
                  className="w-full max-w-md h-96 object-cover rounded-lg shadow-lg"
                  loading="eager"
                />
              ) : (
                <div className="w-full max-w-md h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image Available</span>
                </div>
              )}
              
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <header>
                <h1 className="text-4xl fjalla-one font-bold text-gray-900">{product.name}</h1>
                
              </header>

              <div className="">
                <div className="text-2xl fjalla-one ">
                  <h2 className='fjalla-one'>Price:</h2>
                  ${product.price.toFixed(2)}
                  {product.currency && product.currency !== 'usd' && (
                    <span className="text-lg text-gray-500 ml-2 uppercase">{product.currency}</span>
                  )}
                </div>

                {product.description && (
                  <div>
                    <h2 className="text-xl font-semibold fjalla-one mb-2">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {/* Stock Status */}
               

                {/* Add to Cart */}
               

                {/* Additional Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Product Information</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional-grade hazmat equipment</li>
                    <li>• Ships from Oregon</li>
                    <li>• Expert customer support available</li>
                    <li>• Bulk discounts available - call for pricing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 w-11/12'>
            <Button text={"Go Back"} color={" w-full bg-red-500 text-white fjalla-one"} />
             <div className="w-full col-span-1">
                  <UpdatedATCButton 
                    product={product} 
                    disabled={!product.inStock}
                    width={"w-full"}
                  />
                </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-900">
              Need Help or Have Questions?
            </h3>
            <p className="text-blue-800 mb-4">
              Our hazmat equipment experts are here to help you find the right products for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:541-988-9823" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors">
                Call: (541) 988-9823
              </a>
              <a href="/contact" className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold text-center transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Cart Components */}
        <CartButton />
        <CartSidebar />
      </>
    </CartProvider>
  );
}