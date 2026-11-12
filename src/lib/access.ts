import { createHmac, timingSafeEqual, createHash } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const SESSION_COOKIE = "il_curator";
export const SESSION_SECONDS = 8 * 60 * 60;
function secret() {
  const value = process.env.CURATOR_ACCESS_KEY || "";
  return value.length >= 32 ? value : null;
}
export function curatorConfigured() { return !!secret(); }
export function validAccessKey(value: string) {
  const expected = secret();
  return !!expected && timingSafeEqual(createHash("sha256").update(value).digest(), createHash("sha256").update(expected).digest());
}
export function createSession() {
  const key = secret();
  if (!key) throw new Error("Curator access is not configured");
  const expires = String(Date.now() + SESSION_SECONDS * 1000);
  return `${expires}.${createHmac("sha256", key).update(expires).digest("hex")}`;
}
export function validSession(token?: string) {
  const key = secret();
  if (!key || !token || !/^\d{13}\.[a-f0-9]{64}$/.test(token)) return false;
  const [expires, signature] = token.split(".");
  const expiry = Number(expires);
  if (expiry <= Date.now() || expiry > Date.now() + SESSION_SECONDS * 1000) return false;
  return timingSafeEqual(Buffer.from(signature, "hex"), createHmac("sha256", key).update(expires).digest());
}
export async function isCurator() {
  return validSession((await cookies()).get(SESSION_COOKIE)?.value);
}
export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = process.env.APP_ORIGIN || request.nextUrl.origin;
  return origin === expected;
}

// Process-wide bounded limiter. Deploy a single Node instance or enforce distributed limits at the proxy.
const buckets = new Map<string, { count: number; reset: number }>();
export function allowAttempt(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.reset) { buckets.set(key, { count: 1, reset: now + windowMs }); return true; }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}
