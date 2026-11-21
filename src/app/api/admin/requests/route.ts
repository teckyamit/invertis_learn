import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isCurator, sameOrigin } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!await isCurator()) {
    return NextResponse.json({ error: "Unauthorized curator access required" }, { status: 401 });
  }

  try {
    const events = await db.auditEvent.findMany({
      where: {
        action: { in: ["RESOURCE_REQUEST", "CONTENT_REPORT"] }
      },
      orderBy: { createdAt: "desc" },
      take: 100
    });

    const requests: any[] = [];
    const reports: any[] = [];

    for (const ev of events) {
      let detail: any = {};
      try {
        detail = ev.detail ? JSON.parse(ev.detail) : {};
      } catch {
        detail = { raw: ev.detail };
      }

      const item = {
        id: ev.id,
        createdAt: ev.createdAt,
        actor: ev.actor,
        targetId: ev.targetId,
        ...detail
      };

      if (ev.action === "RESOURCE_REQUEST") {
        requests.push(item);
      } else {
        reports.push(item);
      }
    }

    // Group requests by subject for demand ranking
    const demandMap: Record<string, { code: string; name: string; count: number; categories: Record<string, number> }> = {};
    for (const r of requests) {
      const code = r.subjectCode || "UNKNOWN";
      if (!demandMap[code]) {
        demandMap[code] = {
          code,
          name: r.subjectName || code,
          count: 0,
          categories: {}
        };
      }
      demandMap[code].count++;
      const cat = r.category || "OTHER";
      demandMap[code].categories[cat] = (demandMap[code].categories[cat] || 0) + 1;
    }

    const rankedDemand = Object.values(demandMap).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      requests,
      reports,
      rankedDemand,
      totalRequests: requests.length,
      totalReports: reports.length
    });
  } catch (error) {
    console.error("Failed to load curator requests:", error);
    return NextResponse.json({ error: "Failed to load requests" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!await isCurator()) {
    return NextResponse.json({ error: "Unauthorized curator access required" }, { status: 401 });
  }

  if (!sameOrigin(req)) {
    return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing event id or status" }, { status: 400 });
    }

    const event = await db.auditEvent.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    let detail = {};
    try {
      detail = event.detail ? JSON.parse(event.detail) : {};
    } catch {
      detail = {};
    }

    const updatedDetail = {
      ...detail,
      status,
      resolvedAt: new Date().toISOString()
    };

    await db.auditEvent.update({
      where: { id },
      data: {
        detail: JSON.stringify(updatedDetail)
      }
    });

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Failed to update request/report:", error);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
