import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileParam = searchParams.get("file");
    const nameParam = searchParams.get("name") || "syllabus.pdf";

    if (!fileParam) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    // Security check: ensure file does not contain directory traversal characters
    const sanitizedFilename = path.basename(fileParam);
    const subjectPath = path.join(process.cwd(), "public", "uploads", "syllabus", "subjects", sanitizedFilename);
    const legacyPath = path.join(process.cwd(), "public", "uploads", "syllabus", sanitizedFilename);
    const filePath = fs.existsSync(subjectPath) ? subjectPath : legacyPath;

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Syllabus document not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const sanitizedDownloadName = nameParam.endsWith(".pdf") ? nameParam : `${nameParam}.pdf`;

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(sanitizedDownloadName)}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error serving syllabus download:", error);
    return NextResponse.json({ error: "Failed to download document" }, { status: 500 });
  }
}
