const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkIoT() {
  const p = await prisma.programme.findFirst({
    where: { code: 'BTECH-CSE-IOT' },
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
    console.log('No programme found with code BTECH-CSE-IOT');
    return;
  }

  console.log('Found Programme:', {
    id: p.id,
    code: p.code,
    name: p.name,
    degreeLevel: p.degreeLevel,
    hasOfficialSyllabus: p.hasOfficialSyllabus,
    isActive: p.isActive,
    curriculumVersionsCount: p.curriculumVersions.length
  });

  let totalSubjects = 0;
  let totalResources = 0;
  for (const cv of p.curriculumVersions) {
    for (const sem of cv.semesters) {
      totalSubjects += sem.subjects.length;
      for (const sub of sem.subjects) {
        totalResources += sub.resources.length;
      }
    }
  }

  console.log(`Total CurriculumVersions: ${p.curriculumVersions.length}`);
  console.log(`Total Subjects: ${totalSubjects}`);
  console.log(`Total Resources: ${totalResources}`);
}

checkIoT().finally(() => prisma.$disconnect());

