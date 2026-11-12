import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { ArrowRight, BookOpen, Layers, Calendar, ChevronLeft, GraduationCap, CheckCircle2 } from "lucide-react";
import { 
  resolveCanonicalCode,
  programSupportsLateral,
  parseEntryMode,
  getActiveEntryDetails,
  getProgramAdmissionConfig
} from "@/lib/admissionModes";
import { EntryModeSelector } from "@/components/common/EntryModeSelector";

interface PageProps {
  params: Promise<{
    programmeCode: string;
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
  const entryMode = parseEntryMode(searchParams?.entry);

  const programme = await db.programme.findUnique({
    where: { code: canonicalCode, isActive: true },
  });

  if (!programme) {
    return { title: "Syllabus Not Found | Invertis Learn" };
  }

  const supportsLateral = programSupportsLateral(canonicalCode);
  const modeLabel = (supportsLateral && entryMode === "lateral") ? "Lateral Entry (Sem III–VIII)" : "Regular Entry";

  return {
    title: `${programme.name} — ${modeLabel} Syllabus | Invertis Learn`,
    description: `Official semester-by-semester syllabus schemes, credits, and subject breakdowns for ${programme.name} at Invertis University.`,
  };
}

export default async function ProgrammeSemestersPage({ params: paramsPromise, searchParams: searchParamsPromise }: PageProps) {
  const params = await paramsPromise;
  const searchParams = searchParamsPromise ? await searchParamsPromise : undefined;
  const rawCode = params.programmeCode;
  const canonicalCode = resolveCanonicalCode(rawCode);

  // If a legacy lateral code was accessed, redirect permanently/canonically to canonical code with ?entry=lateral
  if (rawCode.toUpperCase() !== canonicalCode.toUpperCase()) {
    redirect(`/syllabus/${canonicalCode}?entry=lateral`);
  }

  const entryMode = parseEntryMode(searchParams?.entry);
  const supportsLateral = programSupportsLateral(canonicalCode);
  const activeDetails = getActiveEntryDetails(canonicalCode, entryMode);
  const isLateralSelected = supportsLateral && entryMode === "lateral";

  const programme = await db.programme.findUnique({
    where: { code: canonicalCode, isActive: true },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            include: {
              subjects: {
                where: { isActive: true },
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
  const allSemesters = currentCurriculum?.semesters || [];

  // Filter semesters dynamically: for lateral entry, restrict to minSemester..maxSemester (e.g. Semesters 3-8)
  const semesters = isLateralSelected
    ? allSemesters.filter(s => s.semesterNumber >= activeDetails.minSemester && s.semesterNumber <= activeDetails.maxSemester)
    : allSemesters;

  const totalSubjectsCount = semesters.reduce((acc, sem) => acc + sem.subjects.length, 0);
  const totalCreditsCount = semesters.reduce((acc, sem) => acc + sem.subjects.reduce((sum, s) => sum + s.credits, 0), 0);

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-6 sm:space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Engineering", href: "/engineering" },
            { label: programme.code, href: `/programmes/${encodeURIComponent(programme.code)}${isLateralSelected ? "?entry=lateral" : ""}` },
            { label: isLateralSelected ? "Lateral Entry Syllabus" : "Syllabus Library" },
          ]}
        />

        {/* Back link */}
        <Link
          href="/engineering"
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Engineering Programs
        </Link>

        {/* Programme Header Card */}
        <div className="card-hero bg-white border border-slate-200 p-6 sm:p-10 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-blue-50 rounded-full border border-blue-200">
                  {programme.degreeLevel}
                </span>
                <span>•</span>
                <span>{programme.department?.name}</span>
                {supportsLateral && (
                  <>
                    <span>•</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isLateralSelected
                        ? "bg-purple-100 text-purple-900 border border-purple-200"
                        : "bg-blue-100 text-blue-900 border border-blue-200"
                    }`}>
                      {isLateralSelected ? "Lateral Entry Scheme (Sem III–VIII)" : "Regular 4-Year Scheme"}
                    </span>
                  </>
                )}
                {isLateralSelected && activeDetails.officialCode && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                    {activeDetails.officialCode}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                {programme.name}
                {isLateralSelected && (
                  <span className="text-blue-700 text-xl sm:text-2xl font-bold ml-2">
                    (Lateral Entry)
                  </span>
                )}
              </h1>
              <p className="text-xs font-mono font-bold text-slate-400 mt-1">
                Programme Code: {programme.code}
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 shrink-0">
              <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div className="text-xs">
                <span className="block text-slate-400 font-medium">Curriculum Scheme</span>
                <span className="font-bold text-slate-900">{currentCurriculum?.regulationName || "Session 2023-24"}</span>
              </div>
            </div>
          </div>

          {/* Quick Overview Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Duration</span>
              <span className="text-base font-bold text-slate-900">{activeDetails.durationYears} Academic Years</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Active Semesters</span>
              <span className="text-base font-bold text-slate-900">{semesters.length} Semesters ({activeDetails.minSemester}–{activeDetails.maxSemester})</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Total Subjects</span>
              <span className="text-base font-bold text-slate-900">
                {totalSubjectsCount} Subjects
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-xs text-slate-500">Total Credits</span>
              <span className="text-base font-bold text-slate-900">
                {totalCreditsCount.toFixed(1)} Credits
              </span>
            </div>
          </div>

          {/* Lateral Entry Pathway Callout */}
          {isLateralSelected && (
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-purple-50/80 border border-purple-200 text-purple-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                  Lateral Entry Pathway (Direct Admission to 2nd Year)
                </span>
                <p className="text-xs sm:text-sm text-purple-900 leading-relaxed">
                  Students join directly in <strong>Semester III</strong> and follow the verified curriculum through <strong>Semester VIII</strong>. 
                  Displaying <strong>{semesters.length} active semesters</strong> and <strong>{totalSubjectsCount} subjects</strong>.
                </p>
              </div>
              <Link
                href={`/syllabus/${programme.code}`}
                className="shrink-0 text-xs font-bold text-purple-800 hover:text-purple-950 bg-white px-3.5 py-2 rounded-lg border border-purple-200 shadow-2xs hover:shadow-xs transition flex items-center"
              >
                <span>Switch to 4-Year Regular Scheme</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Admission Mode Switcher for eligible programmes */}
        {supportsLateral && (
          <EntryModeSelector
            canonicalCode={canonicalCode}
            currentMode={entryMode}
            basePath={`/syllabus/${canonicalCode}`}
          />
        )}

        {/* Semester Selection Grid */}
        {semesters.length === 0 ? (
          <div className="card-hero bg-white border border-slate-200 p-8 sm:p-12 text-center space-y-4 rounded-2xl">
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <BookOpen className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              Official University Syllabus Document Pending
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              In accordance with university source priority and our strict zero-hallucination policy, semester-wise subjects are only published when official university syllabus PDFs are ingested.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href={`/programmes/${encodeURIComponent(programme.code)}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-brand-navy hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition"
              >
                <span>View Programme Details & Eligibility</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/engineering"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <span>Browse Engineering Programs</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-blue-600" />
                {isLateralSelected ? "Lateral Entry Semesters (Sem III to VIII)" : "Choose Semester"}
              </h2>
              <span className="text-xs text-slate-500">
                {isLateralSelected ? "Semesters 3 to 8 active" : "Select a semester to inspect prescribed subjects"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {semesters.map((sem) => {
                const theoryCount = sem.subjects.filter((s) => s.subjectType === "THEORY").length;
                const practicalCount = sem.subjects.filter((s) => s.subjectType === "PRACTICAL").length;
                const electiveCount = sem.subjects.filter((s) => s.electiveGroup).length;
                const totalCredits = sem.subjects.reduce((sum, s) => sum + s.credits, 0);

                return (
                  <div
                    key={sem.id}
                    className="card-standard p-5 sm:p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Semester Number Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200">
                          {sem.semesterNumber}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {sem.subjects.length} Subjects
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">
                        {sem.title}
                      </h3>

                      {/* Breakdown */}
                      <div className="space-y-1.5 text-xs text-slate-600 mb-5">
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-500">Total Credits:</span>
                          <strong className="text-slate-900 font-semibold">{totalCredits.toFixed(1)}</strong>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-slate-500">Course Breakdown:</span>
                          <span className="text-slate-700">
                            {theoryCount} Theory • {practicalCount} Lab
                          </span>
                        </div>
                        {electiveCount > 0 && (
                          <div className="flex items-center justify-between py-1 border-b border-slate-100 text-amber-700">
                            <span>Electives Available:</span>
                            <span className="font-semibold">{electiveCount} Courses</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${sem.semesterNumber}${isLateralSelected ? "?entry=lateral" : ""}`}
                      className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-lg transition"
                    >
                      <span>View Subjects</span>
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
