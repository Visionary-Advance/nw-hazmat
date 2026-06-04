'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 99, disabled = false }) {
  const clamp = (n) => Math.max(min, Math.min(max, n));

  const dec = () => onChange?.(clamp(value - 1));
  const inc = () => onChange?.(clamp(value + 1));
  const onInput = (e) => {
    const n = parseInt(e.target.value, 10);
    if (Number.isNaN(n)) return;
    onChange?.(clamp(n));
  };

  const btnBase =
    'w-11 h-11 flex items-center justify-center text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors';

  return (
    <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        onClick={dec}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={btnBase}
      >
        <Minus className="w-4 h-4" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={onInput}
        min={min}
        max={max}
        disabled={disabled}
        aria-label="Quantity"
        className="w-12 h-11 text-center font-semibold text-gray-900 border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={inc}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={btnBase}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
