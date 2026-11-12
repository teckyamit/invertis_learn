import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ArrowRight, Layers, FileQuestion, ChevronLeft } from "lucide-react";
import { 
  isLateralEntryProgramme, 
  getLateralEntryConfig, 
  getParentProgrammeCode 
} from "@/lib/lateralEntry";

interface PageProps {
  params: Promise<{
    programmeCode: string;
  }>;
}

export const revalidate = 3600;

export default async function PYQProgrammeSemestersPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const programmeCode = params.programmeCode;

  const programme = await db.programme.findUnique({
    where: { code: programmeCode, isActive: true },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
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

  const isLateral = isLateralEntryProgramme(programmeCode);
  const lateralConfig = getLateralEntryConfig(programmeCode);

  let currentCurriculum = programme.curriculumVersions[0];
  let semesters = currentCurriculum?.semesters || [];

  if (isLateral && lateralConfig) {
    const parentProgramme = await db.programme.findUnique({
      where: { code: lateralConfig.parentCode },
      include: {
        curriculumVersions: {
          where: { isCurrent: true },
          include: {
            semesters: {
              where: {
                semesterNumber: {
                  gte: lateralConfig.minSemester,
                  lte: lateralConfig.maxSemester,
                },
              },
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
                },
              },
              orderBy: { semesterNumber: "asc" },
            },
          },
        },
      },
    });

    if (parentProgramme?.curriculumVersions?.[0]) {
      currentCurriculum = parentProgramme.curriculumVersions[0];
      semesters = currentCurriculum.semesters;
    }
  }

  return (
    <div className="min-h-screen bg-surface-ground py-8">
      <div className="site-container space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "PYQ Library", href: "/pyq" },
            { label: programme.code },
          ]}
        />

        {/* Back link */}
        <Link
          href="/pyq"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-brand-blue transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Programmes
        </Link>

        {/* Programme Header Card */}
        <div className="card-hero p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-blue-50 rounded-full border border-blue-200">
                  {programme.degreeLevel}
                </span>
                <span>•</span>
                <span>{programme.department?.name}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
                {programme.name} — Question Papers
              </h1>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                Programme Code: {programme.code}
              </p>
            </div>
          </div>
        </div>

        {/* Semester Selection Grid */}
        {semesters.length === 0 ? (
          <div className="card-standard p-8 sm:p-12 text-center space-y-4">
            <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto border border-blue-200">
              <FileQuestion className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-xl font-bold text-brand-navy">
              Past Question Papers Archive Pending
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Examination question papers for this programme will be published alongside official curriculum digitization.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href={`/programmes/${encodeURIComponent(programme.code)}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-brand-navy hover:bg-brand-blue text-white rounded-lg text-xs font-bold transition"
              >
                <span>View Programme Details & Eligibility</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/pyq"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <span>Browse Active PYQ Library</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-brand-navy flex items-center">
                <Layers className="h-5 w-5 mr-2 text-brand-blue" />
                Choose Semester
              </h2>
              <span className="text-xs text-slate-500">
                Select a semester to access subject-wise past examination papers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {semesters.map((sem) => {
                const pyqCount = sem.subjects.reduce(
                  (sum, s) => sum + s.resources.length,
                  0
                );

                return (
                  <div
                    key={sem.id}
                    className="card-standard p-5 flex flex-col justify-between group hover:border-blue-400 transition"
                  >
                    <div>
                      {/* Semester Number Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue font-bold text-sm flex items-center justify-center border border-blue-200">
                          {sem.semesterNumber}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {sem.subjects.length} Subjects
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-brand-navy group-hover:text-brand-blue transition mb-2">
                        {sem.title}
                      </h3>

                      <div className="text-xs text-slate-600 mb-5">
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-500">Archived Papers:</span>
                          <strong className="text-brand-blue font-semibold">{pyqCount} Available</strong>
                        </div>
                      </div>
                    </div>

                    {/* Link to Semester Subjects */}
                    <Link
                      href={`/pyq/${encodeURIComponent(programme.code)}/semester/${sem.semesterNumber}`}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-brand-blue bg-blue-50 group-hover:bg-brand-blue group-hover:text-white rounded-lg transition"
                    >
                      <span>View Subject Papers</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

