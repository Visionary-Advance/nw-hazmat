'use client';

import { Star } from 'lucide-react';

export default function StarRating({ rating = 0, count, size = 'md', showCount = true, className = '' }) {
  const clamped = Math.max(0, Math.min(5, Number(rating) || 0));
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };
  const starSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label={`Rated ${clamped.toFixed(1)} out of 5${count ? ` from ${count} reviews` : ''}`}>
      <div className="flex" role="img" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => {
          const fillPct = Math.max(0, Math.min(1, clamped - i)) * 100;
          return (
            <span key={i} className="relative inline-block">
              <Star className={`${starSize} text-gray-300`} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPct}%` }}>
                <Star className={`${starSize} text-yellow-400 fill-yellow-400`} />
              </span>
            </span>
          );
        })}
      </div>
      {showCount && (
        <span className="text-sm text-gray-700">
          <span className="font-semibold">{clamped.toFixed(1)}</span>
          {count != null && <span className="text-gray-500"> ({count})</span>}
        </span>
      )}
    </div>
  );
}
