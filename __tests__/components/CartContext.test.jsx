/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '@/Components/CartContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockProduct = {
  id: 'prod_test1',
  name: 'Test Spill Kit',
  price: 49.99,
};

const mockProduct2 = {
  id: 'prod_test2',
  name: 'Safety Goggles',
  price: 19.99,
};

// Helper component to expose cart actions for testing
function CartTestHarness() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    clearCart,
  } = useCart();

  return (
    <div>
      <div data-testid="cart-count">{getCartItemCount()}</div>
      <div data-testid="cart-total">{getCartTotal().toFixed(2)}</div>
      <div data-testid="cart-items">{JSON.stringify(cartItems)}</div>
      <button data-testid="add-product1" onClick={() => addToCart(mockProduct)}>Add Product 1</button>
      <button data-testid="add-product2" onClick={() => addToCart(mockProduct2)}>Add Product 2</button>
      <button data-testid="remove-product1" onClick={() => removeFromCart('prod_test1')}>Remove Product 1</button>
      <button data-testid="update-qty-3" onClick={() => updateQuantity('prod_test1', 3)}>Set Qty 3</button>
      <button data-testid="update-qty-0" onClick={() => updateQuantity('prod_test1', 0)}>Set Qty 0</button>
      <button data-testid="clear-cart" onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it('should start with an empty cart', () => {
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00');
  });

  it('should add a product to the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('49.99');
  });

  it('should increment quantity when adding same product twice', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('add-product1'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('99.98');
  });

  it('should handle multiple different products', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('add-product2'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('69.98');
  });

  it('should remove a product from the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('add-product2'));
    await user.click(screen.getByTestId('remove-product1'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('19.99');
  });

  it('should update quantity of a product', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('update-qty-3'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('149.97');
  });

  it('should remove product when quantity set to 0', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('update-qty-0'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00');
  });

  it('should clear the entire cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));
    await user.click(screen.getByTestId('add-product2'));
    await user.click(screen.getByTestId('clear-cart'));

    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0.00');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('nwhazmat_cart');
  });

  it('should save cart to localStorage when items change', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'nwhazmat_cart',
      expect.stringContaining('prod_test1')
    );
  });

  it('should load cart from localStorage on mount', () => {
    const savedCart = JSON.stringify([{ ...mockProduct, quantity: 2 }]);
    localStorageMock.getItem.mockReturnValueOnce(savedCart);

    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    expect(localStorageMock.getItem).toHaveBeenCalledWith('nwhazmat_cart');
  });

  it('should not log to console when saving cart', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const user = userEvent.setup();

    render(
      <CartProvider>
        <CartTestHarness />
      </CartProvider>
    );

    await user.click(screen.getByTestId('add-product1'));

    const cartLogCalls = consoleSpy.mock.calls.filter(
      call => typeof call[0] === 'string' && call[0].includes('Cart saved')
    );
    expect(cartLogCalls).toHaveLength(0);

    consoleSpy.mockRestore();
  });

  it('should throw error when useCart is used outside CartProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    function BadComponent() {
      useCart();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow(
      'useCart must be used within a CartProvider'
    );

    consoleSpy.mockRestore();
  });
});
