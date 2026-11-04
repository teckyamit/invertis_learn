const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prog = await prisma.programme.findUnique({
    where: { code: 'BTECH-CSE-AI' },
    include: {
      department: true,
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

  console.log('BTECH-CSE-AI Programme:');
  console.log(`ID: ${prog?.id}`);
  console.log(`Code: ${prog?.code}`);
  console.log(`Name: ${prog?.name}`);
  console.log(`HasOfficialSyllabus: ${prog?.hasOfficialSyllabus}`);
  console.log(`CurriculumVersions count: ${prog?.curriculumVersions.length}`);
  if (prog?.curriculumVersions.length) {
    for (const cv of prog.curriculumVersions) {
      console.log(`CurriculumVersion: ${cv.versionCode} (${cv.academicYear}), Semesters: ${cv.semesters.length}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);

