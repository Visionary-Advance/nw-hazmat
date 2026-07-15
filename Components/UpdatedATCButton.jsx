'use client';

import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { track } from '@/lib/amplitude';

const UpdatedATCButton = ({ width, product, disabled = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!disabled && product.inStock) {
      addToCart(product);
      track('Add to Cart', {
        productId: product.id,
        productName: product.name,
        category: product.category,
        price: product.price,
      });
    }
  };

  if (disabled || !product.inStock) {
    return (
      <button
        disabled
        className={`${width || 'w-[150px]'} relative rounded-2xl h-10 cursor-not-allowed flex items-center border border-gray-300 bg-gray-200 overflow-hidden opacity-60`}
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
      <span className="absolute right-0 h-full w-full translate-x-full flex items-center justify-center bg-[#17795E] transition-all duration-300 group-hover:translate-x-0 group-active:bg-[#146c54]">
        <ShoppingCart className="w-5 h-5 text-white" />
      </span>
    </button>
  );
};

export default UpdatedATCButton;