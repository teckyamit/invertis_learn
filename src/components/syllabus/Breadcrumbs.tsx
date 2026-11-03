import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-500 overflow-x-auto py-2">
      <Link
        href="/"
        className="flex items-center text-slate-500 hover:text-emerald-700 transition font-medium whitespace-nowrap"
      >
        <Home className="h-4 w-4 mr-1.5 text-slate-400" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-emerald-700 transition font-medium whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`whitespace-nowrap ${isLast ? "font-semibold text-slate-900" : ""}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
