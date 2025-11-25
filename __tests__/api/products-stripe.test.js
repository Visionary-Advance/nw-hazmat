// __tests__/api/products-stripe.test.js
import { GET } from '@/app/api/products/stripe/route';
import Stripe from 'stripe';

// Mock Stripe
jest.mock('stripe');

describe('Products Stripe API', () => {
  let mockStripe;
  const originalEnv = process.env.STRIPE_SECRET_KEY;

  beforeEach(() => {
    jest.clearAllMocks();
    mockStripe = {
      products: {
        list: jest.fn(),
      },
      prices: {
        list: jest.fn(),
      },
    };
    Stripe.mockImplementation(() => mockStripe);
  });

  afterEach(() => {
    process.env.STRIPE_SECRET_KEY = originalEnv;
  });

  it('should return 500 if STRIPE_SECRET_KEY is missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Stripe configuration error');
  });

  it('should successfully fetch and transform products', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_123',
          name: 'Test Product',
          description: 'Test description',
          images: ['https://example.com/image.jpg'],
          active: true,
          metadata: { category: 'general' },
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [
        {
          id: 'price_123',
          product: 'prod_123',
          unit_amount: 10000,
          currency: 'usd',
        },
      ],
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.products).toHaveLength(1);
    expect(data.products[0]).toMatchObject({
      id: 'prod_123',
      name: 'Test Product',
      description: 'Test description',
      price: 100,
      currency: 'usd',
      category: 'general',
      slug: 'test-product',
    });
  });

  it('should include slug in product data', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_123',
          name: 'Tank Truck Rollover Simulator',
          active: true,
          metadata: {},
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [
        {
          id: 'price_123',
          product: 'prod_123',
          unit_amount: 812000,
          currency: 'usd',
        },
      ],
    });

    const response = await GET();
    const data = await response.json();

    expect(data.products[0].slug).toBe('tank-truck-rollover-simulator');
  });

  it('should handle Stripe API errors', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockRejectedValue(new Error('Stripe API Error'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Failed to fetch products from Stripe');
  });

  it('should return debug information', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_123',
          name: 'Test Product',
          active: true,
          metadata: {},
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [
        {
          id: 'price_123',
          product: 'prod_123',
          unit_amount: 10000,
          currency: 'usd',
        },
      ],
    });

    const response = await GET();
    const data = await response.json();

    expect(data.debug).toBeDefined();
    expect(data.debug.totalProducts).toBe(1);
    expect(data.debug.totalPrices).toBe(1);
    expect(data.debug.stripeKeyPresent).toBe(true);
  });

  it('should handle products with no prices', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_123',
          name: 'No Price Product',
          active: true,
          metadata: {},
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [],
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.products[0].price).toBe(0);
    expect(data.products[0].currency).toBe('usd');
  });

  it('should correctly calculate inStock status', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_in_stock',
          name: 'In Stock',
          active: true,
          metadata: {},
        },
        {
          id: 'prod_out_of_stock',
          name: 'Out of Stock',
          active: true,
          metadata: { stock: '0' },
        },
        {
          id: 'prod_inactive',
          name: 'Inactive',
          active: false,
          metadata: {},
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [
        {
          id: 'price_1',
          product: 'prod_in_stock',
          unit_amount: 10000,
          currency: 'usd',
        },
        {
          id: 'price_2',
          product: 'prod_out_of_stock',
          unit_amount: 10000,
          currency: 'usd',
        },
        {
          id: 'price_3',
          product: 'prod_inactive',
          unit_amount: 10000,
          currency: 'usd',
        },
      ],
    });

    const response = await GET();
    const data = await response.json();

    expect(data.products[0].inStock).toBe(true);
    expect(data.products[1].inStock).toBe(false);
    expect(data.products[2].inStock).toBe(false);
  });

  it('should parse metadata correctly', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_123';

    mockStripe.products.list.mockResolvedValue({
      data: [
        {
          id: 'prod_123',
          name: 'Product With Metadata',
          active: true,
          metadata: {
            category: 'safety',
            inventory: '10',
            weight: '5.5',
          },
        },
      ],
    });

    mockStripe.prices.list.mockResolvedValue({
      data: [
        {
          id: 'price_123',
          product: 'prod_123',
          unit_amount: 10000,
          currency: 'usd',
        },
      ],
    });

    const response = await GET();
    const data = await response.json();

    expect(data.products[0].category).toBe('safety');
    expect(data.products[0].inventory).toBe(10);
    expect(data.products[0].weight).toBe(5.5);
  });
});
