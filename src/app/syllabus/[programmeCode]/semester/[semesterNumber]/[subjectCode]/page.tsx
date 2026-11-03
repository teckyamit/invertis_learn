import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import { PDFViewer } from "@/components/syllabus/PDFViewer";
import {
  ChevronLeft,
  BookOpen,
  Award,
  Clock,
  Layers,
  CheckCircle,
  Target,
  BookmarkCheck,
  FileText,
  AlertCircle,
  Download,
  Calendar,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
    subjectCode: string;
  };
}

interface SyllabusDetails {
  objectives?: string[];
  outcomes?: string[];
  modules?: Array<{
    title: string;
    topics: string;
  }>;
  textBooks?: string[];
  referenceBooks?: string[];
  labExperiments?: string[];
}

export const revalidate = 3600;

export default async function SubjectDetailPage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);
  const semNum = parseInt(params.semesterNumber, 10);
  const subjectCode = decodeURIComponent(params.subjectCode);

  if (isNaN(semNum)) {
    notFound();
  }

  // Find programme, semester, and subject
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
          category: {
            code: "SYLLABUS",
          },
          isPublished: true,
        },
      },
    },
  });

  if (!subject) {
    notFound();
  }

  const semester = subject.semester;
  const curriculum = semester.curriculumVersion;
  const programme = curriculum.programme;
  const syllabusResource = subject.resources[0];

  // Parse structured syllabus details if available
  let details: SyllabusDetails | null = null;
  if (subject.syllabusDetails) {
    try {
      details = JSON.parse(subject.syllabusDetails) as SyllabusDetails;
    } catch (e) {
      console.error("Failed to parse syllabus details JSON for subject:", subject.code, e);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Syllabus Library", href: "/syllabus" },
            { label: programme.code, href: `/syllabus/${encodeURIComponent(programme.code)}` },
            {
              label: semester.title,
              href: `/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}`,
            },
            { label: subject.code },
          ]}
        />

        {/* Back Link */}
        <Link
          href={`/syllabus/${encodeURIComponent(programme.code)}/semester/${semester.semesterNumber}`}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-emerald-700 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {semester.title} Subjects
        </Link>

        {/* Subject Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-md tracking-wider">
                  {subject.code}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {subject.subjectType}
                </span>
                {subject.electiveGroup && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {subject.electiveGroup}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium ml-1">
                  {semester.title} • {programme.name}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {subject.name}
              </h1>

              <p className="text-xs text-slate-500 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Curriculum Scheme: <strong>{curriculum.regulationName}</strong></span>
                <span>•</span>
                <span>Affiliation: Invertis University Bareilly</span>
              </p>
            </div>

            {/* Quick Action Button */}
            {syllabusResource && (
              <div className="flex-shrink-0">
                <a
                  href={`/api/syllabus/download?file=${encodeURIComponent(syllabusResource.storedFileName)}&name=${encodeURIComponent(subject.code + "-" + subject.name)}`}
                  className="inline-flex items-center px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Official PDF
                </a>
              </div>
            )}
          </div>

          {/* Academic Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Award className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
                Academic Credits
              </span>
              <span className="text-xl font-bold text-slate-900">{subject.credits} Credits</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Clock className="h-3.5 w-3.5 text-slate-500 mr-1.5" />
                Teaching Hours (L-T-P)
              </span>
              <span className="text-xl font-bold text-slate-900">
                {subject.lectureHours} - {subject.tutorialHours} - {subject.practicalHours}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Lectures - Tutorials - Practicals</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 sm:col-span-2">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Layers className="h-3.5 w-3.5 text-slate-500 mr-1.5" />
                Examination & Assessment Structure
              </span>
              <span className="text-sm font-semibold text-slate-900 block">
                {subject.evaluationMarks || "As prescribed in Invertis University Academic Regulations"}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Continuous Assessment (CA) & End-Semester (EE)</span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="space-y-8">
          {/* 1. Course Objectives Section (if available) */}
          {details?.objectives && details.objectives.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-100">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Course Objectives</h2>
                  <p className="text-xs text-slate-500">Key goals and fundamental competencies targeted by this course</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {details.objectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Course Outcomes Section (if available) */}
          {details?.outcomes && details.outcomes.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-100">
                <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
                  <BookmarkCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Course Outcomes (COs)</h2>
                  <p className="text-xs text-slate-500">Expected learning outcomes upon successful completion of the course</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {details.outcomes.map((co, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-purple-50/40 border border-purple-100 text-xs text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded text-[11px] flex-shrink-0">
                      CO{idx + 1}
                    </span>
                    <span>{co.replace(/^CO\d+:\s*/, "")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Detailed Unit-Wise Syllabus Section */}
          {details?.modules && details.modules.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Unit-Wise Detailed Syllabus</h2>
                    <p className="text-xs text-slate-500">Official syllabus modules prescribed by the Academic Council</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                  {details.modules.length} Modules
                </span>
              </div>

              <div className="space-y-4">
                {details.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                      <h3 className="font-bold text-sm tracking-wide">{mod.title}</h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                        Unit {idx + 1}
                      </span>
                    </div>
                    <div className="p-5 bg-white text-xs text-slate-700 leading-relaxed">
                      <p className="whitespace-pre-line">{mod.topics}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Practical / Lab Experiments Section (if applicable) */}
          {details?.labExperiments && details.labExperiments.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-5 pb-3 border-b border-slate-100">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Prescribed Practical Experiments</h2>
                  <p className="text-xs text-slate-500">Official laboratory exercises for continuous evaluation</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {details.labExperiments.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-800 font-medium"
                  >
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Recommended Textbooks & Reference Books Section */}
          {((details?.textBooks && details.textBooks.length > 0) ||
            (details?.referenceBooks && details.referenceBooks.length > 0)) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.textBooks && details.textBooks.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-emerald-700" />
                    Recommended Textbooks
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {details.textBooks.map((book, idx) => (
                      <li
                        key={idx}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed"
                      >
                        <span className="font-semibold text-slate-900 block">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {details.referenceBooks && details.referenceBooks.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-slate-600" />
                    Reference Books
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {details.referenceBooks.map((book, idx) => (
                      <li
                        key={idx}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed"
                      >
                        <span className="font-semibold text-slate-900 block">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* 6. In-Browser PDF Preview Section */}
          {syllabusResource ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Official Syllabus PDF Document
                  </h2>
                  <p className="text-xs text-slate-500">
                    Official curriculum document containing the complete syllabus scheme for {subject.name}
                  </p>
                </div>
              </div>

              <PDFViewer
                filePath={syllabusResource.storagePath}
                fileName={syllabusResource.storedFileName}
                title={`Official Syllabus - ${subject.code} ${subject.name}`}
                fileSizeBytes={syllabusResource.fileSizeBytes}
              />
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs text-amber-800 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Syllabus Document In Review</span>
                <p>
                  The official PDF for this course is being processed by the academic department. Please verify with the Department of Computer Science & Engineering.
                </p>
              </div>
            </div>
          )}

          {/* 7. Modular Placeholder for Future Academic Resources (Phase 2 & Phase 3) */}
          <div className="bg-slate-100/70 border border-dashed border-slate-300 rounded-2xl p-6 text-slate-600">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span>Future Academic Resources (Architecture Ready)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              In accordance with our modular roadmap, previous-year question papers (PYQs), faculty lecture notes, and laboratory viva resources for <strong>{subject.code}</strong> will be indexed in this section once verified and approved in subsequent phases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-400">
                <span className="font-semibold block text-slate-500">Phase 2: PYQ Library</span>
                <span>Subject end-term examination papers</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-400">
                <span className="font-semibold block text-slate-500">Phase 3: Learning Notes</span>
                <span>Faculty-approved lecture notes & PPTs</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-400">
                <span className="font-semibold block text-slate-500">Phase 4: Lab & Viva</span>
                <span>Manuals, code templates & viva questions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
