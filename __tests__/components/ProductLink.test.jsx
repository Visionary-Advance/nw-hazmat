/**
 * @jest-environment jsdom
 */
// __tests__/components/ProductLink.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductLink, { createProductSlug, getProductUrl } from '@/Components/ProductLink';

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('ProductLink Component', () => {
  describe('createProductSlug', () => {
    it('should create URL-friendly slug', () => {
      expect(createProductSlug('Tank Truck Rollover Simulator')).toBe('tank-truck-rollover-simulator');
    });

    it('should handle special characters', () => {
      expect(createProductSlug("Plug N' Dike")).toBe('plug-n-dike');
    });

    it('should handle numbers', () => {
      expect(createProductSlug('5 Gallon Spill Kit Bucket')).toBe('5-gallon-spill-kit-bucket');
    });
  });

  describe('ProductLink rendering', () => {
    it('should render with product name', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
      };

      render(
        <ProductLink product={product}>
          <div>Product Content</div>
        </ProductLink>
      );

      expect(screen.getByText('Product Content')).toBeInTheDocument();
    });

    it('should use pre-computed slug if available', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
        slug: 'custom-slug',
      };

      render(
        <ProductLink product={product}>
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('href', '/shop/custom-slug');
    });

    it('should generate slug from name if slug not provided', () => {
      const product = {
        id: 'prod_123',
        name: 'Tank Truck Rollover Simulator',
      };

      render(
        <ProductLink product={product}>
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('href', '/shop/tank-truck-rollover-simulator');
    });

    it('should pass through className', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
      };

      render(
        <ProductLink product={product} className="custom-class">
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveClass('custom-class');
    });

    it('should pass through additional props', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
      };

      render(
        <ProductLink product={product} data-testid="product-link" aria-label="View Product">
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('data-testid', 'product-link');
      expect(link).toHaveAttribute('aria-label', 'View Product');
    });
  });

  describe('getProductUrl', () => {
    it('should return correct URL with pre-computed slug', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
        slug: 'custom-slug',
      };

      expect(getProductUrl(product)).toBe('/shop/custom-slug');
    });

    it('should return correct URL with generated slug', () => {
      const product = {
        id: 'prod_123',
        name: 'Test Product',
      };

      expect(getProductUrl(product)).toBe('/shop/test-product');
    });
  });

  describe('Edge cases', () => {
    it('should handle product names with multiple spaces and hyphens', () => {
      const product = {
        id: 'prod_123',
        name: 'Pop-Up Pool - Catch Basin 100 Gallon',
      };

      render(
        <ProductLink product={product}>
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('href', '/shop/pop-up-pool-catch-basin-100-gallon');
    });

    it('should handle product names with apostrophes', () => {
      const product = {
        id: 'prod_123',
        name: "Plug N' Dike",
      };

      render(
        <ProductLink product={product}>
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('href', '/shop/plug-n-dike');
    });

    it('should handle product names starting with numbers', () => {
      const product = {
        id: 'prod_123',
        name: '2178 Clamps',
      };

      render(
        <ProductLink product={product}>
          <div>Link Text</div>
        </ProductLink>
      );

      const link = screen.getByText('Link Text').closest('a');
      expect(link).toHaveAttribute('href', '/shop/2178-clamps');
    });
  });
});
