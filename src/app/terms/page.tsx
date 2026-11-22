import Link from "next/link";
import { BookOpen, ChevronRight, Home, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Terms of Use | Invertis Learn",
  description: "Terms of use and academic companion guidelines for Invertis Learn students and contributors.",
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-50/50">
      <div className="site-container max-w-4xl space-y-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Terms of Use</span>
        </nav>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Educational Fair Use</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 2026 · Academic Session 2024–2025
          </p>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                1. Purpose and Permitted Educational Use
              </h2>
              <p>
                Invertis Learn is an independent academic resource companion platform designed solely for educational, non-commercial, and reference purposes by students and faculty of Invertis University. You may view, download, and reference the syllabi, practice guides, lecture notes, and question paper archives for personal study.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                2. Academic Integrity &amp; Student Responsibility
              </h2>
              <p>
                Study aids, lab templates, and past question papers are provided to assist learning and examination preparation. Users agree not to misuse materials for examination malpractice, academic dishonesty, plagiarism, or unauthorized commercial redistribution.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                3. Resource Submissions &amp; Peer Contributions
              </h2>
              <p>
                Users uploading past question papers or study notes affirm that:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Uploaded resources are legitimate academic materials relevant to Invertis University curricula.</li>
                <li>Files do not contain confidential, unadministered exam questions, harmful software, or personal data.</li>
                <li>All submissions are subject to curator review, verification, and moderation prior to publication.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                4. Intellectual Property &amp; Takedown Requests
              </h2>
              <p>
                Official syllabi and university regulations remain the intellectual property of Invertis University. If you are an authorized university representative or copyright holder and believe any material has been uploaded without authorization, please submit a notice via our{" "}
                <Link href="/contact" className="text-blue-600 underline font-semibold hover:text-blue-800">
                  Contact page
                </Link>{" "}
                and the material will be evaluated and removed promptly.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
