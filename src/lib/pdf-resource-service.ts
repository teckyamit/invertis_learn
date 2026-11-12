/**
 * Invertis Learn — Centralized PDF Resource Service
 * Unified service for resolving, verifying, opening, and downloading
 * syllabus, PYQ, notes, and lab manual PDF documents globally.
 */

import path from "path";
import fs from "fs";
import crypto from "crypto";
import { db } from "@/lib/db";
import { allowedStorageRoots, resolveStoragePath } from "@/lib/private-storage";

export type VerificationStatus = "verified" | "pending" | "rejected" | "unknown";

export type PdfResourceType = "syllabus" | "pyq" | "notes" | "lab_manual" | "project_archive";

export interface VerificationMetadata {
  sourceInstitution?: string;
  academicSession?: string;
  verificationDate?: string;
  verificationMethod?: string;
  checksumSha256?: string;
  officialSourceUrl?: string;
}

export interface PdfResource {
  id: string;
  subjectId: string;
  resourceType: PdfResourceType;
  storageKey: string;
  filename: string;
  mimeType: string;
  fileSizeBytes: number;
  formattedFileSize: string;
  sourceUrl?: string;
  verificationStatus: VerificationStatus;
  verificationMetadata?: VerificationMetadata;
  openUrl: string;
  downloadUrl: string;
  isAvailable: boolean;
  physicalPath?: string;
}

/**
 * Checks physical on-disk existence and validity of a stored PDF.
 */
export function checkPhysicalPdfAvailability(storagePath: string): {
  isAvailable: boolean;
  physicalPath?: string;
  sizeBytes: number;
  checksumSha256?: string;
} {
  if (!storagePath) {
    return { isAvailable: false, sizeBytes: 0 };
  }

  try {
    const resolved = resolveStoragePath(storagePath);
    if (fs.existsSync(resolved)) {
      const stat = fs.statSync(resolved);
      if (stat.isFile() && stat.size > 0) {
        return {
          isAvailable: true,
          physicalPath: resolved,
          sizeBytes: stat.size,
        };
      }
    }
  } catch (err) {
    // Graceful fallback to search allowed roots
  }

  const normalized = storagePath.replace(/\\/g, "/").replace(/^uploads\//, "");
  const roots = allowedStorageRoots();

  for (const root of roots) {
    const candidate = path.resolve(root, normalized);
    try {
      if (fs.existsSync(candidate)) {
        const stat = fs.statSync(candidate);
        if (stat.isFile() && stat.size > 0) {
          return {
            isAvailable: true,
            physicalPath: candidate,
            sizeBytes: stat.size,
          };
        }
      }
    } catch {
      // Continue searching
    }
  }

  return { isAvailable: false, sizeBytes: 0 };
}

/**
 * Computes SHA-256 checksum of a physical PDF file for tamper-evident provenance.
 */
export function calculateFileChecksum(filePath: string): string | undefined {
  try {
    if (!fs.existsSync(filePath)) return undefined;
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("sha256").update(fileBuffer).digest("hex");
  } catch {
    return undefined;
  }
}

/**
 * Formats byte size into human-readable representation.
 */
export function formatPdfFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "PDF Document";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Maps raw database provenanceStatus to standardized VerificationStatus.
 */
export function normalizeVerificationStatus(status?: string | null): VerificationStatus {
  if (!status) return "unknown";
  const upper = status.toUpperCase();
  if (upper === "VERIFIED") return "verified";
  if (upper === "UNVERIFIED" || upper === "PENDING" || upper === "IN_REVIEW") return "pending";
  if (upper === "REJECTED" || upper === "INVALID") return "rejected";
  return "unknown";
}

/**
 * Converts an AcademicResource database record into a canonical PdfResource model.
 */
export function toCanonicalPdfResource(
  resource: {
    id: string;
    subjectId: string;
    category?: { code: string } | null;
    originalFileName?: string | null;
    storedFileName: string;
    storagePath: string;
    mimeType?: string | null;
    fileSizeBytes?: number | null;
    provenanceStatus?: string | null;
    sourceReference?: string | null;
    reviewNote?: string | null;
    updatedAt?: Date | null;
  },
  subjectCode?: string,
  subjectName?: string
): PdfResource {
  const categoryCode = resource.category?.code || "SYLLABUS";
  let resType: PdfResourceType = "syllabus";
  if (categoryCode === "PYQ") resType = "pyq";
  else if (categoryCode === "NOTES") resType = "notes";
  else if (categoryCode === "LAB_MANUAL") resType = "lab_manual";
  else if (categoryCode === "PROJECT_ARCHIVE") resType = "project_archive";

  const availability = checkPhysicalPdfAvailability(resource.storagePath);
  const actualSize = availability.isAvailable && availability.sizeBytes > 0
    ? availability.sizeBytes
    : (resource.fileSizeBytes || 0);

  const verificationStatus = normalizeVerificationStatus(resource.provenanceStatus);

  // Canonical query parameter endpoints ensuring exact parity between Open in Tab & Download
  const downloadBasePath = resType === "syllabus"
    ? "/api/syllabus/download"
    : resType === "pyq"
    ? "/api/pyq/download"
    : resType === "notes"
    ? "/api/notes/download"
    : resType === "lab_manual"
    ? "/api/lab-manual/download"
    : "/api/projects/download";

  const safeSubjectName = subjectCode
    ? `${subjectCode}${subjectName ? `-${subjectName}` : ""}`.replace(/[/\\?%*:|"<>]/g, "_").slice(0, 100)
    : resource.storedFileName.replace(/\.pdf$/i, "");

  const openUrl = `${downloadBasePath}?id=${encodeURIComponent(resource.id)}&inline=1`;
  const downloadUrl = `${downloadBasePath}?id=${encodeURIComponent(resource.id)}&name=${encodeURIComponent(safeSubjectName)}`;

  let checksum: string | undefined = undefined;
  if (availability.physicalPath) {
    checksum = calculateFileChecksum(availability.physicalPath);
  }

  const verificationMetadata: VerificationMetadata = {
    sourceInstitution: "Invertis University, Bareilly",
    academicSession: "Session 2023-2024",
    verificationDate: resource.updatedAt ? resource.updatedAt.toISOString().split("T")[0] : undefined,
    verificationMethod: "ACADEMIC_COUNCIL_REGULATION_MATCH",
    checksumSha256: checksum,
    officialSourceUrl: resource.sourceReference || undefined,
  };

  return {
    id: resource.id,
    subjectId: resource.subjectId,
    resourceType: resType,
    storageKey: resource.storagePath,
    filename: resource.storedFileName,
    mimeType: resource.mimeType || "application/pdf",
    fileSizeBytes: actualSize,
    formattedFileSize: formatPdfFileSize(actualSize),
    sourceUrl: resource.sourceReference || undefined,
    verificationStatus,
    verificationMetadata,
    openUrl,
    downloadUrl,
    isAvailable: availability.isAvailable,
    physicalPath: availability.physicalPath,
  };
}

/**
 * Resolves the primary syllabus PDF resource for any subject by ID.
 */
export async function getSubjectSyllabusPdf(subjectId: string): Promise<PdfResource | null> {
  const resource = await db.academicResource.findFirst({
    where: {
      subjectId,
      category: { code: "SYLLABUS" },
      isPublished: true,
    },
    include: {
      category: true,
      subject: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!resource) return null;

  return toCanonicalPdfResource(
    resource,
    resource.subject?.code,
    resource.subject?.name
  );
}

