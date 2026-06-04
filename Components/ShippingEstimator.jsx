'use client';

import { useState } from 'react';
import { Truck, Loader2 } from 'lucide-react';

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC',
];

export default function ShippingEstimator({ product, quantity = 1 }) {
  const [zip, setZip] = useState('');
  const [state, setState] = useState('OR');
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) {
      setError('Enter a valid 5-digit ZIP');
      setRate(null);
      return;
    }
    setError('');
    setLoading(true);
    setRate(null);
    try {
      const res = await fetch('/api/shipping/ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ ...product, quantity }],
          shippingAddress: { city: '', state, zipCode: zip },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.rates?.length > 0) {
        setRate(data.rates[0]);
      } else {
        setError(data.error || 'Unable to calculate shipping for this ZIP');
      }
    } catch {
      setError('Network error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <Truck className="w-4 h-4 text-blue-600" aria-hidden="true" />
        <span className="text-sm font-semibold text-gray-900">Estimate shipping</span>
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
          aria-label="Destination ZIP code"
          className="w-20 h-10 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          aria-label="Destination state"
          className="h-10 px-2 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading || zip.length !== 5}
          className="flex-1 h-10 px-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded transition-colors flex items-center justify-center gap-1"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Estimate'}
        </button>
      </form>

      {error && <p className="mt-2 text-xs text-red-600" role="alert">{error}</p>}

      {rate && (
        <div className="mt-2 text-sm text-gray-800" role="status" aria-live="polite">
          <span className="font-semibold">{rate.displayName}:</span>{' '}
          <span className="text-blue-700 font-bold">${rate.amount.toFixed(2)}</span>
          {rate.transitDays && (
            <span className="text-gray-600"> · ~{rate.transitDays} business day{rate.transitDays === 1 ? '' : 's'}</span>
          )}
        </div>
      )}
    </div>
  );
}
