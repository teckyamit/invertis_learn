/**
 * Invertis Learn — Universal Admission Mode System
 * Unified admission-mode architecture for Diploma, B.Tech, and Specializations.
 * Consolidates Regular and Lateral entry schemes under one canonical course record
 * while dynamically resolving distinct durations, semester ranges, subject counts,
 * eligibility criteria, and syllabus paths.
 */

export type AdmissionMode = "regular" | "lateral";

export interface EntryModeDetails {
  durationYears: number;
  semestersCount: number;
  minSemester: number;
  maxSemester: number;
  semesterRangeLabel: string;
  admissionModeLabel: string;
  eligibility: string;
  officialCode?: string;
  description: string;
  bridgeCoursesNotice?: string;
}

export interface ProgramAdmissionConfig {
  canonicalCode: string;
  canonicalName: string;
  displayName: string;
  degreeType: "UNDERGRADUATE" | "DIPLOMA" | "POSTGRADUATE" | "DOCTORAL";
  supportsLateral: boolean;
  regular: EntryModeDetails;
  lateral?: EntryModeDetails;
  legacyLateralCodes: string[];
}

/**
 * Universal registry mapping canonical programme codes to their admission modes.
 */
export const PROGRAM_ADMISSION_REGISTRY: Record<string, ProgramAdmissionConfig> = {
  "BTECH-CSE": {
    canonicalCode: "BTECH-CSE",
    canonicalName: "Bachelor of Technology in Computer Science & Engineering",
    displayName: "B.Tech CSE",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-CSE-LE", "BTECH-CSE-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry (1st Year Direct)",
      eligibility:
        "10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% aggregate marks (45% for SC/ST category) from a recognized board.",
      description:
        "Standard 4-year undergraduate degree following the complete verified Invertis University B.Tech Computer Science & Engineering curriculum from foundational engineering to advanced electives.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
      officialCode: "BTECH-008",
      eligibility:
        "3-Year Polytechnic Diploma in Engineering/Technology (CSE/IT/ECE) from an AICTE-approved institution, or B.Sc. with Mathematics with minimum 50% aggregate marks (45% for SC/ST).",
      description:
        "3-year accelerated undergraduate scheme enabling qualified polytechnic diploma holders to join directly in Semester III and complete B.Tech CSE through Semester VIII.",
    },
  },
  "BTECH-CSE-AI": {
    canonicalCode: "BTECH-CSE-AI",
    canonicalName: "B.Tech CSE (Artificial Intelligence & Machine Learning)",
    displayName: "B.Tech CSE (AI Specialization)",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-CSE-AI-LE"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry (1st Year Direct)",
      eligibility:
        "10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% aggregate marks (45% for SC/ST) from a recognized board.",
      description:
        "Specialized 4-year undergraduate curriculum focusing on Machine Learning algorithms, Deep Learning, Natural Language Processing, Computer Vision, and Cognitive Computing.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
      eligibility:
        "3-Year Polytechnic Diploma in CSE/IT/ECE or B.Sc. with Mathematics (Minimum 60% aggregate); Direct Admission to 2nd Year (Semester III).",
      description:
        "3-year specialized lateral entry route joining directly into Semester III of the AI & Machine Learning curriculum through Semester VIII.",
    },
  },
  "DIP-CSE": {
    canonicalCode: "DIP-CSE",
    canonicalName: "Diploma in Computer Science & Engineering",
    displayName: "Diploma in CSE",
    degreeType: "DIPLOMA",
    supportsLateral: true,
    legacyLateralCodes: ["DIP-ENG-LAT"],
    regular: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 1,
      maxSemester: 6,
      semesterRangeLabel: "Semesters I to VI (3 Academic Years)",
      admissionModeLabel: "Regular 3-Year Polytechnic Entry",
      eligibility:
        "Passed Class 10th (High School) examination from any recognized board with minimum 35% marks and Science and Mathematics as compulsory subjects.",
      description:
        "3-year polytechnic engineering diploma establishing core foundations in programming, database management, computer networks, and operating systems.",
    },
    lateral: {
      durationYears: 2,
      semestersCount: 4,
      minSemester: 3,
      maxSemester: 6,
      semesterRangeLabel: "Semesters III to VI (2 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
      eligibility:
        "10+2 with Physics, Chemistry, and Mathematics (PCM) or 2-Year ITI in relevant technical trade from a recognized institution.",
      description:
        "2-year lateral diploma scheme allowing 10+2 PCM or 2-year ITI credential holders direct entry into the 2nd year (Semester III) of the CSE polytechnic curriculum.",
    },
  },
  "BTECH-CSE-CC": {
    canonicalCode: "BTECH-CSE-CC",
    canonicalName: "B.Tech in CSE with Specialization in Cloud Computing",
    displayName: "B.Tech CSE (Cloud Computing)",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-019", "BTECH-CSE-CC-LE", "BTECH-CSE-CC-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry (1st Year Direct)",
      officialCode: "BTECH-019",
      eligibility:
        "10+2 with Physics and Mathematics as compulsory subjects, plus Chemistry/Computer Science/Technical Vocational subject (Minimum 50% aggregate, 45% for SC/ST); JEE Main / IUEEE / Merit.",
      description:
        "4-year undergraduate degree programme designed to address enterprise demand for scalable cloud infrastructure, virtualization, automated system deployment, and secure cloud operations.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct Admission to 2nd Year / Semester III)",
      officialCode: "BTECH-019",
      eligibility:
        "3-Year Polytechnic Diploma in CSE/IT/ECE or B.Sc. with Mathematics (Minimum 50% aggregate marks, 45% for SC/ST); Direct Admission to 2nd Year (Semester III).",
      description:
        "3-year specialized undergraduate lateral entry programme entering directly into Semester III of the B.Tech CSE (Cloud Computing & Cyber Security) curriculum through Semester VIII.",
    },
  },
  "MTECH-CSE": {
    canonicalCode: "MTECH-CSE",
    canonicalName: "Master of Technology in Computer Science & Engineering",
    displayName: "M.Tech CSE",
    degreeType: "POSTGRADUATE",
    supportsLateral: false,
    legacyLateralCodes: [],
    regular: {
      durationYears: 2,
      semestersCount: 4,
      minSemester: 1,
      maxSemester: 4,
      semesterRangeLabel: "Semesters I to IV (2 Academic Years)",
      admissionModeLabel: "Postgraduate Master's Programme",
      eligibility:
        "B.E. / B.Tech in CSE / IT / ECE or MCA / M.Sc. in Computer Science with minimum 55% aggregate marks (50% for SC/ST); GATE score preferred.",
      description:
        "2-year postgraduate program covering advanced algorithms, distributed systems, research methodology, and preparation for doctoral pathways or specialized R&D roles.",
    },
  },
  "PHD-009": {
    canonicalCode: "PHD-009",
    canonicalName: "Ph.D. in Computer Science & Engineering",
    displayName: "Ph.D. in CSE",
    degreeType: "DOCTORAL",
    supportsLateral: false,
    legacyLateralCodes: [],
    regular: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 1,
      maxSemester: 6,
      semesterRangeLabel: "3-Year Doctoral Research & Thesis",
      admissionModeLabel: "Doctoral Research Fellowship",
      eligibility:
        "Master’s degree in Engineering/Technology (M.Tech/M.E.) in CSE/IT (Minimum 55% aggregate, 50% for SC/ST); UGC-NET (JRF) / GATE / IUCET qualification.",
      description:
        "Highest academic research degree requiring advanced coursework, research publication in peer-reviewed journals, and defense of a doctoral thesis.",
    },
  },
  // Non-CSE engineering programmes with verified lateral entry schemes
  "BTECH-CE": {
    canonicalCode: "BTECH-CE",
    canonicalName: "Bachelor of Technology in Civil Engineering",
    displayName: "B.Tech Civil Engineering",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-CE-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry",
      eligibility: "10+2 with PCM with minimum 50% aggregate marks.",
      description: "Undergraduate curriculum in structural engineering, geotechnical analysis, and construction management.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct 2nd Year)",
      eligibility: "3-Year Polytechnic Diploma in Civil Engineering (Minimum 60% aggregate).",
      description: "Direct 2nd-year entry into B.Tech Civil Engineering for civil polytechnic diploma graduates.",
    },
  },
  "BTECH-ME": {
    canonicalCode: "BTECH-ME",
    canonicalName: "Bachelor of Technology in Mechanical Engineering",
    displayName: "B.Tech Mechanical Engineering",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-ME-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry",
      eligibility: "10+2 with PCM with minimum 50% aggregate marks.",
      description: "Core curriculum in thermal engineering, machine design, CAD/CAM, and industrial production.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct 2nd Year)",
      eligibility: "3-Year Polytechnic Diploma in Mechanical/Production/Automobile Engineering (Minimum 60% aggregate).",
      description: "Direct 2nd-year entry into B.Tech Mechanical Engineering for polytechnic diploma holders.",
    },
  },
  "BTECH-EE": {
    canonicalCode: "BTECH-EE",
    canonicalName: "Bachelor of Technology in Electrical Engineering",
    displayName: "B.Tech Electrical Engineering",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-EE-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry",
      eligibility: "10+2 with PCM with minimum 50% aggregate marks.",
      description: "Curriculum in power systems, electrical machines, control engineering, and power electronics.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct 2nd Year)",
      eligibility: "3-Year Polytechnic Diploma in Electrical/Electronics Engineering (Minimum 60% aggregate).",
      description: "Direct 2nd-year entry into B.Tech Electrical Engineering for electrical polytechnic diploma holders.",
    },
  },
  "BTECH-BT": {
    canonicalCode: "BTECH-BT",
    canonicalName: "Bachelor of Technology in Biotechnology Engineering",
    displayName: "B.Tech Biotechnology",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BTECH-BT-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry",
      eligibility: "10+2 with Physics and Mathematics/Biology (Minimum 50% aggregate marks, 45% for SC/ST).",
      description: "Undergraduate curriculum integrating engineering principles with molecular biology, bioprocess engineering, and bioinformatics.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct 2nd Year)",
      eligibility: "3-Year Polytechnic Diploma in Biotechnology/Chemical Engineering or B.Sc. with Life Sciences/Mathematics (Minimum 50% aggregate).",
      description: "Direct 2nd-year entry into B.Tech Biotechnology Engineering for eligible diploma and science graduates.",
    },
  },
  "BPHARM": {
    canonicalCode: "BPHARM",
    canonicalName: "Bachelor of Pharmacy (B.Pharm)",
    displayName: "Bachelor of Pharmacy",
    degreeType: "UNDERGRADUATE",
    supportsLateral: true,
    legacyLateralCodes: ["BPHARM-LAT"],
    regular: {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII (4 Academic Years)",
      admissionModeLabel: "Regular 4-Year Entry",
      eligibility: "10+2 with Physics, Chemistry, and Mathematics/Biology with minimum 50% aggregate marks (45% for SC/ST).",
      description: "Approved Pharmacy Council of India (PCI) undergraduate degree in pharmaceutical chemistry, pharmacology, pharmacognosy, and clinical pharmaceutics.",
    },
    lateral: {
      durationYears: 3,
      semestersCount: 6,
      minSemester: 3,
      maxSemester: 8,
      semesterRangeLabel: "Semesters III to VIII (3 Academic Years)",
      admissionModeLabel: "Lateral Entry (Direct 2nd Year / Semester III)",
      officialCode: "BPHARM-LAT",
      eligibility: "Passed 2-Year Diploma in Pharmacy (D.Pharm) from a PCI-approved institution with minimum 50% aggregate marks (45% for SC/ST category).",
      description: "PCI-compliant direct 2nd-year entry into Semester III of the Bachelor of Pharmacy curriculum for D.Pharm diploma graduates.",
    },
  },
};

