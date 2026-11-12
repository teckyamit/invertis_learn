"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Award, 
  FileCheck, 
  Users, 
  Sparkles,
  ChevronRight,
  Info,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { PHD_PROGRAM_DETAILS } from "@/data/phdData";

export function PhdOverviewSection() {
  const p = PHD_PROGRAM_DETAILS;
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(0);

  return (
    <div className="space-y-8">
      {/* Official Invertis Standards vs General Guidance Banner */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3.5 items-start">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <strong className="font-bold text-amber-950 block mb-1">
            Official University Regulations & Academic Integrity Policy
          </strong>
          Coursework syllabus, subject credit allocations (12 credits), qualifying examination marks (55%), 
          and admission modalities are strictly derived from official Invertis University notifications and the 
          UGC Minimum Standards and Procedure for Award of Ph.D. Degree Regulations. 
          Sections offering methodological frameworks, research tools, and publication strategies provide universal academic guidance 
          to support scholars throughout their doctoral journey.
        </div>
      </div>

      {/* Program Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Duration & Mode</span>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base">Full-Time & Part-Time</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Minimum 3 years (6 semesters) up to a maximum of 6 years as per UGC guidelines. Women candidates and persons with disabilities 
            are eligible for relaxation of up to 2 additional years.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Eligibility</span>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base">M.Tech / MCA / M.Sc</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Master&apos;s degree in Computer Science & Engineering, IT, Computer Applications, or related branches with at least 55% aggregate marks 
            (50% for SC/ST/OBC non-creamy layer/Differently-Abled).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Entrance & RAC</span>
              <h3 className="font-heading font-bold text-brand-navy text-sm sm:text-base">IUCET / NET-JRF Exempt</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Admission via Invertis University Common Entrance Test (IUCET) followed by Research Advisory Committee (RAC) proposal presentation. 
            UGC-NET, CSIR-NET, GATE, or SLET qualified scholars are exempted from written test.
          </p>
        </div>
      </div>

      {/* Admission Flow & Steps */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Admission Process</span>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
            Doctoral Admission Stages & Proposal Review
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Step-by-step admission workflow from application submission to formal supervisor allocation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {p.admissionProcess.map((step) => (
            <div 
              key={step.step}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                  {step.exemption && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                      Exemption Available
                    </span>
                  )}
                </div>
                <h4 className="font-heading font-bold text-brand-navy text-sm mb-1.5">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {step.description}
                </p>
              </div>
              {step.exemption && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-amber-900 font-medium">
                  {step.exemption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Doctoral Milestones Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="mb-6">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Academic Progression</span>
          <h2 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
            Doctoral Milestones & Deliverables Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Key stages in the doctoral lifecycle from coursework completion to final open viva voce examination.
          </p>
        </div>

        <div className="space-y-3">
          {p.doctoralMilestones.map((m, index) => {
            const isExpanded = selectedMilestone === index;
            return (
              <div 
                key={m.phase}
                className={`border rounded-xl transition overflow-hidden ${
                  isExpanded ? "border-brand-blue/60 bg-blue-50/20" : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedMilestone(isExpanded ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isExpanded ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {m.phase} • {m.timeline}
                        </span>
                      </div>
                      <h4 className="font-heading font-bold text-brand-navy text-sm sm:text-base">
                        {m.title}
                      </h4>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? "rotate-90 text-brand-blue" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3 text-xs sm:text-sm text-slate-600">
                    <p className="leading-relaxed">
                      {m.description}
                    </p>
                    <div>
                      <span className="font-bold text-brand-navy text-xs uppercase tracking-wider block mb-2">
                        Mandatory Deliverables & Clearances:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {m.deliverables.map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

