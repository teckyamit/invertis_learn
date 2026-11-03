import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { SemesterFilter } from "@/components/syllabus/SemesterFilter";
import { ChevronLeft, BookOpen, Layers, Award, FileText } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
  };
}

export const revalidate = 3600;

export default async function SemesterSubjectsPage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);
  const semNum = parseInt(params.semesterNumber, 10);

  if (isNaN(semNum)) {
    notFound();
  }

  // Find programme and its current curriculum
  const programme = await db.programme.findUnique({
    where: { code: programmeCode },
    include: {
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            where: { semesterNumber: semNum },
            include: {
              subjects: {
                where: { isActive: true },
                orderBy: { code: "asc" },
              },
            },
          },
        },
      },
    },
  });

  if (!programme) {
    notFound();
  }

  const currentCurriculum = programme.curriculumVersions[0];
  const semester = currentCurriculum?.semesters[0];

  if (!semester) {
    notFound();
  }

  const totalCredits = semester.subjects.reduce((sum, s) => sum + s.credits, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Syllabus Library", href: "/syllabus" },
            { label: programme.code, href: `/syllabus/${encodeURIComponent(programme.code)}` },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/syllabus/${encodeURIComponent(programme.code)}`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {programme.code} Semesters
        </Link>

        {/* Semester Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <span>{programme.name}</span>
                <span>•</span>
                <span>{currentCurriculum.regulationName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {semester.title} Subjects & Syllabi
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Displaying the official curriculum scheme and subject-wise details for Semester {semester.semesterNumber}.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-center">
                <span className="block text-[11px] text-emerald-700 font-semibold uppercase">Subjects</span>
                <span className="text-xl font-extrabold text-emerald-900">{semester.subjects.length}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase">Total Credits</span>
                <span className="text-xl font-extrabold text-slate-900">{totalCredits.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Client Filter & Subject Catalog */}
        <SemesterFilter
          programmeCode={programme.code}
          semesterNumber={semester.semesterNumber}
          subjects={semester.subjects}
        />
      </div>
    </div>
  );
}

