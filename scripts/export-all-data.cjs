const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function exportData() {
  console.log("=== EXPORTING INVERTIS LEARN SQLITE DATABASE FOR MIGRATION ===");

  const data = {
    metadata: {
      exportedAt: new Date().toISOString(),
      sourceProvider: "sqlite",
      sourceDb: "prisma/dev.db"
    },
    departments: await prisma.department.findMany(),
    programmes: await prisma.programme.findMany(),
    curriculumVersions: await prisma.curriculumVersion.findMany(),
    semesters: await prisma.semester.findMany(),
    subjects: await prisma.subject.findMany(),
    resourceCategories: await prisma.resourceCategory.findMany(),
    academicResources: await prisma.academicResource.findMany(),
    externalResources: await prisma.externalResource.findMany(),
    videoLectures: await prisma.videoLecture.findMany(),
    users: await prisma.user.findMany(),
    auditEvents: await prisma.auditEvent.findMany(),
  };

  const counts = {
    departments: data.departments.length,
    programmes: data.programmes.length,
    curriculumVersions: data.curriculumVersions.length,
    semesters: data.semesters.length,
    subjects: data.subjects.length,
    resourceCategories: data.resourceCategories.length,
    academicResources: data.academicResources.length,
    externalResources: data.externalResources.length,
    videoLectures: data.videoLectures.length,
    users: data.users.length,
    auditEvents: data.auditEvents.length,
  };

  console.log("Record counts captured:", counts);

  const exportDir = path.resolve(__dirname, "../backups");
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const exportPath = path.join(exportDir, "sqlite-academic-data-export.json");
  fs.writeFileSync(exportPath, JSON.stringify(data, null, 2), "utf-8");

  console.log(`Successfully exported full database to: ${exportPath}`);
  console.log(`File size: ${(fs.statSync(exportPath).size / 1024 / 1024).toFixed(2)} MB`);

  await prisma.$disconnect();
}

exportData().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});

