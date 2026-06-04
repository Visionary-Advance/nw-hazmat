'use client';

import StarRating from './StarRating';

function formatDate(d) {
  if (!d) return '';
  try {
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) return d;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return d;
  }
}

export default function ProductReviews({ rating, count, reviews = [] }) {
  if (rating == null && (!reviews || reviews.length === 0)) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mt-12 scroll-mt-24">
      <h2 id="reviews-heading" className="text-2xl fjalla-one mb-4 text-gray-900">
        Customer Reviews
      </h2>

      {rating != null && (
        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <span className="text-4xl font-bold text-gray-900 tabular-nums">
            {Number(rating).toFixed(1)}
          </span>
          <div>
            <StarRating rating={rating} showCount={false} size="lg" />
            {count != null && (
              <p className="text-sm text-gray-600 mt-1">
                Based on {count} verified review{count === 1 ? '' : 's'}
              </p>
            )}
          </div>
        </div>
      )}

      {Array.isArray(reviews) && reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews.map((r, i) => (
            <li key={i} className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900">{r.author || 'Verified Buyer'}</span>
                {r.date && <span className="text-xs text-gray-500">{formatDate(r.date)}</span>}
              </div>
              {r.rating != null && (
                <div className="mb-2">
                  <StarRating rating={r.rating} showCount={false} size="sm" />
                </div>
              )}
              <p className="text-gray-700 leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
