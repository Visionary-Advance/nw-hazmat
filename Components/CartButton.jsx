'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartButton() {
  const { getCartItemCount, setIsCartOpen } = useCart();
  const itemCount = getCartItemCount();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="absolute top-36 lg:top-40 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-40"
    >
      <ShoppingCart className="w-7 h-7" />
      {itemCount > 0 && (
        <span className="bg-red-500 text-white absolute left5 text-xs rounded-full w-3 h-3 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}