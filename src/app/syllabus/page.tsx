import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { GraduationCap, BookOpen, ArrowRight, ShieldCheck, Calendar, Layers } from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";

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
  });

  const sortedProgrammes = [...programmes].sort(compareProgrammesByAcademicLevel);

  const totalCatalogCount = await db.programme.count();

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Syllabus Library" }]} />

        {/* Header Banner */}
        <div className="card-hero bg-white border border-slate-200 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-200">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>University Academic Council Approved</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Official Syllabus & Curriculum Library
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Access the approved schemes of instruction, unit-wise syllabi, course outcomes, reference textbooks, and official PDF documents for Invertis University programmes.
            </p>
          </div>
        </div>

        {/* Programme Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
              Active Digitized Curricula (137 Courses)
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Tier 1 Official PDFs Linked (Session 2023-2024)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProgrammes.map((prog) => {
              const stats = getProgrammeCurriculumStats(prog, sortedProgrammes);
              const displayName = getProgrammeDisplayName(prog.code, prog.name);
              const currentCurriculum = prog.curriculumVersions[0];
              const isDip = prog.category === "DIPLOMA" || prog.code.startsWith("DIP");
              const isPhd = prog.category === "DOCTORAL" || prog.code.startsWith("PHD");
              const isPg = prog.category === "POSTGRADUATE" || prog.code.startsWith("MTECH");

              return (
                <div
                  key={prog.id}
                  className="card-standard p-4 sm:p-6 md:p-7 hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Degree Level & Regulation */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        isDip ? "bg-amber-50 text-amber-800 border-amber-200" :
                        isPhd ? "bg-rose-50 text-rose-800 border-rose-200" :
                        isPg ? "bg-indigo-50 text-indigo-800 border-indigo-200" :
                        "bg-blue-50 text-blue-800 border-blue-200"
                      }`}>
                        {isDip ? "Diploma" : isPhd ? "Doctoral (Ph.D.)" : isPg ? "Postgraduate (PG)" : "Undergraduate (UG)"}
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
                      <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {prog.department?.name || "Department of Computer Science & Engineering"}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center my-4">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Duration</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {stats.lateralSubjectCount
                            ? `${prog.durationYears}Y Reg / 3Y Lat`
                            : `${prog.durationYears} Years`}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Semesters</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {stats.lateralSubjectCount
                            ? `${stats.semesterCount} (Lat: III–VIII)`
                            : `${stats.semesterCount} Sems`}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Subjects</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          {stats.lateralSubjectCount
                            ? `Reg: ${stats.subjectCount} • Lat: ${stats.lateralSubjectCount}`
                            : `${stats.subjectCount} Total`}
                        </span>
                      </div>
                    </div>

                    {/* Regulation description */}
                    <div className="flex items-start space-x-2 text-xs text-slate-500 mb-4">
                      <Layers className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{currentCurriculum?.regulationName || "Session 2023-24 Regulation"}</span>
                    </div>

                    {/* Lateral Entry Notice if Available */}
                    {stats.lateralSubjectCount && (
                      <div className="mb-4 p-2.5 bg-purple-50/70 border border-purple-200/80 rounded-lg flex items-center justify-between text-xs">
                        <span className="text-purple-800 font-medium">Lateral admission available</span>
                        <Link
                          href={`/syllabus/${encodeURIComponent(prog.code)}?entry=lateral`}
                          className="font-bold text-purple-700 hover:text-purple-900 hover:underline inline-flex items-center gap-0.5"
                        >
                          <span>Lateral Entry (Sem III–VIII)</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Navigation CTA */}
                  <Link
                    href={`/syllabus/${encodeURIComponent(prog.code)}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition group-hover:shadow"
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
        <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span>Full University Course Catalog</span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Explore All {totalCatalogCount} Programmes Across 9 Faculties
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Looking for programmes outside Computer Science? Browse Engineering specializations (AI, Cloud Computing), 
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
        <div className="card-standard p-5 text-xs text-slate-600 flex items-start space-x-3">
          <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
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

