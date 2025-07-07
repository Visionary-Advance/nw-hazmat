'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, Lock, ShoppingCart, Minus, Plus } from 'lucide-react';

export default function Checkout() {
  const [cartItems] = useState([
    {
      id: '1',
      name: 'Name of Product',
      size: 'Size of Product',
      price: 1250,
      quantity: 1,
      image: '',
    },
  ]);

  const [formData, setFormData] = useState({
    country: 'United States',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Oregon',
    zipCode: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    nameOnCard: '',
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    // In a real app, this would update the cart state
    console.log(`Update item ${id} to quantity ${newQuantity}`);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 100;
  const total = subtotal + shipping;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Express Checkout */}
            <div className="mb-8">
              <h2 className="font-bold text-3xl md:text-4xl text-black mb-6">
                Express Checkout
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/89fc31dd35c073482d71f3eb9000e20a81ee46b0?width=524"
                  alt="Shop Pay"
                  className="h-12 w-auto flex-1"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/adc11a42e9b6c66851ed58acacaabe6bd8e44ba6?width=558"
                  alt="Apple Pay"
                  className="h-12 w-auto flex-1"
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cb08ce8bf0eb1b53e04bd6f7db85386e7d8eaa2?width=413"
                  alt="PayPal"
                  className="h-12 w-auto flex-1"
                />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-xl text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="mb-8">
              <h3 className="font-bold text-2xl md:text-3xl text-black mb-6">
                Delivery
              </h3>

              <div className="space-y-4">
                {/* Country */}
                <div className="relative">
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <ArrowDown className="absolute right-3 top-1/2 transform -rotate-90 -translate-y-1/2 w-5 h-5" />
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                </div>

                {/* Company */}
                <input
                  type="text"
                  placeholder="Company(Required for business addresses)"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                />

                {/* Address */}
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                />

                {/* Apartment */}
                <input
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                />

                {/* City, State, Zip Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <ArrowDown className="absolute right-3 top-1/2 transform -rotate-90 -translate-y-1/2 w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                </div>
              </div>
            </div>

            {/* Credit Card Payment */}
            <div className="mb-8">
              <h3 className="font-bold text-2xl md:text-3xl text-black mb-6">
                Credit Card Payment
              </h3>

              <div className="space-y-4">
                {/* Card Number */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40 pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                </div>

                {/* Expiration and Security Code Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expiration Date (MM/YY)"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                  <input
                    type="text"
                    placeholder="Security Code"
                    value={formData.securityCode}
                    onChange={(e) => handleInputChange('securityCode', e.target.value)}
                    className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                  />
                </div>

                {/* Name on Card */}
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={formData.nameOnCard}
                  onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                  className="w-full h-14 px-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 placeholder:opacity-40"
                />
              </div>
            </div>

            {/* Pay Now Button */}
            <button className="w-full h-14 bg-black hover:bg-gray-800 text-white font-bold text-xl rounded-md transition-colors">
              Pay Now
            </button>
          </div>

          {/* Cart Summary */}
          <div className="w-full xl:w-96">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Cart Header */}
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="w-8 h-8" />
                <h2 className="font-bold text-2xl">Cart (1)</h2>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="border border-gray-300 rounded-lg p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0"></div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-black">
                          {item.name}
                        </h3>
                        <p className="text-lg text-gray-400 mb-2">
                          {item.size}
                        </p>
                        <p className="font-bold text-xl text-black">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-10 w-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-100 rounded"
                        >
                          <Minus className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-2xl w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-10 w-10 flex items-center justify-center text-2xl font-bold hover:bg-gray-100 rounded"
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-2xl text-gray-400">
                    Subtotal:
                  </span>
                  <span className="font-bold text-2xl text-gray-400">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-2xl text-gray-400">
                    Shipping:
                  </span>
                  <span className="font-bold text-2xl text-gray-400">
                    ${shipping}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-bold text-3xl text-black">
                    Total:
                  </span>
                  <span className="font-bold text-3xl text-black">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="mt-8">
          <Link href="/">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-8 py-3 rounded-2xl transition-colors">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}