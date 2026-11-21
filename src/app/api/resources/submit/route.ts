import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PDFDocument } from "pdf-lib";
import { z } from "zod";
import { db } from "@/lib/db";
import { allowAttempt, isCurator, sameOrigin } from "@/lib/access";
import { activeSubject } from "@/lib/resource-policy";
import { savePdf, removeStoredFile } from "@/lib/private-storage";
import { reportError } from "@/lib/observability";
import { readBoundedBody } from "@/lib/request-body";
import { ensureCoreCategories } from "@/lib/academic-categories";
import { isPracticalEligible } from "@/lib/subject-classification";

export const dynamic = "force-dynamic";

const MAX_FILE = 10 * 1024 * 1024; // 10 MB

const submissionSchema = z.object({
  categoryCode: z.enum(["PYQ", "NOTES", "LAB_MANUAL"]),
  subjectId: z.string().min(1).max(100),
  title: z.string().trim().min(3).max(180),
  resourceType: z.string().trim().max(50).optional().default(""),
  unitNumber: z.string().optional().default(""),
  authorName: z.string().trim().max(120).optional().default(""),
  sourceReference: z.string().trim().max(1000).optional().default(""),
  // PYQ specific fields
  academicYear: z.string().optional().default(""),
  examType: z.enum(["END_SEMESTER", "MID_SEMESTER", "BACK_PAPER"]).optional(),
  hasSolutions: z.enum(["true", "false"]).optional().default("false"),
  // Practical specific fields
  programmingLanguage: z.string().trim().max(50).optional().default(""),
  experimentNumber: z.string().optional().default(""),
  confirmedPermission: z.enum(["true", "false"]).optional(),
});

