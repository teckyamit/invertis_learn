import Link from "next/link";
import { 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Layers, 
  FlaskConical, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  ArrowRight,
  Lock,
  Unlock,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

export const metadata = {
  title: "About Invertis Learn | Academic Resource Platform",
  description: "Learn about Invertis Learn — an open academic companion providing verified syllabi, past examination papers, notes, and laboratory manuals for Invertis University students.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Hero */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-4">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Companion for Invertis University</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Invertis Learn
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Invertis Learn is an open, organized academic resource website built to give students instant, 
            frictionless access to authentic curricula, examination question papers, lecture notes, and lab manuals.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. Zero Authentication */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Unlock className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Zero Authentication Required</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No account creation, passwords, or login forms. Educational materials belong in the hands of learners — 
              engineering students can immediately locate their subject and begin studying within 3 clicks.
            </p>
          </div>

          {/* 2. Official University Standard */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Strict Curriculum Authenticity</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We operate under a strict zero-hallucination standard. Every subject code, syllabus unit, credit allocation, 
              and examination structure is extracted directly from official university syllabus documents.
            </p>
          </div>
        </div>

        {/* Portal Distinction: Invertis Learn vs. University ERP */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span>Understanding Portals: Invertis Learn vs. University ERP</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Students often ask how this website relates to the official university portal. The two platforms serve distinct, complementary purposes:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Invertis Learn */}
            <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-5 space-y-2">
              <div className="font-bold text-blue-900 text-sm flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Invertis Learn (This Website)</span>
              </div>
              <ul className="text-xs text-blue-950 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Subject-wise isolated syllabi & units</li>
                <li>Previous semester question papers (PYQs)</li>
                <li>Faculty lecture presentations & notes</li>
                <li>Lab manuals, starter codes & viva guides</li>
                <li><strong>Publicly accessible with no login</strong></li>
              </ul>
            </div>

            {/* University ERP */}
            <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-5 space-y-2">
              <div className="font-bold text-amber-900 text-sm flex items-center space-x-1.5">
                <ExternalLink className="w-4 h-4 text-amber-600" />
                <span>Official University ERP</span>
              </div>
              <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Student attendance records & tracking</li>
                <li>Semester results, marks sheets & transcripts</li>
                <li>Admit card & hall ticket downloads</li>
                <li>Fee payments & university fee receipts</li>
                <li><strong>Requires student ERP credentials</strong></li>
              </ul>
              <div className="pt-2">
                <a
                  href="https://erp.invertisuniversity.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-amber-800 hover:text-amber-900 underline"
                >
                  <span>Go to University ERP ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Current Release Scope */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>Current Release Scope: Engineering Focus</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            For the current release, all <strong>Engineering programmes (B.Tech, M.Tech, and Polytechnic Diploma)</strong> from the 
            Invertis Institute of Engineering & Technology are fully active and accessible.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Other faculties—including Management, Pharmacy, Law, Applied Sciences, Agriculture, Education, and Journalism—are visible in the 
            directory with a <strong>Coming Soon</strong> status. Their academic syllabi are undergoing verification to ensure zero discrepancy with official records.
          </p>
          <div className="pt-2">
            <Link
              href="/engineering"
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition"
            >
              <span>Explore Engineering Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Institutional Accreditation */}
        <div className="bg-slate-100 rounded-xl p-5 text-xs text-slate-600 space-y-1.5 border border-slate-200">
          <div className="flex items-center space-x-2 text-slate-800 font-bold">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span>Invertis University, Bareilly</span>
          </div>
          <p>Invertis Village, Bareilly-Lucknow NH-24, Bareilly, Uttar Pradesh 243123.</p>
          <p className="text-slate-500">Established by Govt. of U.P. under UGC Act, 1956 vide U.P. Act 22 of 2010.</p>
        </div>
      </div>
    </div>
  );
}
