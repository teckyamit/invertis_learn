const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lateralProgs = await prisma.programme.findMany({
    where: { isLateralEntry: true }
  });
  console.log('Lateral entry programmes in DB:', lateralProgs.map(p => ({
    code: p.code,
    name: p.name,
    isActive: p.isActive,
    hasOfficialSyllabus: p.hasOfficialSyllabus
  })));
}

main().catch(console.error).finally(() => prisma.$disconnect());

