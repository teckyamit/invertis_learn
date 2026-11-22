import Link from "next/link";
import { AlertCircle, ChevronRight, Home, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Disclaimer | Invertis Learn",
  description: "Official disclaimer regarding the independent student-operated nature of Invertis Learn and authoritative ERP records.",
};

export default function DisclaimerPage() {
  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-50/50">
      <div className="site-container max-w-4xl space-y-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Disclaimer</span>
        </nav>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Independent Companion Platform</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Disclaimer
          </h1>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <div className="bg-amber-50/80 border border-amber-200 p-4 sm:p-5 rounded-xl text-xs sm:text-sm text-amber-950 space-y-2">
              <strong className="font-bold block text-sm">Notice of Independent Non-Affiliation:</strong>
              <p>
                <strong>Invertis Learn</strong> is an independent academic companion and student-driven study resource platform. It is <strong>not officially owned, maintained, or directly affiliated with Invertis University administration</strong>.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                1. Authoritative University Records
              </h2>
              <p>
                For all official academic and administrative matters — including semester attendance, end-semester examination marks, admit cards, official transcripts, and tuition fee payments — students must consult the official Invertis University ERP portal:
              </p>
              <div className="pt-1">
                <a
                  href="https://erp.invertisuniversity.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-lg text-xs font-bold border border-amber-300 transition"
                >
                  <span>Access Official University ERP (erp.invertisuniversity.ac.in)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                2. Syllabus Document Verification
              </h2>
              <p>
                While the curators of Invertis Learn make every effort to ingest, extract, and maintain only authentic university syllabus PDFs under our strict zero-hallucination standard, university academic boards may amend schemes, course codes, or credit allocations from session to session. Students should always cross-verify prescribed schemes with departmental notices and course coordinators.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                3. External Learning Links
              </h2>
              <p>
                Curated third-party learning materials (including YouTube playlists by educators such as GATE Smashers, Knowledge Gate, and NPTEL) are provided as supplementary study aids. Invertis Learn does not claim ownership of or control over external video content.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
