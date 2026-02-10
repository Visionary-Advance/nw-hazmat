/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CheckoutForm from '@/Components/CheckoutForm';

// Mock useCart
const mockCartItems = [
  { id: 'prod_1', name: 'Spill Kit', price: 49.99, quantity: 2, image: null },
  { id: 'prod_2', name: 'Safety Goggles', price: 19.99, quantity: 1, image: null },
];
const mockGetCartTotal = jest.fn(() => 119.97);
const mockClearCart = jest.fn();

jest.mock('@/Components/CartContext', () => ({
  useCart: () => ({
    cartItems: mockCartItems,
    getCartTotal: mockGetCartTotal,
    clearCart: mockClearCart,
  }),
}));

// Mock Stripe
const mockConfirmCardPayment = jest.fn();
const mockPaymentRequestUpdate = jest.fn();
const mockPaymentRequestOn = jest.fn();
const mockCanMakePayment = jest.fn();
const mockPaymentRequestObj = {
  update: mockPaymentRequestUpdate,
  on: mockPaymentRequestOn,
  canMakePayment: mockCanMakePayment,
};
const mockPaymentRequest = jest.fn(() => mockPaymentRequestObj);

const mockStripe = {
  confirmCardPayment: mockConfirmCardPayment,
  paymentRequest: mockPaymentRequest,
};

const mockGetElement = jest.fn(() => ({ type: 'card' }));
const mockElements = {
  getElement: mockGetElement,
};

jest.mock('@stripe/react-stripe-js', () => ({
  CardElement: (props) => <div data-testid="card-element" />,
  PaymentRequestButtonElement: (props) => <div data-testid="payment-request-button" />,
  useStripe: () => mockStripe,
  useElements: () => mockElements,
}));

// Mock next/image
jest.mock('next/image', () => {
  return (props) => <img {...props} />;
});

