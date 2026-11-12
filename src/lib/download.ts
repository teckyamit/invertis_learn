import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";
import { db } from "@/lib/db";
import { isCurator } from "@/lib/access";
import { publicResource } from "@/lib/resource-policy";
import { resolveStoragePath, allowedStorageRoots } from "@/lib/private-storage";
import { reportError } from "@/lib/observability";

export async function serveResource(request: NextRequest, category?: string, storagePath?: string) {
  try {
    const file = request.nextUrl.searchParams.get("file");
    const id = request.nextUrl.searchParams.get("id");
    if (!storagePath && !file && !id) return NextResponse.json({ error: "Missing file or resource ID" }, { status: 400 });
    if (file && (file !== path.basename(file) || /[/\\]/.test(file))) return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    const curator = await isCurator();
    const resource = await db.academicResource.findFirst({
      where: { ...(curator ? {} : publicResource), ...(category ? { category: { code: category } } : {}), ...(storagePath ? { storagePath } : id ? { id } : { storedFileName: file! }) },
      orderBy: { createdAt: "desc" },
    });
    if (!resource) return NextResponse.json({ error: "Resource not available" }, { status: 404 });
    const resolved = resolveStoragePath(resource.storagePath);
    const filePath = await fs.realpath(resolved);
    const allowedRoots = await Promise.all(
      allowedStorageRoots().map(async (r: string) => {
        try {
          return await fs.realpath(r);
        } catch {
          return r;
        }
      })
    );
    const isUnderAllowedRoot = allowedRoots.some(r => filePath === r || filePath.startsWith(r + path.sep));
    if (!isUnderAllowedRoot) return NextResponse.json({ error: "Resource not available" }, { status: 404 });
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) return NextResponse.json({ error: "Resource not available" }, { status: 404 });
    let start = 0, end = stat.size - 1;
    const range = request.headers.get("range");
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match || (!match[1] && !match[2])) return new NextResponse(null, { status: 416, headers: { "Content-Range": `bytes */${stat.size}` } });
      if (!match[1]) start = Math.max(0, stat.size - Number(match[2]));
      else { start = Number(match[1]); if (match[2]) end = Math.min(end, Number(match[2])); }
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= stat.size) return new NextResponse(null, { status: 416, headers: { "Content-Range": `bytes */${stat.size}` } });
    }
    const isInline = Boolean(storagePath || request.nextUrl.searchParams.get("inline") === "1" || request.nextUrl.searchParams.get("view") === "inline");
    const name = (request.nextUrl.searchParams.get("name") || resource.originalFileName).slice(0, 180).replace(/[\r\n"\\]/g, "_");
    const safeName = name.endsWith(".pdf") ? name : `${name}.pdf`;
    const dispositionType = isInline ? "inline" : "attachment";

    const headers = new Headers({
      "Content-Type": "application/pdf",
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `${dispositionType}; filename="document.pdf"; filename*=UTF-8''${encodeURIComponent(safeName)}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
      "Cache-Control": isInline ? "public, max-age=3600, must-revalidate" : "private, no-store",
    });
    if (range) headers.set("Content-Range", `bytes ${start}-${end}/${stat.size}`);
    return new NextResponse(Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream, { status: range ? 206 : 200, headers });
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === "ENOENT" || (error as { code?: string })?.code === "ENOENT") return NextResponse.json({ error: "File unavailable" }, { status: 404 });
    const incidentId = reportError("resource.download", error);
    return NextResponse.json({ error: "Download failed", incidentId }, { status: 500 });
  }
}
