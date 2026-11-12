import Link from "next/link";
import Image from "next/image";
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
  Unlock,
  MapPin,
  Sparkles,
  ChevronRight,
  Code2,
  Compass,
  Award,
  GitBranch as Github,
  BriefcaseBusiness as Linkedin,
  Camera as Instagram,
  Video as Youtube
} from "lucide-react";

export const metadata = {
  title: "About Invertis Learn | Academic Resource Platform",
  description: "Learn about Invertis Learn — an open academic companion providing verified syllabi, past examination papers, notes, and laboratory manuals for Invertis University students. Meet the creator, Amit Kumar Pal.",
};

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/teckyamit",
    icon: Github,
    hoverClass: "hover:bg-slate-900 hover:text-white hover:border-slate-900",
    bgClass: "bg-slate-100 text-slate-800 border-slate-200",
    label: "Follow Amit Kumar Pal on GitHub (@teckyamit)"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/amit-kumar-pal-98a59117b",
    icon: Linkedin,
    hoverClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    bgClass: "bg-blue-50 text-blue-700 border-blue-200",
    label: "Connect with Amit Kumar Pal on LinkedIn"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/amit_pal2809/",
    icon: Instagram,
    hoverClass: "hover:bg-gradient-to-tr hover:from-amber-600 hover:via-rose-600 hover:to-purple-600 hover:text-white hover:border-transparent",
    bgClass: "bg-rose-50 text-rose-700 border-rose-200",
    label: "Follow Amit Kumar Pal on Instagram (@amit_pal2809)"
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@RealAmitPAl",
    icon: Youtube,
    hoverClass: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
    bgClass: "bg-red-50 text-red-700 border-red-200",
    label: "Subscribe to Amit Kumar Pal on YouTube (@RealAmitPAl)"
  }
];