/**
 * Standardized Lateral Entry Configuration Type
 * As specified in central architecture requirements.
 */
export interface LateralEntryConfig {
  available: boolean;
  durationYears?: number;
  entrySemester?: number;
  eligibility?: string;
  officialCode?: string;
  description?: string;
}

export interface StandardizedProgramme {
  id: string;
  code: string;
  name: string;
  academicLevel: "undergraduate" | "diploma" | "postgraduate" | "doctoral";
  regularDurationYears: number;
  lateralEntry: LateralEntryConfig;
}

/**
 * Resolves standardized lateral entry configuration for any programme.
 */
export function getProgrammeLateralEntryConfig(code: string): LateralEntryConfig {
  const config = getProgramAdmissionConfig(code);
  if (!config || !config.supportsLateral || !config.lateral) {
    return {
      available: false,
    };
  }
  return {
    available: true,
    durationYears: config.lateral.durationYears,
    entrySemester: config.lateral.minSemester,
    eligibility: config.lateral.eligibility,
    officialCode: config.lateral.officialCode,
    description: config.lateral.description,
  };
}

/**
 * Returns the admission configuration for a given canonical code.
 */
export function getProgramAdmissionConfig(code: string): ProgramAdmissionConfig | undefined {
  if (!code) return undefined;
  const upper = code.toUpperCase();
  // Check direct canonical code
  if (PROGRAM_ADMISSION_REGISTRY[upper]) {
    return PROGRAM_ADMISSION_REGISTRY[upper];
  }
  // Check if it's a legacy lateral code
  const canonical = resolveCanonicalCode(upper);
  return PROGRAM_ADMISSION_REGISTRY[canonical];
}

