import React from "react";
import Link from "next/link";
import { ChevronRight, Home, GraduationCap, Building2 } from "lucide-react";
import { PhdHubClient } from "@/components/phd/PhdHubClient";

export const revalidate = 3600;

export const metadata = {
  title: "Ph.D. in Computer Science & Engineering | Doctoral Research Hub — Invertis Learn",
  description: "Comprehensive doctoral research guidance for scholars pursuing Ph.D. in Computer Science & Engineering at Invertis University. Coursework syllabus, 40+ research tools, topic explorer, viva voce preparation, and interactive milestone tracker.",
  keywords: [
    "Invertis University Ph.D. CSE",
    "Ph.D. Computer Science syllabus",
    "Doctoral research toolkit",
    "Ph.D. coursework Invertis",
    "PhDRM 101 syllabus",
    "PhD-032 Computer Engineering",
    "Ph.D. viva voce questions",
    "Research paper publication guide"
  ]
};

export default function PhdPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1 hover:text-brand-blue transition font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link 
              href="/engineering" 
              className="hover:text-brand-blue transition font-medium"
            >
              Engineering Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-brand-navy">
              Ph.D. in Computer Science & Engineering
            </span>
          </nav>
        </div>
      </div>

      {/* Main Hub Client Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <PhdHubClient />
      </main>
    </div>
  );
}

