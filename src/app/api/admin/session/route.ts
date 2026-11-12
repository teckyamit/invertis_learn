import { NextRequest, NextResponse } from "next/server";
import { allowAttempt, createSession, curatorConfigured, isCurator, sameOrigin, SESSION_COOKIE, SESSION_SECONDS, validAccessKey } from "@/lib/access";
export async function GET() { return NextResponse.json({ authenticated: await isCurator(), configured: curatorConfigured() }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  if (!curatorConfigured()) return NextResponse.json({ error: "Curator access has not been configured by the operator." }, { status: 503 });
  if (!allowAttempt("login", 10, 60_000)) return NextResponse.json({ error: "Too many attempts. Try again in one minute." }, { status: 429, headers: { "Retry-After": "60" } });
  if (Number(request.headers.get("content-length")) > 1024) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  // Read only a small bounded body, including requests with no content-length.
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "Missing access key" }, { status: 400 });
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > 1024) { await reader.cancel(); return NextResponse.json({ error: "Request too large" }, { status: 413 }); } chunks.push(value); }
  let key: unknown;
  try { key = JSON.parse(Buffer.concat(chunks).toString()).key; } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  if (typeof key !== "string" || !validAccessKey(key)) return NextResponse.json({ error: "Invalid access key" }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, createSession(), { httpOnly: true, sameSite: "strict", secure: request.nextUrl.protocol === "https:", maxAge: SESSION_SECONDS, path: "/" });
  return response;
}
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  const response = NextResponse.json({ success: true }); response.cookies.delete(SESSION_COOKIE); return response;
}
