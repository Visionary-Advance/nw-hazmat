"use client";

import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import HazmatLoader from "./HazmatLoader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    // Start hiding the loader after 2 seconds
    const hideTimer = setTimeout(() => {
      setLoaderVisible(false);
    }, 2000);

    // Completely remove loader after slide-up animation completes
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2000ms wait + 1000ms animation duration

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {/* Render loader with animation control */}
      {loading && (
        <HazmatLoader isVisible={loaderVisible} />
      )}

      {/* Main content with fade-in effect */}
      <div className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}