"use client";

import { useEffect } from "react";
import { trackContactClick } from "@/lib/analytics";

/**
 * One delegated listener for every tel:/mailto: link on the site.
 *
 * Phone and email links live in dozens of places, many of them server
 * components that can't take onClick handlers. Listening at the document
 * catches all of them — including links added later — without touching each.
 * Capture phase so it still fires if a link handler stops propagation.
 */
export default function ContactLinkTracker() {
  useEffect(() => {
    const onClick = (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href^="tel:"], a[href^="mailto:"]') : null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const method = href.startsWith("tel:") ? "phone" : "email";
      const label = (link.getAttribute("aria-label") || link.textContent || "").trim().slice(0, 100);
      // Nearest landmark tells us header vs. footer vs. page body.
      const region = link.closest("header, footer, nav, aside")?.tagName.toLowerCase() || "body";

      trackContactClick(method, `${region}: ${label}`);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
