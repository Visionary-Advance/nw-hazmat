// __tests__/api/create-payment-intent.test.js
import { POST } from '@/app/api/create-payment-intent/route';

// Mock Stripe
const mockCreate = jest.fn();
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: mockCreate,
    },
  }));
});

// Set env
process.env.STRIPE_SECRET_KEY = 'sk_test_fake_key';

function makeRequest(body) {
  return {
    json: () => Promise.resolve(body),
  };
}

describe('POST /api/create-payment-intent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a payment intent with correct amount in cents', async () => {
    mockCreate.mockResolvedValueOnce({
      id: 'pi_test123',
      client_secret: 'cs_test_secret',
    });

    const req = makeRequest({
      amount: 49.99,
      currency: 'usd',
    });

    const response = await POST(req);
    const data = await response.json();

    expect(data.clientSecret).toBe('cs_test_secret');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 4999, // $49.99 -> 4999 cents
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      })
    );
  });

  it('should handle metadata in payment intent', async () => {
    mockCreate.mockResolvedValueOnce({
      id: 'pi_test456',
      client_secret: 'cs_test_meta',
    });

    const metadata = {
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      orderSource: 'card_payment',
      shippingCost: 15,
      subtotal: 49.99,
    };

    const req = makeRequest({
      amount: 64.99,
      currency: 'usd',
      metadata,
    });

    const response = await POST(req);
    const data = await response.json();

    expect(data.clientSecret).toBe('cs_test_meta');
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata,
      })
    );
  });

  it('should reject invalid amount (zero)', async () => {
    const req = makeRequest({ amount: 0, currency: 'usd' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('should reject invalid amount (negative)', async () => {
    const req = makeRequest({ amount: -10, currency: 'usd' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('should reject invalid amount (NaN)', async () => {
    const req = makeRequest({ amount: 'not_a_number', currency: 'usd' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('should reject missing amount', async () => {
    const req = makeRequest({ currency: 'usd' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('should default to usd currency when not specified', async () => {
    mockCreate.mockResolvedValueOnce({
      id: 'pi_test789',
      client_secret: 'cs_test_default',
    });

    const req = makeRequest({ amount: 25.00 });
    await POST(req);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        currency: 'usd',
      })
    );
  });

  it('should correctly round amounts to avoid floating point issues', async () => {
    mockCreate.mockResolvedValueOnce({
      id: 'pi_round',
      client_secret: 'cs_test_round',
    });

    // 119.97 * 100 could produce floating point issues without Math.round
    const req = makeRequest({ amount: 119.97, currency: 'usd' });
    await POST(req);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 11997,
      })
    );
  });

  it('should return 500 on Stripe API error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockCreate.mockRejectedValueOnce(new Error('Stripe rate limit'));

    const req = makeRequest({ amount: 49.99, currency: 'usd' });
    const response = await POST(req);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Stripe error');

    consoleSpy.mockRestore();
  });
});
