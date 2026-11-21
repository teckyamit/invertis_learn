import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { isCurator, sameOrigin } from "@/lib/access";
import { reportError } from "@/lib/observability";
import { readBoundedBody } from "@/lib/request-body";
import { removeStoredFile } from "@/lib/private-storage";
import { isPracticalEligible } from "@/lib/subject-classification";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await isCurator())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = Number(request.nextUrl.searchParams.get("page") || 1);
  if (!Number.isInteger(page) || page < 1 || page > 10000) return NextResponse.json({ error: "Invalid page" }, { status: 400 });

  const filter = request.nextUrl.searchParams.get("filter") || "pending";
  const categoryParam = request.nextUrl.searchParams.get("category") || "ALL";
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";

  let statusWhere: Prisma.AcademicResourceWhereInput = {};
  if (filter === "pending") {
    statusWhere = { isPublished: false, provenanceStatus: { not: "REJECTED" } };
  } else if (filter === "approved" || filter === "published") {
    statusWhere = { isPublished: true };
  } else if (filter === "rejected") {
    statusWhere = { provenanceStatus: "REJECTED" };
  }

  let categoryWhere: Prisma.AcademicResourceWhereInput = {};
  if (categoryParam === "PYQ") {
    categoryWhere = { category: { code: "PYQ" } };
  } else if (categoryParam === "NOTES") {
    categoryWhere = { category: { code: "NOTES" } };
  } else if (categoryParam === "LAB_MANUAL") {
    categoryWhere = { category: { code: "LAB_MANUAL" } };
  } else if (categoryParam === "LAB_NOTES") {
    categoryWhere = { category: { code: "LAB_MANUAL" }, resourceType: "LAB_NOTES" };
  } else if (categoryParam === "PRACTICAL_FILE") {
    categoryWhere = { category: { code: "LAB_MANUAL" }, resourceType: "PRACTICAL_FILE" };
  } else if (categoryParam === "VIVA_QUESTIONS") {
    categoryWhere = { category: { code: "LAB_MANUAL" }, resourceType: "VIVA_QUESTIONS" };
  }

  const searchWhere: Prisma.AcademicResourceWhereInput = query ? {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { originalFileName: { contains: query, mode: "insensitive" } },
      { authorName: { contains: query, mode: "insensitive" } },
      { subject: { code: { contains: query, mode: "insensitive" } } },
      { subject: { name: { contains: query, mode: "insensitive" } } },
    ]
  } : {};

  const where: Prisma.AcademicResourceWhereInput = {
    ...statusWhere,
    ...categoryWhere,
    ...searchWhere,
  };

  const [
    resources,
    total,
    pendingCount,
    approvedCount,
    rejectedCount,
    pyqCount,
    notesCount,
    labManualCount,
    labNotesCount,
    practicalFileCount,
    vivaCount
  ] = await Promise.all([
    db.academicResource.findMany({
      where,
      include: {
        subject: {
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
                      select: {
                        code: true,
                        name: true,
                      }
                    }
                  }
                }
              }
            }
          }
        },
        category: { select: { code: true, name: true } }
      },
      orderBy: [{ createdAt: "desc" }, { id: "asc" }],
      take: 25,
      skip: (page - 1) * 25
    }),
    db.academicResource.count({ where }),
    db.academicResource.count({ where: { ...categoryWhere, ...searchWhere, isPublished: false, provenanceStatus: { not: "REJECTED" } } }),
    db.academicResource.count({ where: { ...categoryWhere, ...searchWhere, isPublished: true } }),
    db.academicResource.count({ where: { ...categoryWhere, ...searchWhere, provenanceStatus: "REJECTED" } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "PYQ" } } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "NOTES" } } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "LAB_MANUAL" } } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "LAB_MANUAL" }, resourceType: "LAB_NOTES" } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "LAB_MANUAL" }, resourceType: "PRACTICAL_FILE" } }),
    db.academicResource.count({ where: { ...statusWhere, ...searchWhere, category: { code: "LAB_MANUAL" }, resourceType: "VIVA_QUESTIONS" } }),
  ]);

  const mappedResources = resources.map(r => ({
    ...r,
    isPracticalEligible: isPracticalEligible({
      code: r.subject.code,
      name: r.subject.name,
      subjectType: r.subject.subjectType,
      practicalHours: r.subject.practicalHours,
      lectureHours: r.subject.lectureHours,
      evaluationMarks: r.subject.evaluationMarks,
      syllabusDetails: r.subject.syllabusDetails
    })
  }));

  return NextResponse.json({
    resources: mappedResources,
    total,
    page,
    counts: {
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      total: pendingCount + approvedCount + rejectedCount,
      byCategory: {
        all: total,
        pyq: pyqCount,
        notes: notesCount,
        labs: labManualCount,
        labNotes: labNotesCount,
        practicalFiles: practicalFileCount,
        vivaQuestions: vivaCount
      }
    }
  }, { headers: { "Cache-Control": "no-store" } });
}

