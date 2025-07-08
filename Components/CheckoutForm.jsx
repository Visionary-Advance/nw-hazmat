'use client';
import React, { useState, useEffect } from 'react';;
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useCart } from './CartContext';

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Oregon',
    zipCode: ''
  });

  // Initialize Payment Request (Apple Pay, Google Pay)
  React.useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Total',
          amount: Math.round(getCartTotal() * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
      });

      // Check if Payment Request is available
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });

      pr.on('paymentmethod', async (event) => {
        // Handle Apple Pay/Google Pay payment
        try {
          setProcessing(true);
          
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: getCartTotal(),
              customerInfo: {
                firstName: event.payerName?.split(' ')[0] || '',
                lastName: event.payerName?.split(' ').slice(1).join(' ') || '',
                email: event.payerEmail || '',
                address: event.shippingAddress?.line1 || '',
                city: event.shippingAddress?.city || '',
                state: event.shippingAddress?.state || '',
                zipCode: event.shippingAddress?.postal_code || '',
              },
              metadata: {
                customerName: event.payerName,
                customerEmail: event.payerEmail,
                orderSource: 'express_checkout',
                items: JSON.stringify(cartItems.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity
                })))
              }
            }),
          });

          const { clientSecret } = await response.json();

          const { error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            { payment_method: event.paymentMethod.id },
            { handleActions: false }
          );

          if (confirmError) {
            event.complete('fail');
            setError(confirmError.message);
          } else {
            event.complete('success');
            clearCart();
            onSuccess();
          }
        } catch (err) {
          event.complete('fail');
          setError('Payment failed. Please try again.');
        } finally {
          setProcessing(false);
        }
      });
    }
  }, [stripe, getCartTotal, cartItems]);

  const handlePayPal = () => {
    // For now, show a message. You'd integrate PayPal SDK here
    alert('PayPal integration coming soon! Please use card payment below.');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: getCartTotal(),
          customerInfo,
          metadata: {
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            customerEmail: customerInfo.email,
            orderSource: 'card_payment',
            items: JSON.stringify(cartItems.map(item => ({
              id: item.id,
              stripeProductId: item.stripeProductId,
              stripePriceId: item.stripePriceId,
              name: item.name,
              price: item.price,
              quantity: item.quantity
            })))
          }
        }),
      });

      const { clientSecret, error: apiError } = await response.json();

      if (apiError) {
        setError(apiError);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            address: {
              line1: customerInfo.address,
              line2: customerInfo.apartment,
              city: customerInfo.city,
              state: customerInfo.state,
              postal_code: customerInfo.zipCode,
              country: 'US',
            },
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Create order record
        const orderResponse = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerInfo,
            items: cartItems,
            total: getCartTotal(),
            paymentIntentId: paymentIntent.id,
            stripePaymentIntentId: paymentIntent.id,
            currency: paymentIntent.currency,
            paymentStatus: paymentIntent.status,
          }),
        });

        if (orderResponse.ok) {
          const orderData = await orderResponse.json();
          console.log('Order created:', orderData);
        }

        clearCart();
        onSuccess();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'system-ui, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const subtotal = getCartTotal();
  const shipping = 100; // Fixed shipping for now
  const total = subtotal + shipping;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Left Column - Checkout Form */}
      <div className="space-y-6">
        {/* Express Checkout */}
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Express Checkout</h2>
          
          <div className="space-y-3">
            {/* Apple Pay & Google Pay */}
            {paymentRequest && (
              <div className="grid grid-cols-2 gap-3">
                <PaymentRequestButtonElement 
                  options={{ paymentRequest }}
                  className="h-12"
                />
                <div className="bg-white border border-gray-300 rounded-md h-12 flex items-center justify-center">
                  <span className="text-lg font-medium">🍎 Pay</span>
                </div>
              </div>
            )}
            
            {/* PayPal */}
            <button
              onClick={handlePayPal}
              className="w-full bg-[#ffc439] hover:bg-[#ffb93d] text-black font-semibold py-3 rounded-md flex items-center justify-center transition-colors"
            >
              <span className="text-lg font-bold">PayPal</span>
            </button>
          </div>
          
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Delivery</h3>
          
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="United States"
          >
            <option>United States</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={customerInfo.firstName}
              onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={customerInfo.lastName}
              onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Company (Required for business addresses)"
            value={customerInfo.company}
            onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            value={customerInfo.apartment}
            onChange={(e) => setCustomerInfo({...customerInfo, apartment: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={customerInfo.city}
              onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={customerInfo.state}
              onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Oregon">Oregon</option>
              <option value="Washington">Washington</option>
              <option value="California">California</option>
              <option value="Idaho">Idaho</option>
              <option value="Nevada">Nevada</option>
            </select>
            <input
              type="text"
              placeholder="Zip Code"
              value={customerInfo.zipCode}
              onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Credit Card Payment */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Credit Card Payment</h3>
          
          <div className="border border-gray-300 rounded-md px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement options={cardStyle} />
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!stripe || processing}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-md font-semibold text-lg transition-colors flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:pl-8">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">🛒</span>
            <h3 className="text-lg font-semibold">Cart ({cartItems.length})</h3>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                  ) : (
                    <span className="text-xs text-gray-400">No Image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{item.name}</h4>
                  <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                 
                  <p className="font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}