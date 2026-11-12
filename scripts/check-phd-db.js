const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const p = await prisma.programme.findUnique({
    where: { code: 'PHD-009' },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: {
              subjects: true
            }
          }
        }
      }
    }
  });

  console.log('Programme:', p.code, p.name, 'hasOfficialSyllabus:', p.hasOfficialSyllabus);
  p.curriculumVersions.forEach((cv, idx) => {
    console.log(`Version ${idx + 1}: ${cv.versionYear} (${cv.regulationName}) - isCurrent: ${cv.isCurrent}`);
    cv.semesters.forEach(sem => {
      console.log(`  Semester ${sem.semesterNumber}: ${sem.title} (${sem.subjects.length} subjects)`);
      sem.subjects.forEach(sub => {
        console.log(`    - [${sub.code}] ${sub.name} (Credits: ${sub.credits}, Group: ${sub.electiveGroup || 'Core'})`);
      });
    });
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
