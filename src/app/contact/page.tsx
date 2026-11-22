import Link from "next/link";
import { Mail, ChevronRight, Home, MessageSquare, AlertCircle, FileUp, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact & Feedback | Invertis Learn",
  description: "Report broken links, submit academic feedback, or contact the Invertis Learn academic curator team.",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-50/50">
      <div className="site-container max-w-4xl space-y-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Contact &amp; Feedback</span>
        </nav>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Student &amp; Faculty Support</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contact &amp; Issue Reporting
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            Have you found a broken link, missing syllabus unit, or outdated question paper? Want to contribute notes or practical manuals for your semester? Reach out to the curator team below.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Report an Academic Issue</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Found a discrepancy in subject codes, course credits, or a broken external lecture link? Report it directly to our curation queue.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:support@invertislearn.vercel.app?subject=Invertis%20Learn%20Academic%20Issue%20Report"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Academic Team</span>
                </a>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                <FileUp className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Contribute Study Materials</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have past end-semester question papers, handwritten lecture summaries, or verified lab experiment codes to share with peers?
              </p>
              <div className="pt-2">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 underline"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Submit via Resources Hub</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
            <p><strong>Campus Location:</strong> Invertis University, Bareilly-Lucknow NH-24, Bareilly, UP 243123.</p>
            <p><strong>Curator Response Time:</strong> Academic paper submissions and error notices are usually reviewed within 24–48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
