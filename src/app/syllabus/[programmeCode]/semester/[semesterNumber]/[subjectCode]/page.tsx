import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  SubjectSyllabusView,
  SubjectResourceItem
} from "@/components/syllabus/SubjectSyllabusView";
import { PYQSection } from "@/components/pyq/PYQSection";
import { NotesSection } from "@/components/notes/NotesSection";
import { LabManualSection } from "@/components/labs/LabManualSection";
import { ProjectArchiveSection } from "@/components/projects/ProjectArchiveSection";
import { SubjectPathwaysSection } from "@/components/pathways/SubjectPathwaysSection";
import { Sparkles, CheckCircle } from "lucide-react";
import { 
  isLateralEntryProgramme, 
  getParentProgrammeCode, 
  isSemesterAllowedForProgramme, 
  getLateralEntryConfig 
} from "@/lib/lateralEntry";
import { toCanonicalPdfResource } from "@/lib/pdf-resource-service";

interface PageProps {
  params: Promise<{
    programmeCode: string;
    semesterNumber: string;
    subjectCode: string;
  }>;
}

export const revalidate = 3600;

export default async function SubjectDetailPage({ params: paramsPromise }: PageProps) {
  const params = await paramsPromise;
  const programmeCode = params.programmeCode;
  const semNum = Number(params.semesterNumber);
  const rawSubjectCode = params.subjectCode;
  const decodedSubjectCode = (() => {
    try {
      return decodeURIComponent(rawSubjectCode);
    } catch {
      return rawSubjectCode;
    }
  })();

  if (!Number.isInteger(semNum) || semNum < 1 || semNum > 12) {
    notFound();
  }

  // Strict Lateral Entry Rule: Semesters 1 and 2 do NOT exist for lateral entry
  if (!isSemesterAllowedForProgramme(programmeCode, semNum)) {
    notFound();
  }

  const isLateral = isLateralEntryProgramme(programmeCode);
  const lookupProgCode = getParentProgrammeCode(programmeCode);

  // Find requested programme metadata (for displaying proper lateral title & breadcrumbs)
  const requestedProgramme = await db.programme.findUnique({
    where: { code: programmeCode, isActive: true },
  });

  if (!requestedProgramme) {
    notFound();
  }

  // Find programme, semester, and subject (using shared parent programme curriculum)
  const subject = await db.subject.findFirst({
    where: {
      isActive: true,
      OR: [
        { code: decodedSubjectCode },
        { code: rawSubjectCode },
      ],
      semester: {
        semesterNumber: semNum,
        curriculumVersion: {
          isCurrent: true,
          programme: {
            code: lookupProgCode,
            isActive: true,
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
          isPublished: true,
        },
        include: {
          category: true,
        },
      },
      externalResources: {
        where: { isVerified: true },
        orderBy: [{ unitNumber: "asc" }, { title: "asc" }],
      },
      videoLectures: {
        where: { isVerified: true },
        orderBy: [{ unitNumber: "asc" }, { title: "asc" }],
      },
    },
  });

  if (!subject) {
    notFound();
  }

  const semester = subject.semester;
  const curriculum = semester.curriculumVersion;
  const programme = requestedProgramme || curriculum.programme;

  // Identify and resolve canonical syllabus resource
  const syllabusDbResource = subject.resources.find((r) => r.category.code === "SYLLABUS");
  const canonicalSyllabus = syllabusDbResource
    ? toCanonicalPdfResource(syllabusDbResource, subject.code, subject.name)
    : null;

  const syllabusResource: SubjectResourceItem | null = canonicalSyllabus
    ? {
        id: canonicalSyllabus.id,
        title: canonicalSyllabus.filename,
        originalFileName: canonicalSyllabus.filename,
        storedFileName: canonicalSyllabus.filename,
        provenanceStatus: syllabusDbResource!.provenanceStatus,
        storagePath: canonicalSyllabus.storageKey,
        fileSizeBytes: canonicalSyllabus.fileSizeBytes,
        openUrl: canonicalSyllabus.openUrl,
        downloadUrl: canonicalSyllabus.downloadUrl,
        isAvailable: canonicalSyllabus.isAvailable,
        verificationStatus: canonicalSyllabus.verificationStatus,
      }
    : null;

  let details: any = null;
  if (subject.syllabusDetails) {
    try {
      details = JSON.parse(subject.syllabusDetails);
    } catch (e) {
      console.error("JSON parse error for syllabusDetails:", e);
    }
  }

  // Physical PDF availability check: available if physical file exists on disk
  const isDownloadEligible = Boolean(syllabusResource && syllabusResource.isAvailable);
  const validationStatus = syllabusDbResource?.provenanceStatus === "VERIFIED" ? "VERIFIED" : "IN_REVIEW";
  const validationNotes = isDownloadEligible
    ? undefined
    : `The syllabus for ${subject.code} (${subject.name}) is undergoing departmental digitization. Units and verified download actions will become accessible as soon as academic cross-validation completes.`;

  // Secondary Academic Resources
  const pyqResources = subject.resources
    .filter((r) => r.category.code === "PYQ")
    .map((r) => ({
      id: r.id,
      title: r.title,
      originalFileName: r.originalFileName,
      storedFileName: r.storedFileName,
        provenanceStatus: r.provenanceStatus,
      storagePath: r.storagePath,
      fileSizeBytes: r.fileSizeBytes,
      academicYear: r.academicYear,
      examType: r.examType,
      hasSolutions: r.hasSolutions,
      createdAt: r.createdAt,
    }));

  const noteResources = subject.resources
    .filter((r) => r.category.code === "NOTES")
    .map((r) => ({
      id: r.id,
      title: r.title,
      originalFileName: r.originalFileName,
      storedFileName: r.storedFileName,
        provenanceStatus: r.provenanceStatus,
      storagePath: r.storagePath,
      fileSizeBytes: r.fileSizeBytes,
      authorName: r.authorName,
      unitNumber: r.unitNumber,
      resourceType: r.resourceType,
      createdAt: r.createdAt,
    }));

  const labResources = subject.resources
    .filter((r) => r.category.code === "LAB_MANUAL")
    .map((r) => ({
      id: r.id,
      title: r.title,
      originalFileName: r.originalFileName,
      storedFileName: r.storedFileName,
        provenanceStatus: r.provenanceStatus,
      storagePath: r.storagePath,
      fileSizeBytes: r.fileSizeBytes,
      authorName: r.authorName,
      resourceType: r.resourceType,
      createdAt: r.createdAt,
    }));

  const projectResources = subject.resources
    .filter((r) => r.category.code === "PROJECT_ARCHIVE")
    .map((r) => ({
      id: r.id,
      title: r.title,
      originalFileName: r.originalFileName,
      storedFileName: r.storedFileName,
        provenanceStatus: r.provenanceStatus,
      storagePath: r.storagePath,
      fileSizeBytes: r.fileSizeBytes,
      authorName: r.authorName,
      resourceType: r.resourceType,
    }));

  const isCapstoneSubject =
    projectResources.length > 0 ||
    subject.code.toLowerCase().includes("proj") ||
    subject.name.toLowerCase().includes("project") ||
    subject.name.toLowerCase().includes("thesis") ||
    subject.name.toLowerCase().includes("industrial training") ||
    subject.name.toLowerCase().includes("colloquium");

  return (
    <SubjectSyllabusView
      subject={{
        id: subject.id,
        code: subject.code,
        name: subject.name,
        subjectType: subject.subjectType,
        electiveGroup: subject.electiveGroup,
        credits: subject.credits,
        lectureHours: subject.lectureHours,
        tutorialHours: subject.tutorialHours,
        practicalHours: subject.practicalHours,
        evaluationMarks: subject.evaluationMarks,
        syllabusDetails: subject.syllabusDetails,
      }}
      semester={{
        semesterNumber: semester.semesterNumber,
        title: semester.title,
      }}
      programme={{
        code: programme.code,
        name: programme.name,
      }}
      curriculum={{
        regulationName: curriculum.regulationName || undefined,
        versionYear: curriculum.versionYear || undefined,
      }}
      syllabusResource={syllabusResource}
      externalResources={subject.externalResources}
      videoLectures={subject.videoLectures}
      isDownloadEligible={isDownloadEligible}
      validationStatus={validationStatus}
      validationNotes={validationNotes}
    >
      {/* 7. Previous Year Question Papers (PYQ Library - Phase 2) */}
      <div className="card-standard p-6 md:p-8">
        <PYQSection
          subjectId={subject.id}
          subjectCode={subject.code}
          subjectName={subject.name}
          initialPyqs={pyqResources}
        />
      </div>

      {/* 8. Faculty Lecture Notes & Learning Resources (Phase 3) */}
      <div className="card-standard p-6 md:p-8">
        <NotesSection
          subjectId={subject.id}
          subjectCode={subject.code}
          subjectName={subject.name}
          initialNotes={noteResources}
        />
      </div>

      {/* 9. Laboratory Manuals & Practical Materials (Phase 4) */}
      <div className="card-standard p-6 md:p-8">
        <LabManualSection
          subjectId={subject.id}
          subjectCode={subject.code}
          subjectName={subject.name}
          initialLabs={labResources}
          labExperiments={details?.labExperiments || []}
        />
      </div>

      {/* 10. Department Knowledge Centre & Capstone Academic Projects (Phase 5) */}
      {isCapstoneSubject && (
        <ProjectArchiveSection
          subjectCode={subject.code}
          subjectName={subject.name}
          projectResources={projectResources}
        />
      )}

      {/* 11. Career Pathways & Department Specialization Tracks (Phase 6) */}
      <SubjectPathwaysSection
        subjectCode={subject.code}
        subjectName={subject.name}
      />

      {/* 12. Academic Modules Roadmap */}
      <div className="card-standard p-6 bg-surface-ground text-slate-600">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4 text-brand-blue" />
          <span>Department Academic Progression</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          In accordance with our platform roadmap, all core curriculum resources, question banks, lecture notes, lab guides, capstone project specifications, and career specialization tracks are actively verified and accessible without authentication.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-blue-50/70 p-3 rounded-lg border border-blue-200 text-slate-700">
            <span className="font-semibold block text-brand-blue flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-brand-blue" /> Knowledge Centre & Archives
            </span>
            <span>Active: IEEE synopses, capstone timelines, manuals & viva rubrics</span>
          </div>
          <div className="bg-blue-50/70 p-3 rounded-lg border border-blue-200 text-slate-700">
            <span className="font-semibold block text-brand-blue flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-brand-blue" /> Career Pathways & Specializations
            </span>
            <span>Active: 6 specialization tracks, industry certifications & skill roadmaps</span>
          </div>
        </div>
      </div>
    </SubjectSyllabusView>
  );
}
