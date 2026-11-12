const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prog = await prisma.programme.findUnique({
    where: { code: 'DIP-CSE' },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' },
            include: {
              subjects: {
                orderBy: { code: 'asc' }
              }
            }
          }
        }
      }
    }
  });

  if (!prog) {
    console.error('DIP-CSE NOT FOUND!');
    return;
  }

  console.log(`Programme: ${prog.name} (${prog.code})`);
  console.log(`Has Official Syllabus: ${prog.hasOfficialSyllabus}`);
  console.log(`Official Source: ${prog.officialSourceUrl}`);
  console.log(`Curriculum Versions: ${prog.curriculumVersions.length}`);

  for (const cv of prog.curriculumVersions) {
    console.log(`\nVersion: ${cv.versionYear} (${cv.regulationName}) - Current: ${cv.isCurrent}`);
    for (const sem of cv.semesters) {
      console.log(`  ${sem.title} (Sem ${sem.semesterNumber}) - ${sem.subjects.length} subjects:`);
      const theory = sem.subjects.filter(s => s.subjectType === 'THEORY');
      const practical = sem.subjects.filter(s => s.subjectType !== 'THEORY');
      console.log(`     Theory (${theory.length}): ${theory.map(s => `${s.code} (${s.credits}cr)`).join(', ')}`);
      console.log(`     Practical (${practical.length}): ${practical.map(s => `${s.code} (${s.credits}cr)`).join(', ')}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

