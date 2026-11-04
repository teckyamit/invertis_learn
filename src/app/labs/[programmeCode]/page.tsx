import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ArrowRight, FlaskConical, ChevronLeft } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
  };
}

export const revalidate = 3600;

export default async function LabsProgrammeSemestersPage({ params }: PageProps) {
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
                where: { isActive: true, subjectType: "PRACTICAL" },
                include: {
                  resources: {
                    where: {
                      category: { code: "LAB_MANUAL" },
                      isPublished: true,
                    },
                  },
                },
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
            { label: "Lab Manuals", href: "/labs" },
            { label: programme.code },
          ]}
        />

        {/* Back link */}
        <Link
          href="/labs"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Programmes
        </Link>

        {/* Programme Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">
                  {programme.degreeLevel}
                </span>
                <span>•</span>
                <span>{programme.department?.name}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {programme.name} — Laboratory Manuals
              </h1>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                Programme Code: {programme.code}
              </p>
            </div>
          </div>
        </div>

        {/* Semester Selection Grid */}
        {semesters.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <FlaskConical className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              No Practical Semesters Configured
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Practical laboratories are being registered for this academic programme.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Select Academic Semester
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {semesters.length} Semesters Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {semesters.map((sem) => {
                const totalLabsInSem = sem.subjects.reduce(
                  (sum, s) => sum + s.resources.length,
                  0
                );

                return (
                  <Link
                    key={sem.id}
                    href={`/labs/${encodeURIComponent(programme.code)}/semester/${sem.semesterNumber}`}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition p-5 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          SEM {sem.semesterNumber}
                        </span>
                        {totalLabsInSem > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            {totalLabsInSem} Manuals
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition mb-1">
                        {sem.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {sem.subjects.length} Practical Laboratory Courses
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-900">
                      <span>Browse Semester {sem.semesterNumber} Labs</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

