import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { PYQSection } from "@/components/pyq/PYQSection";
import { ChevronLeft, BookOpen, Award, Clock, ArrowRight } from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
    subjectCode: string;
  };
}

export const revalidate = 3600;

export default async function PYQSubjectArchivePage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);
  const semNum = parseInt(params.semesterNumber, 10);
  const subjectCode = decodeURIComponent(params.subjectCode);

  if (isNaN(semNum)) {
    notFound();
  }

  const subject = await db.subject.findFirst({
    where: {
      code: subjectCode,
      semester: {
        semesterNumber: semNum,
        curriculumVersion: {
          isCurrent: true,
          programme: {
            code: programmeCode,
          },
        },
      },
    },
    include: {
      semester: {
        include: {
          curriculumVersion: {
            include: {
              programme: true,
            },
          },
        },
      },
      resources: {
        where: {
          category: { code: "PYQ" },
          isPublished: true,
        },
        orderBy: [{ academicYear: "desc" }, { createdAt: "desc" }],
      },
    },
  });

  if (!subject) {
    notFound();
  }

  const semester = subject.semester;
  const curriculum = semester.curriculumVersion;
  const programme = curriculum.programme;

  const pyqResources = subject.resources.map((r) => ({
    id: r.id,
    title: r.title,
    originalFileName: r.originalFileName,
    storedFileName: r.storedFileName,
    storagePath: r.storagePath,
    fileSizeBytes: r.fileSizeBytes,
    academicYear: r.academicYear,
    examType: r.examType,
    hasSolutions: r.hasSolutions,
    createdAt: r.createdAt,
  }));

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "PYQ Library", href: "/pyq" },
            { label: programme.code, href: `/pyq/${encodeURIComponent(programme.code)}` },
            {
              label: semester.title,
              href: `/pyq/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}`,
            },
            { label: subject.code },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/pyq/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-blue-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {semester.title} Papers
        </Link>

        {/* Subject Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-md tracking-wider">
                  {subject.code}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {subject.subjectType}
                </span>
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {semester.title} • {programme.name}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {subject.name} — Past Question Papers
              </h1>
              <p className="text-xs text-slate-500">
                Official Invertis University Examination Archive • {curriculum.regulationName}
              </p>
            </div>

            {/* Link to Syllabus */}
            <div className="flex-shrink-0">
              <Link
                href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}/${encodeURIComponent(subject.code)}`}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition"
              >
                <BookOpen className="h-4 w-4 mr-1.5 text-emerald-700" />
                View Course Syllabus & PDF
              </Link>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">Credits</span>
              <span className="text-base font-bold text-slate-900">{subject.credits} Credits</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 block">Evaluation Scheme</span>
              <span className="text-xs font-semibold text-slate-900">{subject.evaluationMarks || "University Prescribed"}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 block">Archived Papers</span>
              <span className="text-base font-bold text-blue-800">{pyqResources.length} Past Papers</span>
            </div>
          </div>
        </div>

        {/* Main PYQ Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <PYQSection
            subjectId={subject.id}
            subjectCode={subject.code}
            subjectName={subject.name}
            initialPyqs={pyqResources}
          />
        </div>
      </div>
    </div>
  );
}
