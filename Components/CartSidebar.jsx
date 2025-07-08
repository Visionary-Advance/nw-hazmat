'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from './CartContext';
import CheckoutModal from './CheckoutModal';

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="border rounded-lg p-3">
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <p className="text-right font-semibold mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
            </div>
            
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
}