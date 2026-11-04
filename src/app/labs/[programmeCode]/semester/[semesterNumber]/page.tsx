import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ChevronLeft, FlaskConical, ArrowRight, BookOpen, Clock, ListOrdered } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
  };
}

export const revalidate = 3600;

export default async function LabsSemesterSubjectsPage({ params }: PageProps) {
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
                where: { isActive: true, subjectType: "PRACTICAL" },
                include: {
                  resources: {
                    where: {
                      category: { code: "LAB_MANUAL" },
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
            { label: "Lab Manuals", href: "/labs" },
            { label: programme.code, href: `/labs/${encodeURIComponent(programme.code)}` },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/labs/${encodeURIComponent(programme.code)}`}
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
                {semester.title} Practical Laboratories
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Select a laboratory course to access official experiment lists, PDF manuals, code templates, and viva questions.
              </p>
            </div>
          </div>
        </div>

        {/* Practical Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {semester.subjects.map((sub) => {
            const manualsCount = sub.resources.length;
            let experimentsCount = 0;
            if (sub.syllabusDetails) {
              try {
                const parsed = JSON.parse(sub.syllabusDetails);
                if (parsed.labExperiments) {
                  experimentsCount = parsed.labExperiments.length;
                }
              } catch (e) {}
            }

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
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {sub.credits} Credits
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Practical: {sub.practicalHours} Hours/Week</span>
                    </p>
                  </div>

                  {experimentsCount > 0 && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                      <span className="flex items-center">
                        <ListOrdered className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                        Prescribed Exercises
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {experimentsCount} Experiments
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  {manualsCount > 0 ? (
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {manualsCount} Manuals & Guides
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">Under Review</span>
                  )}

                  <Link
                    href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(sub.code)}`}
                    className="inline-flex items-center text-xs font-semibold text-emerald-800 group-hover:text-emerald-900"
                  >
                    <span>Open Lab Workspace</span>
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
