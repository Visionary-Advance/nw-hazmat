"use client";

import { useEffect, useState } from "react";
import {
  initAmplitude,
  isEuVisitor,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/amplitude";

// Initializes Amplitude, gating on consent for EU/EEA visitors only.
// - Non-EU visitors: initialize immediately (no banner).
// - EU/EEA visitors: initialize only after opt-in; remember the choice.
export default function AmplitudeProvider() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!isEuVisitor()) {
      initAmplitude();
      return;
    }

    const consent = getStoredConsent();
    if (consent === "granted") {
      initAmplitude();
    } else if (consent !== "denied") {
      // No prior decision — ask before loading analytics / session replay.
      setShowBanner(true);
    }
  }, []);

  const accept = () => {
    setStoredConsent("granted");
    initAmplitude();
    setShowBanner(false);
  };

  const decline = () => {
    setStoredConsent("denied");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fixed bottom-0 inset-x-0 z-[9999] px-4 pb-4"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <p className="text-sm text-gray-700 flex-1">
          We use analytics and session replay to understand how our site is used
          and improve it. These are optional. Do you consent to analytics?
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#209978] hover:bg-[#17795E] transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
