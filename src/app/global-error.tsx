"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Application Error</h2>
          <p className="text-xs text-slate-600">
            {error?.message || "A critical error occurred while rendering the page."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

