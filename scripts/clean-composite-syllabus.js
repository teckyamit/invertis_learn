const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Find IDs of composite resources where storagePath does not contain 'subjects/'
  const obsolete = await prisma.academicResource.findMany({
    where: {
      category: { code: 'SYLLABUS' },
      NOT: {
        storagePath: { contains: 'subjects/' }
      }
    },
    select: { id: true }
  });

  console.log(`Found ${obsolete.length} obsolete composite syllabus resources to remove.`);

  if (obsolete.length > 0) {
    const ids = obsolete.map(o => o.id);
    const result = await prisma.academicResource.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    console.log(`Successfully deleted ${result.count} composite resources.`);
  }

  // Let's verify BCS101, BAS102, BCS201
  const checkCodes = ['BCS101', 'BAS102', 'BCS201', 'BCS-301'];
  for (const c of checkCodes) {
    const res = await prisma.academicResource.findMany({
      where: { subject: { code: c }, category: { code: 'SYLLABUS' } },
      select: { id: true, title: true, storagePath: true, fileSizeBytes: true }
    });
    console.log(`Resources for [${c}]:`, res);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
