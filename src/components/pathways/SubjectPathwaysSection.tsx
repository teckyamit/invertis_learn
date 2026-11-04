"use client";

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
  CheckCircle2
} from "lucide-react";
import { getPathwaysForSubject, CAREER_PATHWAYS } from "@/data/careerPathways";

interface SubjectPathwaysSectionProps {
  subjectCode: string;
  subjectName: string;
}

export function SubjectPathwaysSection({
  subjectCode,
  subjectName,
}: SubjectPathwaysSectionProps) {
  const pathwayMatches = getPathwaysForSubject(subjectCode);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <Compass className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Phase 6 • Specialization Tracks
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">Industry Career Alignment</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Career Pathways & Industry Relevance
            </h2>
          </div>
        </div>

        <Link
          href="/pathways"
          className="inline-flex items-center text-xs font-semibold text-purple-700 hover:text-purple-900 bg-purple-50/70 hover:bg-purple-100 px-3.5 py-2 rounded-lg transition"
        >
          <span>Explore All 6 Pathways</span>
          <ChevronRight className="h-3.5 w-3.5 ml-1" />
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        Curriculum mapping connecting <strong>{subjectCode} ({subjectName})</strong> with verified industry specialization tracks and career certifications.
      </p>

      {pathwayMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {pathwayMatches.map(({ pathway, courseMapping }) => {
            const importanceBadge =
              courseMapping.importance === "FOUNDATIONAL"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : courseMapping.importance === "CORE"
                ? "bg-blue-50 text-blue-800 border-blue-200"
                : courseMapping.importance === "CAPSTONE"
                ? "bg-purple-50 text-purple-800 border-purple-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200";

            return (
              <div
                key={pathway.id}
                className="bg-slate-50/70 border border-slate-200 hover:border-purple-300 rounded-xl p-5 transition flex flex-col justify-between space-y-4 group hover:bg-white hover:shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${importanceBadge}`}
                    >
                      {courseMapping.importance} REQUIREMENT
                    </span>

                    <span className="text-[11px] font-semibold text-slate-500">
                      {pathway.shortTitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition">
                      {pathway.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {pathway.tagline}
                    </p>
                  </div>

                  {/* Role of this course in pathway */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
                    <span className="font-semibold text-slate-800 text-[11px] block flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-600 shrink-0" />
                      Role of this course:
                    </span>
                    <span>{courseMapping.roleInPathway}</span>
                  </div>

                  {/* Associated Certifications Preview */}
                  {pathway.certifications.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-700">Target Cert:</span>
                      <span className="text-[11px] text-slate-600 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                        {pathway.certifications[0].name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:underline">
                  <span>View Full Roadmap & Certifications</span>
                  <ArrowRight className="h-3.5 w-3.5 transition transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback for general elective subjects */
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              Department Specialization Alignment
            </h4>
            <p className="text-xs text-slate-500">
              This course provides interdisciplinary competence supporting AI, Systems Engineering, and Cloud software disciplines.
            </p>
          </div>
          <Link
            href="/pathways"
            className="inline-flex items-center space-x-1 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg shadow-2xs transition shrink-0"
          >
            <span>Explore All Pathways</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

