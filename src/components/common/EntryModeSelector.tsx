"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AdmissionMode, getProgramAdmissionConfig } from "@/lib/admissionModes";
import { GraduationCap, ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";

interface EntryModeSelectorProps {
  canonicalCode: string;
  currentMode: AdmissionMode;
  basePath?: string;
  className?: string;
  compact?: boolean;
}

export function EntryModeSelector({
  canonicalCode,
  currentMode,
  basePath,
  className = "",
  compact = false,
}: EntryModeSelectorProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const config = getProgramAdmissionConfig(canonicalCode);

  if (!config || !config.supportsLateral || !config.lateral) {
    return null;
  }

  const targetBasePath = basePath || pathname;

  const buildUrl = (mode: AdmissionMode) => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "lateral") {
      params.set("entry", "lateral");
    } else {
      params.delete("entry");
    }
    const query = params.toString();
    return query ? `${targetBasePath}?${query}` : targetBasePath;
  };

  const regularDetails = config.regular;
  const lateralDetails = config.lateral;

  if (compact) {
    return (
      <div
        className={`inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80 shadow-inner ${className}`}
        role="tablist"
        aria-label="Admission Mode Selection"
      >
        <Link
          href={buildUrl("regular")}
          replace
          scroll={false}
          role="tab"
          aria-selected={currentMode === "regular"}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
            currentMode === "regular"
              ? "bg-brand-navy text-white shadow-sm"
              : "text-slate-600 hover:text-brand-navy hover:bg-white/60"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Regular ({regularDetails.durationYears}Y)</span>
        </Link>
        <Link
          href={buildUrl("lateral")}
          replace
          scroll={false}
          role="tab"
          aria-selected={currentMode === "lateral"}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-150 ${
            currentMode === "lateral"
              ? "bg-brand-navy text-white shadow-sm"
              : "text-slate-600 hover:text-brand-navy hover:bg-white/60"
          }`}
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>Lateral Entry ({lateralDetails.durationYears}Y)</span>
          {lateralDetails.officialCode && (
            <span
              className={`text-[10px] px-1 py-0.5 rounded font-mono font-bold leading-none ${
                currentMode === "lateral"
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {lateralDetails.officialCode}
            </span>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
            Unified Admission Pathway
          </span>
          <h3 className="text-sm sm:text-base font-bold text-brand-navy mt-0.5">
            Select Admission Mode
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>Active Mode:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            {currentMode === "lateral" ? "Lateral Entry" : "Regular Entry"}
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        role="tablist"
        aria-label="Programme Admission Mode Selector"
      >
        {/* Regular Mode Card */}
        <Link
          href={buildUrl("regular")}
          replace
          scroll={false}
          role="tab"
          aria-selected={currentMode === "regular"}
          className={`flex flex-col p-3 rounded-lg border-2 text-left transition-all ${
            currentMode === "regular"
              ? "border-brand-blue bg-blue-50/40 shadow-sm"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  currentMode === "regular"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-brand-navy">
                Regular Entry
              </span>
            </div>
            {currentMode === "regular" && (
              <span className="text-[11px] font-semibold text-brand-blue bg-white px-2 py-0.5 rounded-full border border-blue-200 shadow-2xs">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-2 leading-relaxed">
            {regularDetails.admissionModeLabel}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-auto font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {regularDetails.durationYears} Years
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-400" />
              {regularDetails.semestersCount} Semesters ({regularDetails.minSemester}–{regularDetails.maxSemester})
            </span>
          </div>
        </Link>

        {/* Lateral Mode Card */}
        <Link
          href={buildUrl("lateral")}
          replace
          scroll={false}
          role="tab"
          aria-selected={currentMode === "lateral"}
          className={`flex flex-col p-3 rounded-lg border-2 text-left transition-all ${
            currentMode === "lateral"
              ? "border-brand-blue bg-blue-50/40 shadow-sm"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  currentMode === "lateral"
                    ? "bg-brand-blue text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-brand-navy">
                Lateral Entry (Direct 2nd Year)
              </span>
            </div>
            {lateralDetails.officialCode && (
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                {lateralDetails.officialCode}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 mb-2 leading-relaxed">
            {lateralDetails.admissionModeLabel}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100 mt-auto font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {lateralDetails.durationYears} Years
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-400" />
              {lateralDetails.semestersCount} Semesters (Sem III–VIII)
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

