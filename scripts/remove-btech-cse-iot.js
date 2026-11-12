const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeIoT() {
  console.log('=== REMOVING BTECH-CSE-IOT FROM DATABASE ===');
  const existing = await prisma.programme.findFirst({
    where: { code: 'BTECH-CSE-IOT' },
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

  if (!existing) {
    console.log('BTECH-CSE-IOT is not in the database.');
    return;
  }

  console.log('Found programme:', existing.id, existing.name, existing.code);
  console.log('Curriculum versions count:', existing.curriculumVersions.length);

  // If there are curriculum versions or subjects, delete them cleanly first
  for (const cv of existing.curriculumVersions) {
    for (const sem of cv.semesters) {
      await prisma.subject.deleteMany({
        where: { semesterId: sem.id }
      });
      console.log(`Deleted subjects for Semester ${sem.id}`);
    }
    await prisma.semester.deleteMany({
      where: { curriculumVersionId: cv.id }
    });
    console.log(`Deleted semesters for CurriculumVersion ${cv.id}`);
  }

  await prisma.curriculumVersion.deleteMany({
    where: { programmeId: existing.id }
  });
  console.log('Deleted curriculum versions.');

  await prisma.programme.delete({
    where: { id: existing.id }
  });
  console.log('Successfully deleted Programme BTECH-CSE-IOT from database!');
}

removeIoT()
  .catch(err => {
    console.error('Error removing BTECH-CSE-IOT:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

