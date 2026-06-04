'use client';

import { Check } from 'lucide-react';

export default function ProductFeatureList({ features = [], title }) {
  if (!Array.isArray(features) || features.length === 0) return null;

  return (
    <div>
      {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
            <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
