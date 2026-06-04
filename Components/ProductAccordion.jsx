'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductAccordion({ items = [], title = 'Frequently Asked Questions' }) {
  const [openIdx, setOpenIdx] = useState(0);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      <h2 id="faq-heading" className="text-2xl fjalla-one mb-4 text-gray-900">{title}</h2>
      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="w-full flex items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span className="font-semibold text-gray-900">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                hidden={!isOpen}
                className="pb-4 text-gray-700 leading-relaxed"
              >
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
