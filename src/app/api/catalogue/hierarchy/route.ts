import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";
import { isPracticalEligible } from "@/lib/subject-classification";

export const revalidate = 3600;

export async function GET() {
  try {
    const programmes = await db.programme.findMany({
      where: { isActive: true },
      select: {
        id: true,
        code: true,
        name: true,
        category: true,
        degreeLevel: true,
        curriculumVersions: {
          where: { isCurrent: true },
          select: {
            id: true,
            versionYear: true,
            semesters: {
              select: {
                id: true,
                semesterNumber: true,
                title: true,
                subjects: {
                  where: { isActive: true },
                  select: {
                    id: true,
                    code: true,
                    name: true,
                    subjectType: true,
                    practicalHours: true,
                    lectureHours: true,
                    evaluationMarks: true,
                    syllabusDetails: true,
                  },
                  orderBy: { code: "asc" }
                }
              },
              orderBy: { semesterNumber: "asc" }
            }
          }
        }
      },
      orderBy: { name: "asc" }
    });

    const sorted = [...programmes].sort(compareProgrammesByAcademicLevel);

    const hierarchy = sorted.map(prog => {
      const currentVersion = prog.curriculumVersions[0];
      return {
        id: prog.id,
        code: prog.code,
        name: prog.name,
        category: prog.category,
        semesters: (currentVersion?.semesters || []).map(sem => ({
          id: sem.id,
          semesterNumber: sem.semesterNumber,
          title: sem.title,
          subjects: sem.subjects.map(s => ({
            id: s.id,
            code: s.code,
            name: s.name,
            subjectType: s.subjectType,
            practicalHours: s.practicalHours,
            isPracticalEligible: isPracticalEligible({
              code: s.code,
              name: s.name,
              subjectType: s.subjectType,
              practicalHours: s.practicalHours,
              lectureHours: s.lectureHours,
              evaluationMarks: s.evaluationMarks,
              syllabusDetails: s.syllabusDetails,
            })
          }))
        }))
      };
    });

    return NextResponse.json({ programmes: hierarchy }, {
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" }
    });
  } catch (error) {
    console.error("Failed to load hierarchy:", error);
    return NextResponse.json({ error: "Unable to load catalogue hierarchy" }, { status: 500 });
  }
}
