"use client";

import React, { useState, useMemo } from "react";
import { 
  Award, 
  HelpCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ShieldCheck,
  FileCheck2
} from "lucide-react";
import { THESIS_VIVA_GUIDE, VivaQuestion } from "@/data/phdData";

export function PhdThesisVivaGuide() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchViva, setSearchViva] = useState<string>("");

  const categories = [
    "ALL",
    "Problem & Motivation",
    "Methodology & Design",
    "Experiments & Validation",
    "Limitations & Defense",
    "Future Work & Contribution"
  ];

  const filteredQuestions = useMemo(() => {
    return THESIS_VIVA_GUIDE.vivaQuestions.filter((q) => {
      const matchesCat = selectedCategory === "ALL" || q.category === selectedCategory;
      const matchesSearch = 
        q.question.toLowerCase().includes(searchViva.toLowerCase()) ||
        q.examinerFocus.toLowerCase().includes(searchViva.toLowerCase()) ||
        q.recommendedResponse.toLowerCase().includes(searchViva.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchViva]);

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Final Degree Stage</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Thesis Writing, Pre-Submission & Viva Voce Defense Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Equip yourself for the culminating phase of doctoral research: formal thesis chapter structuring, 
              mandatory pre-submission clearance, and in-depth defense preparation featuring 25 examiner-tested viva voce questions.
            </p>
          </div>
        </div>
      </div>

      {/* Thesis Chapter Structure */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-brand-blue" />
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Standard Doctoral Thesis Architecture (Chapters 1 to 6)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THESIS_VIVA_GUIDE.thesisChapters.map((ch) => (
            <div key={ch.chapterNumber} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <span className="w-6 h-6 rounded-md bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                {ch.chapterNumber}
              </span>
              <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-navy">
                {ch.title}
              </h4>
              <ul className="space-y-1.5 pt-1">
                {ch.sections.map((sec, sIdx) => (
                  <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Viva Voce 25 Questions Preparation */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Oral Defense Preparation</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
              25 Frequently Asked Ph.D. Viva Voce Defense Questions
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Comprehensive analysis of examiner intentions, common defense traps, and strategic model responses.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500">Showing</span>
            <div className="font-heading text-xl font-extrabold text-brand-navy">
              {filteredQuestions.length} <span className="text-xs font-normal text-slate-500">/ 25 Questions</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search viva questions by keywords (e.g., baseline, novelty, failure modes, scalability)..."
              value={searchViva}
              onChange={(e) => setSearchViva(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-navy text-white font-bold"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat === "ALL" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedQuestion === q.id;
            return (
              <div 
                key={q.id}
                className={`border rounded-xl transition overflow-hidden bg-white ${
                  isExpanded ? "border-brand-blue/60 shadow-2xs" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 inline-block mb-1">
                        {q.category}
                      </span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-navy">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-brand-blue" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5 bg-slate-50/50">
                    <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
                      <strong className="block font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>What the Examiner is Testing:</span>
                      </strong>
                      <p className="leading-relaxed">{q.examinerFocus}</p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950">
                      <strong className="block font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Recommended Defense Strategy:</span>
                      </strong>
                      <p className="leading-relaxed">{q.recommendedResponse}</p>
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

