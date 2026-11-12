const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const p = await prisma.programme.findFirst({
    where: { code: 'BTECH-CSE-CC' },
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

  console.log('Programme:', {
    id: p.id,
    code: p.code,
    name: p.name,
    isActive: p.isActive,
    hasOfficialSyllabus: p.hasOfficialSyllabus,
    degreeLevel: p.degreeLevel,
    departmentId: p.departmentId
  });

  console.log(`Curriculum versions: ${p.curriculumVersions.length}`);
  p.curriculumVersions.forEach(cv => {
    console.log(`  CV: ${cv.versionYear} (${cv.regulationName}), isCurrent: ${cv.isCurrent}`);
    console.log(`  Semesters: ${cv.semesters.length}`);
    cv.semesters.forEach(s => {
      console.log(`    - Sem ${s.semesterNumber} (${s.title}): ${s.subjects.length} subjects`);
    });
  });
}

check().finally(() => prisma.$disconnect());

