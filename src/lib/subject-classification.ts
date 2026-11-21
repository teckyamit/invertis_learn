/**
 * Centralized Subject Academic Classification & Practical Eligibility Service
 * 
 * Classifies academic subjects into standardized categories:
 * - THEORY_ONLY: Theoretical coursework without laboratory/practical component
 * - PRACTICAL_ONLY: Standalone laboratory, workshop, or practical sessions
 * - THEORY_WITH_PRACTICAL: Integrated theory course with explicitly prescribed practical component
 * - PENDING_VERIFICATION: Ambiguous or unverified curriculum data requiring curator review
 */

export type SubjectClassification =
  | "THEORY_ONLY"
  | "PRACTICAL_ONLY"
  | "THEORY_WITH_PRACTICAL"
  | "PENDING_VERIFICATION";

export interface SubjectClassificationInput {
  code?: string;
  name?: string;
  subjectType?: string;
  lectureHours?: number;
  tutorialHours?: number;
  practicalHours?: number;
  evaluationMarks?: string | null;
  syllabusDetails?: any;
}

/**
 * Determines whether a subject has a verified, legitimate practical/laboratory component.
 * Uses official curriculum attributes:
 * - subjectType (PRACTICAL vs THEORY)
 * - practicalHours (P > 0)
 * - evaluationMarks (examination scheme)
 * - explicitly prescribed, valid laboratory exercises
 */
export function getSubjectClassification(subject: SubjectClassificationInput): SubjectClassification {
  if (!subject) return "PENDING_VERIFICATION";

  const type = (subject.subjectType || "").toUpperCase().trim();
  const pHours = Number(subject.practicalHours) || 0;
  const lHours = Number(subject.lectureHours) || 0;

  // Check explicit metadata override if already verified
  let details: any = null;
  if (subject.syllabusDetails) {
    if (typeof subject.syllabusDetails === "string") {
      try {
        details = JSON.parse(subject.syllabusDetails);
      } catch {
        details = null;
      }
    } else {
      details = subject.syllabusDetails;
    }
  }

  if (details?.metadata?.subjectClassification) {
    return details.metadata.subjectClassification;
  }

  // Pure Laboratory / Practical subjects
  if (type === "PRACTICAL" || type === "LAB" || type === "WORKSHOP") {
    return "PRACTICAL_ONLY";
  }

  // Pure Project / Thesis / Colloquium
  if (type === "PROJECT" || type === "SEMINAR" || type === "COLLOQUIUM") {
    // Capstone projects have project archives, but are not weekly lab experiment sessions
    return "THEORY_ONLY";
  }

  // Integrated Theory + Practical course
  if (pHours > 0 && lHours > 0) {
    return "THEORY_WITH_PRACTICAL";
  }

  // If practical hours > 0 and lecture hours == 0
  if (pHours > 0 && lHours === 0) {
    return "PRACTICAL_ONLY";
  }

  // If practical hours == 0 and type is THEORY
  if (pHours === 0 && (type === "THEORY" || type === "CORE" || type === "ELECTIVE" || type === "MANDATORY")) {
    return "THEORY_ONLY";
  }

  // Inspect valid experiments (excluding bibliographic lines mistakenly classified)
  const experiments = Array.isArray(details?.labExperiments) ? details.labExperiments : [];
  const validExperiments = experiments.filter((e: string) => !isBibliographicEntry(e));

  if (validExperiments.length > 0 && pHours > 0) {
    return lHours > 0 ? "THEORY_WITH_PRACTICAL" : "PRACTICAL_ONLY";
  }

  // If no practical hours, type is theory or empty, default to THEORY_ONLY
  if (pHours === 0) {
    return "THEORY_ONLY";
  }

  return "PENDING_VERIFICATION";
}

/**
 * Checks whether practical features (experiments section, lab materials, upload button)
 * are eligible to be rendered or accessed for this subject.
 */
export function isPracticalEligible(subject: SubjectClassificationInput): boolean {
  const classification = getSubjectClassification(subject);
  return classification === "PRACTICAL_ONLY" || classification === "THEORY_WITH_PRACTICAL";
}

/**
 * Helper to identify whether a string line is bibliographic (book citation, author, publisher)
 * rather than a genuine engineering laboratory experiment.
 */
export function isBibliographicEntry(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  const t = text.trim();

  // Known book publishers & citation markers
  const biblioPatterns = [
    /mcgraw[- ]*hill/i,
    /wiley/i,
    /pearson/i,
    /prentice[- ]*hall/i,
    /addison[- ]*wesley/i,
    /oxford\s+university\s+press/i,
    /tata\s+mcgraw/i,
    /springer/i,
    /\b(?:edition|edn|vol|volume|pp\.|isbn)\b/i,
    /\b(?:publications?|publishers?)\b/i,
    /morgan\s+kaufmann/i,
    /narosa/i,
    /dhanpat\s*rai/i,
    /s\.\s*chand/i,
    /bpb\s+publication/i,
    /cengage\s+learning/i,
    /an\s+imprint\s+of/i,
    // Renowned textbook authors often caught in parsing
    /\bhwang\b/i,
    /\bbriggs\b/i,
    /hennessy\s*(&|and)\s*patterson/i,
    /andrew\s+s?\.?\s*tanenbaum/i,
    /\bstallings\b/i,
    /\bknuth\b/i,
    /\bforouzan\b/i,
    /silberschatz/i,
    /balaguruswamy/i,
    /cormen/i,
    /galvin/i
  ];

  return biblioPatterns.some((pattern) => pattern.test(t));
}

/**
 * Human-readable badge information for classification
 */
export function getClassificationBadge(classification: SubjectClassification): {
  label: string;
  badgeClass: string;
  isPractical: boolean;
} {
  switch (classification) {
    case "THEORY_ONLY":
      return {
        label: "Theory",
        badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
        isPractical: false
      };
    case "PRACTICAL_ONLY":
      return {
        label: "Practical / Laboratory",
        badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
        isPractical: true
      };
    case "THEORY_WITH_PRACTICAL":
      return {
        label: "Theory + Lab Integrated",
        badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
        isPractical: true
      };
    case "PENDING_VERIFICATION":
    default:
      return {
        label: "Under Verification",
        badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
        isPractical: false
      };
  }
}
