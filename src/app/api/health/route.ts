import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import fs from "fs/promises";
import { storageRoot } from "@/lib/private-storage";
import { reportError } from "@/lib/observability";
export const dynamic = "force-dynamic";
export async function GET() {
  try { await db.$queryRaw`SELECT 1`; await fs.access(storageRoot()); return NextResponse.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { reportError("health", error); return NextResponse.json({ status: "unavailable" }, { status: 503 }); }
}
