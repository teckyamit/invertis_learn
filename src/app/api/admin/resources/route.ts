import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { isCurator, sameOrigin } from "@/lib/access";
import { reportError } from "@/lib/observability";
import { readBoundedBody } from "@/lib/request-body";

export async function GET(request: NextRequest) {
  if (!await isCurator()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = Number(request.nextUrl.searchParams.get("page") || 1);
  if (!Number.isInteger(page) || page < 1 || page > 10000) return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  const pending = request.nextUrl.searchParams.get("pending") === "true";
  const where = pending ? { isPublished: false } : {};
  const [resources, total] = await Promise.all([
    db.academicResource.findMany({ where, include: { subject: { select: { code: true, name: true } }, category: { select: { code: true } } }, orderBy: [{ createdAt: "desc" }, { id: "asc" }], take: 25, skip: (page - 1) * 25 }),
    db.academicResource.count({ where }),
  ]);
  return NextResponse.json({ resources, total, page }, { headers: { "Cache-Control": "no-store" } });
}
const reviewSchema = z.object({ id: z.string().min(1), publish: z.boolean(), provenanceStatus: z.enum(["UNVERIFIED", "PRACTICE", "VERIFIED"]), sourceReference: z.string().trim().max(1000), reviewedBy: z.string().trim().min(2).max(100), reviewNote: z.string().trim().min(5).max(1000) }).refine(v => !v.publish || v.provenanceStatus !== "UNVERIFIED", "Choose reviewed source or practice material before publishing").refine(v => v.provenanceStatus !== "VERIFIED" || v.sourceReference.length >= 5, "A source reference is required for verification");
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
    const { id, publish, ...review } = data.data;
    await db.$transaction(async tx => {
      await tx.academicResource.update({ where: { id }, data: { ...review, isPublished: publish, reviewedAt: new Date() } });
      await tx.auditEvent.create({ data: { action: publish ? "RESOURCE_PUBLISHED" : "RESOURCE_WITHDRAWN", targetId: id, actor: review.reviewedBy, detail: JSON.stringify(review) } });
    });
    revalidatePath("/", "layout");
    revalidateTag("catalogue");
    return NextResponse.json({ success: true });
  } catch (error) { return NextResponse.json({ error: "Review could not be saved", incidentId: reportError("resource.review", error) }, { status: 500 }); }
}
