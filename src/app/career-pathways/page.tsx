import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Cloud,
  Lock,
  Database,
  Terminal,
  Wifi,
  ExternalLink,
  GraduationCap,
  BookmarkCheck,
  Library,
  ChevronRight
} from "lucide-react";
import { CAREER_PATHWAYS, CareerPathway } from "@/data/careerPathways";

export const revalidate = 3600;

export const metadata = {
  title: "Career Pathways | Invertis Learn",
  description: "Explore industry-relevant specializations, discover useful certifications and understand how your engineering subjects connect to real-world careers.",
};

// Curated verified learning resources per pathway
const PATHWAY_LEARNING_RESOURCES: Record<string, { title: string; provider: string; type: string; url: string; free: boolean }[]> = {
  "ai-machine-learning": [
    { title: "Deep Learning Specialization & Foundations", provider: "NPTEL / IIT Madras", type: "Video Lecture Series", url: "https://nptel.ac.in/courses/106106184", free: true },
    { title: "PyTorch Deep Learning & Tensor Tutorials", provider: "PyTorch Official Documentation", type: "Interactive Docs", url: "https://pytorch.org/tutorials/", free: true },
    { title: "Practical Deep Learning for Coders", provider: "fast.ai", type: "Open Course", url: "https://course.fast.ai/", free: true },
    { title: "Machine Learning Crash Course", provider: "Google Developers", type: "Interactive Course", url: "https://developers.google.com/machine-learning/crash-course", free: true }
  ],
  "full-stack-cloud": [
    { title: "Full Stack Open (Modern Web Development)", provider: "University of Helsinki", type: "Comprehensive Course", url: "https://fullstackopen.com/en/", free: true },
    { title: "MDN Web Docs (JavaScript, HTML5, CSS3, Web APIs)", provider: "Mozilla Developer Network", type: "Official Reference", url: "https://developer.mozilla.org/", free: true },
    { title: "Next.js & React Official Learning Curriculum", provider: "Vercel / React Core Team", type: "Interactive Guide", url: "https://nextjs.org/learn", free: true },
    { title: "Docker Getting Started Tutorial", provider: "Docker Official Documentation", type: "Hands-on Guide", url: "https://docs.docker.com/get-started/", free: true }
  ],
  "cyber-security-defense": [
    { title: "Cryptography and Network Security", provider: "NPTEL / IIT Kharagpur", type: "University Lecture Course", url: "https://nptel.ac.in/courses/106105031", free: true },
    { title: "PortSwigger Web Security Academy", provider: "PortSwigger", type: "Hands-on Labs", url: "https://portswigger.net/web-security", free: true },
    { title: "OWASP Top Ten Security Risks & Mitigations", provider: "OWASP Foundation", type: "Industry Standard Guide", url: "https://owasp.org/www-project-top-ten/", free: true },
    { title: "Linux Journey: Security & Systems Administration", provider: "Linux Journey", type: "Interactive Tutorial", url: "https://linuxjourney.com/", free: true }
  ],
  "data-engineering-analytics": [
    { title: "Big Data Computing", provider: "NPTEL / IIT Patna", type: "University Course", url: "https://nptel.ac.in/courses/106104189", free: true },
    { title: "Apache Spark Official Documentation & Quick Start", provider: "Apache Software Foundation", type: "Official Docs", url: "https://spark.apache.org/docs/latest/", free: true },
    { title: "PostgreSQL Tutorial & Advanced Query Optimization", provider: "PostgreSQL Global Development Group", type: "Technical Reference", url: "https://www.postgresql.org/docs/", free: true },
    { title: "Kaggle Learn: Data Analysis, Pandas & SQL", provider: "Kaggle", type: "Interactive Notebooks", url: "https://www.kaggle.com/learn", free: true }
  ],
  "cloud-devops-sre": [
    { title: "Cloud Computing & Distributed Systems", provider: "NPTEL / IIT Kharagpur", type: "University Course", url: "https://nptel.ac.in/courses/106105167", free: true },
    { title: "Kubernetes Basics & Production Tutorials", provider: "Cloud Native Computing Foundation (CNCF)", type: "Official Interactive Tutorial", url: "https://kubernetes.io/docs/tutorials/", free: true },
    { title: "AWS Skill Builder Free Digital Training", provider: "Amazon Web Services", type: "Official Cloud Training", url: "https://explore.skillbuilder.aws/", free: true },
    { title: "Terraform Infrastructure as Code Tutorials", provider: "HashiCorp Developer", type: "Hands-on Docs", url: "https://developer.hashicorp.com/terraform/tutorials", free: true }
  ],
  "embedded-iot-systems": [
    { title: "Embedded System Design with ARM Cortex-M", provider: "NPTEL / IIT Kharagpur", type: "University Lecture Series", url: "https://nptel.ac.in/courses/106105193", free: true },
    { title: "ESP32 & Arduino Core Documentation", provider: "Espressif Systems", type: "Hardware Docs", url: "https://docs.espressif.com/", free: true },
    { title: "FreeRTOS Kernel Documentation & Reference", provider: "FreeRTOS / Amazon", type: "RTOS Architecture Guide", url: "https://www.freertos.org/Documentation/RTOS_book.html", free: true },
    { title: "Introduction to Internet of Things", provider: "NPTEL / IIT Kharagpur", type: "University Course", url: "https://nptel.ac.in/courses/106105166", free: true }
  ]
};

