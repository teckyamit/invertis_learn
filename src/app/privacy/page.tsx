import Link from "next/link";
import { ShieldCheck, ChevronRight, Home, Lock, EyeOff, Database } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Invertis Learn",
  description: "Learn how Invertis Learn protects student privacy with zero personal data collection, account-free access, and privacy-respecting analytics.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen py-8 sm:py-12 bg-slate-50/50">
      <div className="site-container max-w-4xl space-y-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition inline-flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Privacy Policy</span>
        </nav>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy-First Academic Platform</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last Updated: November 2026 · Effective Immediately
          </p>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                1. No Account Required &amp; Zero Student PII
              </h2>
              <p>
                Invertis Learn operates on an <strong>open access</strong> model. We do not require students to create an account, log in with university credentials, or provide personal information (such as student names, roll numbers, phone numbers, or residential addresses) to browse syllabi, download lecture notes, or inspect past examination papers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-blue-600" />
                2. Privacy-Friendly, Cookieless Analytics
              </h2>
              <p>
                We use <strong>GoatCounter</strong>, an open-source, privacy-first web analytics tool. GoatCounter does not track visitors across websites, does not set persistent tracking cookies, and does not store personally identifiable information. We collect strictly non-identifiable aggregate metrics (such as page visits, referrers, and approximate screen resolutions) to understand which academic resources students need most and to optimize website performance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                3. Local Storage Usage
              </h2>
              <p>
                The application may use your browser&apos;s local storage (localStorage) exclusively to store client-side UI preferences, such as:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Your selected academic programme filter or tab preferences.</li>
                <li>Ph.D. Progress Tracker milestone checkboxes (stored strictly in your browser).</li>
                <li>Curator session state (restricted strictly to authenticated administrative reviewers).</li>
              </ul>
              <p>
                Local storage data never leaves your device and is not transmitted to external advertising or marketing platforms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                4. Third-Party Links &amp; YouTube Embeds
              </h2>
              <p>
                Invertis Learn curates verified external educational resources, including YouTube video lectures and the official Invertis University ERP portal. When you click an external link, you are navigating to an independent third-party site governed by its respective privacy policies and terms of service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">
                5. Contacting the Team
              </h2>
              <p>
                For inquiries regarding this Privacy Policy or data integrity, please visit our{" "}
                <Link href="/contact" className="text-blue-600 underline font-semibold hover:text-blue-800">
                  Contact &amp; Feedback
                </Link>{" "}
                page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