export async function POST(request: NextRequest) {
  const isCuratorUser = await isCurator();
  const isStudentSubmission =
    request.headers.get("x-submission-source") === "student" ||
    request.headers.get("x-student-submission") === "true";

  if (!isCuratorUser && !isStudentSubmission) {
    return NextResponse.json({ error: "Authentication or student submission header required" }, { status: 401 });
  }

  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  const rateLimitKey = isCuratorUser ? "curator-uploads" : "student-uploads";
  const rateLimitMax = isCuratorUser ? 50 : 15;
  if (!allowAttempt(rateLimitKey, rateLimitMax, 60 * 60_000)) {
    return NextResponse.json({ error: "Upload limit reached. Please try again later." }, { status: 429 });
  }

  let savedPath: string | undefined;

  try {
    const body = await readBoundedBody(request, MAX_FILE + 64 * 1024);
    if (!body) {
      return NextResponse.json({ error: "Maximum PDF size is 10 MB" }, { status: 413 });
    }

    let form: FormData;
    try {
      form = await new Response(new Uint8Array(body), {
        headers: { "Content-Type": request.headers.get("content-type") || "" }
      }).formData();
    } catch {
      return NextResponse.json({ error: "Invalid multipart form upload" }, { status: 400 });
    }

    const rawData = Object.fromEntries(form);

    // Explicit copyright and permission confirmation check
    if (rawData.confirmedPermission !== "true") {
      return NextResponse.json({ error: "Explicit confirmation of sharing rights and copyright permission is required." }, { status: 400 });
    }

    const parsed = submissionSchema.safeParse(rawData);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const {
      categoryCode,
      subjectId,
      title,
      resourceType,
      unitNumber,
      authorName,
      sourceReference,
      academicYear,
      examType,
      hasSolutions,
      programmingLanguage,
      experimentNumber,
    } = parsed.data;

    // Validate file
    const file = form.get("file");
    if (
      !(file instanceof File) ||
      !file.name.toLowerCase().endsWith(".pdf") ||
      file.type !== "application/pdf" ||
      !file.size
    ) {
      return NextResponse.json({ error: "Please select a non-empty PDF file (.pdf)" }, { status: 400 });
    }

    if (file.size > MAX_FILE) {
      return NextResponse.json({ error: "Maximum PDF size is 10 MB" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Validate PDF structure and integrity with pdf-lib
    try {
      if (!buffer.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
        throw new Error("Invalid PDF header signature");
      }
      const pdf = await PDFDocument.load(buffer, { updateMetadata: false });
      if (pdf.isEncrypted || pdf.getPageCount() < 1 || pdf.getPageCount() > 500) {
        throw new Error("PDF must be unencrypted and contain 1 to 500 pages");
      }
    } catch (e) {
      return NextResponse.json({
        error: e instanceof Error && e.message ? e.message : "PDF document is corrupt or invalid."
      }, { status: 400 });
    }

    // Validate subject exists
    const subject = await db.subject.findFirst({
      where: { ...activeSubject, id: subjectId },
      select: {
        id: true,
        code: true,
        name: true,
        subjectType: true,
        practicalHours: true,
        lectureHours: true,
        evaluationMarks: true,
        syllabusDetails: true,
        semester: {
          select: {
            semesterNumber: true,
            curriculumVersion: {
              select: {
                programme: {
                  select: { code: true, name: true }
                }
              }
            }
          }
        }
      }
    });

    if (!subject) {
      return NextResponse.json({ error: "Selected subject was not found or is inactive" }, { status: 404 });
    }

    // Backend validation: Practical materials can only be submitted for practical-eligible subjects
    if (categoryCode === "LAB_MANUAL") {
      const eligible = isPracticalEligible({
        code: subject.code,
        name: subject.name,
        subjectType: subject.subjectType,
        practicalHours: subject.practicalHours,
        lectureHours: subject.lectureHours,
        evaluationMarks: subject.evaluationMarks,
        syllabusDetails: subject.syllabusDetails
      });

      if (!eligible) {
        return NextResponse.json({
          error: `Practical materials cannot be submitted for theory-only subject: ${subject.code} (${subject.name}).`
        }, { status: 400 });
      }
    }

    // Ensure category exists
    let category = await db.resourceCategory.findUnique({
      where: { code: categoryCode }
    });
    if (!category) {
      await ensureCoreCategories(db);
      category = await db.resourceCategory.findUnique({
        where: { code: categoryCode }
      });
    }
    if (!category) {
      return NextResponse.json({ error: `Category '${categoryCode}' is not configured in database` }, { status: 503 });
    }

    // Determine unit number or experiment number
    const resolvedUnitNum = unitNumber ? parseInt(unitNumber, 10) : (experimentNumber ? parseInt(experimentNumber, 10) : null);
    const validUnitNum = Number.isInteger(resolvedUnitNum) && resolvedUnitNum! >= 1 && resolvedUnitNum! <= 50 ? resolvedUnitNum : null;

    // Build compound attribution and provenance note
    const attributionParts: string[] = [];
    if (sourceReference) attributionParts.push(sourceReference);
    if (programmingLanguage) attributionParts.push(`Language: ${programmingLanguage}`);
    if (!isCuratorUser) attributionParts.push("Student contributed (rights confirmed)");
    const resolvedSourceRef = attributionParts.join(" | ") || (isCuratorUser ? "Curator upload" : "Student submission");

    // Prevent duplicate submissions of exact same file size for same subject/category
    const existing = await db.academicResource.findFirst({
      where: {
        subjectId,
        categoryId: category.id,
        fileSizeBytes: buffer.length,
        ...(academicYear ? { academicYear } : {}),
        ...(validUnitNum !== null ? { unitNumber: validUnitNum } : {}),
      },
      select: { id: true, title: true }
    });

    if (existing) {
      return NextResponse.json({
        error: "This resource has already been submitted for this subject and unit.",
        existingId: existing.id
      }, { status: 409 });
    }

    // Save physical file
    const saved = await savePdf(buffer);
    savedPath = saved.storagePath;

    // Database transaction: create AcademicResource + ResourceBlob + AuditEvent
    const resource = await db.$transaction(async tx => {
      const result = await tx.academicResource.create({
        data: {
          subjectId,
          categoryId: category!.id,
          title: title.slice(0, 180),
          resourceType: resourceType || (categoryCode === "NOTES" ? "COMPLETE_NOTES" : categoryCode === "LAB_MANUAL" ? "LAB_MANUAL" : null),
          unitNumber: validUnitNum,
          authorName: authorName ? authorName.slice(0, 120) : (isCuratorUser ? "Faculty / Curator" : "Student Contributor"),
          sourceReference: resolvedSourceRef.slice(0, 1000),
          academicYear: academicYear || (categoryCode === "PYQ" ? "2024-2025" : null),
          examType: examType || (categoryCode === "PYQ" ? "END_SEMESTER" : null),
          hasSolutions: hasSolutions === "true",
          originalFileName: file.name.slice(0, 180),
          storedFileName: saved.storedFileName,
          storagePath: saved.storagePath,
          mimeType: "application/pdf",
          fileSizeBytes: buffer.length,
          isPublished: false, // Must be approved by curator first
          provenanceStatus: "UNVERIFIED",
        }
      });

      // Persistent byte storage in database for serverless resilience
      await tx.resourceBlob.create({
        data: {
          resourceId: result.id,
          fileData: buffer
        }
      });

      await tx.auditEvent.create({
        data: {
          action: "RESOURCE_SUBMITTED",
          targetId: result.id,
          actor: isCuratorUser ? "curator" : "student",
          detail: JSON.stringify({
            category: categoryCode,
            resourceType,
            originalFileName: file.name,
            sizeBytes: buffer.length,
            subjectCode: subject.code,
            title
          })
        }
      });

      return result;
    });

    savedPath = undefined; // Cleared so catch block won't remove file

    let successMessage = "Your submission has been received and is pending curator approval.";
    if (categoryCode === "NOTES") {
      successMessage = "Your study notes have been submitted successfully and are pending curator approval.";
    } else if (categoryCode === "LAB_MANUAL") {
      successMessage = "Your practical material has been submitted successfully and is pending curator approval.";
    } else if (categoryCode === "PYQ") {
      successMessage = "Your question paper has been submitted successfully and is pending curator approval.";
    }

    return NextResponse.json({
      success: true,
      id: resource.id,
      reference: resource.id.slice(0, 8).toUpperCase(),
      message: successMessage
    }, { status: 201 });

  } catch (error) {
    if (savedPath) {
      await removeStoredFile(savedPath).catch(e => reportError("upload.cleanup", e));
    }
    const incidentId = reportError("resource.submit", error);
    return NextResponse.json({
      error: "Upload failed. Please check the document and try again.",
      incidentId
    }, { status: 500 });
  }
}
