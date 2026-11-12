const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lateralCodes = ['BTECH-CSE-LE', 'BTECH-CSE-LAT', 'BTECH-CSE-AI-LE', 'BTECH-CE-LAT', 'BTECH-EE-LAT', 'BTECH-ME-LAT', 'DIP-ENG-LAT', 'BPHARM-LAT'];
  
  for (const code of lateralCodes) {
    const prog = await prisma.programme.findUnique({
      where: { code },
      include: {
        curriculumVersions: true,
      }
    });
    if (prog) {
      console.log(`Code: ${code}, ID: ${prog.id}, CVs: ${prog.curriculumVersions.length}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

