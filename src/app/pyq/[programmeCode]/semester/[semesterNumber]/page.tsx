import { resolveProgrammeRoute } from "@/lib/programme-route";
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ChevronLeft, FileQuestion, ArrowRight, BookOpen, Award } from "lucide-react";

interface PageProps {
  params: Promise<{
    programmeCode: string;
    semesterNumber: string;
  }>;
  searchParams?: Promise<{
    entry?: string;
  }>;
}

export const revalidate = 3600;

export default async function PYQSemesterSubjectsPage({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const programmeCode = params.programmeCode;
  const semNum = Number(params.semesterNumber);

  if (!Number.isInteger(semNum) || semNum < 1 || semNum > 12) {
    notFound();
  }

  const { programme: requestedProgramme, parentCode } = await resolveProgrammeRoute(programmeCode, semNum, searchParams?.entry);
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
            { label: "PYQ Library", href: "/pyq" },
            { label: programme.code, href: `/pyq/${encodeURIComponent(programme.code)}` },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/pyq/${encodeURIComponent(programme.code)}`}
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
                {semester.title} Previous-Year Papers
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Select a course to browse and download official end-semester and mid-semester examination papers.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-center">
              <span className="block text-[11px] text-brand-blue font-semibold uppercase">Semester Courses</span>
              <span className="text-xl font-extrabold text-brand-navy">{semester.subjects.length}</span>
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
                className="card-standard p-5 flex flex-col justify-between group hover:border-blue-400 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-brand-navy text-white rounded-md tracking-wider">
                      {subject.code}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                      {subject.subjectType}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-brand-navy group-hover:text-brand-blue transition line-clamp-2 text-base leading-snug mb-3">
                    {subject.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-600 bg-surface-ground p-2.5 rounded-lg border border-slate-200 mb-4">
                    <span>
                      Credits: <strong className="text-brand-navy">{subject.credits}</strong>
                    </span>
                    <span className="text-brand-blue font-semibold flex items-center">
                      <FileQuestion className="h-3.5 w-3.5 mr-1" />
                      {pyqCount > 0 ? `${pyqCount} Papers Available` : "No Papers Yet"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/pyq/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(subject.code)}`}
                  className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-brand-blue bg-blue-50 group-hover:bg-brand-blue group-hover:text-white rounded-lg transition"
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

