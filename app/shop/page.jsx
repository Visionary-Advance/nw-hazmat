'use client';

import { useState } from 'react';
import Breadcrumbs from "@/Components/BreadCrumbs";
import UpdatedATCButton from "@/Components/UpdatedATCButton";
import CartButton from "@/Components/CartButton";
import CartSidebar from "@/Components/CartSidebar";
import { CartProvider } from "@/Components/CartContext";
import { ProductSkeletonGrid } from "@/Components/ProductSkeleton";
import { useProducts } from "@/hooks/useProducts";

export default function Shop() {
  const { products, loading, getProductsByCategory } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : getProductsByCategory(selectedCategory);

 
  return (
    <CartProvider>
      <>
        <Breadcrumbs />
        
       
        
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
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-4">
                  {selectedCategory === 'all' 
                    ? 'No products are currently available.' 
                    : `No products found in the "${selectedCategory}" category.`
                  }
                </p>
                {products.length === 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                    <h4 className="font-semibold text-blue-800 mb-2">Next Steps:</h4>
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
                    className="w-64 h-[460px] mx-auto relative shadow-md rounded-[20px] bg-white border border-black/20 flex flex-col justify-between p-3"
                  >
                    {/* Image */}
                    <div className="flex justify-center">
                      {item.image ? (
                        <img
                          className="w-60 h-60 object-cover border border-black shadow rounded-[16px]"
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-60 h-60 bg-gray-200 border border-black shadow rounded-[16px] flex items-center justify-center ${item.image ? 'hidden' : 'flex'}`}
                      >
                        <span className="text-gray-400 text-sm text-center px-4">
                          {item.image ? 'Loading...' : 'No Image'}
                        </span>
                      </div>
                    </div>

                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}

                    {/* Name + Divider */}
                    <div className="mt-2">
                      <h3 className="fjalla-one text-xl">{item.name}</h3>
                      <div className="bg-black h-[1px] w-12 mt-1" />
                    </div>

                    {/* Description */}
                    <div className="text-sm mt-2 flex-grow overflow-hidden">
                      <p className="line-clamp-3">{item.description}</p>
                    </div>

                    {/* Price + Button */}
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <p className="font-bold text-2xl">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.currency && item.currency !== 'usd' && (
                          <p className="text-xs text-gray-500 uppercase">{item.currency}</p>
                        )}
                      </div>
                      <UpdatedATCButton 
                        product={item} 
                        disabled={!item.inStock}
                      />
                    </div>

                    {/* Inventory Count (if available) */}
                    {item.inventory !== null && item.inventory < 10 && item.inStock && (
                      <div className="text-xs text-orange-600 mt-1 text-center">
                        Only {item.inventory} left in stock
                      </div>
                    )}
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