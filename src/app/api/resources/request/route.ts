import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { allowAttempt, sameOrigin } from "@/lib/access";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  subjectId: z.string().min(1).max(100),
  subjectCode: z.string().trim().min(2).max(50),
  subjectName: z.string().trim().min(2).max(200),
  programmeCode: z.string().trim().max(50).optional().default(""),
  semesterNumber: z.number().int().min(1).max(12).optional(),
  category: z.enum(["PYQ", "NOTES", "LAB_MANUAL", "OTHER"]),
  academicYear: z.string().trim().max(20).optional().default(""),
  description: z.string().trim().max(500).optional().default(""),
});

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  // Rate limit: 10 requests per hour per IP/origin
  if (!allowAttempt("student-resource-requests", 10, 60 * 60_000)) {
    return NextResponse.json({ error: "Request limit reached. Please try again later." }, { status: 429 });
  }

  try {
    const json = await req.json();
    const parsed = requestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { subjectId, subjectCode, subjectName, programmeCode, semesterNumber, category, academicYear, description } = parsed.data;

    // Verify subject exists
    const subject = await db.subject.findUnique({
      where: { id: subjectId },
      select: { id: true, code: true, name: true }
    });

    if (!subject) {
      return NextResponse.json({ error: "Subject not found in database." }, { status: 404 });
    }

    // Record request into AuditEvent for curator visibility
    const event = await db.auditEvent.create({
      data: {
        action: "RESOURCE_REQUEST",
        targetId: subject.id,
        actor: "STUDENT",
        detail: JSON.stringify({
          subjectCode,
          subjectName,
          programmeCode,
          semesterNumber,
          category,
          academicYear,
          description,
          status: "PENDING",
          requestedAt: new Date().toISOString()
        })
      }
    });

    return NextResponse.json({
      success: true,
      message: "Academic resource request received. Our team will verify and prioritize curation.",
      requestId: event.id
    });
  } catch (error) {
    console.error("Resource request submission error:", error);
    return NextResponse.json({ error: "Failed to submit resource request." }, { status: 500 });
  }
}
