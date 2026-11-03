import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ChevronLeft, FileQuestion, ArrowRight, BookOpen, Award } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
  };
}

export const revalidate = 3600;

export default async function PYQSemesterSubjectsPage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);
  const semNum = parseInt(params.semesterNumber, 10);

  if (isNaN(semNum)) {
    notFound();
  }

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
                include: {
                  resources: {
                    where: {
                      category: { code: "PYQ" },
                      isPublished: true,
                    },
                  },
                },
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

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "PYQ Library", href: "/pyq" },
            { label: programme.code, href: `/pyq/${encodeURIComponent(programme.code)}` },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/pyq/${encodeURIComponent(programme.code)}`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {programme.code} Semesters
        </Link>

        {/* Semester Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <span>{programme.name}</span>
                <span>•</span>
                <span>{semester.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {semester.title} Previous-Year Papers
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Select a course to browse and download official end-semester and mid-semester examination papers.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-center">
              <span className="block text-[11px] text-blue-700 font-semibold uppercase">Semester Courses</span>
              <span className="text-xl font-extrabold text-blue-900">{semester.subjects.length}</span>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {semester.subjects.map((subject) => {
            const pyqCount = subject.resources.length;

            return (
              <div
                key={subject.id}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md tracking-wider">
                      {subject.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {subject.subjectType}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-blue-800 transition line-clamp-2 text-base leading-snug mb-3">
                    {subject.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4">
                    <span>
                      Credits: <strong>{subject.credits}</strong>
                    </span>
                    <span className="text-blue-700 font-semibold flex items-center">
                      <FileQuestion className="h-3.5 w-3.5 mr-1" />
                      {pyqCount > 0 ? `${pyqCount} Papers Available` : "No Papers Yet"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/pyq/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(subject.code)}`}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-blue-800 bg-blue-50 group-hover:bg-blue-800 group-hover:text-white rounded-lg transition"
                >
                  <span>Explore Question Papers</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

