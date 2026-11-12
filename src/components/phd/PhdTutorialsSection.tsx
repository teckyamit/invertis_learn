"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  Terminal, 
  Check, 
  Copy, 
  Sparkles, 
  ChevronRight, 
  AlertCircle,
  Lightbulb,
  Layers,
  GraduationCap
} from "lucide-react";
import { RESEARCH_TUTORIALS, ResearchTutorial } from "@/data/phdData";

export function PhdTutorialsSection() {
  const [selectedTutorialId, setSelectedTutorialId] = useState<string>(RESEARCH_TUTORIALS[0].id);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const currentTutorial = RESEARCH_TUTORIALS.find((t) => t.id === selectedTutorialId) || RESEARCH_TUTORIALS[0];

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(idx);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-blue-50 text-brand-blue border-blue-200";
      case "Advanced":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Skill Mastery</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Doctoral Research Tools Learning Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Hands-on tutorials designed specifically for doctoral researchers. 
              Master literature citation workflows, collaborative LaTeX authoring, reproducible PyTorch experimentation, 
              and automated artifact tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tutorials List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
            Hands-on Tutorials ({RESEARCH_TUTORIALS.length})
          </div>
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {RESEARCH_TUTORIALS.map((tut) => {
              const isSelected = tut.id === selectedTutorialId;
              return (
                <button
                  key={tut.id}
                  type="button"
                  onClick={() => setSelectedTutorialId(tut.id)}
                  className={`w-full text-left p-3 rounded-lg text-xs transition flex flex-col gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-brand-navy text-white shadow-2xs"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-amber-400" : "text-brand-blue"}`}>
                      {tut.toolName}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                      isSelected ? "bg-white/20 text-white border-white/30" : getTierBadge(tut.tier)
                    }`}>
                      {tut.tier}
                    </span>
                  </div>
                  <div className="font-heading font-bold text-xs truncate">
                    {tut.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Tutorial Details */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-6">
          {/* Header */}
          <div className="pb-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {currentTutorial.toolName}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getTierBadge(currentTutorial.tier)}`}>
                {currentTutorial.tier}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentTutorial.estimatedTime}</span>
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy">
              {currentTutorial.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {currentTutorial.summary}
            </p>
          </div>

          {/* Prerequisites */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Prerequisites & Environment Setup:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentTutorial.prerequisites.map((p, pIdx) => (
                <span key={pIdx} className="px-2.5 py-1 rounded text-xs bg-white border border-slate-200 text-slate-700 font-medium">
                  • {p}
                </span>
              ))}
            </div>
          </div>

          {/* Tutorial Steps */}
          <div className="space-y-5">
            {currentTutorial.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-brand-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-navy">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                </div>

                {/* Code / Command Snippet */}
                {step.codeSnippet && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs font-mono">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400">
                      <span>{step.language || "terminal"}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(step.codeSnippet!, idx)}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3 overflow-x-auto">
                      <pre className="whitespace-pre leading-relaxed">{step.codeSnippet}</pre>
                    </div>
                  </div>
                )}

                {/* Pro Tip */}
                {step.tip && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg flex items-start gap-2 text-xs text-amber-900">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Expert Tip:</strong> {step.tip}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

