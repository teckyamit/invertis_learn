const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function researchCseSubjects() {
  const programmes = await prisma.programme.findMany({
    where: {
      code: { in: ['BTECH-CSE', 'BTECH-CSE-AI', 'MTECH-CSE'] }
    },
    include: {
      curriculumVersions: {
        where: { isCurrent: true },
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

  for (const p of programmes) {
    const cv = p.curriculumVersions[0];
    console.log(`\n======================================================`);
    console.log(`PROGRAMME: ${p.name} (${p.code}) - ${cv ? cv.semesters.length : 0} Semesters`);
    console.log(`======================================================`);
    if (cv) {
      for (const sem of cv.semesters) {
        console.log(`\n--- ${sem.title} (Semester ${sem.semesterNumber}) [${sem.subjects.length} subjects] ---`);
        for (const sub of sem.subjects) {
          let units = 0;
          if (sub.syllabusDetails) {
            try {
              const d = JSON.parse(sub.syllabusDetails);
              units = (d.modules ? d.modules.length : 0) || (d.labExperiments ? d.labExperiments.length : 0);
            } catch(e) {}
          }
          console.log(`  - [${sub.code}] ${sub.name} (${sub.subjectType}, ${sub.credits} Credits, ${units} Units/Labs)`);
        }
      }
    }
  }

  await prisma.$disconnect();
}

researchCseSubjects().catch(console.error);

