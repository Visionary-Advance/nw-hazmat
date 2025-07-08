'use client';

import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutModal({ onClose }) {
  const [orderComplete, setOrderComplete] = useState(false);

  const handleSuccess = () => {
    setOrderComplete(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
        {orderComplete ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Order Complete!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Thank you for your purchase. You'll receive a confirmation email shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gray-50">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(95vh-100px)]">
              <Elements stripe={stripePromise}>
                <CheckoutForm onSuccess={handleSuccess} />
              </Elements>
            </div>
          </>
        )}
      </div>
    </div>
  );
}