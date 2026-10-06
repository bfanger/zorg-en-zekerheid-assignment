"use client";

import { useEffect, useState } from "react";
/**
 * Helper for rendering different content on the client vs during ssr
 */
export function useBrowser(): boolean {
  const [browser, setBrowser] = useState(false);

  useEffect(() => {
    void Promise.resolve().then(() => setBrowser(true));
  }, []);

  return browser;
}
