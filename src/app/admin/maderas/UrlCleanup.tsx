"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Removes the 'newId' query parameter from the URL after the page loads.
 * This prevents the highlight animation from re-triggering on page refresh.
 */
export default function UrlCleanup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("newId")) {
      // Create a copy of current params and remove 'newId'
      const params = new URLSearchParams(searchParams.toString());
      params.delete("newId");
      
      // Construct new URL
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      
      // Update browser URL without reloading the page or adding to history
      window.history.replaceState({}, "", newUrl);
    }
  }, [pathname, searchParams]);

  return null;
}
