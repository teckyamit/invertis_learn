import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
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
  GraduationCap
} from "lucide-react";
import { CAREER_PATHWAYS, CareerPathway } from "@/data/careerPathways";

export const revalidate = 3600;

export const metadata = {
  title: "Career Pathways & Specialization Tracks | Invertis Learn",
  description: "Curriculum-aligned engineering roadmaps connecting Invertis University course codes to high-demand industry careers, recognized certifications, and salary benchmarks.",
};

export default function PathwaysHubPage() {
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
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <Compass className="h-3.5 w-3.5 text-purple-600" />
                <span>Phase 6: Career Pathways</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Engineering Career Pathways & Specialization Tracks
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Official curriculum-aligned career blueprints connecting Invertis University academic subjects to high-demand industry specializations, professional certifications, and graduate career roles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-auto flex-shrink-0">
              <div className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-center">
                <span className="block text-xl font-bold text-purple-700">{CAREER_PATHWAYS.length}</span>
                <span className="text-[11px] text-purple-800 font-medium">Specialization Tracks</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-center">
                <span className="block text-xl font-bold text-blue-700">60+</span>
                <span className="text-[11px] text-blue-800 font-medium">Mapped Subjects</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span className="flex items-center">
              <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
              Aligned with Invertis Engineering Scheme
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Award className="h-3.5 w-3.5 mr-1 text-purple-600" />
              Industry Recognized Certifications
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-blue-600" />
              100% Free & Open Access • Zero Login
            </span>
          </div>
        </div>

        {/* Quick Pathway Index */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CAREER_PATHWAYS.map((p) => (
            <a
              key={p.id}
              href={`#${p.slug}`}
              className="bg-white border border-slate-200 hover:border-purple-300 rounded-xl p-3.5 text-center transition hover:shadow-2xs group flex flex-col items-center space-y-2"
            >
              <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-purple-50 transition">
                {getPathwayIcon(p.slug)}
              </div>
              <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition leading-snug">
                {p.shortTitle}
              </span>
            </a>
          ))}
        </div>

        {/* Deep Dive for Each Career Pathway */}
        <div className="space-y-12">
          {CAREER_PATHWAYS.map((pathway, index) => {
            return (
              <section
                key={pathway.id}
                id={pathway.slug}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8 scroll-mt-20"
              >
                {/* Header Banner */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl shrink-0">
                      {getPathwayIcon(pathway.slug)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          TRACK 0{index + 1}
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {pathway.shortTitle}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {pathway.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                        {pathway.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Career Roles & Salary Badges */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shrink-0 space-y-2 text-xs">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Target Industry Positions
                    </span>
                    <div className="space-y-1">
                      {pathway.careerRoles.map((role) => (
                        <div key={role.title} className="flex items-center justify-between gap-4">
                          <span className="font-medium text-slate-800">{role.title}</span>
                          <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                            {role.salaryBandIndia}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overview Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pathway.overview}
                </p>

                {/* Curriculum Mapping: Required Invertis Courses */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-indigo-600" />
                      Invertis University Curriculum Mapping (Core & Electives)
                    </h3>
                    <span className="text-xs text-slate-400">
                      Click subject to view official syllabus & notes
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
                          className="p-3.5 bg-slate-50/70 border border-slate-200 hover:border-indigo-300 rounded-xl transition hover:bg-white flex flex-col justify-between space-y-2 group"
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

                {/* 4-Year Milestone Progression */}
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

                {/* Industry Certifications & Technical Skills Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Recognized Certifications */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-600" />
                      Industry-Standard Certifications
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

                  {/* Technical Skills Stack */}
                  <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/40 space-y-4">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-indigo-600" />
                      Core Technical Competencies
                    </h3>

                    <div className="space-y-3 text-xs">
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
                          Frameworks & Production Tools:
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
                          Engineering Concepts:
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
            <span className="text-sm">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
