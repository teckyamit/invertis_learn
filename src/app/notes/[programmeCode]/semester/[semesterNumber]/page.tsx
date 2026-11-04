import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ChevronLeft, Layers, ArrowRight, BookOpen, Award, FileText, Presentation } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
  };
}

export const revalidate = 3600;

export default async function NotesSemesterSubjectsPage({ params }: PageProps) {
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
                      category: { code: "NOTES" },
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
            { label: "Learning Notes", href: "/notes" },
            { label: programme.code, href: `/notes/${encodeURIComponent(programme.code)}` },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/notes/${encodeURIComponent(programme.code)}`}
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
                <span>{semester.title}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {semester.title} Faculty Notes & Study Materials
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Select a subject to access unit-wise lecture notes, PPT presentations, and revision summaries.
              </p>
            </div>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {semester.subjects.map((sub) => {
            const notesCount = sub.resources.length;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition p-5 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900 text-white rounded-md tracking-wider">
                      {sub.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {sub.subjectType} Course • L-T-P: {sub.lectureHours}-{sub.tutorialHours}-{sub.practicalHours}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {notesCount > 0 ? (
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {notesCount} Notes Available
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">In Review</span>
                  )}

                  <Link
                    href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(sub.code)}`}
                    className="inline-flex items-center text-xs font-semibold text-emerald-800 group-hover:text-emerald-900"
                  >
                    <span>View Notes</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

