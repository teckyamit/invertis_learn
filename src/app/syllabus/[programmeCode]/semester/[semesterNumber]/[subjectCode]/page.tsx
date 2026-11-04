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
import { Sparkles, CheckCircle } from "lucide-react";

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
          isPublished: true,
        },
        include: {
          category: true,
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

      {/* 10. Future Academic Modules Roadmap (Phase 5 & 6) */}
      <div className="bg-slate-100/70 border border-dashed border-slate-300 rounded-2xl p-6 text-slate-600">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          <span>Future Academic Modules Roadmap</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          In accordance with our incremental engineering roadmap, departmental knowledge archives, capstone projects, and career specialization tracks for <strong>{subject.code}</strong> will be integrated into this workspace once authorized in subsequent phases.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-200 text-slate-700">
            <span className="font-semibold block text-emerald-800 flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1 text-emerald-600" /> Phase 4: Practical Manuals
            </span>
            <span>Active: Official lab manuals, viva questions & code templates</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-400">
            <span className="font-semibold block text-slate-500">Phase 5: Knowledge Centre</span>
            <span>Departmental project archives, research colloquia & seminars</span>
          </div>
        </div>
      </div>
    </SubjectSyllabusView>
  );
}
