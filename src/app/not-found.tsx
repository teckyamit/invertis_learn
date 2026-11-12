import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 mx-auto flex items-center justify-center">
          <Image
            src="/images/invertis-learn-logo.png"
            alt="Invertis Learn Logo"
            width={64}
            height={64}
            className="w-16 h-16 aspect-square object-contain"
          />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            Error 404 • Resource Not Found
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The requested course, subject, or academic resource could not be found or may have been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-slate-900 transition shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/engineering"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Engineering Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

