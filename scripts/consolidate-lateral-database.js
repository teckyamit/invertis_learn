const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Consolidating Lateral Entry Course Records in Database ---');

  const legacyLateralCodes = [
    'BTECH-CSE-LE',
    'BTECH-CSE-LAT',
    'BTECH-CSE-AI-LE',
    'BTECH-CE-LAT',
    'BTECH-EE-LAT',
    'BTECH-ME-LAT',
    'DIP-ENG-LAT',
    'BPHARM-LAT'
  ];

  for (const code of legacyLateralCodes) {
    const prog = await prisma.programme.findUnique({
      where: { code },
      include: {
        curriculumVersions: {
          include: {
            semesters: {
              include: { subjects: true }
            }
          }
        }
      }
    });

    if (prog) {
      let subjectCount = 0;
      prog.curriculumVersions.forEach(cv => {
        cv.semesters.forEach(s => {
          subjectCount += s.subjects.length;
        });
      });

      console.log(`Programme [${code}]: active=${prog.isActive}, subjects=${subjectCount}`);

      // Deactivate standalone duplicate row so it never appears in catalog lists,
      // while preserving its database row and history
      await prisma.programme.update({
        where: { code },
        data: {
          isActive: false,
          isLateralEntry: true,
          hasOfficialSyllabus: false
        }
      });
      console.log(`Deactivated standalone lateral record [${code}]`);
    }
  }

  // Ensure canonical programs are active and have proper lateral entry support
  const canonicalUpdates = [
    {
      code: 'BTECH-CSE',
      data: {
        hasOfficialSyllabus: true,
        isActive: true,
        isLateralEntry: false
      }
    },
    {
      code: 'BTECH-CSE-AI',
      data: {
        hasOfficialSyllabus: true,
        isActive: true,
        isLateralEntry: false
      }
    }
  ];

  for (const u of canonicalUpdates) {
    await prisma.programme.update({
      where: { code: u.code },
      data: u.data
    });
    console.log(`Verified canonical programme [${u.code}]`);
  }

  console.log('--- Consolidation Complete! ---');
}

main().catch(console.error).finally(() => prisma.$disconnect());

