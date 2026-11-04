import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import {
  Layers,
  ShieldCheck,
  ArrowRight,
  Calendar,
  BookOpen,
  Presentation,
  FileText,
  BookmarkCheck,
  UserCheck
} from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";

export const revalidate = 3600;

export default async function NotesProgrammeListPage() {
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
                include: {
                  resources: {
                    where: {
                      category: { code: "NOTES" },
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

  // Calculate totals
  const totalNotes = await db.academicResource.count({
    where: { category: { code: "NOTES" }, isPublished: true },
  });

  const lectureNotesCount = await db.academicResource.count({
    where: { category: { code: "NOTES" }, resourceType: "LECTURE_NOTES", isPublished: true },
  });

  const unitSummariesCount = await db.academicResource.count({
    where: { category: { code: "NOTES" }, resourceType: "UNIT_SUMMARY", isPublished: true },
  });

  const pptSlidesCount = await db.academicResource.count({
    where: { category: { code: "NOTES" }, resourceType: "PPT_SLIDES", isPublished: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Learning Notes & Materials" }]} />

        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Faculty Learning Resources Hub • Phase 3</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Faculty Lecture Notes & Learning Materials
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore faculty-verified lecture notes, unit summaries, lecture presentations (PPTs), and quick revision formula sheets for Invertis University engineering programmes.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Total Notes</span>
                <span className="text-xl font-bold text-slate-900">{totalNotes} Resources</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Lecture Notes</span>
                <span className="text-xl font-bold text-emerald-700">{lectureNotesCount} Notes</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Unit Summaries</span>
                <span className="text-xl font-bold text-purple-700">{unitSummariesCount} Summaries</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-500 block">Slide Decks</span>
                <span className="text-xl font-bold text-blue-700">{pptSlidesCount} PPTs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Programme Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Select Your Academic Programme
            </h2>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Phase 3 Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((prog) => {
              const stats = getProgrammeCurriculumStats(prog, programmes);
              const displayName = getProgrammeDisplayName(prog.code, prog.name);

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Degree Level & Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                        {prog.degreeLevel === "UNDERGRADUATE" ? "Undergraduate (UG)" : "Postgraduate (PG)"}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                        {prog.durationYears} Years
                      </span>
                    </div>

                    {/* Programme Code & Title */}
                    <div className="space-y-1 mb-6">
                      <span className="font-mono text-xs font-semibold text-emerald-700">
                        {prog.code}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {prog.department.name}
                      </p>
                    </div>

                    {/* Resource Counts */}
                    <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Available Notes</span>
                        <span className="text-lg font-bold text-emerald-700">{stats.resourceCount} Documents</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block mb-0.5">Academic Semesters</span>
                        <span className="text-lg font-bold text-slate-900">{stats.semesterCount} Semesters</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Link
                    href={`/notes/${encodeURIComponent(prog.code)}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-xs font-semibold text-white bg-slate-900 group-hover:bg-emerald-800 shadow-sm transition"
                  >
                    <span>Browse {prog.code} Notes</span>
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

