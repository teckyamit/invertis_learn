import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { GraduationCap, BookOpen, ArrowRight, ShieldCheck, Calendar, Layers } from "lucide-react";

export const revalidate = 3600; // Cache for 1 hour

export default async function SyllabusProgrammeListPage() {
  const programmes = await db.programme.findMany({
    where: { isActive: true, hasOfficialSyllabus: true },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            include: {
              subjects: true,
            },
          },
        },
      },
    },
    orderBy: { degreeLevel: "desc" },
  });

  const totalCatalogCount = await db.programme.count();

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Syllabus Library" }]} />

        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>University Academic Council Approved</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Official Syllabus & Curriculum Library
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Access the approved schemes of instruction, unit-wise syllabi, course outcomes, reference textbooks, and official PDF documents for Invertis University programmes.
            </p>
          </div>
        </div>

        {/* Programme Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Active Digitized Curricula (137 Courses)
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Tier 1 Official PDFs Linked (Session 2023-2024)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmes.map((prog) => {
              const currentCurriculum = prog.curriculumVersions[0];
              const totalSemesters = currentCurriculum?.semesters.length || prog.durationYears * 2;
              const totalSubjects = currentCurriculum?.semesters.reduce(
                (acc, sem) => acc + sem.subjects.length,
                0
              ) || 0;

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Degree Level & Regulation */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                        {prog.degreeLevel === "UNDERGRADUATE" ? "Undergraduate (UG)" : "Postgraduate (PG)"}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                        w.e.f. 2023-24
                      </span>
                    </div>

                    {/* Programme Code & Title */}
                    <div className="space-y-1 mb-4">
                      <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                        {prog.code}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition">
                        {prog.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {prog.department?.name || "Department of Computer Science & Engineering"}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center my-4">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Duration</span>
                        <span className="text-sm font-bold text-slate-900">
                          {prog.durationYears} Years
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Semesters</span>
                        <span className="text-sm font-bold text-slate-900">
                          {totalSemesters} Sems
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Subjects</span>
                        <span className="text-sm font-bold text-slate-900">
                          {totalSubjects} Total
                        </span>
                      </div>
                    </div>

                    {/* Regulation description */}
                    <div className="flex items-start space-x-2 text-xs text-slate-500 mb-6">
                      <Layers className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{currentCurriculum?.regulationName || "Session 2023-24 Regulation"}</span>
                    </div>
                  </div>

                  {/* Navigation CTA */}
                  <Link
                    href={`/syllabus/${encodeURIComponent(prog.code)}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition group-hover:shadow"
                  >
                    <span>Explore Semesters & Subjects</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Catalog Discovery Callout Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Full University Course Catalog</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Explore All {totalCatalogCount} Programmes Across 9 Faculties
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Looking for programmes outside Computer Science? Browse Engineering specializations (AI, Cloud, IoT), 
              Polytechnic Diplomas, Lateral Entry courses, Management (BBA/MBA FinTech), Pharmacy, Law, Sciences, and Doctoral Ph.D. tracks.
            </p>
          </div>
          <Link
            href="/programmes"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-bold text-xs sm:text-sm transition shadow-lg flex-shrink-0"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Academic Policy Note */}
        <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
          <BookOpen className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block mb-0.5">
              Official University Curriculum Notice
            </span>
            <p>
              The course structure, syllabus modules, course objectives, outcomes, and assessment rubrics rendered on Invertis Learn are extracted directly from authentic syllabus documents issued by the Invertis University Academic Council. Students must refer to their respective academic session regulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

