import React from "react";

export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-full max-w-3xl space-y-6 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-16 bg-slate-200 rounded" />
          <div className="h-4 w-4 bg-slate-200 rounded-full" />
          <div className="h-4 w-28 bg-slate-200 rounded" />
        </div>

        {/* Hero Card Skeleton */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="h-5 w-32 bg-blue-100 rounded-full" />
          <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Grid Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-4 w-16 bg-slate-100 rounded-full" />
              </div>
              <div className="h-5 w-4/5 bg-slate-200 rounded" />
              <div className="h-3 w-1/2 bg-slate-100 rounded pt-2" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading academic resources and syllabus data...</span>
    </div>
  );
}
