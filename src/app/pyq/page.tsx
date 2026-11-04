import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { FileQuestion, ShieldCheck, ArrowRight, Calendar, Layers, BookOpen } from "lucide-react";
import { 
  getProgrammeCurriculumStats, 
  getProgrammeDisplayName 
} from "@/lib/lateralEntry";

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
    orderBy: { degreeLevel: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ label: "PYQ Library" }]} />

        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
              <span>University Examination Papers Repository</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Previous-Year Question Papers (PYQ Library)
            </h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Browse subject-wise university examination papers for Invertis University engineering programmes. Filter by academic year, examination session (End-Semester & Mid-Semester), and view solutions where available.
            </p>
          </div>
        </div>

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
            {programmes.map((prog) => {
              const stats = getProgrammeCurriculumStats(prog, programmes);
              const displayName = getProgrammeDisplayName(prog.code, prog.name);

              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200 p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Degree Level & Regulation */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-full border border-blue-200">
                        {prog.degreeLevel === "UNDERGRADUATE" ? "Undergraduate (UG)" : "Postgraduate (PG)"}
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

