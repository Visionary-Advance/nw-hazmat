'use client';

import { ShieldCheck, Truck, Headphones, BadgeCheck } from 'lucide-react';

const DEFAULT_ITEMS = [
  { Icon: ShieldCheck, label: 'Secure checkout', sub: 'Stripe-protected' },
  { Icon: Truck, label: 'Ships from Oregon', sub: 'Nationwide UPS' },
  { Icon: Headphones, label: 'Expert support', sub: '(541) 988-9823' },
  { Icon: BadgeCheck, label: 'Licensed & insured', sub: 'Certified pros' },
];

export default function ProductTrustRow({ items = DEFAULT_ITEMS }) {
  return (
    <ul className="grid grid-cols-2 gap-3 mt-4">
      {items.map(({ Icon, label, sub }, i) => (
        <li key={i} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
          <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs">
            <div className="font-semibold text-gray-900">{label}</div>
            {sub && <div className="text-gray-600">{sub}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}
