"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  ExternalLink, 
  Menu, 
  X, 
  Wrench, 
  BookOpen, 
  Info, 
  Home
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Home, exact: true },
    { label: "Engineering", href: "/engineering", icon: Wrench },
    { label: "Resources", href: "/resources", icon: BookOpen },
    { label: "About", href: "/about", icon: Info },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & University Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-brand-900 flex items-center justify-center text-white shadow-md group-hover:bg-brand-800 transition">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-brand-900">INVERTIS</span>
                <span className="text-xl font-extrabold text-blue-600">LEARN</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                Academic Companion
              </p>
            </div>
          </Link>

          {/* Desktop Navigation (Simple 5 Items) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* University ERP External Link (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-sm transition group"
              title="Official Invertis University ERP (Attendance, Marks, Fees)"
            >
              <span>University ERP</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-300"
            >
              <span>ERP</span>
              <ExternalLink className="w-3 h-3 text-amber-700" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <link.icon className="w-4 h-4 text-slate-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300"
            >
              <div className="flex items-center space-x-2">
                <span>Official University ERP</span>
              </div>
              <ExternalLink className="w-4 h-4 text-amber-700" />
            </a>
            <p className="text-[11px] text-slate-500 mt-1 px-3">
              Official university portal for attendance, exam results, and fee receipts.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
