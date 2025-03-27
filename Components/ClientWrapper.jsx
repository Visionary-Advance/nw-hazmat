'use client';
import { useState, useEffect } from 'react';
import HazmatLoader from './HazmatLoader';

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500); // Wait for fade-out to finish before hiding the loader
    }, 3000); // Show loader for 3 seconds
    return () => clearTimeout(timer); // Cleanup if unmounts early
  }, []);

  return (
    <>
      {loading && (
        <HazmatLoader className={`${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-in`} />
      )}
      {!loading && children}
    </>
  );
}
