import { NextRequest, NextResponse } from "next/server";
import { isCurator } from "@/lib/access";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

export const dynamic = "force-dynamic";

const REGISTRY_PATH = path.join(process.cwd(), "data", "academic-resources", "resource-registry.json");

// Helper to check SSRF protection
function isSafeUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host === "169.254.169.254" ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.startsWith("172.16.") ||
      host.startsWith("172.17.") ||
      host.startsWith("172.18.") ||
      host.startsWith("172.19.") ||
      host.startsWith("172.20.") ||
      host.startsWith("172.21.") ||
      host.startsWith("172.22.") ||
      host.startsWith("172.23.") ||
      host.startsWith("172.24.") ||
      host.startsWith("172.25.") ||
      host.startsWith("172.26.") ||
      host.startsWith("172.27.") ||
      host.startsWith("172.28.") ||
      host.startsWith("172.29.") ||
      host.startsWith("172.30.") ||
      host.startsWith("172.31.")
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Outbound probe
function probeUrl(targetUrl: string): Promise<{ ok: boolean; statusCode?: number; error?: string }> {
  return new Promise((resolve) => {
    if (!isSafeUrl(targetUrl)) {
      return resolve({ ok: false, error: "SSRF_BLOCKED" });
    }

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === "https:" ? https : http;

      const req = client.request(
        targetUrl,
        {
          method: "HEAD",
          headers: {
            "User-Agent": "InvertisLearn-CuratorLinkMonitor/1.0 (+https://invertislearn.vercel.app)"
          },
          timeout: 8000
        },
        (res) => {
          const code = res.statusCode || 0;
          if (code >= 200 && code < 400) {
            resolve({ ok: true, statusCode: code });
          } else if (code === 403 || code === 401) {
            resolve({ ok: false, statusCode: code, error: "ACCESS_RESTRICTED" });
          } else if (code === 429) {
            resolve({ ok: false, statusCode: code, error: "RATE_LIMITED" });
          } else {
            resolve({ ok: false, statusCode: code, error: `HTTP_${code}` });
          }
        }
      );

      req.on("error", (err) => resolve({ ok: false, error: err.message }));
      req.on("timeout", () => {
        req.destroy();
        resolve({ ok: false, error: "TIMEOUT" });
      });
      req.end();
    } catch (e: any) {
      resolve({ ok: false, error: e.message });
    }
  });
}

export async function GET(req: NextRequest) {
  if (!(await isCurator())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const prog = searchParams.get("programme") || "ALL";
  const type = searchParams.get("type") || "ALL";
  const status = searchParams.get("status") || "ALL";
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  if (!fs.existsSync(REGISTRY_PATH)) {
    return NextResponse.json({ resources: [], total: 0 });
  }

  try {
    let list = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));

    if (prog !== "ALL") {
      list = list.filter((r: any) => r.programmes && r.programmes.includes(prog));
    }
    if (type !== "ALL") {
      list = list.filter((r: any) => r.type === type);
    }
    if (status !== "ALL") {
      list = list.filter((r: any) => r.verificationStatus === status);
    }
    if (q) {
      list = list.filter((r: any) =>
        (r.title && r.title.toLowerCase().includes(q)) ||
        (r.provider && r.provider.toLowerCase().includes(q)) ||
        (r.url && r.url.toLowerCase().includes(q)) ||
        (r.resourceId && r.resourceId.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      resources: list,
      total: list.length,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isCurator())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { resourceId, action, newUrl, status } = body;

    if (!resourceId) {
      return NextResponse.json({ error: "resourceId is required" }, { status: 400 });
    }

    if (!fs.existsSync(REGISTRY_PATH)) {
      return NextResponse.json({ error: "Registry not found" }, { status: 404 });
    }

    const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
    const index = registry.findIndex((r: any) => r.resourceId === resourceId);

    if (index === -1) {
      return NextResponse.json({ error: "Resource not found in registry" }, { status: 404 });
    }

    const item = registry[index];

    if (action === "VERIFY") {
      const probeResult = await probeUrl(item.url);
      item.lastProbeAt = new Date().toISOString();
      item.lastProbeResult = probeResult;
      if (probeResult.ok) {
        item.verificationStatus = "page_verified";
      } else if (probeResult.error === "ACCESS_RESTRICTED") {
        item.verificationStatus = "access_restricted";
      } else {
        item.verificationStatus = "unavailable";
      }
    } else if (action === "TOGGLE_ELIGIBILITY") {
      item.implementationEligible = !item.implementationEligible;
    } else if (action === "UPDATE_URL" && newUrl) {
      if (!isSafeUrl(newUrl)) {
        return NextResponse.json({ error: "Invalid or prohibited URL" }, { status: 400 });
      }
      item.url = newUrl;
      item.verifiedAt = new Date().toISOString();
      item.verificationStatus = "page_verified";
    } else if (action === "SET_STATUS" && status) {
      item.verificationStatus = status;
    }

    registry[index] = item;
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), "utf8");

    return NextResponse.json({ success: true, resource: item });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
