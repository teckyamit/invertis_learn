/**
 * src/lib/academic-credits.ts
 * 
 * Centralized Academic Credit & Regulation Rules
 * Reconciles official university degree credits with elective pools:
 * - DISC-02: M.Tech CSE 78 prescribed degree credits vs elective pool sums
 * - DISC-03: Ph.D. CSE 16 prescribed coursework credits vs elective basket
 * - DISC-05: Documented official university PDF errata notices
 * - DISC-06 & DISC-08: Code aliases for search and route lookups
 */

export interface SemesterCreditRule {
  prescribedCredits: number;
  electiveRule?: string;
  note?: string;
}

export interface ProgrammeCreditConfig {
  officialDegreeCredits: number;
  degreeCreditsLabel: string;
  semesters?: Record<number, SemesterCreditRule>;
}

export const PROGRAMME_CREDIT_CONFIGS: Record<string, ProgrammeCreditConfig> = {
  "MTECH-CSE": {
    officialDegreeCredits: 78.0,
    degreeCreditsLabel: "78.0 Prescribed Degree Credits (Session 2023-24 Scheme)",
    semesters: {
      1: {
        prescribedCredits: 22.0,
        note: "All 5 Theory courses + Colloquium are Core"
      },
      2: {
        prescribedCredits: 22.0,
        electiveRule: "Core (18 cr) + Choose 1 Elective-I (4 cr)",
        note: "Select exactly one 4-credit course from the Elective-I basket"
      },
      3: {
        prescribedCredits: 18.0,
        electiveRule: "Core (10 cr) + Choose 1 Elective-II (4 cr) + 1 Elective-III (4 cr)",
        note: "Select one Elective-II and one Elective-III course"
      },
      4: {
        prescribedCredits: 16.0,
        note: "Dissertation (Phase-II) Core"
      }
    }
  },
  "PHD-009": {
    officialDegreeCredits: 16.0,
    degreeCreditsLabel: "16.0 Required Coursework Credits (Ph.D. Ordinance Clause 5.1)",
    semesters: {
      1: {
        prescribedCredits: 16.0,
        electiveRule: "Core (12 cr) + Choose 1 Departmental Elective (4 cr)",
        note: "Candidates register for PhDRM 101, PhD-032, PhDCS 102 (Core), and choose 1 elective from PhDCS 103/104/105"
      }
    }
  },
  "DIP-CSE": {
    officialDegreeCredits: 166.0,
    degreeCreditsLabel: "166.0 Standard Diploma Credits",
  }
};

/**
 * Official University PDF Errata & Curator Notes (DISC-05, DISC-06)
 */
export const OFFICIAL_SYLLABUS_ERRATA: Record<string, string> = {
  "IIOT1": "Official Curriculum Note: Fundamentals of IoT Development is prescribed as a foundational 4-credit course in the B.Tech CSE (Cloud Computing) 1st-year curriculum.",
  "IIOT2": "Official Curriculum Note: Industrial Communication Protocols & Connectivity is prescribed as a 4-credit course in the B.Tech CSE (Cloud Computing) 2nd semester curriculum.",
  "BAS-301": "Curator Errata Note: Official university PDF 2316imguf_B.Tech.CSE2year.pdf lists Course Outcomes aligned with Discrete Structures under the Mathematics-III header. Invertis Learn preserves the prescribed Mathematics-III syllabus modules.",
  "BCS-404": "Curator Errata Note: Official university scheme summary table indicates 3 credits, while the detail syllabus page specifies 4 credits (3L:1T:0P). Invertis Learn reflects 4 credits in accordance with contact hour regulations.",
  "DEC351": "Curriculum Code Note: Listed as DEC351 in the Diploma scheme overview table and referenced as DCS-351 in the syllabus detail. Both codes are canonical aliases for Digital Electronics Lab.",
  "PhDCS 105": "Curator Note: Official Ph.D. syllabus document contains typographic misspellings ('Peremption Ceiling Protocol' for Preemption Ceiling Protocol). Display text has been normalized to reflect academic accuracy."
};

/**
 * Code Aliases for seamless search and routing (DISC-06, DISC-08)
 */
export const CODE_ALIASES: Record<string, string[]> = {
  "dec351": ["DCS-351", "DCS351", "DEC351", "DEC-351"],
  "dcs-351": ["DEC351", "DEC-351", "DCS-351", "DCS351"],
  "dcs351": ["DEC351", "DEC-351", "DCS-351", "DCS351"],
  "mcs351": ["MCS-351", "MCS351"],
  "mcs-351": ["MCS351", "MCS-351"],
  "mcs393": ["MCS-393", "MCS393"],
  "mcs-393": ["MCS393", "MCS-393"],
  "bcs201": ["BCSAI 103", "BCS201"],
  "bcs-301": ["BCSAI 303", "BCS-301"],
  "bcs-401": ["BCSAI 204", "BCS-401"]
};

/**
 * Resolves all search and code variants for a given subject code
 */
export function getSubjectCodeVariants(inputCode: string): string[] {
  if (!inputCode) return [];
  const clean = inputCode.trim();
  const normalized = clean.replace(/[\s-]+/g, "").toLowerCase();
  const hyphenated = clean.replace(/^([A-Za-z]+)[\s-]*(\d+.*)$/, "$1-$2");

  const aliases = CODE_ALIASES[normalized] || CODE_ALIASES[clean.toLowerCase()] || [];

  return Array.from(new Set([
    clean,
    clean.toUpperCase(),
    clean.toLowerCase(),
    normalized,
    normalized.toUpperCase(),
    hyphenated,
    hyphenated.toUpperCase(),
    ...aliases,
    ...aliases.map(a => a.toUpperCase()),
    ...aliases.map(a => a.toLowerCase())
  ])).filter(Boolean);
}
