import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { SemesterFilter } from "@/components/syllabus/SemesterFilter";
import { ChevronLeft, BookOpen, Layers, Award, FileText, ArrowRight, AlertCircle, GraduationCap } from "lucide-react";
import { 
  resolveCanonicalCode,
  programSupportsLateral,
  parseEntryMode,
  getActiveEntryDetails,
  isSemesterAllowedForMode
} from "@/lib/admissionModes";

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

export async function generateMetadata({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const rawCode = params.programmeCode;
  const canonicalCode = resolveCanonicalCode(rawCode);
  const semNum = Number(params.semesterNumber);
  const entryMode = parseEntryMode(searchParams?.entry);

  const programme = await db.programme.findUnique({
    where: { code: canonicalCode, isActive: true },
  });

  if (!programme) {
    return { title: "Semester Not Found | Invertis Learn" };
  }

  const modeLabel = entryMode === "lateral" ? " (Lateral Entry)" : "";
  if (!isSemesterAllowedForMode(canonicalCode, semNum, entryMode)) {
    return { title: "Semester Not Found | Invertis Learn" };
  }
  return {
    title: `Semester ${semNum} — ${programme.name}${modeLabel} | Invertis Learn`,
    description: `Official subject syllabus, course modules, lecture hours, and credit breakdown for Semester ${semNum} of ${programme.name} at Invertis University.`,
  };
}

export default async function SemesterSubjectsPage({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const rawCode = params.programmeCode;
  const canonicalCode = resolveCanonicalCode(rawCode);
  const semNum = Number(params.semesterNumber);

  if (!Number.isInteger(semNum) || semNum < 1 || semNum > 12) {
    notFound();
  }

  // If a legacy lateral code was accessed, redirect to canonical path with query param
  if (rawCode.toUpperCase() !== canonicalCode.toUpperCase()) {
    redirect(`/syllabus/${canonicalCode}/semester/${semNum}?entry=lateral`);
  }

  const entryMode = parseEntryMode(searchParams?.entry);
  const supportsLateral = programSupportsLateral(canonicalCode);
  const activeDetails = getActiveEntryDetails(canonicalCode, entryMode);
  const isLateralSelected = supportsLateral && entryMode === "lateral";

  // If lateral mode was requested for a semester prior to lateral entry start (e.g. Sem 1 or 2)
  const isSemAllowedInCurrentMode = isSemesterAllowedForMode(canonicalCode, semNum, entryMode);
  if (!isSemAllowedInCurrentMode) {
    notFound();
  }

  // Find programme metadata
  const programme = await db.programme.findUnique({
    where: { code: canonicalCode, isActive: true },
  });

  if (!programme) {
    notFound();
  }

  // Resolve curriculum & semester
  const curriculumProgramme = await db.programme.findUnique({
    where: { code: canonicalCode, isActive: true },
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

  if (!curriculumProgramme) {
    notFound();
  }

  const currentCurriculum = curriculumProgramme.curriculumVersions[0];
  const semester = currentCurriculum?.semesters[0];

  if (!semester) {
    notFound();
  }

  const totalCredits = semester.subjects.reduce((sum, s) => sum + s.credits, 0);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-6">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Engineering", href: "/engineering" },
            { 
              label: `${programme.code}${isLateralSelected ? " (Lateral)" : ""}`, 
              href: `/syllabus/${encodeURIComponent(programme.code)}${isLateralSelected ? "?entry=lateral" : ""}` 
            },
            { label: semester.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/syllabus/${encodeURIComponent(programme.code)}${isLateralSelected ? "?entry=lateral" : ""}`}
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {programme.code} Semesters ({isLateralSelected ? "Lateral Scheme" : "All Semesters"})
        </Link>

        {/* Informative Notice if a Lateral user opened a Sem 1 or 2 URL */}
        {!isSemAllowedInCurrentMode && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm sm:text-base">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Semester {semNum} is Part of the 4-Year Regular Scheme</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed max-w-3xl">
              You are currently viewing in <strong>Lateral Entry mode</strong>, but lateral entry students join directly in <strong>Semester III</strong>. 
              Semesters I and II constitute the first-year foundation for students admitted via the standard 4-year Regular Entry route.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/syllabus/${canonicalCode}/semester/${semNum}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-brand-navy hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Switch to Regular Entry (View Semester {semNum})</span>
              </Link>
              <Link
                href={`/syllabus/${canonicalCode}/semester/${activeDetails.minSemester}?entry=lateral`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-brand-navy border border-slate-300 rounded-lg text-xs font-bold transition"
              >
                <span>Jump to Lateral Entry Start (Semester {activeDetails.minSemester})</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        )}

        {/* Semester Header Card */}
        <div className="card-hero bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <span>{programme.name}</span>
                <span>•</span>
                <span>{currentCurriculum.regulationName}</span>
                {isLateralSelected && (
                  <>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                      Lateral Entry (Sem III–VIII)
                    </span>
                  </>
                )}
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {semester.title} Subjects & Syllabi
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Displaying official curriculum scheme and subject-wise details for Semester {semester.semesterNumber}
                {isLateralSelected ? " under the accelerated lateral entry pathway." : "."}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-center min-w-[100px]">
                <span className="block text-[11px] text-blue-700 font-semibold uppercase">Subjects</span>
                <span className="font-heading text-xl font-bold text-blue-900">{semester.subjects.length}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-center min-w-[100px]">
                <span className="block text-[11px] text-slate-500 font-semibold uppercase">Total Credits</span>
                <span className="font-heading text-xl font-bold text-slate-900">{totalCredits.toFixed(1)}</span>
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
