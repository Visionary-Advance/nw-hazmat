/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CheckoutModal from '@/Components/CheckoutModal';

// Mock loadStripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(() => Promise.resolve({})),
}));

// Mock Elements provider and CheckoutForm
jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }) => <div data-testid="stripe-elements">{children}</div>,
}));

jest.mock('@/Components/CheckoutForm', () => {
  return function MockCheckoutForm({ onSuccess }) {
    return (
      <div data-testid="checkout-form">
        <button data-testid="trigger-success" onClick={onSuccess}>
          Simulate Success
        </button>
      </div>
    );
  };
});

// Mock lucide-react
jest.mock('lucide-react', () => ({
  CheckCircle: (props) => <svg data-testid="check-circle" {...props} />,
  ArrowLeft: (props) => <svg data-testid="arrow-left" {...props} />,
}));

describe('CheckoutModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render checkout form inside Stripe Elements', () => {
    render(<CheckoutModal onClose={mockOnClose} />);

    expect(screen.getByTestId('stripe-elements')).toBeInTheDocument();
    expect(screen.getByTestId('checkout-form')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should show Go Back button that calls onClose', async () => {
    const user = userEvent.setup();
    render(<CheckoutModal onClose={mockOnClose} />);

    const goBackButton = screen.getByText('Go Back');
    await user.click(goBackButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show close button that calls onClose', async () => {
    const user = userEvent.setup();
    render(<CheckoutModal onClose={mockOnClose} />);

    // The ✕ button
    const closeButtons = screen.getAllByRole('button');
    const closeButton = closeButtons.find(btn => btn.textContent === '✕');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show order complete screen after successful payment', async () => {
    const user = userEvent.setup();
    render(<CheckoutModal onClose={mockOnClose} />);

    // Trigger successful payment
    await user.click(screen.getByTestId('trigger-success'));

    expect(screen.getByText('Order Complete!')).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your purchase/)).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('should call onClose when Continue Shopping is clicked after order complete', async () => {
    const user = userEvent.setup();
    render(<CheckoutModal onClose={mockOnClose} />);

    // Trigger success
    await user.click(screen.getByTestId('trigger-success'));

    // Click continue shopping
    await user.click(screen.getByText('Continue Shopping'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should hide checkout form after successful order', async () => {
    const user = userEvent.setup();
    render(<CheckoutModal onClose={mockOnClose} />);

    await user.click(screen.getByTestId('trigger-success'));

    expect(screen.queryByTestId('checkout-form')).not.toBeInTheDocument();
    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
  });
});
