"use client";

import { useEffect, useState } from "react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import HazmatLoader from "./HazmatLoader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Render both, but hide page content during loading */}
      {loading && (
        <HazmatLoader />
      )}

      <div className={loading ? "hidden" : "block"}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
