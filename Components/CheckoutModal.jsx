'use client';

import { Component, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import CheckoutForm from './CheckoutForm';
import { getRecentCompletedOrder, clearCompletedOrder } from '@/lib/completedOrder';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function OrderConfirmation({ order, onClose }) {
  return (
    <div className="p-8 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
      <p className="text-gray-700 mb-2 text-lg">
        Thank you for your purchase — your payment went through
        {order?.orderNumber ? <> and your order number is <strong>#{order.orderNumber}</strong></> : null}.
      </p>
      <p className="text-gray-600 mb-6 text-lg">
        We'll send your order confirmation
        {order?.email ? <> to <strong>{order.email}</strong></> : null} shortly.
        Questions? Email <a href="mailto:info@nwhazmat.com" className="text-blue-600 underline">info@nwhazmat.com</a>.
      </p>
      <button
        onClick={() => {
          clearCompletedOrder();
          onClose();
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
      >
        Continue Shopping
      </button>
    </div>
  );
}

// If anything in checkout throws after the customer has been charged (seen with
// Stripe Link), show the confirmation instead of bubbling up to the global
// "Something went wrong" page.
class CheckoutErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error('Checkout crashed:', error);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const paidOrder = getRecentCompletedOrder();
    if (paidOrder) return <OrderConfirmation order={paidOrder} onClose={this.props.onClose} />;
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Checkout hit a problem</h2>
        <p className="text-gray-600 mb-6">
          Please try again. If your payment already went through, you'll still get a
          confirmation email — contact info@nwhazmat.com before paying again.
        </p>
        <button
          onClick={() => this.setState({ error: null })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }
}

export default function CheckoutModal({ onClose }) {
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleSuccess = (details) => {
    setCompletedOrder({ ...getRecentCompletedOrder(), ...details });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
        <CheckoutErrorBoundary onClose={onClose}>
        {completedOrder ? (
          <OrderConfirmation order={completedOrder} onClose={onClose} />
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
        </CheckoutErrorBoundary>
      </div>
    </div>
  );
}