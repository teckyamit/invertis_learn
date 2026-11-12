import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ContentNotice } from "@/components/resources/ContentNotice";
import {
  FlaskConical,
  ShieldCheck,
  ArrowRight,
  Calendar,
  BookOpen,
  Code,
  HelpCircle,
  FileText,
  CheckCircle2
} from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";

export const revalidate = 3600;

export default async function LabsProgrammeListPage() {
  const programmes = await db.programme.findMany({
    where: { isActive: true, hasOfficialSyllabus: true },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            include: {
              subjects: {
                where: { subjectType: "PRACTICAL" },
                include: {
                  resources: {
                    where: {
                      category: { code: "LAB_MANUAL" },
                      isPublished: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    orderBy: { degreeLevel: "desc" },
  });

  const totalLabManuals = await db.academicResource.count({
    where: { category: { code: "LAB_MANUAL" }, isPublished: true },
  });

  const labManualTypeCount = await db.academicResource.count({
    where: { category: { code: "LAB_MANUAL" }, resourceType: "LAB_MANUAL", isPublished: true },
  });

  const vivaCount = await db.academicResource.count({
    where: { category: { code: "LAB_MANUAL" }, resourceType: "VIVA_QUESTIONS", isPublished: true },
  });

  const codeTemplateCount = await db.academicResource.count({
    where: { category: { code: "LAB_MANUAL" }, resourceType: "CODE_TEMPLATE", isPublished: true },
  });

  return (
    <div className="min-h-screen bg-surface-ground py-8">
      <div className="site-container space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Practical & Laboratory Manuals" }]} />

        {/* Header Banner */}
        <div className="card-hero p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-blue" />
              <span>Official Laboratory Repository • Practical Engineering</span>
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-brand-navy tracking-tight sm:text-4xl">
              Practical & Laboratory Manuals Library
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
              Access official laboratory manuals, experiment instructions, starter code templates, and viva voce question banks for Invertis University practical engineering courses.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              <div className="bg-surface-ground p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Total Lab Docs</span>
                <span className="text-xl font-bold text-brand-navy">{totalLabManuals} Documents</span>
              </div>
              <div className="bg-surface-ground p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Lab Manuals</span>
                <span className="text-xl font-bold text-brand-blue">{labManualTypeCount} Manuals</span>
              </div>
              <div className="bg-surface-ground p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Viva Q&A Guides</span>
                <span className="text-xl font-bold text-purple-700">{vivaCount} Guides</span>
              </div>
              <div className="bg-surface-ground p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-medium block">Code Templates</span>
                <span className="text-xl font-bold text-indigo-700">{codeTemplateCount} Templates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resource Provenance Disclaimer */}
        <ContentNotice compact />

        {/* Programme Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold text-brand-navy">
              Select Your Academic Programme
            </h2>
            <span className="text-xs text-brand-blue font-semibold bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Lab Manuals Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((prog) => {
              const stats = getProgrammeCurriculumStats(prog, programmes);
              const displayName = getProgrammeDisplayName(prog.code, prog.name);

              return (
                <div
                  key={prog.id}
                  className="card-standard p-6 flex flex-col justify-between group hover:border-blue-400 transition"
                >
                  <div>
                    {/* Top Row: Degree Level & Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-brand-blue rounded-full border border-blue-200">
                        {prog.degreeLevel === "UNDERGRADUATE" ? "Undergraduate (UG)" : "Postgraduate (PG)"}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                        {prog.durationYears} Years
                      </span>
                    </div>

                    {/* Programme Code & Title */}
                    <div className="space-y-1 mb-6">
                      <span className="font-mono text-xs font-semibold text-brand-blue">
                        {prog.code}
                      </span>
                      <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-blue transition">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {prog.department.name}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface-ground border border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Practical Courses</span>
                        <span className="text-base font-bold text-brand-navy">{stats.subjectCount} Labs</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Available Manuals</span>
                        <span className="text-base font-bold text-brand-blue">{stats.resourceCount} Docs</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    href={`/labs/${encodeURIComponent(prog.code)}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-xs font-semibold text-white bg-brand-navy hover:bg-brand-blue shadow-sm transition"
                  >
                    <span>Browse {prog.code} Lab Manuals</span>
                    <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

