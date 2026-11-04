const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const cats = await prisma.resourceCategory.findMany();
  console.log('Categories in DB:');
  console.log(cats);
  await prisma.$disconnect();
}

check().catch(console.error);

