import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileParam = searchParams.get("file");
    const nameParam = searchParams.get("name") || "study-material.pdf";

    if (!fileParam) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    const sanitizedFilename = path.basename(fileParam);
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "notes");
    const filePath = path.join(uploadsDir, sanitizedFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Learning material document not found" }, { status: 404 });
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
    console.error("Error serving notes download:", error);
    return NextResponse.json({ error: "Failed to download learning material" }, { status: 500 });
  }
}
