"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Calendar, 
  Building2, 
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  FileText
} from "lucide-react";
import { PHD_PROGRAM_DETAILS } from "@/data/phdData";

export function PhdHubHeader() {
  const p = PHD_PROGRAM_DETAILS;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50/50 rounded-full blur-3xl -z-10 pointer-events-none transform translate-x-20 -translate-y-20"></div>

      {/* Top Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Doctoral Research Platform</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-100 text-brand-navy border border-slate-200">
          <span>Catalogue Code: {p.programCode}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-brand-blue border border-blue-200">
          <Building2 className="w-3 h-3" />
          <span>{p.faculty}</span>
        </span>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>UGC & AICTE Gazetted Standards</span>
        </span>
      </div>

      {/* Title & Description */}
      <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight mb-3">
        Ph.D. in Computer Science & Engineering
      </h1>

      <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed mb-6">
        Welcome to the comprehensive doctoral research and academic guidance hub for scholars pursuing a 
        <strong> Doctor of Philosophy (Ph.D.) in Computer Science & Engineering</strong> at Invertis University. 
        Access verified coursework syllabi, literature discovery toolkits, research topic blueprints, publication templates, 
        viva voce preparation, and an interactive milestone tracker.
      </p>

      {/* Official University Source Links */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Official University Source Documents
          </span>
          <p className="text-xs text-slate-700">
            All university-specific coursework, examination rules, and admission criteria are derived from official Invertis University records.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={p.officialProgramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-brand-blue hover:text-white bg-white hover:bg-brand-blue border border-blue-200 rounded-lg shadow-2xs transition"
          >
            <span>University Program Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={p.officialSyllabusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-navy hover:bg-slate-900 rounded-lg shadow-2xs transition"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Coursework Syllabus PDF</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-2xs">
          <span className="block text-[11px] font-medium text-slate-500">Degree Duration</span>
          <span className="font-heading text-sm sm:text-base font-bold text-brand-navy">3 to 6 Years</span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-2xs">
          <span className="block text-[11px] font-medium text-slate-500">Coursework Credits</span>
          <span className="font-heading text-sm sm:text-base font-bold text-brand-navy">12 Credits (Year 1)</span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-2xs">
          <span className="block text-[11px] font-medium text-slate-500">Publication Expectation</span>
          <span className="font-heading text-sm sm:text-base font-bold text-brand-navy">Min. 2 SCI/Scopus</span>
        </div>
        <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-2xs">
          <span className="block text-[11px] font-medium text-slate-500">Plagiarism Threshold</span>
          <span className="font-heading text-sm sm:text-base font-bold text-emerald-700">&lt; 10% (UGC Level 0)</span>
        </div>
      </div>
    </div>
  );
}

