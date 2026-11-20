import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { isCurator, sameOrigin } from "@/lib/access";
import { reportError } from "@/lib/observability";
import { readBoundedBody } from "@/lib/request-body";
import { removeStoredFile } from "@/lib/private-storage";

export async function GET(request: NextRequest) {
  if (!await isCurator()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = Number(request.nextUrl.searchParams.get("page") || 1);
  if (!Number.isInteger(page) || page < 1 || page > 10000) return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  
  const filter = request.nextUrl.searchParams.get("filter") || (request.nextUrl.searchParams.get("pending") === "true" ? "pending" : (request.nextUrl.searchParams.get("pending") === "false" ? "all" : "pending"));
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";

  let statusWhere: Prisma.AcademicResourceWhereInput = {};
  if (filter === "pending") {
    statusWhere = { isPublished: false, provenanceStatus: { not: "REJECTED" } };
  } else if (filter === "approved" || filter === "published") {
    statusWhere = { isPublished: true };
  } else if (filter === "rejected") {
    statusWhere = { provenanceStatus: "REJECTED" };
  }

  const searchWhere: Prisma.AcademicResourceWhereInput = query ? {
    OR: [
      { title: { contains: query, mode: "insensitive" } },
      { originalFileName: { contains: query, mode: "insensitive" } },
      { subject: { code: { contains: query, mode: "insensitive" } } },
      { subject: { name: { contains: query, mode: "insensitive" } } },
    ]
  } : {};

  const where: Prisma.AcademicResourceWhereInput = {
    ...statusWhere,
    ...searchWhere,
  };

  const [resources, total, pendingCount, approvedCount, rejectedCount] = await Promise.all([
    db.academicResource.findMany({
      where,
      include: {
        subject: {
          select: {
            id: true,
            code: true,
            name: true,
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
    db.academicResource.count({ where: { isPublished: false, provenanceStatus: { not: "REJECTED" } } }),
    db.academicResource.count({ where: { isPublished: true } }),
    db.academicResource.count({ where: { provenanceStatus: "REJECTED" } }),
  ]);

  return NextResponse.json({
    resources,
    total,
    page,
    counts: {
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      total: pendingCount + approvedCount + rejectedCount,
    }
  }, { headers: { "Cache-Control": "no-store" } });
}

const reviewSchema = z.object({
  id: z.string().min(1),
  publish: z.boolean(),
  provenanceStatus: z.enum(["UNVERIFIED", "PRACTICE", "VERIFIED", "REJECTED"]),
  sourceReference: z.string().trim().max(1000).optional().default(""),
  reviewedBy: z.string().trim().min(2).max(100),
  reviewNote: z.string().trim().min(3).max(1000)
}).refine(v => !v.publish || (v.provenanceStatus !== "UNVERIFIED" && v.provenanceStatus !== "REJECTED"), "Choose reviewed source or practice material before publishing")
  .refine(v => v.provenanceStatus !== "VERIFIED" || (v.sourceReference && v.sourceReference.length >= 5), "A source reference is required for verification");

export async function PATCH(request: NextRequest) {
  if (!await isCurator()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  try {
    const body = await readBoundedBody(request, 8192);
    if (!body) return NextResponse.json({ error: "Review too large" }, { status: 413 });
    let input: unknown;
    try { input = JSON.parse(body.toString()); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
    const data = reviewSchema.safeParse(input);
    if (!data.success) return NextResponse.json({ error: data.error.issues[0].message }, { status: 400 });
    const { id, publish, provenanceStatus, ...review } = data.data;

    let auditAction = "RESOURCE_WITHDRAWN";
    if (provenanceStatus === "REJECTED") {
      auditAction = "RESOURCE_REJECTED";
    } else if (publish) {
      auditAction = "RESOURCE_PUBLISHED";
    }

    await db.$transaction(async tx => {
      await tx.academicResource.update({
        where: { id },
        data: {
          ...review,
          provenanceStatus,
          isPublished: publish,
          reviewedAt: new Date()
        }
      });
      await tx.auditEvent.create({
        data: {
          action: auditAction,
          targetId: id,
          actor: review.reviewedBy,
          detail: JSON.stringify({ provenanceStatus, publish, note: review.reviewNote })
        }
      });
    });
    revalidatePath("/", "layout");
    revalidateTag("catalogue");
    return NextResponse.json({ success: true, action: auditAction });
  } catch (error) {
    return NextResponse.json({ error: "Review could not be saved", incidentId: reportError("resource.review", error) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await isCurator()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
