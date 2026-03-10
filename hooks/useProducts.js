'use client';

import { useState, useEffect } from 'react';

export function useProducts(initialProducts = []) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const fetchProducts = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);

      const response = await fetch('/api/products/stripe', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse.substring(0, 200));
        throw new Error('Server returned non-JSON response. Check your API route.');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setProducts(data.products || []);
        setDebugInfo(data.debug);
      } else {
        throw new Error(data.error || 'Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);

      if (err.message.includes('Unexpected token')) {
        setError('API route is returning HTML instead of JSON. Check your Stripe configuration and API route.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialProducts.length > 0) {
      // Already have server data — fetch silently in background to refresh
      fetchProducts(false);
    } else {
      fetchProducts(true);
    }
  }, []);

  const getProductsByCategory = (category) => {
    return products.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  return {
    products,
    loading,
    error,
    debugInfo,
    getProductsByCategory,
    getProductById,
    refreshProducts
  };
}