export default function CareerPathwaysPage() {
  const getPathwayIcon = (slug: string) => {
    switch (slug) {
      case "ai-machine-learning":
        return <Cpu className="h-6 w-6 text-purple-600" />;
      case "full-stack-cloud":
        return <Layers className="h-6 w-6 text-blue-600" />;
      case "cyber-security-defense":
        return <Lock className="h-6 w-6 text-rose-600" />;
      case "data-engineering-analytics":
        return <Database className="h-6 w-6 text-emerald-600" />;
      case "cloud-devops-sre":
        return <Terminal className="h-6 w-6 text-sky-600" />;
      case "embedded-iot-systems":
        return <Wifi className="h-6 w-6 text-amber-600" />;
      default:
        return <Compass className="h-6 w-6 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Career Pathways</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <Compass className="h-3.5 w-3.5 text-purple-600" />
                <span>Career Specialization Tracks</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Turn Your Academic Knowledge Into Career Opportunities.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore industry-relevant specializations, discover useful certifications and understand how your engineering subjects connect to real-world careers.
              </p>
            </div>

            <div className="flex sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <div className="bg-purple-50/80 border border-purple-200 rounded-xl px-5 py-3 text-center">
                <span className="block text-2xl font-extrabold text-purple-700">{CAREER_PATHWAYS.length}</span>
                <span className="text-xs text-purple-900 font-semibold">Specialization Tracks</span>
              </div>
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-5 py-3 text-center">
                <span className="block text-2xl font-extrabold text-blue-700">60+</span>
                <span className="text-xs text-blue-900 font-semibold">Mapped Invertis Courses</span>
              </div>
            </div>
          </div>

          {/* Platform Trust & Policy Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 pt-1">
            <span className="flex items-center">
              <ShieldCheck className="h-4 w-4 mr-1.5 text-emerald-600 shrink-0" />
              Aligned with Invertis Engineering Curriculum
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center">
              <Award className="h-4 w-4 mr-1.5 text-purple-600 shrink-0" />
              Verified Industry Certifications
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1.5 text-blue-600 shrink-0" />
              100% Free & Open Access • Zero Login Required
            </span>
          </div>
        </div>

        {/* Quick Pathway Jump Index */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <BookmarkCheck className="w-4 h-4 mr-1.5 text-indigo-600" />
              Explore Specialization Tracks
            </h2>
            <span className="text-xs text-slate-400">Click to jump to track</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CAREER_PATHWAYS.map((p) => (
              <a
                key={p.id}
                href={`#${p.slug}`}
                className="bg-white border border-slate-200 hover:border-purple-300 rounded-xl p-3.5 text-center transition hover:shadow-xs group flex flex-col items-center space-y-2"
              >
                <div className="p-2.5 rounded-lg bg-slate-50 group-hover:bg-purple-50 transition">
                  {getPathwayIcon(p.slug)}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition leading-snug">
                  {p.shortTitle}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Detailed Sections for Each Specialization Track */}
        <div className="space-y-12">
          {CAREER_PATHWAYS.map((pathway, index) => {
            const learningResources = PATHWAY_LEARNING_RESOURCES[pathway.slug] || [];

            return (
              <section
                key={pathway.id}
                id={pathway.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8 scroll-mt-24"
              >
                {/* Header Banner */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-100">
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shrink-0">
                      {getPathwayIcon(pathway.slug)}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          TRACK 0{index + 1}
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {pathway.shortTitle}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {pathway.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                        {pathway.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Target Industry Positions */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0 space-y-2 text-xs lg:w-72">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Target Industry Positions
                    </span>
                    <div className="space-y-1.5">
                      {pathway.careerRoles.map((role) => (
                        <div key={role.title} className="flex items-center justify-between gap-3">
                          <span className="font-medium text-slate-800 leading-snug">{role.title}</span>
                          <span className="text-[10px] font-mono font-semibold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                            {role.typicalLevel.split("/")[0].trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Track Overview */}
                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {pathway.overview}
                  </p>
                </div>

                {/* 1. Related Academic Subjects (Invertis Curriculum Mapping) */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
                      Related Academic Subjects (Invertis University Curriculum)
                    </h3>
                    <span className="text-xs text-slate-500">
                      Click any subject to open official syllabus & resources
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {pathway.courses.map((course) => {
                      const subjectUrl = `/syllabus/${encodeURIComponent(course.programmeCode)}/semester/${course.semesterNumber}/${encodeURIComponent(course.code)}`;
                      const importanceColor =
                        course.importance === "FOUNDATIONAL"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : course.importance === "CORE"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : course.importance === "CAPSTONE"
                          ? "bg-purple-50 text-purple-800 border-purple-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200";

                      return (
                        <Link
                          key={course.code}
                          href={subjectUrl}
                          className="p-3.5 bg-slate-50/70 border border-slate-200 hover:border-indigo-300 rounded-xl transition hover:bg-white flex flex-col justify-between space-y-2 group shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
                                {course.code}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${importanceColor}`}
                              >
                                {course.importance}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 transition mt-2">
                              {course.name}
                            </h4>

                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {course.roleInPathway}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-indigo-600 group-hover:underline">
                            <span>Semester {course.semesterNumber}</span>
                            <ArrowRight className="h-3 w-3 transition transform group-hover:translate-x-1" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Relevant Skills & Industry Certifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Relevant Technical Skills */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-4">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-indigo-600" />
                      Relevant Technical Skills
                    </h3>

                    <div className="space-y-3.5 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 block mb-1.5 text-[11px]">
                          Languages:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pathway.technicalSkills.languages.map((lang) => (
                            <span
                              key={lang}
                              className="bg-white border border-slate-200 text-slate-800 font-mono text-[11px] px-2 py-0.5 rounded shadow-2xs"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1.5 text-[11px]">
                          Frameworks & Tools:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pathway.technicalSkills.frameworksAndTools.map((tool) => (
                            <span
                              key={tool}
                              className="bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-0.5 rounded shadow-2xs"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-700 block mb-1.5 text-[11px]">
                          Core Engineering Concepts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {pathway.technicalSkills.concepts.map((concept) => (
                            <span
                              key={concept}
                              className="bg-indigo-50/70 border border-indigo-100 text-indigo-900 text-[11px] px-2 py-0.5 rounded"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Industry Certification Recommendations (Verified) */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-600" />
                      Industry Certification Recommendations
                    </h3>

                    <div className="space-y-2.5">
                      {pathway.certifications.map((cert) => (
                        <div
                          key={cert.name}
                          className="bg-white border border-slate-200 rounded-lg p-3 space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">
                              {cert.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                              {cert.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                            <span>Issuer: {cert.issuer}</span>
                            {cert.code && <span>• Code: {cert.code}</span>}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed pt-0.5">
                            {cert.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Recommended Learning Resources */}
                {learningResources.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center">
                      <Library className="h-4 w-4 mr-2 text-blue-600" />
                      Recommended Learning Resources & Tutorials
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {learningResources.map((res) => (
                        <a
                          key={res.title}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 bg-slate-50/70 border border-slate-200 hover:border-blue-300 rounded-xl transition hover:bg-white flex flex-col justify-between space-y-2 group shadow-2xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                {res.type}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                            </div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition leading-snug">
                              {res.title}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {res.provider}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                            <span>Free & Open Access</span>
                            <span className="text-xs">↗</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Semester Progression & Milestones */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-purple-600" />
                    Semester Progression & Milestone Deliverables
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {pathway.semesterMilestones.map((ms) => (
                      <div
                        key={ms.year}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{ms.year}</span>
                          <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                            {ms.semester}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 leading-snug">
                          {ms.focus}
                        </p>
                        <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700 block">Deliverable:</span>
                          <span>{ms.deliverable}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* University ERP Callout Card */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Official Student Portal</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight">Need Official Attendance, Marks, or Fee Receipts?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Invertis Learn provides open academic study materials and career pathways. For administrative records, semester grade cards, admit cards, 
              and examination registration, please access the official <strong>Invertis University ERP</strong>.
            </p>
          </div>
          <a
            href="https://erp.invertisuniversity.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-xs font-bold text-brand-950 bg-amber-400 hover:bg-amber-300 shadow-md transition"
          >
            <span>Open University ERP</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

