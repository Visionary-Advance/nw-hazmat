'use client';

import { useState } from 'react';
import { Phone, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import StarRating from './StarRating';
import QuantitySelector from './QuantitySelector';
import ProductFeatureList from './ProductFeatureList';
import ProductTrustRow from './ProductTrustRow';
import ShippingEstimator from './ShippingEstimator';
import CallToInquireButton from './CallToInquireButton';

function isInquireOnly(product) {
  const flag = product?.metadata?.inquireOnly;
  if (typeof flag === 'string') return flag.toLowerCase() === 'true';
  return flag === true;
}

export default function ProductBuyBox({ product, onAdded }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const inquire = isInquireOnly(product);
  const inStock = product.inStock !== false;
  const maxQty = product.inventory != null && product.inventory > 0 ? product.inventory : 99;
  const lowStock = product.inventory != null && product.inventory > 0 && product.inventory < 10;

  const handleAdd = () => {
    if (!inStock) return;
    addToCart(product, qty);
    setAdded(true);
    onAdded?.();
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {product.category && product.category !== 'general' && (
          <span className="inline-block text-xs uppercase tracking-wide font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-1 rounded">
            {product.category}
          </span>
        )}
        {inquire && (
          <span className="inline-block text-xs uppercase tracking-wide font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
            Call to order
          </span>
        )}
        {lowStock && (
          <span className="inline-block text-xs uppercase tracking-wide font-semibold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-1 rounded">
            Only {product.inventory} left
          </span>
        )}
      </div>

      <h1 className="text-3xl md:text-4xl fjalla-one font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {product.reviewsRating != null && (
        <a href="#reviews" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
          <StarRating
            rating={product.reviewsRating}
            count={product.reviewsCount}
            size="md"
          />
        </a>
      )}

      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-gray-900 tabular-nums">
          ${product.price.toFixed(2)}
        </span>
        {product.msrp && product.msrp > product.price && (
          <span className="text-lg text-gray-500 line-through tabular-nums">
            ${product.msrp.toFixed(2)}
          </span>
        )}
        {product.currency && product.currency !== 'usd' && (
          <span className="text-sm text-gray-500 uppercase">{product.currency}</span>
        )}
      </div>

      {product.features && (
        <ProductFeatureList features={product.features} />
      )}

      {!inquire && inStock && (
        <ShippingEstimator product={product} quantity={qty} />
      )}

      <div className="border-t border-gray-200 pt-4 space-y-3">
        {!inquire && inStock && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Quantity</label>
            <QuantitySelector value={qty} onChange={setQty} min={1} max={maxQty} />
          </div>
        )}

        {inquire ? (
          <CallToInquireButton width="w-full" />
        ) : inStock ? (
          <button
            onClick={handleAdd}
            className="w-full h-12 rounded-2xl bg-[#209978] hover:bg-[#17795E] active:bg-[#146c54] active:scale-[0.98] text-white font-semibold transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17795E] focus-visible:ring-offset-2"
          >
            <ShoppingCart className="w-5 h-5" />
            {added ? 'Added to cart' : `Add ${qty > 1 ? `${qty} ` : ''}to cart`}
          </button>
        ) : (
          <button
            disabled
            className="w-full h-12 rounded-2xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}

        {!inquire && inStock && (
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full h-11 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View cart →
          </button>
        )}

        {!inquire && (
          <a
            href="tel:541-988-9823"
            className="w-full h-11 text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Questions? Call (541) 988-9823
          </a>
        )}
      </div>

      <ProductTrustRow />
    </div>
  );
}
