'use client';
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useCart } from './CartContext';

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
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

  // Calculate shipping cost
  const calculateShipping = async (address) => {
    if (!address.city || !address.state || !address.zipCode) {
      setShippingCost(15); // Default shipping
      return 15;
    }

    setIsCalculatingShipping(true);
    try {
      const response = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress: address
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const cost = data.shippingCost || 15;
        setShippingCost(cost);
        return cost;
      } else {
        setShippingCost(15);
        return 15;
      }
    } catch (error) {
      console.error('Shipping calculation error:', error);
      setShippingCost(15);
      return 15;
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const getTotalWithShipping = () => {
    return getCartTotal() + shippingCost;
  };

  function DetailedGooglePayTest() {
  const testGooglePayDirect = async () => {
    console.log('=== TESTING GOOGLE PAY DIRECTLY ===');
    
    // Test 1: Check if Google Pay API is loaded
    if (window.google && window.google.payments) {
      console.log('✅ Google Pay API is loaded');
      
      try {
        const paymentsClient = new window.google.payments.api.PaymentsClient({
          environment: 'TEST'
        });
        
        const isReadyToPayRequest = {
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
              }
            }
          ]
        };
        
        const response = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        console.log('Google Pay isReadyToPay response:', response);
        
        if (response.result) {
          console.log('🎉 Google Pay is ready to pay!');
        } else {
          console.log('❌ Google Pay is not ready:', response);
        }
      } catch (error) {
        console.log('❌ Google Pay API error:', error);
      }
    } else {
      console.log('❌ Google Pay API not loaded');
      
      // Try to load Google Pay API manually
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ Google Pay API loaded manually');
        setTimeout(() => testGooglePayDirect(), 1000);
      };
      script.onerror = () => {
        console.log('❌ Failed to load Google Pay API');
      };
      document.head.appendChild(script);
    }
  };

  const testPaymentRequest = async () => {
    console.log('=== TESTING PAYMENT REQUEST API ===');
    
    if (!window.PaymentRequest) {
      console.log('❌ PaymentRequest not supported');
      return;
    }
    
    try {
      const request = new PaymentRequest(
        [
          {
            supportedMethods: 'https://google.com/pay',
            data: {
              environment: 'TEST',
              apiVersion: 2,
              apiVersionMinor: 0,
              merchantInfo: {
                merchantName: 'Test Store'
              },
              allowedPaymentMethods: [
                {
                  type: 'CARD',
                  parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX']
                  }
                }
              ]
            }
          }
        ],
        {
          total: {
            label: 'Test',
            amount: { currency: 'USD', value: '1.00' }
          }
        }
      );
      
      const canPay = await request.canMakePayment();
      console.log('PaymentRequest canMakePayment result:', canPay);
      
      if (canPay) {
        console.log('🎉 PaymentRequest says Google Pay is available!');
      } else {
        console.log('❌ PaymentRequest says Google Pay is not available');
      }
    } catch (error) {
      console.log('❌ PaymentRequest error:', error);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
      <h3 className="font-bold mb-2">Google Pay Debug Tests</h3>
      <div className="space-x-2">
        <button
          onClick={testGooglePayDirect}
          className="bg-blue-500 text-white px-3 py-2 rounded text-sm"
        >
          Test Google Pay API
        </button>
        <button
          onClick={testPaymentRequest}
          className="bg-green-500 text-white px-3 py-2 rounded text-sm"
        >
          Test PaymentRequest
        </button>
      </div>
    </div>
  );
}
  // Initialize Apple Pay and Google Pay
  useEffect(() => {
    if (stripe && cartItems.length > 0) {
      const subtotal = getCartTotal();
      
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        disableLink: true,
        total: {
          label: 'NorthWest HazMat',
          amount: Math.round((subtotal + 15) * 100), // Start with default shipping
        },
        displayItems: [
          {
            label: 'Subtotal',
            amount: Math.round(subtotal * 100),
          },
          {
            label: 'Shipping',
            amount: 1500, // Default $15 shipping
          },
        ],
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        shippingOptions: [
          {
            id: 'standard',
            label: 'Standard Shipping',
            detail: '3-7 business days',
            amount: 1500,
          },
        ],
      });

      // Check if Apple Pay or Google Pay is available
      pr.canMakePayment().then(result => {
        if (result) {
          setCanMakePayment(true);
          setPaymentRequest(pr);
        }
      });

      // Handle shipping address change
      pr.on('shippingaddresschange', async (event) => {
        const address = {
          city: event.shippingAddress.city,
          state: event.shippingAddress.region,
          zipCode: event.shippingAddress.postalCode,
          country: event.shippingAddress.country,
        };

        // Calculate new shipping cost
        const newShippingCost = await calculateShipping(address);
        const newTotal = subtotal + newShippingCost;

        // Update the payment request with new totals
        event.updateWith({
          status: 'success',
          total: {
            label: 'NorthWest HazMat',
            amount: Math.round(newTotal * 100),
          },
          displayItems: [
            {
              label: 'Subtotal',
              amount: Math.round(subtotal * 100),
            },
            {
              label: 'Shipping',
              amount: Math.round(newShippingCost * 100),
            },
          ],
          shippingOptions: [
            {
              id: 'standard',
              label: 'Standard Shipping',
              detail: address.state === 'Oregon' ? '1-3 business days' : '3-7 business days',
              amount: Math.round(newShippingCost * 100),
              selected: true,
            },
          ],
        });
      });

      // Handle shipping option change
      pr.on('shippingoptionchange', (event) => {
        // For now, we only have one shipping option, but you can add express shipping here
        event.updateWith({
          status: 'success',
          total: {
            label: 'NorthWest HazMat',
            amount: Math.round(getTotalWithShipping() * 100),
          },
        });
      });

      // Handle payment method
      pr.on('paymentmethod', async (event) => {
        try {
          setProcessing(true);
          
          const shippingAddress = event.shippingAddress;
          const finalShippingCost = await calculateShipping({
            city: shippingAddress.city,
            state: shippingAddress.region,
            zipCode: shippingAddress.postalCode,
          });

          const finalTotal = subtotal + finalShippingCost;

          // Create payment intent with final total
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: finalTotal,
              currency: 'usd',
              metadata: {
                customerName: event.payerName,
                customerEmail: event.payerEmail,
                orderSource: 'apple_google_pay',
                shippingCost: finalShippingCost,
                subtotal: subtotal,
                shippingAddress: JSON.stringify(shippingAddress),
                items: JSON.stringify(cartItems.map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity
                }))),
              }
            }),
          });

          const { clientSecret, error: apiError } = await response.json();

          if (apiError) {
            console.error('Payment intent creation failed:', apiError);
            event.complete('fail');
            setError(apiError);
            return;
          }

          // Confirm the payment
          const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            { 
              payment_method: event.paymentMethod.id 
            },
            { 
              handleActions: false 
            }
          );

          if (confirmError) {
            console.error('Payment confirmation failed:', confirmError);
            event.complete('fail');
            setError(confirmError.message);
          } else {
            console.log('Payment succeeded:', paymentIntent);
            
            // Create order record
            try {
              const orderResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  customerInfo: {
                    firstName: event.payerName?.split(' ')[0] || '',
                    lastName: event.payerName?.split(' ').slice(1).join(' ') || '',
                    email: event.payerEmail || '',
                    address: shippingAddress.addressLine?.[0] || '',
                    city: shippingAddress.city || '',
                    state: shippingAddress.region || '',
                    zipCode: shippingAddress.postalCode || '',
                    country: shippingAddress.country || 'US',
                  },
                  items: cartItems,
                  subtotal: subtotal,
                  shippingCost: finalShippingCost,
                  total: finalTotal,
                  paymentIntentId: paymentIntent.id,
                  paymentMethod: 'apple_google_pay',
                  paymentStatus: paymentIntent.status,
                }),
              });

              if (orderResponse.ok) {
                console.log('Order created successfully');
              }
            } catch (orderError) {
              console.error('Order creation failed:', orderError);
              // Don't fail the payment for order creation issues
            }

            event.complete('success');
            clearCart();
            onSuccess();
          }
        } catch (err) {
          console.error('Payment processing error:', err);
          event.complete('fail');
          setError('Payment failed. Please try again.');
        } finally {
          setProcessing(false);
        }
      });

    }
  }, [stripe, cartItems, shippingCost]);

  // Update shipping when address changes for regular checkout
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      calculateShipping(customerInfo);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [customerInfo.city, customerInfo.state, customerInfo.zipCode]);

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;
    
    setProcessing(true);
    setError('');

    try {
      const total = getTotalWithShipping();
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'usd',
          metadata: {
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            customerEmail: customerInfo.email,
            orderSource: 'card_payment',
            shippingCost: shippingCost,
            subtotal: getCartTotal(),
            items: JSON.stringify(cartItems.map(item => ({
              id: item.id,
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
            subtotal: getCartTotal(),
            shippingCost: shippingCost,
            total: total,
            paymentIntentId: paymentIntent.id,
            paymentMethod: 'card',
            paymentStatus: paymentIntent.status,
          }),
        });

        if (orderResponse.ok) {
          console.log('Order created successfully');
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

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
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
  const total = getTotalWithShipping();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Left Column - Checkout Form */}
      <div className="space-y-6">
        {/* Express Checkout */}
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Express Checkout</h2>
          
          <div className="space-y-3">
            {/* Apple Pay & Google Pay */}
            {canMakePayment && paymentRequest ? (
              <div className="h-12">
                <PaymentRequestButtonElement 
                  options={{ 
                    paymentRequest,
                    style: {
                      paymentRequestButton: {
                        type: 'default', // 'default', 'book', 'buy', 'checkout', 'donate'
                        theme: 'dark', // 'dark', 'light', 'light-outline'
                        height: '48px',
                      },
                    },
                  }}
                  className="w-full h-12"
                />
              </div>
            ) : (
              <div className="h-12 animate-pulse bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                
              </div>
            )}
            
            
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
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Company (Required for business addresses)"
            value={customerInfo.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Apartment, suite, etc. (optional)"
            value={customerInfo.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              value={customerInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              value={customerInfo.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
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
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
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
              `Pay $${total.toFixed(2)}`
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
              <span>
                {isCalculatingShipping ? (
                  <span className="text-gray-500">Calculating...</span>
                ) : (
                  `$${shippingCost.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Availability */}
          
        </div>
      </div>
    </div>
  );
}