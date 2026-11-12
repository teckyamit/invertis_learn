/**
 * Invertis Learn — Centralized Academic Level & Programme Categorization System
 * 
 * Enforces the global institutional academic-level order:
 * 1. Diploma Programmes (Priority 1)
 * 2. Undergraduate (UG) Programmes (Priority 2)
 * 3. Postgraduate (PG) Programmes (Priority 3)
 * 4. Doctoral (Ph.D.) Programmes (Priority 4)
 */

export type AcademicLevel = "diploma" | "undergraduate" | "postgraduate" | "doctoral";

export const ACADEMIC_LEVEL_PRIORITY: Record<AcademicLevel, number> = {
  diploma: 1,
  undergraduate: 2,
  postgraduate: 3,
  doctoral: 4,
};

export const ACADEMIC_LEVELS_ORDER: readonly AcademicLevel[] = [
  "diploma",
  "undergraduate",
  "postgraduate",
  "doctoral",
] as const;

export interface AcademicLevelMeta {
  level: AcademicLevel;
  priority: number;
  title: string;
  shortTitle: string;
  badgeLabel: string;
  description: string;
  badgeClass: string;
  headerBorderClass: string;
}

export const ACADEMIC_LEVEL_METADATA: Record<AcademicLevel, AcademicLevelMeta> = {
  diploma: {
    level: "diploma",
    priority: 1,
    title: "Diploma Programmes",
    shortTitle: "Diploma",
    badgeLabel: "Diploma",
    description: "Foundational polytechnic engineering & diploma credentials developing essential technical skills.",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    headerBorderClass: "border-l-4 border-amber-500",
  },
  undergraduate: {
    level: "undergraduate",
    priority: 2,
    title: "Undergraduate (UG) Programmes",
    shortTitle: "UG",
    badgeLabel: "Undergraduate",
    description: "Bachelor of Technology, Computer Applications, and specialized industry-aligned bachelor degrees.",
    badgeClass: "bg-blue-50 text-blue-800 border-blue-200",
    headerBorderClass: "border-l-4 border-blue-600",
  },
  postgraduate: {
    level: "postgraduate",
    priority: 3,
    title: "Postgraduate (PG) Programmes",
    shortTitle: "PG",
    badgeLabel: "Postgraduate",
    description: "Master of Technology, MCA, and advanced post-graduate professional engineering studies.",
    badgeClass: "bg-indigo-50 text-indigo-800 border-indigo-200",
    headerBorderClass: "border-l-4 border-indigo-600",
  },
  doctoral: {
    level: "doctoral",
    priority: 4,
    title: "Doctoral (Ph.D.) Programmes",
    shortTitle: "Ph.D.",
    badgeLabel: "Doctoral Research",
    description: "Terminal academic research degree covering advanced coursework, published research, and doctoral thesis.",
    badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
    headerBorderClass: "border-l-4 border-rose-600",
  },
};

/**
 * Resolves the standardized academic level for any programme representation.
 */
export function getStandardizedAcademicLevel(prog: {
  category?: string | null;
  degreeLevel?: string | null;
  code?: string | null;
  name?: string | null;
}): AcademicLevel {
  const cat = (prog.category || "").toUpperCase();
  const deg = (prog.degreeLevel || "").toUpperCase();
  const code = (prog.code || "").toUpperCase();
  const name = (prog.name || "").toUpperCase();

  // 1. Diploma
  if (
    cat === "DIPLOMA" ||
    deg === "DIPLOMA" ||
    code.startsWith("DIP") ||
    name.includes("DIPLOMA") ||
    name.includes("POLYTECHNIC")
  ) {
    return "diploma";
  }

  // 4. Doctoral (Ph.D.)
  if (
    cat === "DOCTORAL" ||
    deg === "DOCTORAL" ||
    code.startsWith("PHD") ||
    name.includes("PH.D") ||
    name.includes("DOCTOR")
  ) {
    return "doctoral";
  }

  // 3. Postgraduate (PG)
  if (
    cat === "POSTGRADUATE" ||
    deg === "POSTGRADUATE" ||
    code.startsWith("MTECH") ||
    code.startsWith("MCA") ||
    code.startsWith("MBA") ||
    code.startsWith("MSC") ||
    code.startsWith("MA") ||
    code.startsWith("M.") ||
    name.startsWith("MASTER") ||
    name.startsWith("M.") ||
    name.includes("M.TECH") ||
    name.includes("M.SC") ||
    name.includes("M.A.") ||
    name.includes("M.PHARM")
  ) {
    return "postgraduate";
  }

  // 2. Undergraduate (UG) - Default
  return "undergraduate";
}

/**
 * Standard comparator function that sorts programmes by academic level:
 * Diploma (1) -> Undergraduate (2) -> Postgraduate (3) -> Doctoral (4).
 * Secondary sorting: Programmes with official syllabus first, then alphabetical.
 */
export function compareProgrammesByAcademicLevel<T extends {
  category?: string | null;
  degreeLevel?: string | null;
  code?: string | null;
  name?: string | null;
  hasOfficialSyllabus?: boolean | null;
}>(a: T, b: T): number {
  const levelA = getStandardizedAcademicLevel(a);
  const levelB = getStandardizedAcademicLevel(b);

  const priorityA = ACADEMIC_LEVEL_PRIORITY[levelA];
  const priorityB = ACADEMIC_LEVEL_PRIORITY[levelB];

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }

  // Secondary sort: Official syllabus live first
  const syllabusA = a.hasOfficialSyllabus ? 1 : 0;
  const syllabusB = b.hasOfficialSyllabus ? 1 : 0;
  if (syllabusA !== syllabusB) {
    return syllabusB - syllabusA;
  }

  // Tertiary sort: Alphabetical by display name or code
  return (a.name || a.code || "").localeCompare(b.name || b.code || "");
}

export interface AcademicLevelSection<T> {
  level: AcademicLevel;
  meta: AcademicLevelMeta;
  programmes: T[];
}

/**
 * Groups an array of programmes into four ordered sections:
 * Diploma -> Undergraduate -> Postgraduate -> Doctoral
 */
export function groupProgrammesByAcademicLevel<T extends {
  category?: string | null;
  degreeLevel?: string | null;
  code?: string | null;
  name?: string | null;
  hasOfficialSyllabus?: boolean | null;
}>(programmes: T[]): AcademicLevelSection<T>[] {
  const groups: Record<AcademicLevel, T[]> = {
    diploma: [],
    undergraduate: [],
    postgraduate: [],
    doctoral: [],
  };

  programmes.forEach((p) => {
    const level = getStandardizedAcademicLevel(p);
    groups[level].push(p);
  });

  return ACADEMIC_LEVELS_ORDER.map((level) => {
    const sorted = [...groups[level]].sort(compareProgrammesByAcademicLevel);
    return {
      level,
      meta: ACADEMIC_LEVEL_METADATA[level],
      programmes: sorted,
    };
  });
}

