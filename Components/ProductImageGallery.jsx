'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductImageGallery({ images = [], alt = '' }) {
  const valid = Array.isArray(images) ? images.filter(Boolean) : [];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [images]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(valid.length - 1, i + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(0, i - 1));
    }
  };

  if (valid.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-2xl border border-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  const activeSrc = valid[activeIdx];

  return (
    <div className="w-full" onKeyDown={onKeyDown}>
      <div className="relative w-full aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden group">
        <Image
          src={activeSrc}
          alt={`${alt} — image ${activeIdx + 1} of ${valid.length}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {valid.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product images">
          {valid.map((src, i) => {
            const isActive = i === activeIdx;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`Show image ${i + 1}`}
                onClick={() => setActiveIdx(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isActive ? 'border-blue-600' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
