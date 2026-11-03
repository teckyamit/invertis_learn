import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ArrowRight, BookOpen, Layers, Award, Calendar, ChevronLeft, GraduationCap } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
  };
}

export const revalidate = 3600;

export default async function ProgrammeSemestersPage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);

  const programme = await db.programme.findUnique({
    where: { code: programmeCode },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            include: {
              subjects: {
                where: { isActive: true },
              },
            },
            orderBy: { semesterNumber: "asc" },
          },
        },
      },
    },
  });

  if (!programme) {
    notFound();
  }

  const currentCurriculum = programme.curriculumVersions[0];
  const semesters = currentCurriculum?.semesters || [];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Syllabus Library", href: "/syllabus" },
            { label: programme.code },
          ]}
        />

        {/* Back link */}
        <Link
          href="/syllabus"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Programmes
        </Link>

        {/* Programme Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">
                  {programme.degreeLevel}
                </span>
                <span>•</span>
                <span>{programme.department?.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {programme.name}
              </h1>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                Programme Code: {programme.code}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
              <Calendar className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="block text-slate-400 font-medium">Curriculum Scheme</span>
                <span className="font-bold text-slate-900">{currentCurriculum?.regulationName || "Session 2023-24"}</span>
              </div>
            </div>
          </div>

          {/* Quick Overview Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Duration</span>
              <span className="text-base font-bold text-slate-900">{programme.durationYears} Academic Years</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Semesters</span>
              <span className="text-base font-bold text-slate-900">{semesters.length} Semesters</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Total Subjects</span>
              <span className="text-base font-bold text-slate-900">
                {semesters.reduce((acc, sem) => acc + sem.subjects.length, 0)} Subjects
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Total Credits</span>
              <span className="text-base font-bold text-slate-900">
                {semesters.reduce((acc, sem) => acc + sem.subjects.reduce((sum, s) => sum + s.credits, 0), 0).toFixed(1)} Credits
              </span>
            </div>
          </div>
        </div>

        {/* Semester Selection Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center">
              <Layers className="h-5 w-5 mr-2 text-emerald-700" />
              Choose Semester
            </h2>
            <span className="text-xs text-slate-500">
              Select a semester to inspect its prescribed subjects
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {semesters.map((sem) => {
              const theoryCount = sem.subjects.filter((s) => s.subjectType === "THEORY").length;
              const practicalCount = sem.subjects.filter((s) => s.subjectType === "PRACTICAL").length;
              const electiveCount = sem.subjects.filter((s) => s.electiveGroup).length;
              const totalCredits = sem.subjects.reduce((sum, s) => sum + s.credits, 0);

              return (
                <div
                  key={sem.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Semester Number Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center border border-emerald-200">
                        {sem.semesterNumber}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {sem.subjects.length} Subjects
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition mb-2">
                      {sem.title}
                    </h3>

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Total Credits:</span>
                        <strong className="text-slate-900 font-semibold">{totalCredits.toFixed(1)}</strong>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-100">
                        <span className="text-slate-500">Course Breakdown:</span>
                        <span className="text-slate-700">
                          {theoryCount} Theory • {practicalCount} Lab
                        </span>
                      </div>
                      {electiveCount > 0 && (
                        <div className="flex items-center justify-between py-1">
                          <span className="text-slate-500">Electives:</span>
                          <span className="text-amber-700 font-medium">{electiveCount} Offered</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Link to Semester Subjects */}
                  <Link
                    href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${sem.semesterNumber}`}
                    className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 group-hover:bg-emerald-800 group-hover:text-white rounded-lg transition"
                  >
                    <span>View Subjects</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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

