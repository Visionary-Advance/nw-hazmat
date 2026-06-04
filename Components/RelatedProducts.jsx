'use client';

import Image from 'next/image';
import ProductLink from './ProductLink';

export default function RelatedProducts({ products = [], title = 'You may also like' }) {
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="text-2xl fjalla-one mb-4 text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductLink
            key={p.id}
            product={p}
            className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <div className="relative w-full aspect-square bg-gray-50">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                {p.name}
              </h3>
              <p className="mt-1 font-bold text-gray-900 tabular-nums">
                ${p.price.toFixed(2)}
              </p>
            </div>
          </ProductLink>
        ))}
      </div>
    </section>
  );
}