/**
 * Resolves any legacy or alias code to its canonical program code.
 * e.g. "BTECH-CSE-LE" -> "BTECH-CSE", "BTECH-CSE-LAT" -> "BTECH-CSE"
 */
export function resolveCanonicalCode(code: string): string {
  if (!code) return code;
  const upper = code.toUpperCase();
  for (const [canonical, config] of Object.entries(PROGRAM_ADMISSION_REGISTRY)) {
    if (canonical === upper || config.legacyLateralCodes.includes(upper)) {
      return canonical;
    }
  }
  return upper;
}

/**
 * Checks whether a program code supports lateral entry.
 */
export function programSupportsLateral(code: string): boolean {
  const config = getProgramAdmissionConfig(code);
  return Boolean(config?.supportsLateral && config?.lateral);
}

/**
 * Parses and sanitizes an entry mode string from a URL query parameter or string.
 */
export function parseEntryMode(mode?: string | string[] | null): AdmissionMode {
  if (!mode) return "regular";
  const val = Array.isArray(mode) ? mode[0] : mode;
  return val.toLowerCase() === "lateral" ? "lateral" : "regular";
}

/**
 * Returns active entry mode details for a given program and requested mode.
 * Falls back safely to regular entry if lateral is not supported.
 */
export function getActiveEntryDetails(code: string, mode: AdmissionMode): EntryModeDetails {
  const config = getProgramAdmissionConfig(code);
  if (!config) {
    return {
      durationYears: 4,
      semestersCount: 8,
      minSemester: 1,
      maxSemester: 8,
      semesterRangeLabel: "Semesters I to VIII",
      admissionModeLabel: "Regular Entry",
      eligibility: "Standard university admission requirements.",
      description: "Academic program curriculum.",
    };
  }

  if (mode === "lateral" && config.supportsLateral && config.lateral) {
    return config.lateral;
  }

  return config.regular;
}

