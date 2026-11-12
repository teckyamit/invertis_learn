import { NextRequest } from "next/server";
import { serveResource } from "@/lib/download";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) { return serveResource(request, "LAB_MANUAL"); }
