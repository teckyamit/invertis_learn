import Link from "next/link";
import { GraduationCap, ShieldCheck, MapPin, ExternalLink, Wrench, BookOpen, Info, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info & Campus */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                INVERTIS <span className="text-blue-400">LEARN</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open academic companion platform for Invertis University students.
              Access verified syllabi, past examination papers, lecture notes, and lab manuals with zero friction.
            </p>
            <div className="flex items-start space-x-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Invertis Village, Bareilly-Lucknow NH-24, Bareilly, UP 243123</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-white transition flex items-center space-x-1">
                  <span>Engineering Programmes</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-medium">Active</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition">
                  Academic Resources Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Invertis Learn
                </Link>
              </li>
              <li>
                <Link href="/programmes" className="text-slate-400 hover:text-slate-300 transition">
                  All University Departments (Coming Soon)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: University Portals & ERP Integration */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Official University Portals
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://erp.invertisuniversity.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>University ERP (Official)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Official student ERP for fee receipts, semester marks, and attendance.
                </p>
              </li>
              <li className="pt-1">
                <a
                  href="https://www.invertisuniversity.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <span>Invertis University Website</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.invertisuniversity.ac.in/ug-programmes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-1 text-slate-400 hover:text-slate-300"
                >
                  <span>Official UG Programmes Catalog</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Accreditation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Academic Compliance
            </h3>
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Established by Govt. of U.P.</span>
              </div>
              <p className="text-[11px] text-slate-400">Under UGC Act, 1956 vide U.P. Act 22 of 2010.</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Zero-hallucination standard: all subject courses and examination structures are directly ingested from official university documents.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Invertis Learn. Open Academic Companion for Invertis University students.</p>
          <div className="flex items-center space-x-4">
            <Link href="/about" className="hover:text-slate-400">About</Link>
            <Link href="/engineering" className="hover:text-slate-400">Engineering</Link>
            <a href="https://erp.invertisuniversity.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 flex items-center space-x-1">
              <span>University ERP</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
