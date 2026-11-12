"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  ExternalLink, 
  Menu, 
  X, 
  Wrench, 
  BookOpen, 
  Info, 
  Home,
  Compass
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: Home, exact: true },
    { label: "Engineering", href: "/engineering", icon: Wrench },
    { label: "Resources", href: "/resources", icon: BookOpen },
    { label: "Career Pathways", href: "/career-pathways", icon: Compass },
    { label: "Ph.D. Hub", href: "/phd", icon: GraduationCap },
    { label: "About", href: "/about", icon: Info },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="site-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo & University Brand */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0">
            <Image
              src="/images/invertis-learn-logo.png"
              alt="Invertis Learn Logo"
              width={48}
              height={48}
              priority
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 aspect-square object-contain shrink-0 transition-transform group-hover:scale-105"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-brand-navy">INVERTIS</span>
                <span className="font-heading text-lg sm:text-xl font-extrabold text-brand-blue">LEARN</span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 uppercase tracking-wider truncate hidden min-[360px]:block">
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
                      ? "bg-blue-50 text-brand-blue border border-blue-200"
                      : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
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
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs transition group"
              title="Official Invertis University ERP (Attendance, Marks, Fees)"
            >
              <span>University ERP</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in fade-in-50 duration-150">
          {navLinks.map((link) => {
            const active = isActive(link.href, link.exact);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3.5 py-3 rounded-lg text-sm font-semibold min-h-[44px] transition ${
                  active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <link.icon className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://erp.invertisuniversity.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300 min-h-[44px]"
            >
              <div className="flex items-center space-x-2">
                <span>Official University ERP</span>
              </div>
              <ExternalLink className="w-4 h-4 text-amber-700 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-500 mt-1.5 px-3.5">
              Official university portal for attendance, exam results, and fee receipts.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
