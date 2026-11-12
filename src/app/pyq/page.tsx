import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ContentNotice } from "@/components/resources/ContentNotice";
import { FileQuestion, ShieldCheck, ArrowRight, Calendar, Layers, BookOpen } from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";

export const revalidate = 3600;

export default async function PYQProgrammeListPage() {
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
                      category: { code: "PYQ" },
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
  });

  const sortedProgrammes = [...programmes].sort(compareProgrammesByAcademicLevel);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "PYQ Library" }]} />

        {/* Header Banner */}
        <div className="card-hero bg-white border border-slate-200 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-200">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>University Examination Papers Repository</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Previous-Year Question Papers (PYQ Library)
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              Browse subject-wise university examination papers for Invertis University engineering programmes. Filter by academic year, examination session (End-Semester & Mid-Semester), and view solutions where available.
            </p>
          </div>
        </div>

        {/* Resource Provenance Disclaimer */}
        <ContentNotice compact />

        {/* Programme Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Select Your Academic Programme
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Phase 2 Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedProgrammes.map((prog) => {
              const stats = getProgrammeCurriculumStats(prog, sortedProgrammes);
              const displayName = getProgrammeDisplayName(prog.code, prog.name);
              const isDip = prog.category === "DIPLOMA" || prog.code.startsWith("DIP");
              const isPhd = prog.category === "DOCTORAL" || prog.code.startsWith("PHD");
              const isPg = prog.category === "POSTGRADUATE" || prog.code.startsWith("MTECH");

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group"
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
                        {prog.durationYears} Years
                      </span>
                    </div>

                    {/* Programme Code & Title */}
                    <div className="space-y-1 mb-4">
                      <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                        {prog.code}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-800 transition">
                        {displayName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {prog.department?.name || "Department of Computer Science & Engineering"}
                      </p>
                    </div>

                    {/* Meta stats */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center my-4">
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Semesters</span>
                        <span className="text-sm font-bold text-slate-900">
                          {stats.semesterCount} Sems
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">Subjects</span>
                        <span className="text-sm font-bold text-slate-900">
                          {stats.subjectCount} Courses
                        </span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-lg">
                        <span className="block text-xs text-slate-500">PYQ Archive</span>
                        <span className="text-sm font-bold text-blue-800">
                          {stats.resourceCount} Papers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation CTA */}
                  <Link
                    href={`/pyq/${encodeURIComponent(prog.code)}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-xl shadow-sm transition group-hover:shadow"
                  >
                    <span>Browse Question Papers by Semester</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notice */}
        <div className="bg-slate-100 rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
          <BookOpen className="h-5 w-5 text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block mb-0.5">
              Official University Past Papers Policy
            </span>
            <p>
              Invertis Learn indexes authentic university examination papers for student preparation and revision. Papers are catalogued by subject code, examination session, and examination type.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

