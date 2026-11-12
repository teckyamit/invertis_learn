import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full min-w-0 flex items-center space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto py-1.5 no-scrollbar">
      <Link
        href="/"
        className="flex items-center text-slate-500 hover:text-blue-600 transition font-medium whitespace-nowrap shrink-0"
      >
        <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 text-slate-400" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 transition font-medium whitespace-nowrap shrink-0"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`whitespace-nowrap shrink-0 ${isLast ? "font-semibold text-slate-900" : ""}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

