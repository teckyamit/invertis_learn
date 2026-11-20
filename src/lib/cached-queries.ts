import { cache } from "react";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { CANONICAL_CSE_PROGRAMME_CODES } from "@/lib/admissionModes";

// Per-request memoized programme query
export const getProgramme = cache(async (code: string) => {
  return db.programme.findUnique({
    where: { code, isActive: true },
  });
});

// Statically pre-rendered programmes for generateStaticParams
export async function getStaticProgrammeCodes(): Promise<{ programmeCode: string }[]> {
  const codes = [
    ...CANONICAL_CSE_PROGRAMME_CODES,
    "BTECH-CSE-LE",
    "BTECH-CSE-AI-LE",
  ];
  return codes.map(programmeCode => ({ programmeCode }));
}

// Statically pre-rendered semesters for generateStaticParams
export async function getStaticSemesterParams(): Promise<{ programmeCode: string; semesterNumber: string }[]> {
  const params: { programmeCode: string; semesterNumber: string }[] = [];
  
  // B.Tech programmes have semesters 1 through 8 (or 3-8 for lateral)
  const btechCodes = ["BTECH-CSE", "BTECH-CSE-AI", "BTECH-CSE-CC"];
  for (const code of btechCodes) {
    for (let s = 1; s <= 8; s++) {
      params.push({ programmeCode: code, semesterNumber: String(s) });
    }
  }

  // Lateral Entry: Semesters 3 through 8
  const lateralCodes = ["BTECH-CSE-LE", "BTECH-CSE-AI-LE"];
  for (const code of lateralCodes) {
    for (let s = 3; s <= 8; s++) {
      params.push({ programmeCode: code, semesterNumber: String(s) });
    }
  }

  // M.Tech CSE: Semesters 1 through 4
  for (let s = 1; s <= 4; s++) {
    params.push({ programmeCode: "MTECH-CSE", semesterNumber: String(s) });
  }

  // Diploma CSE: Semesters 1 through 6
  for (let s = 1; s <= 6; s++) {
    params.push({ programmeCode: "DIP-CSE", semesterNumber: String(s) });
  }

  // Ph.D. CSE: Semester 1
  params.push({ programmeCode: "PHD-009", semesterNumber: "1" });

  return params;
}