const reviewSchema = z.object({
  id: z.string().min(1),
  publish: z.boolean(),
  provenanceStatus: z.enum(["UNVERIFIED", "PRACTICE", "VERIFIED", "REJECTED"]),
  sourceReference: z.string().trim().max(1000).optional().default(""),
  reviewedBy: z.string().trim().min(2).max(100),
  reviewNote: z.string().trim().min(3).max(1000),
  // Optional metadata edits
  title: z.string().trim().min(3).max(180).optional(),
  unitNumber: z.number().nullable().optional(),
  resourceType: z.string().trim().max(50).nullable().optional(),
  authorName: z.string().trim().max(120).nullable().optional(),
  academicYear: z.string().trim().max(20).nullable().optional(),
  examType: z.string().trim().max(30).nullable().optional(),
}).refine(
  v => !v.publish || (v.provenanceStatus !== "UNVERIFIED" && v.provenanceStatus !== "REJECTED"),
  "Choose reviewed source or practice material before publishing"
).refine(
  v => v.provenanceStatus !== "REJECTED" || (v.reviewNote && v.reviewNote.trim().length >= 5),
  "A rejection reason with at least 5 characters is required when rejecting a submission"
);

export async function PATCH(request: NextRequest) {
  if (!(await isCurator())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  try {
    const body = await readBoundedBody(request, 8192);
    if (!body) return NextResponse.json({ error: "Request payload too large" }, { status: 413 });

    let input: unknown;
    try {
      input = JSON.parse(body.toString());
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const data = reviewSchema.safeParse(input);
    if (!data.success) {
      return NextResponse.json({ error: data.error.issues[0].message }, { status: 400 });
    }

    const {
      id,
      publish,
      provenanceStatus,
      title,
      unitNumber,
      resourceType,
      authorName,
      academicYear,
      examType,
      ...review
    } = data.data;

    let auditAction = "RESOURCE_WITHDRAWN";
    if (provenanceStatus === "REJECTED") {
      auditAction = "RESOURCE_REJECTED";
    } else if (publish) {
      auditAction = "RESOURCE_PUBLISHED";
    }

    const updatePayload: Prisma.AcademicResourceUpdateInput = {
      ...review,
      provenanceStatus,
      isPublished: publish,
      reviewedAt: new Date(),
    };

    if (title !== undefined) updatePayload.title = title;
    if (unitNumber !== undefined) updatePayload.unitNumber = unitNumber;
    if (resourceType !== undefined) updatePayload.resourceType = resourceType;
    if (authorName !== undefined) updatePayload.authorName = authorName;
    if (academicYear !== undefined) updatePayload.academicYear = academicYear;
    if (examType !== undefined) updatePayload.examType = examType;

    await db.$transaction(async tx => {
      await tx.academicResource.update({
        where: { id },
        data: updatePayload
      });

      await tx.auditEvent.create({
        data: {
          action: auditAction,
          targetId: id,
          actor: review.reviewedBy,
          detail: JSON.stringify({
            provenanceStatus,
            publish,
            note: review.reviewNote,
            title: title || undefined
          })
        }
      });
    });

    revalidatePath("/", "layout");
    revalidateTag("catalogue");
    return NextResponse.json({ success: true, action: auditAction });
  } catch (error) {
    return NextResponse.json({
      error: "Review could not be saved",
      incidentId: reportError("resource.review", error)
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isCurator())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing resource ID" }, { status: 400 });

    const resource = await db.academicResource.findUnique({ where: { id } });
    if (!resource) return NextResponse.json({ error: "Resource not found" }, { status: 404 });

    await db.$transaction(async tx => {
      await tx.academicResource.delete({ where: { id } });
      await tx.auditEvent.create({
        data: {
          action: "RESOURCE_DELETED",
          targetId: id,
          actor: "curator",
          detail: JSON.stringify({ originalFileName: resource.originalFileName, title: resource.title })
        }
      });
    });

    await removeStoredFile(resource.storagePath);
    revalidatePath("/", "layout");
    revalidateTag("catalogue");
    return NextResponse.json({ success: true, message: "Resource permanently deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed", incidentId: reportError("resource.delete", error) }, { status: 500 });
  }
}