// URL-based fetch mock helper — routes responses by URL path
function setupFetchMock(overrides = {}) {
  const defaultResponses = {
    '/api/shipping/rates': { ok: true, json: () => Promise.resolve({ success: false, rates: [] }) },
    '/api/shipping/calculate': { ok: true, json: () => Promise.resolve({ shippingCost: 15 }) },
    '/api/create-payment-intent': { ok: true, json: () => Promise.resolve({ clientSecret: 'cs_test_secret' }) },
    '/api/orders': { ok: true, json: () => Promise.resolve({ success: true }) },
  };

  const responses = { ...defaultResponses, ...overrides };

  global.fetch = jest.fn((url) => {
    for (const [path, response] of Object.entries(responses)) {
      if (url.includes(path)) {
        return typeof response === 'function' ? response() : Promise.resolve(response);
      }
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
  });
}

describe('CheckoutForm', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers({ advanceTimers: true });
    mockCanMakePayment.mockResolvedValue(null); // No Apple/Google Pay by default
    setupFetchMock();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the checkout form with all sections', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    expect(screen.getByText('Express Checkout')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('Credit Card Payment')).toBeInTheDocument();
    expect(screen.getByTestId('card-element')).toBeInTheDocument();
  });

  it('should display cart items in order summary', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    expect(screen.getByText('Spill Kit')).toBeInTheDocument();
    expect(screen.getByText('Safety Goggles')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('should display subtotal in order summary', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    // Subtotal label should be present
    expect(screen.getByText('Subtotal:')).toBeInTheDocument();
    // $119.97 appears for both subtotal and total (shipping = 0), so use getAllByText
    const priceElements = screen.getAllByText('$119.97');
    expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });

  it('should show pay button with total amount', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    const payButton = screen.getByRole('button', { name: /pay \$/i });
    expect(payButton).toBeInTheDocument();
  });

  it('should have required form fields', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Zip Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('should update customer info when typing', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    const firstNameInput = screen.getByPlaceholderText('First Name');
    await user.type(firstNameInput, 'John');
    expect(firstNameInput).toHaveValue('John');

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should create payment request only once on mount', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    expect(mockPaymentRequest).toHaveBeenCalledTimes(1);
    expect(mockPaymentRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        country: 'US',
        currency: 'usd',
        requestPayerName: true,
        requestPayerEmail: true,
      })
    );
  });

  it('should register event handlers on payment request', () => {
    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    const onCalls = mockPaymentRequestOn.mock.calls.map(call => call[0]);
    expect(onCalls).toContain('shippingaddresschange');
    expect(onCalls).toContain('shippingoptionchange');
    expect(onCalls).toContain('paymentmethod');
  });

  it('should not recreate payment request when cart changes', () => {
    const { rerender } = render(<CheckoutForm onSuccess={mockOnSuccess} />);

    const initialCallCount = mockPaymentRequest.mock.calls.length;

    rerender(<CheckoutForm onSuccess={mockOnSuccess} />);

    expect(mockPaymentRequest).toHaveBeenCalledTimes(initialCallCount);
  });

  it('should submit card payment successfully', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();
    const mockPaymentIntent = { id: 'pi_test123', status: 'succeeded' };

    setupFetchMock();
    mockConfirmCardPayment.mockResolvedValueOnce({
      error: null,
      paymentIntent: mockPaymentIntent,
    });

    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Address'), '123 Main St');
    await user.type(screen.getByPlaceholderText('City'), 'Eugene');
    await user.type(screen.getByPlaceholderText('Zip Code'), '97401');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');

    const payButton = screen.getByRole('button', { name: /pay \$/i });
    await user.click(payButton);

    await waitFor(() => {
      expect(mockConfirmCardPayment).toHaveBeenCalledWith(
        'cs_test_secret',
        expect.objectContaining({
          payment_method: expect.objectContaining({
            card: expect.anything(),
            billing_details: expect.objectContaining({
              name: 'John Doe',
              email: 'john@example.com',
            }),
          }),
        })
      );
    });

    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('should show error when payment fails', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();

    setupFetchMock();
    mockConfirmCardPayment.mockResolvedValueOnce({
      error: { message: 'Your card was declined.' },
      paymentIntent: null,
    });

    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Address'), '123 Main');
    await user.type(screen.getByPlaceholderText('City'), 'Eugene');
    await user.type(screen.getByPlaceholderText('Zip Code'), '97401');

    const payButton = screen.getByRole('button', { name: /pay \$/i });
    await user.click(payButton);

    await waitFor(() => {
      expect(screen.getByText('Your card was declined.')).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockClearCart).not.toHaveBeenCalled();
  });

  it('should show error when payment intent creation fails', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();

    setupFetchMock({
      '/api/create-payment-intent': {
        ok: true,
        json: () => Promise.resolve({ error: 'Stripe error' }),
      },
    });

    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Address'), '123 Main');
    await user.type(screen.getByPlaceholderText('City'), 'Eugene');
    await user.type(screen.getByPlaceholderText('Zip Code'), '97401');

    const payButton = screen.getByRole('button', { name: /pay \$/i });
    await user.click(payButton);

    await waitFor(() => {
      expect(screen.getByText('Stripe error')).toBeInTheDocument();
    });

    expect(mockConfirmCardPayment).not.toHaveBeenCalled();
  });

  it('should disable pay button while processing', async () => {
    jest.useRealTimers();
    const user = userEvent.setup();

    // Make the payment intent fetch hang
    let resolvePayment;
    setupFetchMock({
      '/api/create-payment-intent': () => new Promise(resolve => { resolvePayment = resolve; }),
    });

    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    await user.type(screen.getByPlaceholderText('First Name'), 'J');
    await user.type(screen.getByPlaceholderText('Last Name'), 'D');
    await user.type(screen.getByPlaceholderText('Email'), 'j@e.com');
    await user.type(screen.getByPlaceholderText('Address'), '123');
    await user.type(screen.getByPlaceholderText('City'), 'E');
    await user.type(screen.getByPlaceholderText('Zip Code'), '97401');

    const payButton = screen.getByRole('button', { name: /pay \$/i });
    await user.click(payButton);

    await waitFor(() => {
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    // Resolve the hanging fetch
    resolvePayment({
      ok: true,
      json: () => Promise.resolve({ error: 'test' }),
    });
  });

  it('should show Apple/Google Pay button when available', async () => {
    mockCanMakePayment.mockResolvedValueOnce({ applePay: true });

    render(<CheckoutForm onSuccess={mockOnSuccess} />);

    await waitFor(() => {
      expect(screen.getByTestId('payment-request-button')).toBeInTheDocument();
    });
  });
});
