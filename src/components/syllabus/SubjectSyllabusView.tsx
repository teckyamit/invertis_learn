"use client";

import React from "react";
import Link from "next/link";
import { provenanceLabel } from "@/lib/resource-policy";
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
  FileCheck,
  FlaskConical,
  Target,
  Sparkles
} from "lucide-react";
import { Breadcrumbs } from "@/components/syllabus/Breadcrumbs";
import {
  ExternalResourcesSection,
  ExternalResourceItem,
} from "@/components/resources/ExternalResourcesSection";
import {
  VideoLecturesSection,
  VideoLectureItem,
} from "@/components/video/VideoLecturesSection";
import {
  getSubjectClassification,
  isPracticalEligible,
  getClassificationBadge,
  isBibliographicEntry,
} from "@/lib/subject-classification";

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
  metadata?: {
    subjectClassification?: string;
    practicalApplicability?: boolean;
    practicalHours?: number;
    curriculumSource?: string;
    verifiedAt?: string;
  };
}

export interface SubjectResourceItem {
  id: string;
  title: string;
  originalFileName: string;
  storedFileName: string;
  provenanceStatus?: string;
  storagePath: string;
  fileSizeBytes: number;
  openUrl?: string;
  downloadUrl?: string;
  isAvailable?: boolean;
  verificationStatus?: "verified" | "pending" | "rejected" | "unknown";
  sourceReference?: string;
  checksumSha256?: string;
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
  externalResources?: ExternalResourceItem[];
  videoLectures?: VideoLectureItem[];
  isDownloadEligible: boolean;
  validationStatus: "VERIFIED" | "IN_REVIEW" | "PENDING";
  validationNotes?: string;
  // Reorganized Section Slots
  pyqSlot?: React.ReactNode;
  notesSlot?: React.ReactNode;
  labSlot?: React.ReactNode;
  projectSlot?: React.ReactNode;
  pathwaysSlot?: React.ReactNode;
  progressionSlot?: React.ReactNode;
  children?: React.ReactNode;
}

