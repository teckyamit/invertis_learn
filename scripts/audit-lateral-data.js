const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProg(code) {
  const p = await prisma.programme.findUnique({
    where: { code },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: {
              subjects: {
                include: {
                  resources: true
                }
              }
            }
          }
        }
      }
    }
  });

  if (!p) {
    console.log(`[${code}] NOT FOUND`);
    return;
  }

  let totalSubjects = 0;
  let totalResources = 0;
  p.curriculumVersions.forEach(cv => {
    cv.semesters.forEach(sem => {
      totalSubjects += sem.subjects.length;
      sem.subjects.forEach(sub => {
        totalResources += sub.resources.length;
      });
    });
  });

  console.log(`[${p.code}] ${p.name}`);
  console.log(`  CVs: ${p.curriculumVersions.length}, Subjects: ${totalSubjects}, Resources: ${totalResources}, isLateralEntry: ${p.isLateralEntry}, hasOfficialSyllabus: ${p.hasOfficialSyllabus}`);
  p.curriculumVersions.forEach(cv => {
    console.log(`    CV ${cv.versionYear}: Semesters: ${cv.semesters.map(s => s.semesterNumber).join(', ')}`);
  });
}

async function main() {
  console.log('--- AUDITING LATERAL & CANONICAL PROGRAMMES ---');
  await checkProg('BTECH-CSE');
  await checkProg('BTECH-CSE-LE');
  await checkProg('BTECH-CSE-LAT');
  await checkProg('BTECH-CSE-AI');
  await checkProg('BTECH-CSE-AI-LE');
  await checkProg('DIP-CSE');
  await checkProg('DIP-ENG-LAT');
  await checkProg('BPHARM');
  await checkProg('BPHARM-LAT');
}

main().catch(console.error).finally(() => prisma.$disconnect());

