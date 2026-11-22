"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete navigation when route updates
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 200);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intercept link clicks to trigger immediate progress indication
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external links, anchors, or new tabs
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.target === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // If navigating to the same path with same search, skip
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      setIsNavigating(true);
      setProgress(25);

      const t1 = setTimeout(() => setProgress(60), 150);
      const t2 = setTimeout(() => setProgress(80), 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page navigation progress"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 transition-all duration-200 ease-out shadow-sm"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
