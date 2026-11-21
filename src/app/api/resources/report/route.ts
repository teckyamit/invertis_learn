import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { allowAttempt, sameOrigin } from "@/lib/access";

export const dynamic = "force-dynamic";

const reportSchema = z.object({
  subjectId: z.string().min(1).max(100),
  subjectCode: z.string().trim().min(2).max(50),
  resourceId: z.string().trim().max(100).optional(),
  issueType: z.enum([
    "INCORRECT_SYLLABUS",
    "BROKEN_PDF",
    "WRONG_SEMESTER",
    "MISSING_EXPERIMENTS",
    "INCORRECT_REFERENCE_BOOK",
    "UNAVAILABLE_VIDEO",
    "OTHER"
  ]),
  description: z.string().trim().min(5).max(1000),
});

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  // Rate limit: 8 reports per hour
  if (!allowAttempt("student-content-reports", 8, 60 * 60_000)) {
    return NextResponse.json({ error: "Report submission limit reached. Please try again later." }, { status: 429 });
  }

  try {
    const json = await req.json();
    const parsed = reportSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { subjectId, subjectCode, resourceId, issueType, description } = parsed.data;

    // Verify subject exists
    const subject = await db.subject.findUnique({
      where: { id: subjectId },
      select: { id: true, code: true }
    });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found in database." }, { status: 404 });
    }

    const reportEvent = await db.auditEvent.create({
      data: {
        action: "CONTENT_REPORT",
        targetId: resourceId || subject.id,
        actor: "STUDENT",
        detail: JSON.stringify({
          subjectId: subject.id,
          subjectCode,
          resourceId: resourceId || null,
          issueType,
          description,
          status: "OPEN",
          reportedAt: new Date().toISOString()
        })
      }
    });

    return NextResponse.json({
      success: true,
      message: "Report received. A curator will review and correct the academic record.",
      reportId: reportEvent.id
    });
  } catch (error) {
    console.error("Content report submission error:", error);
    return NextResponse.json({ error: "Failed to submit report." }, { status: 500 });
  }
}
