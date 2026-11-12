const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const progs = await prisma.programme.findMany({
    where: { isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
      hasOfficialSyllabus: true,
      isLateralEntry: true
    }
  });

  console.log(`Total active programmes: ${progs.length}`);
  progs.forEach(p => {
    console.log(`- [${p.code}] ${p.name} (hasOfficialSyllabus: ${p.hasOfficialSyllabus}, isLateralEntry: ${p.isLateralEntry})`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());

