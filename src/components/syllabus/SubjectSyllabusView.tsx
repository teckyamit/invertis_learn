"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  BookOpen,
  Award,
  Clock,
  Layers,
  CheckCircle,
  BookmarkCheck,
  FileText,
  AlertCircle,
  Download,
  Calendar,
  ExternalLink,
  ShieldCheck,
  FileCheck
} from "lucide-react";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";

export interface SyllabusDetails {
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

export interface SubjectResourceItem {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  storagePath: string;
  fileSizeBytes: number;
}

export interface SubjectSyllabusViewProps {
  subject: {
    id: string;
    code: string;
    name: string;
    subjectType: string;
    isElective?: boolean;
    electiveGroup?: string | null;
    credits: number;
    lectureHours: number;
    tutorialHours: number;
    practicalHours: number;
    evaluationMarks?: string | null;
    syllabusDetails?: string | null;
  };
  semester: {
    semesterNumber: number;
    title: string;
  };
  programme: {
    code: string;
    name: string;
  };
  curriculum: {
    regulationName?: string;
    versionYear?: string;
  };
  syllabusResource?: SubjectResourceItem | null;
  isDownloadEligible: boolean;
  validationStatus: "VERIFIED" | "IN_REVIEW" | "PENDING";
  validationNotes?: string;
  children?: React.ReactNode; // For subsequent Phase 2 (PYQs), Phase 3 (Notes), Phase 4 (Labs)
}

export function SubjectSyllabusView({
  subject,
  semester,
  programme,
  curriculum,
  syllabusResource,
  isDownloadEligible,
  validationStatus,
  validationNotes,
  children
}: SubjectSyllabusViewProps) {
  const [downloading, setDownloading] = useState(false);

  // Parse structured details
  let details: SyllabusDetails | null = null;
  if (subject.syllabusDetails) {
    try {
      details = typeof subject.syllabusDetails === "string"
        ? JSON.parse(subject.syllabusDetails)
        : subject.syllabusDetails;
    } catch (e) {
      console.error("Failed to parse syllabusDetails for subject:", subject.code, e);
    }
  }

  const formattedFileSize = syllabusResource?.fileSizeBytes
    ? `${(syllabusResource.fileSizeBytes / 1024).toFixed(0)} KB`
    : "PDF Document";

  const downloadUrl = syllabusResource
    ? `/api/syllabus/download?file=${encodeURIComponent(syllabusResource.storedFileName)}&name=${encodeURIComponent(
        `${subject.code}-${subject.name}`
      )}`
    : "#";

  const staticPdfUrl = syllabusResource?.storagePath
    ? (syllabusResource.storagePath.startsWith("/") ? syllabusResource.storagePath : `/${syllabusResource.storagePath}`)
    : syllabusResource
    ? `/uploads/syllabus/${syllabusResource.storedFileName}`
    : "#";

  const handleDownload = () => {
    if (!syllabusResource || !isDownloadEligible) return;
    setDownloading(true);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = syllabusResource.storedFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  const isPractical = subject.subjectType === "PRACTICAL";
  const hasModules = !!(details?.modules && details.modules.length > 0);
  const hasOutcomes = !!(details?.outcomes && details.outcomes.length > 0);
  const hasBooks = !!(
    (details?.textBooks && details.textBooks.length > 0) ||
    (details?.referenceBooks && details.referenceBooks.length > 0)
  );
  const hasExperiments = !!(details?.labExperiments && details.labExperiments.length > 0);

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

        {/* ========================================================================= */}
        {/* SECTION 1: SUBJECT OVERVIEW (Master Reference Design: BCS201 Layout)       */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 min-w-0">
              {/* Badges Row */}
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

                {validationStatus === "VERIFIED" ? (
                  <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <ShieldCheck className="h-3 w-3 mr-1 text-blue-600" />
                    Verified Authentic
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <AlertCircle className="h-3 w-3 mr-1 text-amber-600" />
                    In Review
                  </span>
                )}

                <span className="text-xs text-slate-500 font-medium ml-1">
                  {semester.title} • {programme.name}
                </span>
              </div>

              {/* Subject Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight break-words">
                {subject.name}
              </h1>

              {/* Curriculum Scheme & Affiliation */}
              <p className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <span>
                  Curriculum Scheme: <strong>{curriculum.regulationName || `Session ${curriculum.versionYear || "2023-24"} Regulation`}</strong>
                </span>
                <span>•</span>
                <span>Affiliation: Invertis University Bareilly</span>
              </p>
            </div>

            {/* Top-Right Download Action (Shown only when extraction & document are verified eligible) */}
            {syllabusResource && isDownloadEligible && (
              <div className="flex-shrink-0">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition disabled:opacity-75"
                  title={`Download official syllabus for ${subject.code}`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {downloading ? "Downloading..." : "Download Official PDF"}
                </button>
              </div>
            )}
          </div>

          {/* Academic Key Specifications 3-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Card 1: Academic Credits */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Award className="h-3.5 w-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
                Academic Credits
              </span>
              <span className="text-xl font-bold text-slate-900">{subject.credits} Credits</span>
            </div>

            {/* Card 2: Teaching Hours (L-T-P) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Clock className="h-3.5 w-3.5 text-slate-500 mr-1.5 flex-shrink-0" />
                Teaching Hours (L-T-P)
              </span>
              <span className="text-xl font-bold text-slate-900">
                {subject.lectureHours} - {subject.tutorialHours} - {subject.practicalHours}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Lectures - Tutorials - Practicals</span>
            </div>

            {/* Card 3: Examination & Assessment Structure (Spans 2 columns on desktop) */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 sm:col-span-2">
              <span className="text-xs text-slate-500 flex items-center mb-1">
                <Layers className="h-3.5 w-3.5 text-slate-500 mr-1.5 flex-shrink-0" />
                Examination & Assessment Structure
              </span>
              <span className="text-sm font-semibold text-slate-900 block truncate">
                {subject.evaluationMarks || "CA: 25, EE: 50, Total: 75"}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Continuous Assessment (CA) & End Semester (EE)</span>
            </div>
          </div>
        </div>

        {/* Data Review Flag (Displayed if subject is awaiting complete departmental extraction/validation) */}
        {!isDownloadEligible && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 flex items-start space-x-3 shadow-sm">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-amber-950">Academic Content Verification Notice</h4>
              <p className="text-amber-800 leading-relaxed">
                {validationNotes ||
                  `The official syllabus document and unit scheme for ${subject.code} (${subject.name}) are undergoing validation by the Department of Computer Science & Engineering. Content is presented in accordance with Invertis University Academic Regulations.`}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: COURSE OUTCOMES (COs) (Master Reference Design)                 */}
        {/* ========================================================================= */}
        {hasOutcomes && (
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
              {details!.outcomes!.map((co, idx) => {
                const cleanOutcome = co.replace(/^(?:CO\s*\d+[:.]?|Course\s+Outcome\s*\d+[:.]?)\s*/i, "").trim();
                return (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-purple-50/40 border border-purple-100 text-xs text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded text-[11px] flex-shrink-0">
                      CO{idx + 1}
                    </span>
                    <span className="break-words">{cleanOutcome}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: UNIT-WISE DETAILED SYLLABUS (Master Reference Design)           */}
        {/* ========================================================================= */}
        {hasModules && (
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
                {details!.modules!.length} Modules
              </span>
            </div>

            <div className="space-y-4">
              {details!.modules!.map((mod, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Module Header Bar: Dark Navy Slate (Exact BCS201 match) */}
                  <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-sm tracking-wide break-words pr-2">{mod.title}</h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded flex-shrink-0">
                      Unit {idx + 1}
                    </span>
                  </div>
                  {/* Module Content Area: White Background, detailed topics */}
                  <div className="p-5 bg-white text-xs text-slate-700 leading-relaxed">
                    <p className="whitespace-pre-line break-words">{mod.topics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3B: PRESCRIBED PRACTICAL EXPERIMENTS (For Laboratory Subjects)    */}
        {/* ========================================================================= */}
        {hasExperiments && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Prescribed Practical Experiments</h2>
                  <p className="text-xs text-slate-500">Official laboratory exercises for continuous evaluation</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                {details!.labExperiments!.length} Experiments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details!.labExperiments!.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-800 font-medium leading-relaxed flex items-start space-x-2.5"
                >
                  <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="break-words">{exp.replace(/^[0-9]+[.)]\s*/, "")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTIONS 4 & 5: RECOMMENDED TEXTBOOKS & REFERENCE BOOKS (BCS201 Standard)  */}
        {/* ========================================================================= */}
        {hasBooks && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 4: Recommended Textbooks */}
            {details?.textBooks && details.textBooks.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-emerald-700 flex-shrink-0" />
                  Recommended Textbooks
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {details.textBooks.map((book, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed"
                    >
                      <span className="font-semibold text-slate-900 block break-words">{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 5: Reference Books */}
            {details?.referenceBooks && details.referenceBooks.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-slate-600 flex-shrink-0" />
                  Reference Books
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {details.referenceBooks.map((book, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed"
                    >
                      <span className="font-semibold text-slate-900 block break-words">{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 6: OFFICIAL SYLLABUS PDF DOCUMENT (NO EMBEDDED VIEWER)             */}
        {/* ========================================================================= */}
        {syllabusResource && isDownloadEligible ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Official Syllabus PDF Document</h2>
              <p className="text-xs text-slate-500">
                Official curriculum document containing the complete syllabus scheme for {subject.name}
              </p>
            </div>

            {/* Document Information Card (Pure Document Card, NO Inline PDF Object / Iframe) */}
            <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl flex-shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">
                    Official Syllabus - {subject.code} {subject.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="font-mono text-slate-300">{syllabusResource.storedFileName}</span>
                    <span>•</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono text-[11px]">
                      {formattedFileSize}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Official Invertis University Document</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
                <a
                  href={staticPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition flex-1 sm:flex-initial"
                  title="Open PDF in a new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Open in Tab
                </a>

                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition disabled:opacity-75 flex-1 sm:flex-initial"
                  title="Download verified official subject syllabus"
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  {downloading ? "Downloading..." : "Download PDF"}
                </button>
              </div>
            </div>

            {/* Document Verification Notice */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span className="flex items-center">
                <FileCheck className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
                Verified authentic curriculum document approved by Invertis University Academic Council
              </span>
              <span className="font-mono text-slate-400 hidden sm:inline">
                PDF • Session {curriculum.versionYear || "2023-2024"}
              </span>
            </div>
          </div>
        ) : (
          /* Graceful State when extraction is in review or unverified */
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-slate-100 text-slate-600 rounded-xl flex-shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Official Syllabus Document Status</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The subject-specific syllabus for <strong>{subject.code}</strong> is managed under the official Invertis University curriculum. In accordance with university standards, verified PDF download links are activated once all unit modules and examination criteria have undergone academic council cross-verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSEQUENT ACADEMIC RESOURCE SECTIONS (PYQs, Notes, Lab Manuals)          */}
        {/* ========================================================================= */}
        {children}
      </div>
    </div>
  );
}
