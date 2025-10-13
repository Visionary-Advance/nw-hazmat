'use client';

import { useState } from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/Components/BreadCrumbs';
import { CartProvider } from '@/Components/CartContext';
import CartButton from '@/Components/CartButton';
import CartSidebar from '@/Components/CartSidebar';
import Button from '@/Components/Button';
import ProductPageATCButton from '@/Components/ProductPageATCButton';
import { useRouter } from 'next/navigation';

export default function ProductPageClient({ product }) {
  const router = useRouter();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
          <p className="text-gray-600 mt-2">The product you're looking for could not be found.</p>
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
                <Image
                  src={product.image}
                  alt={`${product.name} - Professional hazmat equipment`}
                  width={448}
                  height={384}
                  className="w-full max-w-md h-96 object-cover rounded-lg shadow-lg"
                  priority
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

          <div className='grid grid-cols-1 gap-x-5 mt-5 md:grid-cols-2 w-11/12'>
            <button
              onClick={() => router.back()}
              className="w-full bg-red-500 text-white fjalla-one px-4 py-2 rounded"
            >
              Go Back
            </button>
            <div className="w-full col-span-1">
              <ProductPageATCButton
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
