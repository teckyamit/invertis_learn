import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { activeSubject, publicResource } from "@/lib/resource-policy";
import { compareProgrammesByAcademicLevel } from "@/lib/academicLevels";

export const getCatalogueCounts = unstable_cache(async () => {
  const [totalProgrammes, totalDepartments, totalSubjects, totalResources] = await Promise.all([
    db.programme.count({ where: { isActive: true, isLateralEntry: false } }), db.department.count({ where: { isActive: true } }),
    db.subject.count({ where: activeSubject }), db.academicResource.count({ where: publicResource }),
  ]);
  return { totalProgrammes, totalDepartments, totalSubjects, totalResources };
}, ["public-catalogue-counts-v1"], { revalidate: 300, tags: ["catalogue"] });

export const getSearchProgrammes = unstable_cache(async () => {
  const programmes = await db.programme.findMany({
    where: { isActive: true, curriculumVersions: { some: { isCurrent: true } } },
    select: { code: true, name: true, category: true, degreeLevel: true },
    orderBy: { name: "asc" },
  });
  return [...programmes].sort(compareProgrammesByAcademicLevel);
}, ["search-programmes-v1"], { revalidate: 3600, tags: ["catalogue", "programmes"] });
