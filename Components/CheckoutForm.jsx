'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useCart } from './CartContext';
import { track, trackRevenue, identifyUser } from '@/lib/amplitude';

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
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedShippingRate, setSelectedShippingRate] = useState(null);
  const [shippingSource, setShippingSource] = useState(null); // 'ups' | 'flat_tier_fallback' | 'flat_tier_freight'
  const [addressValidation, setAddressValidation] = useState(null);
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Oregon',
    zipCode: ''
  });

  // Fetch live UPS rates (with server-side flat-tier fallback baked into the route)
  const fetchUpsRates = async (address) => {
    if (!address?.city || !address?.state || !address?.zipCode) return 0;
    setIsCalculatingShipping(true);
    try {
      const response = await fetch('/api/shipping/ups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems, shippingAddress: address }),
      });
      const data = await response.json();
      if (response.ok && data.success && data.rates?.length > 0) {
        setShippingRates(data.rates);
        setShippingSource(data.source || null);
        const first = data.rates[0];
        setSelectedShippingRate(first);
        setShippingCost(first.amount);
        return first.amount;
      }
      setShippingRates([]);
      setShippingSource(null);
      return 0;
    } catch (error) {
      console.error('UPS rate fetch failed:', error);
      return 0;
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  // Kept for Apple/Google Pay shippingaddresschange callback — returns a number.
  const calculateShipping = async (address) => {
    if (!address.city || !address.state || !address.zipCode) {
      setShippingCost(15);
      return 15;
    }
    const rate = await fetchUpsRates(address);
    return rate || 15;
  };

  // UPS street-level address validation
  const validateShippingAddress = async (address) => {
    if (!address.address || !address.city || !address.state || !address.zipCode) {
      setAddressValidation(null);
      return;
    }
    setIsValidatingAddress(true);
    try {
      const res = await fetch('/api/shipping/validate-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          street: address.address,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        }),
      });
      const data = await res.json();
      setAddressValidation(data?.success ? data : null);
    } catch (err) {
      console.error('Address validation failed:', err);
      setAddressValidation(null);
    } finally {
      setIsValidatingAddress(false);
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
  // Ref to prevent recreating paymentRequest on every render
  const paymentRequestRef = useRef(null);
  // Ref to give event handlers access to latest values without re-registering
  const latestRef = useRef({});
  latestRef.current = { cartItems, getCartTotal, clearCart, onSuccess, shippingCost, stripe };

  // Initialize Apple Pay and Google Pay (once)
  const hasItems = cartItems.length > 0;
  useEffect(() => {
    if (!stripe || !hasItems || paymentRequestRef.current) return;

    const subtotal = getCartTotal();

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      disableLink: true,
      total: {
        label: 'NorthWest HazMat',
        amount: Math.round((subtotal + 15) * 100),
      },
      displayItems: [
        {
          label: 'Subtotal',
          amount: Math.round(subtotal * 100),
        },
        {
          label: 'Shipping',
          amount: 1500,
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
      const currentSubtotal = latestRef.current.getCartTotal();
      const address = {
        city: event.shippingAddress.city,
        state: event.shippingAddress.region,
        zipCode: event.shippingAddress.postalCode,
        country: event.shippingAddress.country,
      };

      const newShippingCost = await calculateShipping(address);
      const newTotal = currentSubtotal + newShippingCost;

      event.updateWith({
        status: 'success',
        total: {
          label: 'NorthWest HazMat',
          amount: Math.round(newTotal * 100),
        },
        displayItems: [
          {
            label: 'Subtotal',
            amount: Math.round(currentSubtotal * 100),
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
      const { getCartTotal: getCurrentTotal, shippingCost: currentShipping } = latestRef.current;
      event.updateWith({
        status: 'success',
        total: {
          label: 'NorthWest HazMat',
          amount: Math.round((getCurrentTotal() + currentShipping) * 100),
        },
      });
    });

    // Handle payment method
    pr.on('paymentmethod', async (event) => {
      const {
        cartItems: currentItems,
        getCartTotal: getCurrentTotal,
        clearCart: doClearCart,
        onSuccess: doOnSuccess,
        stripe: currentStripe,
      } = latestRef.current;
      const currentSubtotal = getCurrentTotal();

      try {
        setProcessing(true);

        const shippingAddress = event.shippingAddress;
        const finalShippingCost = await calculateShipping({
          city: shippingAddress.city,
          state: shippingAddress.region,
          zipCode: shippingAddress.postalCode,
        });

        const finalTotal = currentSubtotal + finalShippingCost;

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
              subtotal: currentSubtotal,
              shippingAddress: JSON.stringify(shippingAddress),
              items: JSON.stringify(currentItems.map(item => ({
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
        const { error: confirmError, paymentIntent } = await currentStripe.confirmCardPayment(
          clientSecret,
          { payment_method: event.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          console.error('Payment confirmation failed:', confirmError);
          event.complete('fail');
          setError(confirmError.message);
        } else {
          // Create order record
          try {
            await fetch('/api/orders', {
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
                items: currentItems,
                subtotal: currentSubtotal,
                shippingCost: finalShippingCost,
                total: finalTotal,
                paymentIntentId: paymentIntent.id,
                paymentMethod: 'apple_google_pay',
                paymentStatus: paymentIntent.status,
              }),
            });
          } catch (orderError) {
            console.error('Order creation failed:', orderError);
          }

          track('Purchase', {
            paymentIntentId: paymentIntent.id,
            paymentMethod: 'apple_google_pay',
            itemCount: currentItems.reduce((n, i) => n + (i.quantity || 1), 0),
            subtotal: currentSubtotal,
            shippingCost: finalShippingCost,
            total: finalTotal,
          });
          trackRevenue({ price: finalTotal, revenueType: 'purchase', productId: paymentIntent.id });
          if (event.payerEmail) identifyUser(event.payerEmail);

          event.complete('success');
          doClearCart();
          doOnSuccess();
        }
      } catch (err) {
        console.error('Payment processing error:', err);
        event.complete('fail');
        setError('Payment failed. Please try again.');
      } finally {
        setProcessing(false);
      }
    });

    paymentRequestRef.current = pr;
  }, [stripe, hasItems]);

  // Update payment request amounts when cart or shipping changes
  useEffect(() => {
    if (!paymentRequestRef.current || cartItems.length === 0) return;

    const subtotal = getCartTotal();
    const shipping = shippingCost || 15;

    paymentRequestRef.current.update({
      total: {
        label: 'NorthWest HazMat',
        amount: Math.round((subtotal + shipping) * 100),
      },
      displayItems: [
        { label: 'Subtotal', amount: Math.round(subtotal * 100) },
        { label: 'Shipping', amount: Math.round(shipping * 100) },
      ],
    });
  }, [cartItems, shippingCost]);

  // Update UPS rates + run address validation when address changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUpsRates(customerInfo);
      validateShippingAddress(customerInfo);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [customerInfo.address, customerInfo.city, customerInfo.state, customerInfo.zipCode]);

 

  const validateCustomerInfo = () => {
    const required = [
      ['firstName', 'First name'],
      ['lastName', 'Last name'],
      ['email', 'Email'],
      ['phone', 'Phone number'],
      ['address', 'Address'],
      ['city', 'City'],
      ['state', 'State'],
      ['zipCode', 'ZIP code'],
    ];
    for (const [key, label] of required) {
      if (!customerInfo[key] || !String(customerInfo[key]).trim()) {
        return `${label} is required`;
      }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const validationError = validateCustomerInfo();
    if (validationError) {
      setError(validationError);
      return;
    }

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
        // Payment is already captured at this point. Order persistence is best-effort
        // — never block the success UX or block the user behind a 4xx from /api/orders.
        try {
          const orderResponse = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

          if (!orderResponse.ok) {
            const errBody = await orderResponse.json().catch(() => ({}));
            // Loud log so we can reconcile from Stripe Dashboard using the paymentIntentId.
            console.error(
              `[ORDER PERSIST FAILED] paymentIntent=${paymentIntent.id} status=${orderResponse.status}`,
              errBody
            );
          }
        } catch (orderErr) {
          console.error(
            `[ORDER PERSIST FAILED] paymentIntent=${paymentIntent.id} (network)`,
            orderErr
          );
        }

        track('Purchase', {
          paymentIntentId: paymentIntent.id,
          paymentMethod: 'card',
          itemCount: cartItems.reduce((n, i) => n + (i.quantity || 1), 0),
          subtotal: getCartTotal(),
          shippingCost: shippingCost,
          total: total,
        });
        trackRevenue({ price: total, revenueType: 'purchase', productId: paymentIntent.id });
        if (customerInfo.email) identifyUser(customerInfo.email);

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
        {/* amp-mask: masks PII input text in Amplitude Session Replay */}
        <div className="space-y-4 amp-mask">
          <h3 className="text-xl font-semibold">Delivery</h3>
          
          <select
            name="country"
            autoComplete="country-name"
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="United States"
          >
            <option>United States</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="given-name"
              autoComplete="given-name"
              placeholder="First Name"
              value={customerInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="family-name"
              autoComplete="family-name"
              placeholder="Last Name"
              value={customerInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="text"
            name="organization"
            autoComplete="organization"
            placeholder="Company (Required for business addresses)"
            value={customerInfo.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="address-line1"
            autoComplete="address-line1"
            placeholder="Address"
            value={customerInfo.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="address-line2"
            autoComplete="address-line2"
            placeholder="Apartment, suite, etc. (optional)"
            value={customerInfo.apartment}
            onChange={(e) => handleInputChange('apartment', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="address-level2"
              autoComplete="address-level2"
              placeholder="City"
              value={customerInfo.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="address-level1"
              autoComplete="address-level1"
              value={customerInfo.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Alabama">Alabama</option>
              <option value="Alaska">Alaska</option>
              <option value="Arizona">Arizona</option>
              <option value="Arkansas">Arkansas</option>
              <option value="California">California</option>
              <option value="Colorado">Colorado</option>
              <option value="Connecticut">Connecticut</option>
              <option value="Delaware">Delaware</option>
              <option value="District of Columbia">District of Columbia</option>
              <option value="Florida">Florida</option>
              <option value="Georgia">Georgia</option>
              <option value="Hawaii">Hawaii</option>
              <option value="Idaho">Idaho</option>
              <option value="Illinois">Illinois</option>
              <option value="Indiana">Indiana</option>
              <option value="Iowa">Iowa</option>
              <option value="Kansas">Kansas</option>
              <option value="Kentucky">Kentucky</option>
              <option value="Louisiana">Louisiana</option>
              <option value="Maine">Maine</option>
              <option value="Maryland">Maryland</option>
              <option value="Massachusetts">Massachusetts</option>
              <option value="Michigan">Michigan</option>
              <option value="Minnesota">Minnesota</option>
              <option value="Mississippi">Mississippi</option>
              <option value="Missouri">Missouri</option>
              <option value="Montana">Montana</option>
              <option value="Nebraska">Nebraska</option>
              <option value="Nevada">Nevada</option>
              <option value="New Hampshire">New Hampshire</option>
              <option value="New Jersey">New Jersey</option>
              <option value="New Mexico">New Mexico</option>
              <option value="New York">New York</option>
              <option value="North Carolina">North Carolina</option>
              <option value="North Dakota">North Dakota</option>
              <option value="Ohio">Ohio</option>
              <option value="Oklahoma">Oklahoma</option>
              <option value="Oregon">Oregon</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Rhode Island">Rhode Island</option>
              <option value="South Carolina">South Carolina</option>
              <option value="South Dakota">South Dakota</option>
              <option value="Tennessee">Tennessee</option>
              <option value="Texas">Texas</option>
              <option value="Utah">Utah</option>
              <option value="Vermont">Vermont</option>
              <option value="Virginia">Virginia</option>
              <option value="Washington">Washington</option>
              <option value="West Virginia">West Virginia</option>
              <option value="Wisconsin">Wisconsin</option>
              <option value="Wyoming">Wyoming</option>
            </select>
            <input
              type="text"
              name="postal-code"
              autoComplete="postal-code"
              inputMode="numeric"
              placeholder="Zip Code"
              value={customerInfo.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={customerInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Address validation feedback */}
        {addressValidation && !isValidatingAddress && (
          <div className="text-sm">
            {addressValidation.valid ? (
              <div className="text-green-700 bg-green-50 border border-green-200 rounded p-2">
                Address verified by UPS{addressValidation.classification && addressValidation.classification !== 'unknown' ? ` (${addressValidation.classification})` : ''}.
              </div>
            ) : addressValidation.suggestions?.length > 0 ? (
              <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                <div className="font-semibold mb-1">Did you mean:</div>
                {addressValidation.suggestions.slice(0, 3).map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    className="block text-left underline hover:text-amber-900"
                    onClick={() => {
                      setCustomerInfo(prev => ({
                        ...prev,
                        address: s.street || prev.address,
                        city: s.city || prev.city,
                        zipCode: s.zipCode || prev.zipCode,
                      }));
                    }}
                  >
                    {s.street}, {s.city}, {s.state} {s.zipCode}
                  </button>
                ))}
              </div>
            ) : addressValidation.reason === 'no_candidates' ? (
              <div className="text-red-700 bg-red-50 border border-red-200 rounded p-2">
                UPS could not verify this address. Please double-check.
              </div>
            ) : null}
          </div>
        )}

        {/* Shipping Options */}
        {shippingRates.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Shipping Method</h3>
            {shippingSource === 'flat_tier_fallback' && (
              <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
                Live carrier rates are temporarily unavailable — showing standard rate.
              </div>
            )}
            <div className="space-y-2">
              {shippingRates.map(rate => (
                <label
                  key={rate.id}
                  className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedShippingRate?.id === rate.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShippingRate?.id === rate.id}
                      onChange={() => {
                        setSelectedShippingRate(rate);
                        setShippingCost(rate.amount);
                      }}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <div className="font-semibold">{rate.displayName}</div>
                      {rate.transitDays && (
                        <div className="text-sm text-gray-600">
                          ~{rate.transitDays} business day{rate.transitDays === 1 ? '' : 's'} in transit
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="font-semibold text-lg">
                    ${rate.amount.toFixed(2)}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Credit Card Payment */}
        {/* amp-block: fully omit the card region from Session Replay */}
        <div className="space-y-4 amp-block">
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
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center relative">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
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