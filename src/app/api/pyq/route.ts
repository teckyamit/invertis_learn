import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subjectId = searchParams.get("subjectId");
    const subjectCode = searchParams.get("subjectCode");
    const academicYear = searchParams.get("academicYear");
    const examType = searchParams.get("examType");

    const whereClause: any = {
      category: { code: "PYQ" },
      isPublished: true,
    };

    if (subjectId) {
      whereClause.subjectId = subjectId;
    } else if (subjectCode) {
      whereClause.subject = { code: subjectCode };
    }

    if (academicYear) {
      whereClause.academicYear = academicYear;
    }

    if (examType) {
      whereClause.examType = examType;
    }

    const pyqs = await db.academicResource.findMany({
      where: whereClause,
      include: {
        subject: {
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
          },
        },
      },
      orderBy: [{ academicYear: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ pyqs });
  } catch (error) {
    console.error("Error fetching PYQs:", error);
    return NextResponse.json({ error: "Failed to fetch question papers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const subjectId = formData.get("subjectId") as string;
    const title = formData.get("title") as string;
    const academicYear = formData.get("academicYear") as string;
    const examType = (formData.get("examType") as string) || "END_SEMESTER";
    const hasSolutions = formData.get("hasSolutions") === "true";
    const file = formData.get("file") as File | null;

    if (!subjectId || !file || !title || !academicYear) {
      return NextResponse.json(
        { error: "Missing required fields (subjectId, title, academicYear, file)" },
        { status: 400 }
      );
    }

    // Verify subject exists
    const subject = await db.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    }

    // Ensure PYQ category exists
    const pyqCategory = await db.resourceCategory.upsert({
      where: { code: "PYQ" },
      update: {},
      create: {
        code: "PYQ",
        name: "Previous Year Question Paper",
        description: "Official end-semester and mid-semester past question papers",
      },
    });

    // Validate file
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only official PDF documents are accepted for question papers" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "pyq");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const sanitizedBase = path
      .basename(file.name)
      .replace(/[^a-zA-Z0-9._-]/g, "_");
    const storedFileName = `${Date.now()}_${sanitizedBase}`;
    const filePath = path.join(uploadsDir, storedFileName);

    fs.writeFileSync(filePath, buffer);

    const resource = await db.academicResource.create({
      data: {
        subjectId,
        categoryId: pyqCategory.id,
        title,
        originalFileName: file.name,
        storedFileName,
        storagePath: `uploads/pyq/${storedFileName}`,
        mimeType: "application/pdf",
        fileSizeBytes: buffer.length,
        academicYear,
        examType,
        hasSolutions,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, resource }, { status: 201 });
  } catch (error) {
    console.error("Error uploading PYQ document:", error);
    return NextResponse.json(
      { error: "Failed to upload question paper" },
      { status: 500 }
    );
  }
}

