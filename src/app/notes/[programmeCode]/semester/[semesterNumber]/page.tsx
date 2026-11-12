import { resolveProgrammeRoute } from "@/lib/programme-route";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ChevronLeft, Layers, ArrowRight, BookOpen, Award, FileText, Presentation } from "lucide-react";

interface PageProps {
  params: Promise<{
    programmeCode: string;
    semesterNumber: string;
  }>;
}

export const revalidate = 3600;

export default async function NotesSemesterSubjectsPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const programmeCode = params.programmeCode;
  const semNum = Number(params.semesterNumber);

  if (!Number.isInteger(semNum) || semNum < 1 || semNum > 12) {
    notFound();
  }

  const { programme: requestedProgramme, parentCode } = await resolveProgrammeRoute(programmeCode, semNum);
  const curriculumProgramme = await db.programme.findUnique({
    where: { code: parentCode, isActive: true },
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

  if (!curriculumProgramme) {
    notFound();
  }

  const programme = requestedProgramme;
  const currentCurriculum = curriculumProgramme.curriculumVersions[0];
  const semester = currentCurriculum?.semesters[0];

  if (!semester) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-surface-ground py-8">
      <div className="site-container space-y-6">
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
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-brand-blue transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {programme.code} Semesters
        </Link>

        {/* Semester Header Card */}
        <div className="card-hero p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                <span>{programme.name}</span>
                <span>•</span>
                <span>{semester.title}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
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
                className="card-standard p-5 flex flex-col justify-between group hover:border-blue-400 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-brand-navy text-white rounded-md tracking-wider">
                      {sub.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-base font-bold text-brand-navy group-hover:text-brand-blue transition leading-snug">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {sub.subjectType} Course • L-T-P: {sub.lectureHours}-{sub.tutorialHours}-{sub.practicalHours}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {notesCount > 0 ? (
                    <span className="font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                      {notesCount} Notes Available
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">In Review</span>
                  )}

                  <Link
                    href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(sub.code)}`}
                    className="inline-flex items-center text-xs font-semibold text-brand-blue group-hover:text-blue-700"
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

