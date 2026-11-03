import Link from "next/link";
import { GraduationCap, ShieldCheck, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                INVERTIS <span className="text-blue-400">LEARN</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              The official academic companion portal for students of Invertis University, Bareilly.
              Providing verified syllabi, learning modules, and examination frameworks.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Invertis Village, Bareilly-Lucknow NH-24, Bareilly, 243123 U.P.</span>
            </div>
          </div>

          {/* Quick Academic Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Academic Curricula (2023–24)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/syllabus?programme=BTECH-CSE" className="hover:text-blue-400 transition">
                  B.Tech Computer Science & Engineering (8 Semesters)
                </Link>
              </li>
              <li>
                <Link href="/syllabus?programme=MTECH-CSE" className="hover:text-blue-400 transition">
                  M.Tech Computer Science & Engineering (4 Semesters)
                </Link>
              </li>
              <li className="text-slate-500">
                Department of Computer Science & Engineering
              </li>
              <li className="text-slate-500">
                Invertis Institute of Engineering & Technology
              </li>
            </ul>
          </div>

          {/* Institutional Compliance */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Institutional Accreditation
            </h3>
            <div className="bg-brand-900/60 p-4 rounded-lg border border-brand-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Established by Govt. of U.P.</span>
              </div>
              <p>Under UGC Act, 1956 vide U.P. Act 22 of 2010.</p>
              <p className="text-slate-400">
                All academic resources are strictly mirrored from the official University Scheme of Instruction.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Invertis University, Bareilly. Invertis Learn platform.</p>
        </div>
      </div>
    </footer>
  );
}
