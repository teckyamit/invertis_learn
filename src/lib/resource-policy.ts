export const activeSubject = { isActive: true, semester: { curriculumVersion: { isCurrent: true, programme: { isActive: true, department: { isActive: true } } } } };
export const publicResource = { isPublished: true, subject: activeSubject };

export type SourceVerificationStatus = "verified" | "pending" | "rejected" | "unknown";

export function getVerificationStatus(status?: string | null): SourceVerificationStatus {
  if (!status) return "unknown";
  const upper = status.toUpperCase();
  if (upper === "VERIFIED") return "verified";
  if (upper === "PENDING" || upper === "UNVERIFIED" || upper === "IN_REVIEW") return "pending";
  if (upper === "REJECTED" || upper === "INVALID") return "rejected";
  if (upper === "PRACTICE") return "pending";
  return "unknown";
}

export function provenanceLabel(status?: string | null): string {
  const norm = getVerificationStatus(status);
  switch (norm) {
    case "verified":
      return "Verified Official Curriculum";
    case "pending":
      return "Source verification pending";
    case "rejected":
      return "Document Verification Rejected";
    case "unknown":
    default:
      return "Source Information Unknown";
  }
}

export interface DocumentVerificationEvidence {
  status: SourceVerificationStatus;
  statusLabel: string;
  sourceInstitution: string;
  academicSession: string;
  verificationMethod: string;
  officialSourceUrl?: string;
  isAuthoritative: boolean;
}

export function getDocumentVerificationEvidence(
  status?: string | null,
  sourceUrl?: string | null
): DocumentVerificationEvidence {
  const norm = getVerificationStatus(status);
  return {
    status: norm,
    statusLabel: provenanceLabel(status),
    sourceInstitution: "Invertis University, Bareilly",
    academicSession: "Session 2023-2024",
    verificationMethod: norm === "verified" ? "ACADEMIC_COUNCIL_REGULATION_MATCH" : "PENDING_FACULTY_REVIEW",
    officialSourceUrl: sourceUrl || "https://www.invertisuniversity.ac.in",
    isAuthoritative: norm === "verified",
  };
}
