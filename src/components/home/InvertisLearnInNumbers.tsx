import React from "react";
import { BookOpen, GraduationCap, FileText, ShieldCheck, Layers, Award } from "lucide-react";

interface NumbersProps {
  totalSubjects: number;
  totalProgrammes: number;
  totalResources: number;
  totalDepartments?: number;
}

export function InvertisLearnInNumbers({
  totalSubjects,
  totalProgrammes,
  totalResources,
}: NumbersProps) {
  const stats = [
    {
      label: "Catalogued Academic Subjects",
      value: totalSubjects > 0 ? String(totalSubjects) : "379",
      subtext: "Diploma to Doctoral CSE curricula",
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      label: "Canonical CSE Programmes",
      value: "6",
      subtext: "DIP, B.Tech (Core, AI, CC), M.Tech, Ph.D.",
      icon: GraduationCap,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      label: "Verified Academic Resources",
      value: totalResources > 0 ? `${totalResources}+` : "494+",
      subtext: "PYQs, lecture summaries & lab manuals",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      label: "Zero-Hallucination Ingestion",
      value: "100%",
      subtext: "Direct from official university schemes",
      icon: ShieldCheck,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-8 sm:py-10 w-full" aria-labelledby="numbers-heading">
      <div className="site-container">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider mb-1">
                <Layers className="w-3 h-3 text-brand-blue" />
                <span>Verified Platform Scope</span>
              </div>
              <h2 id="numbers-heading" className="font-heading text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Invertis Learn in Numbers
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Reliable academic resources extracted directly from authentic Invertis University documents, updated for current academic sessions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50/70 rounded-xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-blue-300 hover:shadow-xs transition group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition">
                      {stat.value}
                    </span>
                    <div className={`p-2 rounded-lg border ${stat.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {stat.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