/**
 * Validates whether a specific semester number is available for the given programme and entry mode.
 */
export function isSemesterAllowedForMode(code: string, semNum: number, mode: AdmissionMode): boolean {
  const details = getActiveEntryDetails(code, mode);
  return semNum >= details.minSemester && semNum <= details.maxSemester;
}

/**
 * Curated list of canonical CSE programme codes (one per academic programme).
 * Ordered by strict academic level priority:
 * 1. Diploma Programmes (DIP-CSE)
 * 2. Undergraduate Programmes (BTECH-CSE, BTECH-CSE-AI, BTECH-CSE-CC)
 * 3. Postgraduate Programmes (MTECH-CSE)
 * 4. Doctoral Research Programmes (PHD-009)
 */
export const CANONICAL_CSE_PROGRAMME_CODES = [
  "DIP-CSE",         // Diploma in CSE (Regular & Lateral Entry)
  "BTECH-CSE",       // B.Tech CSE (Regular & Lateral Entry)
  "BTECH-CSE-AI",    // B.Tech CSE (AI Specialization - Regular & Lateral Entry)
  "BTECH-CSE-CC",    // B.Tech CSE (Cloud Computing & Cyber Security)
  "MTECH-CSE",       // Master of Technology in CSE
  "PHD-009",         // Ph.D. in CSE
] as const;

export function isCanonicalCseProgramme(code: string): boolean {
  if (!code) return false;
  return (CANONICAL_CSE_PROGRAMME_CODES as readonly string[]).includes(code.toUpperCase() as any);
}

// Centralized academic level sorting and categorization exports
export * from "./academicLevels";

