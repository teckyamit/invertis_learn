"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string; title?: string; event?: boolean }) => void;
      no_onload?: boolean;
      endpoint?: string;
    };
  }
}

export function GoatCounter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const endpoint = process.env.NEXT_PUBLIC_GOATCOUNTER_ENDPOINT;
  const isEnabled = process.env.NEXT_PUBLIC_GOATCOUNTER_ENABLED === "true" || Boolean(endpoint);

  useEffect(() => {
    if (!isEnabled || !window.goatcounter?.count) return;

    // Track path changes in Next.js SPA navigation
    const query = searchParams?.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;

    window.goatcounter.count({
      path: currentPath,
      title: document.title,
    });
  }, [pathname, searchParams, isEnabled]);

  if (!isEnabled || !endpoint) {
    return null;
  }

  return (
    <Script
      strategy="afterInteractive"
      src="//gc.zgo.at/count.js"
      data-goatcounter={endpoint}
      data-goatcounter-settings='{"no_onload": true}'
    />
  );
}
