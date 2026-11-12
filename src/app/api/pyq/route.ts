import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { PDFDocument } from "pdf-lib";
import { z } from "zod";
import { db } from "@/lib/db";
import { allowAttempt, isCurator, sameOrigin } from "@/lib/access";
import { activeSubject, publicResource } from "@/lib/resource-policy";
import { savePdf, removeStoredFile } from "@/lib/private-storage";
import { reportError } from "@/lib/observability";
import { readBoundedBody } from "@/lib/request-body";

export const dynamic = "force-dynamic";
const MAX_FILE = 10 * 1024 * 1024;
const uploadSchema = z.object({
  subjectId: z.string().min(1).max(100), title: z.string().trim().min(5).max(180),
  academicYear: z.string().regex(/^20\d{2}-20\d{2}$/).refine(v => Number(v.slice(5)) === Number(v.slice(0, 4)) + 1, "Academic year must span consecutive years"),
  examType: z.enum(["END_SEMESTER", "MID_SEMESTER", "BACK_PAPER"]),
  hasSolutions: z.enum(["true", "false"]), sourceReference: z.string().trim().min(5).max(1000),
});
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams;
    const page = Number(q.get("page") || 1), limit = Number(q.get("limit") || 50);
    if (!Number.isInteger(page) || page < 1 || page > 10000 || !Number.isInteger(limit) || limit < 1 || limit > 100) return NextResponse.json({ error: "Invalid pagination" }, { status: 400 });
    const where: Prisma.AcademicResourceWhereInput = {
      ...publicResource, category: { code: "PYQ" },
      ...(q.get("subjectId") ? { subjectId: q.get("subjectId")! } : q.get("subjectCode") ? { subject: { ...activeSubject, code: q.get("subjectCode")! } } : {}),
      ...(q.get("academicYear") ? { academicYear: q.get("academicYear") } : {}),
      ...(q.get("examType") ? { examType: q.get("examType") } : {}),
    };
    const [pyqs, total] = await Promise.all([
      db.academicResource.findMany({ where, orderBy: [{ academicYear: "desc" }, { createdAt: "desc" }, { id: "asc" }], skip: (page - 1) * limit, take: limit }),
      db.academicResource.count({ where }),
    ]);
    return NextResponse.json({ pyqs, page, limit, total, hasMore: page * limit < total }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return NextResponse.json({ error: "Unable to load papers", incidentId: reportError("pyq.list", error) }, { status: 500 }); }
}
export async function POST(request: NextRequest) {
  if (!await isCurator()) return NextResponse.json({ error: "Curator sign-in required" }, { status: 401 });
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  if (!allowAttempt("uploads", 20, 60 * 60_000)) return NextResponse.json({ error: "Upload limit reached. Try again later." }, { status: 429 });
  let savedPath: string | undefined;
  try {
    const body = await readBoundedBody(request, MAX_FILE + 64 * 1024);
    if (!body) return NextResponse.json({ error: "Maximum PDF size is 10 MB" }, { status: 413 });
    let form: FormData;
    try { form = await new Response(new Uint8Array(body), { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData(); }
    catch { return NextResponse.json({ error: "Invalid multipart upload" }, { status: 400 }); }
    const parsed = uploadSchema.safeParse(Object.fromEntries(form));
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    const file = form.get("file");
    if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf" || !file.size) return NextResponse.json({ error: "Choose a non-empty PDF file" }, { status: 400 });
    if (file.size > MAX_FILE) return NextResponse.json({ error: "Maximum PDF size is 10 MB" }, { status: 413 });
    const buffer = Buffer.from(await file.arrayBuffer());
    try {
      if (!buffer.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw new Error("Invalid header");
      const pdf = await PDFDocument.load(buffer, { updateMetadata: false });
      if (pdf.isEncrypted || pdf.getPageCount() < 1 || pdf.getPageCount() > 500) throw new Error("Unsupported PDF");
    } catch { return NextResponse.json({ error: "PDF must be readable, unencrypted, and contain 1–500 pages" }, { status: 400 }); }
    const subject = await db.subject.findFirst({ where: { ...activeSubject, id: parsed.data.subjectId }, select: { id: true } });
    if (!subject) return NextResponse.json({ error: "Active subject not found" }, { status: 404 });
    const category = await db.resourceCategory.findUnique({ where: { code: "PYQ" } });
    if (!category) return NextResponse.json({ error: "Question paper category is not configured" }, { status: 503 });
    const saved = await savePdf(buffer); savedPath = saved.storagePath;
    const { hasSolutions, sourceReference, ...data } = parsed.data;
    const resource = await db.$transaction(async tx => {
      const result = await tx.academicResource.create({ data: { ...data, ...saved, sourceReference, categoryId: category.id, hasSolutions: hasSolutions === "true", originalFileName: file.name.slice(0, 180), mimeType: "application/pdf", fileSizeBytes: buffer.length, isPublished: false, provenanceStatus: "UNVERIFIED" } });
      await tx.auditEvent.create({ data: { action: "RESOURCE_SUBMITTED", targetId: result.id, actor: "curator" } });
      return result;
    });
    savedPath = undefined;
    return NextResponse.json({ success: true, id: resource.id, message: "Saved privately. Review and approve it in the curator dashboard." }, { status: 201 });
  } catch (error) {
    if (savedPath) await removeStoredFile(savedPath).catch(e => reportError("upload.cleanup", e));
    return NextResponse.json({ error: "Upload failed", incidentId: reportError("pyq.upload", error) }, { status: 500 });
  }
}
