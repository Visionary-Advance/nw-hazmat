// __tests__/lib/getProducts.test.js
import { createSlug, getAllProducts, getProductBySlug } from '@/lib/getProducts';
import Stripe from 'stripe';

// Mock Stripe
jest.mock('stripe');

describe('getProducts utilities', () => {
  describe('createSlug', () => {
    it('should create a URL-friendly slug from a product name', () => {
      expect(createSlug('Tank Truck Rollover Simulator')).toBe('tank-truck-rollover-simulator');
    });

    it('should handle special characters', () => {
      expect(createSlug('Plug N\' Dike')).toBe('plug-n-dike');
    });

    it('should handle multiple spaces', () => {
      expect(createSlug('Pop-Up Pool - Catch Basin 100 Gallon')).toBe('pop-up-pool-catch-basin-100-gallon');
    });

    it('should handle uppercase letters', () => {
      expect(createSlug('EMERGENCY KIT')).toBe('emergency-kit');
    });

    it('should remove leading/trailing hyphens', () => {
      expect(createSlug('--Product Name--')).toBe('product-name');
    });

    it('should replace multiple hyphens with single hyphen', () => {
      expect(createSlug('Product---Name')).toBe('product-name');
    });

    it('should handle numbers', () => {
      expect(createSlug('5 Gallon Spill Kit Bucket')).toBe('5-gallon-spill-kit-bucket');
      expect(createSlug('2178 Clamps')).toBe('2178-clamps');
    });

    it('should handle empty string', () => {
      expect(createSlug('')).toBe('');
    });
  });

  describe('getAllProducts', () => {
    let mockStripe;
    const originalEnv = process.env.STRIPE_SECRET_KEY;

    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules(); // Reset module cache to ensure fresh imports
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

    it('should fetch and transform products from Stripe', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Test Product',
            description: 'Test description',
            images: ['https://example.com/image.jpg'],
            active: true,
            metadata: { category: 'general', stock: '10' },
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

      const products = await getAllProducts();

      expect(products).toHaveLength(1);
      expect(products[0]).toMatchObject({
        id: 'prod_123',
        name: 'Test Product',
        description: 'Test description',
        slug: 'test-product',
        price: 100,
        currency: 'usd',
        category: 'general',
        inStock: true,
      });
    });

    it('should return empty array when STRIPE_SECRET_KEY is missing', async () => {
      delete process.env.STRIPE_SECRET_KEY;

      const products = await getAllProducts();

      expect(products).toEqual([]);
      expect(mockStripe.products.list).not.toHaveBeenCalled();
    });

    it('should handle products with no images', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Test Product',
            images: [],
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

      const products = await getAllProducts();

      expect(products[0].images).toEqual([]);
      expect(products[0].image).toBeNull();
    });

    it('should mark products as out of stock when metadata.stock is "0"', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Out of Stock Product',
            active: true,
            metadata: { stock: '0' },
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

      const products = await getAllProducts();

      expect(products[0].inStock).toBe(false);
    });

    it('should handle errors gracefully', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockRejectedValue(new Error('API Error'));

      const products = await getAllProducts();

      expect(products).toEqual([]);
    });

    it('should parse inventory metadata', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Limited Stock Product',
            active: true,
            metadata: { inventory: '5' },
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

      const products = await getAllProducts();

      expect(products[0].inventory).toBe(5);
    });

    it('should handle products with multiple prices', async () => {
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';

      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Multi-Price Product',
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
          {
            id: 'price_456',
            product: 'prod_123',
            unit_amount: 20000,
            currency: 'usd',
          },
        ],
      });

      const products = await getAllProducts();

      expect(products[0].prices).toHaveLength(2);
      expect(products[0].price).toBe(100); // Should use first price
    });
  });

  describe('getProductBySlug', () => {
    let mockStripe;

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
      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
    });

    it('should find a product by slug', async () => {
      mockStripe.products.list.mockResolvedValue({
        data: [
          {
            id: 'prod_123',
            name: 'Tank Truck Rollover Simulator',
            active: true,
            metadata: {},
          },
          {
            id: 'prod_456',
            name: 'Basic Hot Tap Rollover Kit',
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
          {
            id: 'price_456',
            product: 'prod_456',
            unit_amount: 107500,
            currency: 'usd',
          },
        ],
      });

      const product = await getProductBySlug('tank-truck-rollover-simulator');

      expect(product).toBeDefined();
      expect(product.name).toBe('Tank Truck Rollover Simulator');
      expect(product.slug).toBe('tank-truck-rollover-simulator');
    });

    it('should return undefined for non-existent slug', async () => {
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

      const product = await getProductBySlug('non-existent-product');

      expect(product).toBeUndefined();
    });
  });
});
