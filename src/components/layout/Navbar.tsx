"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, ShieldCheck, Compass, FileText, FlaskConical, Layers } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & University Identity */}
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
                Your Academic Companion
              </p>
            </div>
          </Link>

          {/* Academic Modules Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              href="/programmes"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith("/programmes")
                  ? "bg-brand-50 text-brand-900 border border-brand-200"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-100"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Programmes</span>
              <span className="ml-1 text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded-full">60 Courses</span>
            </Link>

            <Link
              href="/syllabus"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith("/syllabus")
                  ? "bg-brand-50 text-brand-900 border border-brand-200"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Syllabus Library</span>
              <span className="ml-1 text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded-full">Phase 1</span>
            </Link>

            <Link
              href="/pyq"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith("/pyq")
                  ? "bg-brand-50 text-brand-900 border border-brand-200"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-100"
              }`}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>PYQ Library</span>
              <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Phase 2</span>
            </Link>

            <Link
              href="/notes"
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-semibold transition ${
                pathname.startsWith("/notes")
                  ? "bg-brand-50 text-brand-900 border border-brand-200"
                  : "text-slate-700 hover:text-brand-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Notes Hub</span>
              <span className="ml-1 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Phase 3</span>
            </Link>

            <div className="relative group px-3 py-2 flex items-center space-x-1 text-sm font-medium text-slate-400 cursor-not-allowed">
              <FlaskConical className="w-4 h-4" />
              <span>Lab Manuals</span>
              <span className="ml-1 text-[9px] bg-slate-100 text-slate-500 font-semibold px-1 py-0.5 rounded">Phase 4</span>
            </div>

            <div className="relative group px-3 py-2 flex items-center space-x-1 text-sm font-medium text-slate-400 cursor-not-allowed">
              <Compass className="w-4 h-4" />
              <span>Roadmaps</span>
              <span className="ml-1 text-[9px] bg-slate-100 text-slate-500 font-semibold px-1 py-0.5 rounded">Phase 6</span>
            </div>
          </nav>

          {/* University Seal / Verification Tag */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Official 2023–24 Syllabi</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
