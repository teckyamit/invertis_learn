/**
 * Invertis Learn: Lateral Entry Programmes Shared Mapping Architecture
 * Connects 3-year lateral entry programmes to parent 4-year curricula
 * without duplicating subject records or syllabus content.
 */

export interface LateralEntryConfig {
  code: string;
  name: string;
  displayName: string;
  parentCode: string;
  parentName: string;
  minSemester: number;
  maxSemester: number;
  durationYears: number;
  availableSemesters: number[];
  admissionMode: string;
  description: string;
  eligibility: string;
}

export const LATERAL_ENTRY_MAP: Record<string, LateralEntryConfig> = {
  "BTECH-CSE-LE": {
    code: "BTECH-CSE-LE",
    name: "B.Tech CSE (Regular) - Lateral Entry",
    displayName: "B.Tech CSE (Regular) - Lateral Entry",
    parentCode: "BTECH-CSE",
    parentName: "B.Tech CSE (Regular)",
    minSemester: 3,
    maxSemester: 8,
    durationYears: 3,
    availableSemesters: [3, 4, 5, 6, 7, 8],
    admissionMode: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
    description:
      "3-year undergraduate lateral entry programme designed for polytechnic diploma holders and B.Sc. graduates. Students join directly in Semester III and follow the verified Invertis University B.Tech CSE (Regular) curriculum through Semester VIII.",
    eligibility:
      "3-Year Polytechnic Diploma in Engineering / Technology or B.Sc. with Mathematics (Minimum 50% aggregate marks, 45% for SC/ST); Direct Admission to 2nd Year (Semester III).",
  },
  "BTECH-CSE-AI-LE": {
    code: "BTECH-CSE-AI-LE",
    name: "B.Tech CSE (AI Specialization) - Lateral Entry",
    displayName: "B.Tech CSE (AI Specialization) - Lateral Entry",
    parentCode: "BTECH-CSE-AI",
    parentName: "B.Tech CSE (AI Specialization)",
    minSemester: 3,
    maxSemester: 8,
    durationYears: 3,
    availableSemesters: [3, 4, 5, 6, 7, 8],
    admissionMode: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
    description:
      "3-year specialized undergraduate lateral entry programme entering directly into Semester III of the B.Tech CSE (Artificial Intelligence & Machine Learning) curriculum through Semester VIII.",
    eligibility:
      "3-Year Polytechnic Diploma in CSE/IT/ECE or B.Sc. with Mathematics (Minimum 60% aggregate); Direct Admission to 2nd Year (Semester III).",
  },
};

/**
 * Checks if a programme code corresponds to a lateral entry programme.
 */
export function isLateralEntryProgramme(code: string): boolean {
  if (!code) return false;
  return code.toUpperCase() in LATERAL_ENTRY_MAP;
}

/**
 * Returns configuration metadata for a lateral entry programme.
 */
export function getLateralEntryConfig(code: string): LateralEntryConfig | undefined {
  if (!code) return undefined;
  return LATERAL_ENTRY_MAP[code.toUpperCase()];
}

/**
 * Resolves the parent programme code for syllabus queries.
 * For regular programmes, returns the original code.
 */
export function getParentProgrammeCode(code: string): string {
  if (!code) return code;
  const config = LATERAL_ENTRY_MAP[code.toUpperCase()];
  return config ? config.parentCode : code;
}

/**
 * Validates whether a specific semester number is available for the given programme.
 * Lateral entry programmes only allow Semesters 3 through 8.
 */
export function isSemesterAllowedForProgramme(code: string, semNum: number): boolean {
  const config = LATERAL_ENTRY_MAP[code.toUpperCase()];
  if (!config) return true;
  return config.availableSemesters.includes(semNum);
}

/**
 * Returns standardized display names for engineering programmes
 * as required by Phase 5 user interface specifications.
 */
export function getProgrammeDisplayName(code: string, defaultName?: string): string {
  switch (code.toUpperCase()) {
    case "BTECH-CSE":
      return "B.Tech CSE (Regular)";
    case "BTECH-CSE-LE":
      return "B.Tech CSE (Regular) - Lateral Entry";
    case "BTECH-CSE-AI":
      return "B.Tech CSE (AI Specialization)";
    case "BTECH-CSE-AI-LE":
      return "B.Tech CSE (AI Specialization) - Lateral Entry";
    default:
      return defaultName || code;
  }
}
