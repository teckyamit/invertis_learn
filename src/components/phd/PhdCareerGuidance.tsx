"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  FileText, 
  Briefcase, 
  Globe2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import { ACADEMIC_CAREER_GUIDANCE } from "@/data/phdData";

export function PhdCareerGuidance() {
  const g = ACADEMIC_CAREER_GUIDANCE;

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">Post-Doctoral Horizons</span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-navy mt-1">
              Academic Faculty Pathways & Global Research Careers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Strategic career blueprints for doctoral graduates: AICTE/UGC university faculty norms, competitive postdoctoral fellowships 
              in India and abroad, industrial R&D positions, and academic dossier preparation.
            </p>
          </div>

          <Link
            href="/career-pathways"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-slate-900 transition shadow-xs shrink-0"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Open Career Pathways Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cross-Link Callout to Assistant Professor Track */}
        <div className="pt-6">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue block">
                Integrated Specialization Track Available
              </span>
              <h4 className="font-heading font-bold text-sm text-brand-navy">
                Assistant Professor & Academic Research (After M.Tech / Ph.D.)
              </h4>
              <p className="text-xs text-slate-600">
                Explore semester-by-semester milestones, research proposal frameworks, and tenure-track promotion paths on our dedicated Career Pathways page.
              </p>
            </div>
            <Link
              href="/career-pathways#academic-research"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-brand-blue hover:text-white bg-white hover:bg-brand-blue border border-blue-300 rounded-lg shadow-2xs transition shrink-0"
            >
              <span>View Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* AICTE Faculty Recruitment Norms */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-brand-blue" />
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            {g.aicteFacultyNorms.title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {g.aicteFacultyNorms.overview}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {g.aicteFacultyNorms.cadres.map((cadre, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-md bg-brand-navy text-white text-xs font-bold flex items-center justify-center mb-2">
                  {idx + 1}
                </span>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-navy">
                  {cadre.cadre}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {cadre.eligibility}
                </p>
              </div>
              {cadre.note && (
                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-amber-800 font-medium">
                  {cadre.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Career Paths Breakdown: Faculty, Postdocs, Industrial R&D */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {g.careerPaths.map((cp, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-3">
                {idx === 0 ? <Building2 className="w-5 h-5" /> : idx === 1 ? <Globe2 className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-brand-navy mb-1.5">
                {cp.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {cp.description}
              </p>

              {cp.keyPreparation && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Strategic Preparation:
                  </span>
                  <ul className="space-y-1">
                    {cp.keyPreparation.map((prep, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {cp.fellowships && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Target Fellowships:
                  </span>
                  {cp.fellowships.map((fel, fIdx) => (
                    <div key={fIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <strong className="block text-brand-navy font-bold">{fel.name}</strong>
                      <span className="text-[11px] text-slate-500 block">{fel.geography} • {fel.stipend}</span>
                    </div>
                  ))}
                </div>
              )}

              {cp.employers && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Key Research Employers:
                  </span>
                  {cp.employers.map((emp, eIdx) => (
                    <div key={eIdx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      {emp}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Academic CV & Dossier Guidelines */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-blue" />
          <h3 className="font-heading text-lg font-bold text-brand-navy">
            Academic Curriculum Vitae (CV) Structure & Best Practices
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Unlike an industry resume (which is concise at 1-2 pages), an academic CV is an exhaustive scholarly record of publications, 
          grants, teaching experience, and university service.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {g.academicCvGuidelines.map((cv, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200 space-y-1">
              <h5 className="font-heading text-xs font-bold text-brand-navy">
                {cv.section}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cv.tips}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className="w-3.5 h-3.5"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

