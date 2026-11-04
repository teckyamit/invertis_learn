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

interface PageProps {
  params: {
    programmeCode: string;
    semesterNumber: string;
    subjectCode: string;
  };
}

export const revalidate = 3600;

export default async function SubjectDetailPage({ params }: PageProps) {
  const programmeCode = decodeURIComponent(params.programmeCode);
  const semNum = parseInt(params.semesterNumber, 10);
  const subjectCode = decodeURIComponent(params.subjectCode);

  if (isNaN(semNum)) {
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
    where: { code: programmeCode },
  });

  if (!requestedProgramme) {
    notFound();
  }

  // Find programme, semester, and subject (using shared parent programme curriculum)
  const subject = await db.subject.findFirst({
    where: {
      code: subjectCode,
      semester: {
        semesterNumber: semNum,
        curriculumVersion: {
          isCurrent: true,
          programme: {
            code: lookupProgCode,
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

  // Identify syllabus resource
  const syllabusDbResource = subject.resources.find((r) => r.category.code === "SYLLABUS");
  const syllabusResource: SubjectResourceItem | null = syllabusDbResource
    ? {
        id: syllabusDbResource.id,
        title: syllabusDbResource.title,
        originalFileName: syllabusDbResource.originalFileName,
        storedFileName: syllabusDbResource.storedFileName,
        storagePath: syllabusDbResource.storagePath,
        fileSizeBytes: syllabusDbResource.fileSizeBytes,
      }
    : null;

  // Phase 4 Validation & Download Eligibility Check:
  // PDF download is eligible ONLY if:
  // 1. The original PDF belongs specifically to this subject (isolated PDF, not a composite multi-subject book)
  // 2. Structured syllabus information has been extracted and validated
  let details: any = null;
  if (subject.syllabusDetails) {
    try {
      details = JSON.parse(subject.syllabusDetails);
    } catch (e) {
      console.error("JSON parse error for syllabusDetails:", e);
    }
  }

  const isIsolatedPdf = !!(
    syllabusResource &&
    syllabusResource.storedFileName.includes("_Syllabus.pdf") &&
    !syllabusResource.storedFileName.toLowerCase().includes("year")
  );

  const hasStructuredContent = !!(
    details &&
    ((details.modules && details.modules.length > 0) ||
      (details.labExperiments && details.labExperiments.length > 0))
  );

  const isDownloadEligible = isIsolatedPdf && hasStructuredContent;
  const validationStatus = isDownloadEligible ? "VERIFIED" : "IN_REVIEW";
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
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <PYQSection
          subjectId={subject.id}
          subjectCode={subject.code}
          subjectName={subject.name}
          initialPyqs={pyqResources}
        />
      </div>

      {/* 8. Faculty Lecture Notes & Learning Resources (Phase 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <NotesSection
          subjectId={subject.id}
          subjectCode={subject.code}
          subjectName={subject.name}
          initialNotes={noteResources}
        />
      </div>

      {/* 9. Laboratory Manuals & Practical Materials (Phase 4) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
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
      <div className="bg-slate-100/70 border border-dashed border-slate-300 rounded-2xl p-6 text-slate-600">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <span>Department Academic Progression</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          In accordance with our platform roadmap, all core curriculum resources, question banks, lecture notes, lab guides, capstone project specifications, and career specialization tracks are actively verified and accessible without authentication.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-slate-700">
            <span className="font-semibold block text-emerald-800 flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Phase 5: Knowledge Centre
            </span>
            <span>Active: IEEE synopses, capstone timelines, manuals & viva rubrics</span>
          </div>
          <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-slate-700">
            <span className="font-semibold block text-emerald-800 flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Phase 6: Career Pathways
            </span>
            <span>Active: 6 specialization tracks, industry certifications & skill roadmaps</span>
          </div>
        </div>
      </div>
    </SubjectSyllabusView>
  );
}
