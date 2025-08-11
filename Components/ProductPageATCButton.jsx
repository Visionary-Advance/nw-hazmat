'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

const ProductPageATCButton = ({ width, product, disabled = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!disabled && product.inStock) {
      addToCart(product);
    }
  };

  if (disabled || !product.inStock) {
    return (
      <button
        disabled
        className="relative w-[150px] rounded-2xl h-10 cursor-not-allowed flex items-center border border-gray-300 bg-gray-200 overflow-hidden opacity-60"
      >
        <span className="mx-auto text-xl text-gray-500 font-semibold">
          Out of Stock
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`${width} relative px-2 h-10 cursor-pointer flex items-center rounded-2xl active:scale-95 border border-[#17795E] bg-[#209978] overflow-hidden transition-all duration-300 hover:bg-[#17795E] active:border-[#146c54] group`}
    >
      <span className="mx-auto text-lg text-white font-semibold transition-all duration-300 group-hover:text-transparent">
        Add to Cart
      </span>
      {/* Fixed: Cart icon starts completely hidden and only appears on hover */}
      <span className="absolute right-0 h-full w-0 opacity-0 translate-x-full flex items-center justify-center bg-[#17795E] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-5 group-hover:w-[148px] group-active:bg-[#146c54]">
        <ShoppingCart className="w-5 h-5 text-white" />
      </span>
    </button>
  );
};

export default ProductPageATCButton;

// Update to use in your product page:
// Replace the UpdatedATCButton imports and usage with:
// import ProductPageATCButton from '@/Components/ProductPageATCButton';
// 
// Then replace:
// <UpdatedATCButton 
//   product={product} 
//   disabled={!product.inStock}
//   width={"w-full"}
// />
//
// With:
// <ProductPageATCButton 
//   product={product} 
//   disabled={!product.inStock}
//   width={"w-full"}
// />