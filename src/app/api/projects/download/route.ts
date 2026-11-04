import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileParam = searchParams.get("file");

    if (!fileParam) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    const sanitizedFilename = path.basename(fileParam);
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "projects");
    const filePath = path.join(uploadsDir, sanitizedFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Project manual document not found" }, { status: 404 });
    }

    const nameParam = searchParams.get("name") || sanitizedFilename;
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
    console.error("Error serving project document download:", error);
    return NextResponse.json({ error: "Failed to download project document" }, { status: 500 });
  }
}