export function SubjectSyllabusView({
  subject,
  semester,
  programme,
  curriculum,
  syllabusResource,
  externalResources = [],
  videoLectures = [],
  isDownloadEligible,
  validationStatus,
  validationNotes,
  pyqSlot,
  notesSlot,
  labSlot,
  projectSlot,
  pathwaysSlot,
  progressionSlot,
  children
}: SubjectSyllabusViewProps) {
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

  // Centralized Academic Classification & Practical Eligibility
  const classification = getSubjectClassification({
    code: subject.code,
    name: subject.name,
    subjectType: subject.subjectType,
    lectureHours: subject.lectureHours,
    tutorialHours: subject.tutorialHours,
    practicalHours: subject.practicalHours,
    evaluationMarks: subject.evaluationMarks,
    syllabusDetails: details
  });

  const practicalEligible = isPracticalEligible({
    code: subject.code,
    name: subject.name,
    subjectType: subject.subjectType,
    lectureHours: subject.lectureHours,
    tutorialHours: subject.tutorialHours,
    practicalHours: subject.practicalHours,
    evaluationMarks: subject.evaluationMarks,
    syllabusDetails: details
  });

  const classificationBadge = getClassificationBadge(classification);

  const formattedFileSize = syllabusResource?.fileSizeBytes
    ? `${(syllabusResource.fileSizeBytes / 1024).toFixed(0)} KB`
    : "PDF Document";

  const isAvailable = Boolean(syllabusResource && (syllabusResource.isAvailable ?? true));
  const isVerified = syllabusResource?.verificationStatus === "verified" || syllabusResource?.provenanceStatus === "VERIFIED";

  // Unified canonical endpoints for both Open in Tab and Download PDF
  const openUrl = syllabusResource?.openUrl || (syllabusResource
    ? `/api/syllabus/download?id=${encodeURIComponent(syllabusResource.id)}&inline=1`
    : "#");

  const downloadUrl = syllabusResource?.downloadUrl || (syllabusResource
    ? `/api/syllabus/download?id=${encodeURIComponent(syllabusResource.id)}&name=${encodeURIComponent(
        `${subject.code}-${subject.name}`
      )}`
    : "#");

  const hasModules = !!(details?.modules && Array.isArray(details.modules) && details.modules.length > 0);
  
  // Safe normalization for objectives
  const objectivesList: string[] = details?.objectives
    ? Array.isArray(details.objectives)
      ? details.objectives
      : typeof details.objectives === "string"
      ? (details.objectives as string).split(/(?:\n|(?<=\.))\s+/).map(s => s.trim()).filter(Boolean)
      : []
    : [];

  // Safe normalization for outcomes (handles both Array and single String)
  const outcomesList: string[] = details?.outcomes
    ? Array.isArray(details.outcomes)
      ? details.outcomes
      : typeof details.outcomes === "string"
      ? (details.outcomes as string).split(/(?:CO\d+:|\n)/).map(s => s.trim()).filter(Boolean)
      : []
    : [];

  const hasObjectives = objectivesList.length > 0;
  const hasOutcomes = outcomesList.length > 0;
  const hasObjectivesOrOutcomes = hasObjectives || hasOutcomes;

  // Clean books: filter out orphaned publisher lines and normalize
  const textBooksRaw = details?.textBooks && Array.isArray(details.textBooks) ? details.textBooks : [];
  const referenceBooksRaw = details?.referenceBooks && Array.isArray(details.referenceBooks) ? details.referenceBooks : [];

  const standalonePubPattern = /^(?:mcgraw[- ]*hill\.?|wiley\.?|pearson\.?|tata\s+mcgraw[- ]*hill\.?|phi\.?|tmh\.?|morgan\s+kufmann\s*\(an\s+imprint\s+of\s+elsevier\)\.?|morgan\s+kaufmann\.?)$/i;

  const textBooksList = textBooksRaw.filter(b => !standalonePubPattern.test(b.trim()));
  const referenceBooksList = referenceBooksRaw.filter(b => !standalonePubPattern.test(b.trim()));

  const hasTextBooks = textBooksList.length > 0;
  const hasRefBooks = referenceBooksList.length > 0;
  const hasBooks = hasTextBooks || hasRefBooks;

  // Clean lab experiments: strictly filter out book bibliographic entries
  const rawExperiments = details?.labExperiments && Array.isArray(details.labExperiments) ? details.labExperiments : [];
  const cleanExperiments = rawExperiments.filter(exp => !isBibliographicEntry(exp));
  const hasExperiments = practicalEligible && cleanExperiments.length > 0;

  return (
    <div className="w-full min-h-screen py-8 sm:py-12">
      <div className="site-container space-y-8">
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
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to {semester.title} Subjects
        </Link>

        {/* ========================================================================= */}
        {/* SECTION 1: SUBJECT OVERVIEW AND ACADEMIC INFORMATION                      */}
        {/* ========================================================================= */}
        <section id="overview" className="card-hero bg-white border border-slate-200 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 min-w-0">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold px-3 py-1 bg-slate-900 text-white rounded-md tracking-wider">
                  {subject.code}
                </span>

                {/* Centralized Academic Classification Badge */}
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${classificationBadge.badgeClass}`}>
                  {classificationBadge.label}
                </span>

                {subject.electiveGroup && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {subject.electiveGroup}
                  </span>
                )}

                {validationStatus === "VERIFIED" ? (
                  <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <ShieldCheck className="h-3 w-3 mr-1 text-blue-600" />
                    Source reviewed
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
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight break-words">
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

            {/* Top-Right Download Action (Shown only when physical file exists and is verified eligible) */}
            {syllabusResource && isDownloadEligible && isAvailable && (
              <div className="flex-shrink-0">
                <a
                  href={downloadUrl}
                  download={syllabusResource.storedFileName}
                  className="inline-flex items-center px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
                  title={`Download official syllabus for ${subject.code}`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download syllabus PDF
                </a>
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
              <span className="text-sm font-semibold text-slate-900 block break-words">
                {subject.evaluationMarks || "Continuous Assessment (CA) & End Semester Examination"}
              </span>
              <span className="block text-[10px] text-slate-400 mt-0.5">Continuous Assessment (CA) & End Semester (EE)</span>
            </div>
          </div>

          {/* Section Anchor Navigation Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-slate-400 mr-1">Jump to:</span>
            {hasObjectivesOrOutcomes && (
              <a href="#outcomes" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                Objectives & Outcomes
              </a>
            )}
            {hasModules && (
              <a href="#syllabus" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                Unit Syllabus
              </a>
            )}
            <a href="#syllabus-pdf" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              Syllabus PDF
            </a>
            <a href="#pyqs" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              PYQs
            </a>
            <a href="#notes" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              Study Notes
            </a>
            {practicalEligible && (
              <a href="#practicals" className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition">
                Practicals & Labs
              </a>
            )}
            {hasBooks && (
              <a href="#reference-books" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                Reference Books
              </a>
            )}
            {externalResources.length > 0 && (
              <a href="#external-resources" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
                External Resources
              </a>
            )}
            <a href="#video-lectures" className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              Video Lectures
            </a>
          </div>
        </section>

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
        {/* SECTION 2: COURSE OBJECTIVES AND LEARNING OUTCOMES                        */}
        {/* ========================================================================= */}
        {hasObjectivesOrOutcomes && (
          <section id="outcomes" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
              <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
                <BookmarkCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Course Objectives & Learning Outcomes</h2>
                <p className="text-xs text-slate-500">Academic objectives and expected competencies upon course completion</p>
              </div>
            </div>

            {/* Course Objectives */}
            {hasObjectives && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                  <Target className="h-4 w-4 mr-1.5 text-blue-600" /> Course Objectives
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {objectivesList.map((obj, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs text-slate-700 leading-relaxed"
                    >
                      <span className="font-mono font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded text-[11px] flex-shrink-0">
                        OBJ {idx + 1}
                      </span>
                      <span className="break-words">{obj.replace(/^(?:CO|OBJ)?\s*\d+[:.]?\s*/i, "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Course Outcomes (COs) */}
            {hasOutcomes && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1.5 text-purple-600" /> Course Outcomes (COs)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {outcomesList.map((co, idx) => {
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
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: UNIT-WISE DETAILED SYLLABUS                                    */}
        {/* ========================================================================= */}
        {hasModules && (
          <section id="syllabus" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Unit-Wise Detailed Syllabus</h2>
                  <p className="text-xs text-slate-500">Modules and topics prescribed in university curriculum</p>
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
                  {/* Module Header Bar */}
                  <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                    <h3 className="font-bold text-sm tracking-wide break-words pr-2">{mod.title}</h3>
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded flex-shrink-0">
                      Unit {idx + 1}
                    </span>
                  </div>
                  {/* Module Content Area */}
                  <div className="p-5 bg-white text-xs text-slate-700 leading-relaxed">
                    <p className="whitespace-pre-line break-words">{mod.topics}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: OFFICIAL SYLLABUS PDF DOCUMENT                                 */}
        {/* ========================================================================= */}
        <section id="syllabus-pdf">
          {syllabusResource && isDownloadEligible && isAvailable ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Official Syllabus PDF Document</h2>
                <p className="text-xs text-slate-500">
                  Department-authenticated curriculum document for {subject.name}
                </p>
              </div>

              {/* Document Information Card */}
              <div className="bg-slate-900 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center space-x-3.5 min-w-0 w-full sm:w-auto sm:flex-1">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl flex-shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      Syllabus - {subject.code} {subject.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                      <span className="font-mono text-slate-300">{syllabusResource.storedFileName}</span>
                      <span>•</span>
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono text-[11px]">
                        {formattedFileSize}
                      </span>
                      <span>•</span>
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          Verified by Invertis Learn
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[11px] font-medium">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                          {provenanceLabel(syllabusResource?.provenanceStatus)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto">
                  <a
                    href={openUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700/60 transition shadow-sm flex-1 sm:flex-initial"
                    title="Open syllabus PDF in a new tab"
                  >
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    Open in Tab
                  </a>

                  <a
                    href={downloadUrl}
                    download={syllabusResource.storedFileName}
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-sm transition flex-1 sm:flex-initial"
                    title="Download official subject syllabus PDF"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Download PDF
                  </a>
                </div>
              </div>

              {/* Document Verification Notice */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 gap-2">
                <span className="flex items-center text-slate-600">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
                  {isVerified
                    ? "Authenticated against official university curriculum & academic council ordinance."
                    : "Confirm current syllabus and examination requirements with your department."}
                </span>
                <span className="font-mono text-slate-400 text-[11px] hidden sm:inline">
                  PDF • Invertis University • Session {curriculum.versionYear || "2023-2024"}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl flex-shrink-0 border border-amber-200/50">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">Official Syllabus Document In Progress</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The official subject-specific syllabus document for <strong>{subject.code} — {subject.name}</strong> is currently being digitized and verified from university records. Interactive modules and unit details above remain accessible.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: PREVIOUS-YEAR QUESTION PAPERS (PYQs)                           */}
        {/* ========================================================================= */}
        {pyqSlot}

        {/* ========================================================================= */}
        {/* SECTION 6: STUDY NOTES & FACULTY LECTURE MATERIALS                        */}
        {/* ========================================================================= */}
        {notesSlot}

        {/* ========================================================================= */}
        {/* SECTION 7: PRESCRIBED PRACTICAL EXPERIMENTS (CONDITIONAL)                 */}
        {/* Rendered ONLY if subject is practical-eligible and experiments exist       */}
        {/* ========================================================================= */}
        {hasExperiments && (
          <section id="practicals" className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Prescribed Practical Experiments</h2>
                  <p className="text-xs text-slate-500">Laboratory exercises prescribed in official curriculum</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                {cleanExperiments.length} Experiments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cleanExperiments.map((exp, idx) => (
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
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 8: PRACTICAL MATERIALS & LABORATORY ARCHIVE (CONDITIONAL)         */}
        {/* Rendered ONLY if subject is practical-eligible                             */}
        {/* ========================================================================= */}
        {practicalEligible && labSlot}

        {/* ========================================================================= */}
        {/* SECTION 9: REFERENCE BOOKS & RECOMMENDED TEXTBOOKS                        */}
        {/* Occupies full width when only reference books exist                        */}
        {/* ========================================================================= */}
        {hasBooks && (
          <section id="reference-books">
            <div className={hasTextBooks && hasRefBooks ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "w-full"}>
              {/* Recommended Textbooks */}
              {hasTextBooks && (
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-emerald-700 flex-shrink-0" />
                    Recommended Textbooks
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {textBooksList.map((book, idx) => (
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

              {/* Reference Books */}
              {hasRefBooks && (
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-slate-600 flex-shrink-0" />
                    Reference Books
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {referenceBooksList.map((book, idx) => (
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
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 10: EXTERNAL LEARNING RESOURCES                                   */}
        {/* Always rendered after university academic content                         */}
        {/* ========================================================================= */}
        {externalResources && externalResources.length > 0 && (
          <section id="external-resources">
            <ExternalResourcesSection
              subjectCode={subject.code}
              subjectName={subject.name}
              resources={externalResources}
            />
          </section>
        )}

        {/* ========================================================================= */}
        {/* SECTION 11: RECOMMENDED VIDEO LECTURES                                    */}
        {/* Verified external YouTube links (GATE Smashers, Knowledge Gate, NPTEL)   */}
        {/* ========================================================================= */}
        <section id="video-lectures">
          <VideoLecturesSection
            subjectCode={subject.code}
            subjectName={subject.name}
            videos={videoLectures || []}
          />
        </section>

        {/* Subsequent Sections: Capstone Project Archive & Career Pathways */}
        {projectSlot}
        {pathwaysSlot}
        {progressionSlot}

        {/* Backward compatibility for direct children */}
        {children}
      </div>
    </div>
  );
}
