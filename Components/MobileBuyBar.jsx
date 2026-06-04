'use client';

import { useEffect, useState } from 'react';
import { Phone, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

function isInquireOnly(product) {
  const flag = product?.metadata?.inquireOnly;
  if (typeof flag === 'string') return flag.toLowerCase() === 'true';
  return flag === true;
}

export default function MobileBuyBar({ product, quantity = 1 }) {
  const { addToCart } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!product) return null;
  const inquire = isInquireOnly(product);
  const inStock = product.inStock !== false;

  return (
    <div
      aria-hidden={!visible}
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 p-3">
        <div className="flex-shrink-0 min-w-0">
          <p className="text-xs text-gray-500 truncate">{product.name}</p>
          <p className="text-lg font-bold text-gray-900 tabular-nums">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex-1" />
        {inquire ? (
          <a
            href="tel:541-988-9823"
            className="h-11 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        ) : inStock ? (
          <button
            onClick={() => addToCart(product, quantity)}
            className="h-11 px-4 rounded-xl bg-[#209978] hover:bg-[#17795E] active:bg-[#146c54] text-white font-semibold flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        ) : (
          <button disabled className="h-11 px-4 rounded-xl bg-gray-200 text-gray-500 font-semibold">
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
