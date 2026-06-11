'use client';

import { useState } from 'react';
import Image from 'next/image';
import Breadcrumbs from "@/Components/BreadCrumbs";
import UpdatedATCButton from "@/Components/UpdatedATCButton";
import CallToInquireButton from "@/Components/CallToInquireButton";
import CartButton from "@/Components/CartButton";
import CartSidebar from "@/Components/CartSidebar";
import { CartProvider } from "@/Components/CartContext";
import { ProductSkeletonGrid } from "@/Components/ProductSkeleton";
import { useProducts } from "@/hooks/useProducts";
import ProductLink, { createProductSlug } from "@/Components/ProductLink";

function isInquireOnly(product) {
  const flag = product?.metadata?.inquireOnly;
  if (typeof flag === 'string') return flag.toLowerCase() === 'true';
  return flag === true;
}

export default function ShopClient({ initialProducts = [] }) {
  const { products, loading, getProductsByCategory } = useProducts(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');


  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : getProductsByCategory(selectedCategory);


  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Professional Hazmat Equipment & Safety Supplies",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.name,
      "url": `https://nwhazmat.com/shop/${product.slug}`
    }))
  };

  return (
    <CartProvider>
      <>
        {products.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
          />
        )}
        <Breadcrumbs />

        {/* Page Heading */}
        <header className="text-center max-w-3xl mx-auto px-4 mt-4 mb-8">
          <h1 className="text-4xl lg:text-5xl fjalla-one font-bold mb-3">
            Professional Hazmat Equipment &amp; Safety Supplies
          </h1>
          <p className="text-gray-600 text-lg">
            Shop spill response kits, PPE, training simulators, and environmental
            safety gear with fast nationwide shipping across the USA.
          </p>
        </header>

        {/* Category Filter */}
        {!loading && categories.length > 2 && (
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <ProductSkeletonGrid count={6} />
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-600 mb-2">No Products Found</h2>
                <p className="text-gray-500 mb-4">
                  {selectedCategory === 'all'
                    ? 'No products are currently available.'
                    : `No products found in the "${selectedCategory}" category.`
                  }
                </p>
                {products.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
                    <ol className="list-decimal list-inside text-left text-blue-700 space-y-1">
                      <li>Create products in your Stripe dashboard</li>
                      <li>Add metadata like "category" to organize products</li>
                      <li>Upload product images</li>
                      <li>Set pricing for each product</li>
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-10 w-3/4 gap-y-4 mx-auto grid grid-cols-1 lg:grid-cols-3">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="w-64 h-[460px] mx-auto relative shadow-md rounded-[20px] bg-white border border-black/20 flex flex-col justify-between p-3 group hover:shadow-lg transition-shadow"
                  >
                    {/* Image - Now clickable */}
                    <ProductLink product={item} className="flex justify-center relative">
                      {item.image ? (
                        <Image
                          className="w-60 h-60 object-cover border border-black shadow rounded-[16px] group-hover:opacity-90 transition-opacity"
                          src={item.image}
                          alt={item.name}
                          width={240}
                          height={240}
                        />
                      ) : (
                        <div className="w-60 h-60 bg-gray-200 border border-black shadow rounded-[16px] flex items-center justify-center">
                          <span className="text-gray-400 text-sm text-center px-4">
                            No Image
                          </span>
                        </div>
                      )}
                    </ProductLink>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}

                    {/* Name + Divider - Now clickable */}
                    <ProductLink product={item} className="mt-2 block">
                      <h2 className="fjalla-one text-xl group-hover:text-blue-600 transition-colors">{item.name}</h2>
                      <div className="bg-black h-[1px] w-12 mt-1" />
                    </ProductLink>

                    {/* Description - Now clickable */}
                    <ProductLink product={item} className="text-sm mt-2 flex-grow min-h-0 block">
                      <p className="line-clamp-2 group-hover:text-gray-600 transition-colors">{item.description}</p>
                    </ProductLink>

                    {/* SEO-friendly link overlay for better accessibility */}
                    <ProductLink
                      product={item}
                      className="absolute inset-0 z-0"
                      aria-label={`View ${item.name} details`}
                    />

                    {/* Price + Full-width Button */}
                    <div className="relative z-10 mt-4 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <p className="font-bold text-2xl">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.currency && item.currency !== 'usd' && (
                          <p className="text-xs text-gray-500 uppercase">{item.currency}</p>
                        )}
                      </div>
                      {isInquireOnly(item) ? (
                        <CallToInquireButton width="w-full" />
                      ) : (
                        <UpdatedATCButton
                          product={item}
                          disabled={!item.inStock}
                          width="w-full"
                        />
                      )}
                      {item.inventory !== null && item.inventory < 10 && item.inStock && (
                        <div className="text-xs text-orange-600 text-center">
                          Only {item.inventory} left in stock
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Cart Components */}
        <CartButton />
        <CartSidebar />
      </>
    </CartProvider>
  );
}
