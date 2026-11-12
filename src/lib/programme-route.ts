import { cache } from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getParentProgrammeCode, isSemesterAllowedForProgramme } from "@/lib/lateralEntry";

export const resolveProgrammeRoute = cache(async (code: string, semester: number) => {
  if (!Number.isInteger(semester) || semester < 1 || semester > 12 || !isSemesterAllowedForProgramme(code, semester)) notFound();
  const programme = await db.programme.findFirst({ where: { code, isActive: true, department: { isActive: true } } });
  if (!programme) notFound();
  return { programme, parentCode: getParentProgrammeCode(code) };
});
