import { NextRequest } from "next/server";
import { serveResource } from "@/lib/download";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return serveResource(request, undefined, `uploads/${path.join("/")}`);
}
