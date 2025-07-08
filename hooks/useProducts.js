'use client';

import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching products from API...');

      const response = await fetch('/api/products/stripe', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if the response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse.substring(0, 200));
        throw new Error('Server returned non-JSON response. Check your API route.');
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      if (data.success) {
        setProducts(data.products || []);
        setDebugInfo(data.debug);
        console.log('Products loaded successfully:', data.products?.length || 0);
      } else {
        throw new Error(data.error || 'Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
      
      // If it's a JSON parsing error, provide more specific guidance
      if (err.message.includes('Unexpected token')) {
        setError('API route is returning HTML instead of JSON. Check your Stripe configuration and API route.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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