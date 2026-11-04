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

export interface ProgrammeWithCurriculum {
  id?: string;
  code: string;
  name?: string;
  durationYears: number;
  category?: string;
  degreeLevel?: string;
  isLateralEntry?: boolean;
  hasOfficialSyllabus?: boolean;
  curriculumVersions?: {
    isCurrent?: boolean;
    regulationName?: string | null;
    semesters: {
      id?: string;
      semesterNumber: number;
      title?: string;
      _count?: { subjects: number };
      subjects?: {
        id?: string;
        code?: string;
        name?: string;
        resources?: any[];
      }[];
    }[];
  }[];
}

export interface ProgrammeCurriculumStats {
  semesterCount: number;
  subjectCount: number;
  resourceCount: number;
  hasActiveResources: boolean;
  isLateral: boolean;
  parentCode?: string;
}

/**
 * Dynamically resolves curriculum statistics (semesters, verified subjects, resources)
 * for any programme, properly handling 3-year lateral entry programmes mapped to parent curricula.
 *
 * For lateral entry programmes:
 * - Reuses the parent curriculum (Semesters 3 through 8)
 * - Excludes first-year subjects (Semesters 1 and 2)
 * - Dynamically calculates actual subject count from the parent curriculum
 * - Returns exactly 6 semesters and the dynamic subject count
 *
 * For regular programmes:
 * - Dynamically calculates from its own curriculum
 */
export function getProgrammeCurriculumStats(
  programme: ProgrammeWithCurriculum,
  allProgrammes?: ProgrammeWithCurriculum[]
): ProgrammeCurriculumStats {
  const isLateral = isLateralEntryProgramme(programme.code);

  if (isLateral) {
    const lateralConfig = getLateralEntryConfig(programme.code);
    const parentCode = lateralConfig?.parentCode || getParentProgrammeCode(programme.code);
    
    // Find parent programme from provided list if available
    const parentProg = allProgrammes?.find(
      p => p.code.toUpperCase() === parentCode.toUpperCase()
    );
    const parentCurriculum = parentProg?.curriculumVersions?.[0];
    
    if (parentCurriculum) {
      const minSem = lateralConfig?.minSemester ?? 3;
      const maxSem = lateralConfig?.maxSemester ?? 8;
      const lateralSemesters = parentCurriculum.semesters.filter(
        s => s.semesterNumber >= minSem && s.semesterNumber <= maxSem
      );

      let subjectCount = 0;
      let resourceCount = 0;

      lateralSemesters.forEach(s => {
        if (s._count?.subjects !== undefined) {
          subjectCount += s._count.subjects;
        } else if (s.subjects) {
          subjectCount += s.subjects.length;
          s.subjects.forEach(subj => {
            if (subj.resources) {
              resourceCount += subj.resources.length;
            }
          });
        }
      });

      return {
        semesterCount: lateralSemesters.length || (lateralConfig?.availableSemesters.length ?? 6),
        subjectCount,
        resourceCount,
        hasActiveResources: subjectCount > 0,
        isLateral: true,
        parentCode,
      };
    }

    // Default lateral configuration if parent not in memory array
    return {
      semesterCount: lateralConfig?.availableSemesters.length ?? 6,
      subjectCount: 0,
      resourceCount: 0,
      hasActiveResources: false,
      isLateral: true,
      parentCode,
    };
  }

  // Regular Programme
  const currentCurriculum = programme.curriculumVersions?.[0];
  const semesters = currentCurriculum?.semesters || [];
  let subjectCount = 0;
  let resourceCount = 0;

  semesters.forEach(s => {
    if (s._count?.subjects !== undefined) {
      subjectCount += s._count.subjects;
    } else if (s.subjects) {
      subjectCount += s.subjects.length;
      s.subjects.forEach(subj => {
        if (subj.resources) {
          resourceCount += subj.resources.length;
        }
      });
    }
  });

  return {
    semesterCount: semesters.length || programme.durationYears * 2,
    subjectCount,
    resourceCount,
    hasActiveResources: subjectCount > 0,
    isLateral: false,
  };
}

