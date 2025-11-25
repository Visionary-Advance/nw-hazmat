// __tests__/lib/slug-generation.test.js
/**
 * Tests for slug generation functionality
 * These tests verify that product slugs are created correctly and consistently
 */

import { createSlug } from '@/lib/getProducts';
import { createProductSlug } from '@/Components/ProductLink';

describe('Slug Generation Consistency', () => {
  // Test data matching real Stripe products
  const testProducts = [
    { name: 'Tank Truck Rollover Simulator', expectedSlug: 'tank-truck-rollover-simulator' },
    { name: 'Tank Truck Accessory Pack', expectedSlug: 'tank-truck-accessory-pack' },
    { name: 'Basic Hot Tap Rollover Kit', expectedSlug: 'basic-hot-tap-rollover-kit' },
    { name: 'Deluxe Hot Tap Rollover Kit', expectedSlug: 'deluxe-hot-tap-rollover-kit' },
    { name: 'Pop-Up Pool - Catch Basin 100 Gallon', expectedSlug: 'pop-up-pool-catch-basin-100-gallon' },
    { name: 'Storm Drain Filter', expectedSlug: 'storm-drain-filter' },
    { name: 'Spill Responder Kit Bags', expectedSlug: 'spill-responder-kit-bags' },
    { name: "Plug N' Dike", expectedSlug: 'plug-n-dike' },
    { name: '5 Gallon Spill Kit Bucket', expectedSlug: '5-gallon-spill-kit-bucket' },
    { name: '2178 Clamps', expectedSlug: '2178-clamps' },
  ];

  describe('Server-side slug generation (lib/getProducts)', () => {
    testProducts.forEach(({ name, expectedSlug }) => {
      it(`should create correct slug for "${name}"`, () => {
        expect(createSlug(name)).toBe(expectedSlug);
      });
    });
  });

  describe('Client-side slug generation (Components/ProductLink)', () => {
    testProducts.forEach(({ name, expectedSlug }) => {
      it(`should create correct slug for "${name}"`, () => {
        expect(createProductSlug(name)).toBe(expectedSlug);
      });
    });
  });

  describe('Consistency between server and client slug generation', () => {
    testProducts.forEach(({ name }) => {
      it(`should generate the same slug for "${name}" on both server and client`, () => {
        const serverSlug = createSlug(name);
        const clientSlug = createProductSlug(name);
        expect(serverSlug).toBe(clientSlug);
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string', () => {
      expect(createSlug('')).toBe('');
      expect(createProductSlug('')).toBe('');
    });

    it('should handle single word', () => {
      expect(createSlug('Product')).toBe('product');
      expect(createProductSlug('Product')).toBe('product');
    });

    it('should handle numbers only', () => {
      expect(createSlug('123')).toBe('123');
      expect(createProductSlug('123')).toBe('123');
    });

    it('should handle special characters', () => {
      expect(createSlug('Product@#$%Name')).toBe('product-name');
      expect(createProductSlug('Product@#$%Name')).toBe('product-name');
    });

    it('should handle multiple consecutive spaces', () => {
      expect(createSlug('Product    Name')).toBe('product-name');
      expect(createProductSlug('Product    Name')).toBe('product-name');
    });

    it('should handle leading/trailing spaces', () => {
      expect(createSlug('  Product Name  ')).toBe('product-name');
      expect(createProductSlug('  Product Name  ')).toBe('product-name');
    });

    it('should handle multiple consecutive hyphens', () => {
      expect(createSlug('Product---Name')).toBe('product-name');
      expect(createProductSlug('Product---Name')).toBe('product-name');
    });

    it('should handle unicode characters', () => {
      expect(createSlug('Product™ Name®')).toBe('product-name');
      expect(createProductSlug('Product™ Name®')).toBe('product-name');
    });
  });

  describe('URL safety', () => {
    it('should create URL-safe slugs', () => {
      const unsafeNames = [
        'Product/Name',
        'Product\\Name',
        'Product?Name',
        'Product&Name',
        'Product=Name',
        'Product Name',
      ];

      unsafeNames.forEach(name => {
        const slug = createSlug(name);
        expect(slug).toMatch(/^[a-z0-9-]*$/);
        expect(slug).not.toContain('/');
        expect(slug).not.toContain('\\');
        expect(slug).not.toContain('?');
        expect(slug).not.toContain('&');
        expect(slug).not.toContain('=');
        expect(slug).not.toContain(' ');
      });
    });

    it('should not start or end with hyphen', () => {
      const names = [
        '-Product Name',
        'Product Name-',
        '--Product Name--',
      ];

      names.forEach(name => {
        const slug = createSlug(name);
        expect(slug).not.toMatch(/^-/);
        expect(slug).not.toMatch(/-$/);
      });
    });

    it('should not have consecutive hyphens', () => {
      const slug = createSlug('Product--Name--Test');
      expect(slug).not.toMatch(/--/);
      expect(slug).toBe('product-name-test');
    });
  });
});