const EDUCATION_TIMELINE = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Invertis University, Bareilly",
    type: "Undergraduate Degree",
    status: "Alumnus"
  },
  // {
  //   degree: "Diploma in Computer Science & Engineering",
  //   institution: "Invertis University, Bareilly",
  //   type: "Polytechnic Diploma",
  //   status: "Alumnus"
  // }
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-8 sm:space-y-10">
        {/* Navigation Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">About Invertis Learn</span>
        </nav>

        {/* ========================================================================= */}
        {/* A. ABOUT HERO SECTION (Expanded horizontally, controlled reading length) */}
        {/* ========================================================================= */}
        <div className="card-hero p-4 sm:p-8 md:p-10 lg:p-14 text-center space-y-5 relative overflow-hidden bg-white border border-slate-200">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-800 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Companion for Invertis University</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            About Invertis Learn
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Invertis Learn is an open, organized academic resource website built to give students instant, 
            frictionless access to authentic curricula, examination question papers, lecture notes, and lab manuals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-500 pt-4 border-t border-slate-100">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              100% Verified Syllabi
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center">
              <Unlock className="w-4 h-4 text-blue-600 mr-1.5" />
              Public Access • No Login Required
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center">
              <Building2 className="w-4 h-4 text-slate-600 mr-1.5" />
              Invertis University Bareilly
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* B. FEATURE CARDS (Expanded across the available fluid content width)      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Zero Authentication */}
          <div className="card-standard p-4 sm:p-6 md:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <Unlock className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">Zero Authentication Required</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                No account creation, passwords, or login forms. Educational materials belong in the hands of learners — 
                engineering students can immediately locate their subject and begin studying within 3 clicks.
              </p>
            </div>
          </div>

          {/* 2. Official University Standard */}
          <div className="card-standard p-4 sm:p-6 md:p-8 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900">Strict Curriculum Authenticity</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We operate under a strict zero-hallucination standard. Every subject code, syllabus unit, credit allocation, 
                and examination structure is extracted directly from official university syllabus documents.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* C. UNIVERSITY ERP COMPARISON (Balanced two-column layout)                 */}
        {/* ========================================================================= */}
        <div className="card-hero p-4 sm:p-6 md:p-10 space-y-5 bg-white border border-slate-200">
          <div className="space-y-1">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 flex items-center space-x-2.5">
              <Building2 className="w-6 h-6 text-blue-600" />
              <span>Understanding Portals: Invertis Learn vs. University ERP</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-4xl pt-1">
              Students often ask how this website relates to the official university portal. The two platforms serve distinct, complementary purposes:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            {/* Invertis Learn */}
            <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-6 sm:p-7 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-bold text-blue-900 text-base flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>Invertis Learn (This Website)</span>
                </div>
                <ul className="text-xs sm:text-sm text-blue-950 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Subject-wise isolated syllabi &amp; units</li>
                  <li>Previous semester question papers (PYQs)</li>
                  <li>Faculty lecture presentations &amp; notes</li>
                  <li>Lab manuals, starter codes &amp; viva guides</li>
                  <li>Career specialization tracks &amp; certifications</li>
                  <li><strong>Publicly accessible with zero authentication</strong></li>
                </ul>
              </div>
            </div>

            {/* University ERP */}
            <div className="bg-amber-50/50 rounded-xl border border-amber-200 p-6 sm:p-7 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-bold text-amber-900 text-base flex items-center space-x-2">
                  <ExternalLink className="w-5 h-5 text-amber-600" />
                  <span>Official University ERP</span>
                </div>
                <ul className="text-xs sm:text-sm text-amber-950 space-y-2 list-disc list-inside leading-relaxed">
                  <li>Student attendance records &amp; tracking</li>
                  <li>Semester results, marks sheets &amp; transcripts</li>
                  <li>Admit card &amp; hall ticket downloads</li>
                  <li>Fee payments &amp; university fee receipts</li>
                  <li>Examination forms &amp; official registrations</li>
                  <li><strong>Requires student ERP credentials</strong></li>
                </ul>
              </div>
              <div className="pt-3 border-t border-amber-200/60">
                <a
                  href="https://erp.invertisuniversity.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-950 underline"
                >
                  <span>Go to University ERP</span>
                  <ExternalLink className="w-4 h-4 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* D. CURRENT RELEASE SCOPE (Full width horizontal arrangement)              */}
        {/* ========================================================================= */}
        <div className="card-hero p-4 sm:p-6 md:p-10 bg-white border border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-4xl">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Current Release Scope: Engineering Focus</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For the current release, all <strong>Engineering programmes (B.Tech, M.Tech, and Polytechnic Diploma)</strong> from the 
              Invertis Institute of Engineering &amp; Technology are fully active and accessible.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Other faculties—including Management, Pharmacy, Law, Applied Sciences, Agriculture, Education, and Journalism—are visible in the 
              directory with a <strong>Coming Soon</strong> status. Their academic syllabi are undergoing verification to ensure zero discrepancy with official records.
            </p>
          </div>
          <div className="shrink-0 self-start lg:self-center">
            <Link
              href="/engineering"
              className="inline-flex items-center space-x-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition"
            >
              <span>Explore Engineering Programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* E. MEET THE CREATOR SECTION (Spacious balanced two-column layout)         */}
        {/* ========================================================================= */}
        <section aria-labelledby="creator-heading" className="card-hero p-4 sm:p-8 lg:p-12 space-y-8 bg-white border border-slate-200 relative overflow-hidden">
          {/* Subtle Decorative Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="space-y-2 relative z-10 border-b border-slate-100 pb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Creator Profile &amp; Initiative</span>
            </div>
            <h2 id="creator-heading" className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Meet the Mind Behind Invertis Learn
            </h2>
            <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
              An independent academic companion engineered to simplify resource discovery for the Invertis student community.
            </p>
          </div>

          {/* Editorial 2-Column Profile Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start relative z-10">
            {/* Left Column: Creator Photograph & Quick Details (4 cols on desktop) */}
            <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center sm:items-start space-y-4 w-full">
              {/* Creator Photo Frame with clean modern styling */}
              <div className="w-full max-w-[280px] sm:max-w-[340px] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md transition hover:shadow-lg relative group">
                <Image
                  width={935}
                  height={1024}
                  src="/images/creator.jpg"
                  alt="Amit Kumar Pal, Founder and Developer of Invertis Learn"
                  priority
                  className="w-full h-auto object-cover aspect-[4/5] transition transform duration-300 group-hover:scale-[1.01]"
                  style={{ objectPosition: "center 25%" }}
                />
              </div>

              {/* Caption Pill */}
              <div className="w-full max-w-[280px] sm:max-w-[340px] mx-auto lg:mx-0 bg-slate-50 border border-slate-200 rounded-xl p-3 sm:p-3.5 text-center sm:text-left flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block uppercase tracking-wider">Project Lead</span>
                  <span className="text-xs font-bold text-slate-800">Designed &amp; Developed in Bareilly, U.P.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Name, Role, Narrative, Education & Social Links (8 cols on desktop) */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-6 text-left">
              {/* Name & Role Header */}
              <div className="space-y-1">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                  Amit Kumar Pal
                </h3>
                <p className="text-sm sm:text-base font-semibold text-blue-600">
                  Founder &amp; Developer of Invertis Learn
                </p>
              </div>

              {/* Professional Introduction (Exact Requested Narrative) */}
              <div className="space-y-3.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
                <p>
                  Hi, I&apos;m Amit Kumar Pal, a Computer Science graduate and the creator of Invertis Learn. I built this platform with a simple vision: to make authentic academic resources easier to access, understand and navigate for students of Invertis University.
                </p>
                <p>
                  As a student who understands the challenges of finding organized academic resources, I wanted to create a centralized platform where students can access subject-wise syllabi, previous year question papers, notes and other learning materials without unnecessary complexity.
                </p>
                <p>
                  Invertis Learn is an independent initiative built with the goal of making academic learning more accessible and organized.
                </p>
              </div>

              {/* Compact Education Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1.5 text-blue-600" />
                  Educational Background
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-4xl">
                  {EDUCATION_TIMELINE.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-3 text-xs sm:text-sm"
                    >
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block">{edu.degree}</span>
                        <span className="text-slate-600 text-xs">{edu.institution}</span>
                      </div>
                      <span className="font-mono text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 shrink-0">
                        {edu.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* "Find Me Online" Social Presence */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                  <Compass className="w-4 h-4 mr-1.5 text-indigo-600" />
                  Find Me Online
                </h4>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className={`inline-flex items-center space-x-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border shadow-2xs transition-all duration-200 ${link.bgClass} ${link.hoverClass} group`}
                      >
                        <Icon className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
                        <span>{link.name}</span>
                        <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* F. UNIVERSITY INFORMATION SECTION (Clean horizontal alignment)            */}
        {/* ========================================================================= */}
        <div className="card-standard p-6 sm:p-8 bg-slate-100/70 border border-slate-200 text-xs sm:text-sm text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-slate-900 font-bold">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Invertis University, Bareilly</span>
            </div>
            <p className="text-slate-600">Invertis Village, Bareilly-Lucknow NH-24, Bareilly, Uttar Pradesh 243123.</p>
          </div>
          <p className="text-slate-500 text-xs shrink-0 md:text-right">
            Established by Govt. of U.P. under UGC Act, 1956 vide U.P. Act 22 of 2010.
          </p>
        </div>
      </div>
    </div>
  );
}
