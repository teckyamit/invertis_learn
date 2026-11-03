const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function seedDemoPYQs() {
  console.log("Seeding authentic demo examination papers for Phase 2...");

  const pyqCategory = await prisma.resourceCategory.upsert({
    where: { code: "PYQ" },
    update: {},
    create: {
      code: "PYQ",
      name: "Previous Year Question Paper",
      description: "Official end-semester and mid-semester past question papers",
    },
  });

  const demoPapers = [
    {
      subjectCode: "BCS-301",
      title: "BCS-301 Data Structures — End-Semester Examination 2022-23",
      file: "BCS301_EndSem_2022_23.pdf",
      academicYear: "2022-2023",
      examType: "END_SEMESTER",
      hasSolutions: false,
    },
    {
      subjectCode: "BCS-301",
      title: "BCS-301 Data Structures — End-Semester Examination 2021-22",
      file: "BCS301_EndSem_2021_22.pdf",
      academicYear: "2021-2022",
      examType: "END_SEMESTER",
      hasSolutions: true,
    },
    {
      subjectCode: "BCS-301",
      title: "BCS-301 Data Structures — Mid-Semester Examination 2023-24",
      file: "BCS301_MidSem_2023_24.pdf",
      academicYear: "2023-2024",
      examType: "MID_SEMESTER",
      hasSolutions: false,
    },
    {
      subjectCode: "BCS-302",
      title: "BCS-302 IT Infrastructure Management — End-Semester Examination 2022-23",
      file: "BCS302_EndSem_2022_23.pdf",
      academicYear: "2022-2023",
      examType: "END_SEMESTER",
      hasSolutions: false,
    },
    {
      subjectCode: "BCS-303",
      title: "BCS-303 Digital Electronics — End-Semester Examination 2022-23",
      file: "BCS303_EndSem_2022_23.pdf",
      academicYear: "2022-2023",
      examType: "END_SEMESTER",
      hasSolutions: false,
    },
    {
      subjectCode: "MCS-101",
      title: "MCS-101 Advanced Computer Architecture — End-Semester Examination 2022-23",
      file: "MCS101_EndSem_2022_23.pdf",
      academicYear: "2022-2023",
      examType: "END_SEMESTER",
      hasSolutions: true,
    },
  ];

  for (const p of demoPapers) {
    const subject = await prisma.subject.findFirst({
      where: { code: p.subjectCode },
    });

    if (!subject) {
      console.warn(`Subject ${p.subjectCode} not found in database, skipping.`);
      continue;
    }

    const filePath = path.join(process.cwd(), "public", "uploads", "pyq", p.file);
    const stat = fs.statSync(filePath);

    const resourceId = `pyq_${p.subjectCode}_${p.academicYear}_${p.examType}`;

    await prisma.academicResource.upsert({
      where: { id: resourceId },
      update: {
        title: p.title,
        originalFileName: p.file,
        storedFileName: p.file,
        storagePath: `uploads/pyq/${p.file}`,
        fileSizeBytes: stat.size,
        academicYear: p.academicYear,
        examType: p.examType,
        hasSolutions: p.hasSolutions,
        isPublished: true,
      },
      create: {
        id: resourceId,
        subjectId: subject.id,
        categoryId: pyqCategory.id,
        title: p.title,
        originalFileName: p.file,
        storedFileName: p.file,
        storagePath: `uploads/pyq/${p.file}`,
        fileSizeBytes: stat.size,
        academicYear: p.academicYear,
        examType: p.examType,
        hasSolutions: p.hasSolutions,
        isPublished: true,
      },
    });

    console.log(`Seeded PYQ: [${p.subjectCode}] ${p.title} (${p.academicYear})`);
  }

  const count = await prisma.academicResource.count({
    where: { category: { code: "PYQ" } },
  });

  console.log(`\nTotal Active PYQ Records in Database: ${count}`);
  await prisma.$disconnect();
}

seedDemoPYQs().catch((e) => {
  console.error(e);
  process.exit(1);
});
