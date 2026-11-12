const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prog = await prisma.programme.findFirst({
    where: {
      OR: [
        { code: 'BTECH-CSE-CC' },
        { code: { contains: 'CC' } },
        { name: { contains: 'Cloud' } }
      ]
    },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' },
            include: {
              subjects: true
            }
          }
        }
      }
    }
  });

  console.log('Programme:', prog ? {
    id: prog.id,
    code: prog.code,
    name: prog.name,
    hasOfficialSyllabus: prog.hasOfficialSyllabus,
    cvs: prog.curriculumVersions.map(c => ({
      year: c.versionYear,
      isCurrent: c.isCurrent,
      semesters: c.semesters.map(s => ({
        num: s.semesterNumber,
        title: s.title,
        subjectsCount: s.subjects.length
      }))
    }))
  } : 'NOT FOUND');
}

main().catch(console.error).finally(() => prisma.$disconnect());

