"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Download,
  ShieldCheck,
  Scale,
  Sparkles,
  Bookmark
} from "lucide-react";
import { PHD_PROGRAM_DETAILS } from "@/data/phdData";

export function PhdCourseworkSyllabus() {
  const p = PHD_PROGRAM_DETAILS;
  const [expandedSubject, setExpandedSubject] = useState<string>("PhD-032");
  const [filterType, setFilterType] = useState<string>("ALL");

  const totalCredits = p.courseworkStructure.reduce((acc, curr) => acc + curr.credits, 0);

  const filteredCourses = p.courseworkStructure.filter((c) => {
    if (filterType === "ALL") return true;
    if (filterType === "CORE") return c.type === "COMPULSORY" || c.type === "DEPARTMENTAL";
    if (filterType === "ELECTIVE") return c.type === "ELECTIVE";
    if (filterType === "ETHICS") return c.type === "ETHICS" || c.type === "SEMINAR";
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Coursework Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-brand-blue">
                Pre-Ph.D. Coursework
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Official Invertis University Doctoral Curriculum
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy">
              Official Ph.D. Coursework Syllabus & Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              As mandated by UGC Ph.D. Regulations and Invertis University guidelines, doctoral candidates complete 
              prescribed core courses and specialization electives with at least <strong>55% aggregate marks</strong> 
              to confirm doctoral registration.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={p.officialSyllabusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-slate-900 transition shadow-xs"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Download Official Syllabus PDF</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Credit Breakdown Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Coursework Minimum</span>
            <span className="font-heading text-xl sm:text-2xl font-extrabold text-brand-navy">12 Credits</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Passing Benchmark</span>
            <span className="font-heading text-xl sm:text-2xl font-extrabold text-emerald-700">55% Marks</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Digitized Subjects</span>
            <span className="font-heading text-xl sm:text-2xl font-extrabold text-purple-700">{p.courseworkStructure.length} Subjects</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Assessment Scheme</span>
            <span className="font-heading text-xl sm:text-2xl font-extrabold text-brand-blue">Theory + RAC Viva</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold text-slate-500 mr-2">Curriculum Filter:</span>
        <button
          type="button"
          onClick={() => setFilterType("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === "ALL" ? "bg-brand-navy text-white shadow-2xs" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          All Subjects ({p.courseworkStructure.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType("CORE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === "CORE" ? "bg-brand-navy text-white shadow-2xs" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Core Courses (PhDRM 101, PhD-032)
        </button>
        <button
          type="button"
          onClick={() => setFilterType("ELECTIVE")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === "ELECTIVE" ? "bg-brand-navy text-white shadow-2xs" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Specialization Electives (PhDCS 103, 104, 105)
        </button>
        <button
          type="button"
          onClick={() => setFilterType("ETHICS")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
            filterType === "ETHICS" ? "bg-brand-navy text-white shadow-2xs" : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
          }`}
        >
          Ethics & Seminar (RPE 101, PhD-SEM)
        </button>
      </div>

      {/* Coursework Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const isExpanded = expandedSubject === course.paperCode;
          const getTypeBadge = (type: string) => {
            switch (type) {
              case "COMPULSORY":
                return "bg-blue-100 text-blue-800 border-blue-200";
              case "DEPARTMENTAL":
                return "bg-indigo-100 text-indigo-800 border-indigo-200";
              case "ELECTIVE":
                return "bg-purple-100 text-purple-800 border-purple-200";
              case "ETHICS":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
              case "SEMINAR":
                return "bg-amber-100 text-amber-800 border-amber-200";
              default:
                return "bg-slate-100 text-slate-800 border-slate-200";
            }
          };

          return (
            <div 
              key={course.paperCode}
              className={`border rounded-xl transition bg-white shadow-2xs overflow-hidden ${
                isExpanded ? "border-brand-blue/50 ring-1 ring-brand-blue/20" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                type="button"
                onClick={() => setExpandedSubject(isExpanded ? "" : course.paperCode)}
                className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-brand-navy flex flex-col items-center justify-center font-bold shrink-0 border border-slate-200">
                    <span className="text-xs font-mono font-bold leading-tight">{course.paperCode.split(" ")[0]}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{course.credits} Cr</span>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {course.paperCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getTypeBadge(course.type)}`}>
                        {course.type}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {course.credits} Credits ({course.credits * 25} Hours Workload)
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-lg font-bold text-brand-navy">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-brand-blue" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 bg-slate-50/40">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules */}
                  <div className="space-y-3">
                    <h4 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Official Modules & Detailed Syllabus Contents</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      {course.modules.map((mod, modIdx) => (
                        <div key={modIdx} className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                          <h5 className="font-heading text-xs sm:text-sm font-bold text-brand-navy mb-2.5">
                            {mod.title}
                          </h5>
                          <ul className="space-y-1.5">
                            {mod.topics.map((t, tIdx) => (
                              <li key={tIdx} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0 mt-1.5"></span>
                                <span className="leading-relaxed">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reference Books */}
                  {course.referenceBooks && course.referenceBooks.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <h4 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                        <span>Recommended Reference Books (Official Syllabus)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.referenceBooks.map((book, bIdx) => (
                          <div key={bIdx} className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {bIdx + 1}
                            </span>
                            <span className="leading-snug">{book}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
