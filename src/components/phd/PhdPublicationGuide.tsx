"use client";

import React, { useState } from "react";
import { 
  FileText, 
  Copy, 
  Check, 
  AlertTriangle, 
  BookOpen, 
  ShieldAlert, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Table
} from "lucide-react";
import { PUBLICATION_GUIDE } from "@/data/phdData";

export function PhdPublicationGuide() {
  const [copiedLatex, setCopiedLatex] = useState(false);
  const [copiedMatrix, setCopiedMatrix] = useState(false);
  const [activePass, setActivePass] = useState<number>(1);

  const handleCopyLatex = () => {
    navigator.clipboard.writeText(PUBLICATION_GUIDE.latexTemplateSnippet);
    setCopiedLatex(true);
    setTimeout(() => setCopiedLatex(false), 2000);
  };

  const handleCopyMatrix = () => {
    navigator.clipboard.writeText(PUBLICATION_GUIDE.literatureMatrixTemplate);
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Research Dissemination</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Research Paper Writing, Literature Review & Publication Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Master the academic research lifecycle: critical literature assimilation via Keshav&apos;s 3-pass reading method, 
              synthesis matrices, IMRaD structuring, journal evaluation (SCI, Scopus, CORE), predatory publisher detection, and ready-to-use LaTeX templates.
            </p>
          </div>
        </div>
      </div>

      {/* Keshav's 3-Pass Method */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-5">
        <div>
          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Reading Methodology</span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
            {PUBLICATION_GUIDE.paperReadingMethod.title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            By {PUBLICATION_GUIDE.paperReadingMethod.author} — The universally adopted standard for reading scholarly papers efficiently.
          </p>
        </div>

        {/* Pass Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PUBLICATION_GUIDE.paperReadingMethod.passes.map((p) => {
            const isCurrent = activePass === p.passNumber;
            return (
              <button
                key={p.passNumber}
                type="button"
                onClick={() => setActivePass(p.passNumber)}
                className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                  isCurrent
                    ? "bg-brand-navy text-white border-brand-navy shadow-2xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isCurrent ? "text-amber-400" : "text-brand-blue"}`}>
                  Pass {p.passNumber}
                </div>
                <div className="font-heading font-bold text-xs sm:text-sm truncate">
                  {p.title.split(":")[1]?.trim() || p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pass Content */}
        {(() => {
          const pass = PUBLICATION_GUIDE.paperReadingMethod.passes.find(p => p.passNumber === activePass) || PUBLICATION_GUIDE.paperReadingMethod.passes[0];
          return (
            <div className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-4">
              <h4 className="font-heading text-sm font-bold text-brand-navy">
                {pass.title}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                    Action Checklist
                  </span>
                  <ul className="space-y-1.5">
                    {pass.actions.map((act, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                    Critical Questions You Must Answer
                  </span>
                  <ul className="space-y-1.5">
                    {pass.questionsAnswered.map((q, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Literature Review Synthesis Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Systematic Mapping</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
              Literature Review Synthesis Matrix Template
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Organize related papers systematically to identify explicit gaps and justify your novel contribution.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyMatrix}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-brand-navy bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition cursor-pointer self-start sm:self-center"
          >
            {copiedMatrix ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied Matrix!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy Markdown Matrix</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-900 text-slate-100 p-4 font-mono text-[11px] leading-relaxed">
          <pre className="whitespace-pre">{PUBLICATION_GUIDE.literatureMatrixTemplate}</pre>
        </div>
      </div>

      {/* Copyable LaTeX Paper Template */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Manuscript Preparation</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-navy mt-1">
              IEEE / ACM Format LaTeX Template
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Ready-to-compile LaTeX skeleton following standard conference and journal article structures.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyLatex}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-brand-navy hover:bg-slate-900 rounded-lg shadow-2xs transition cursor-pointer self-start sm:self-center"
          >
            {copiedLatex ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Complete LaTeX Template</span>
              </>
            )}
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 text-slate-200 p-4 font-mono text-[11px] leading-relaxed max-h-96 overflow-y-auto">
          <pre className="whitespace-pre">{PUBLICATION_GUIDE.latexTemplateSnippet}</pre>
        </div>
      </div>

      {/* Predatory Journal & Conference Detection */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 text-rose-700">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Predatory Journal & Conference Avoidance Protocol
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          UGC strictly prohibits publishing doctoral research in predatory, cloned, or hijacked journals. 
          Publications in unindexed outlets will be rejected by the Research Advisory Committee and will not count towards doctoral thesis submission requirements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {PUBLICATION_GUIDE.predatoryJournalChecklist.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h5 className="font-heading text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  {item.rule}
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

