'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const { getCartItemCount, setIsCartOpen } = useCart();
  const itemCount = getCartItemCount();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  // Trigger animation when item count increases
  useEffect(() => {
    if (itemCount > prevCount) {
      setIsAnimating(true);
      // Reset animation after it completes
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match the animation duration
      
      return () => clearTimeout(timer);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className={`fixed top-36 lg:top-40 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center gap-2 z-40 transition-all duration-300 ${
        isAnimating ? 'scale-125' : 'scale-100'
      }`}
    >
      <ShoppingCart className="w-7 h-7" />
      {itemCount > 0 && (
        <span className="bg-red-500 text-white absolute -top-1 -right-1 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
    </button>
  );
}