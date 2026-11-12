import { randomUUID } from "crypto";

export function reportError(operation: string, error: unknown) {
  const incidentId = randomUUID();
  // No request bodies, access keys, cookies, or uploaded content in logs.
  console.error(JSON.stringify({ level: "error", operation, incidentId, time: new Date().toISOString(), error: error instanceof Error ? error.name : "UnknownError" }));
  return incidentId;
}
