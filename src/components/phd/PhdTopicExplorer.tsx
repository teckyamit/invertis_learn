"use client";

import React, { useState } from "react";
import { 
  Compass, 
  Lightbulb, 
  BookOpen, 
  Cpu, 
  BarChart3, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Target
} from "lucide-react";
import { RESEARCH_TOPICS, ResearchTopic } from "@/data/phdData";

export function PhdTopicExplorer() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(RESEARCH_TOPICS[0].id);

  const currentTopic = RESEARCH_TOPICS.find((t) => t.id === selectedTopicId) || RESEARCH_TOPICS[0];

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Doctoral Specializations</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Computer Science Research Topic Explorer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Explore 12 major computing research disciplines aligned with faculty expertise and global doctoral benchmarks. 
              Review foundational concepts, methodological blueprints, standard benchmark datasets, and illustrative research problem formulations.
            </p>
          </div>
        </div>
      </div>

      {/* Explorer Layout: Left Selector + Right Detailed Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 12 Research Areas */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
            Computing Research Areas ({RESEARCH_TOPICS.length})
          </div>
          <div className="space-y-1 max-h-[640px] overflow-y-auto pr-1">
            {RESEARCH_TOPICS.map((topic, idx) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-medium transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-brand-navy text-white font-bold shadow-2xs"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="truncate">{topic.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-amber-400 translate-x-0.5" : "text-slate-400"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Research Blueprint */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-6">
          {/* Header */}
          <div className="pb-5 border-b border-slate-100">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentTopic.area}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-2">
              {currentTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {currentTopic.fundamentals}
            </p>
          </div>

          {/* Illustrative Research Problems Formulation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-sm font-bold text-brand-navy flex items-center gap-2">
                <Target className="w-4 h-4 text-rose-600" />
                <span>Illustrative Research Problems</span>
              </h4>
            </div>

            {/* Disclaimer Badge */}
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-[11px] text-amber-900 leading-snug">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Academic Disclaimer:</strong> The problems below are provided solely as illustrative problem formulations to demonstrate how research hypotheses are structured. Doctoral scholars must finalize their specific dissertation problem statement in consultation with their allotted Research Supervisor and Research Advisory Committee (RAC).
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentTopic.illustrativeProblems.map((prob, pIdx) => (
                <div key={pIdx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <span>{prob}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology & Technical Formulation */}
          <div className="space-y-2">
            <h4 className="font-heading text-sm font-bold text-brand-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-blue" />
              <span>Recommended Research Methodology</span>
            </h4>
            <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentTopic.methodology}
            </div>
          </div>

          {/* Tools & Benchmark Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 space-y-2">
              <h5 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-blue" />
                <span>Key Tools & Frameworks</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {currentTopic.keyTools.map((tool, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded text-xs font-medium bg-white border border-slate-200 text-slate-800 shadow-2xs">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-200 space-y-2">
              <h5 className="font-heading text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Standard Evaluation Metrics</span>
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {currentTopic.evaluationMetrics.map((met, mIdx) => (
                  <span key={mIdx} className="px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 border border-emerald-200 text-emerald-800">
                    {met}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Landmark Reading & Foundational Papers */}
          <div className="space-y-3 pt-2">
            <h4 className="font-heading text-sm font-bold text-brand-navy flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Foundational Papers & Suggested Literature</span>
            </h4>

            <div className="space-y-2">
              {currentTopic.suggestedReading.map((read, rIdx) => (
                <div key={rIdx} className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                  <div>
                    <span className="font-semibold text-xs text-brand-navy block">{read.title}</span>
                    <span className="text-[11px] text-slate-500">{read.relevance}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200 self-start sm:self-center shrink-0">
                    {read.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

