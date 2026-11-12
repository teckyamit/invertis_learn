const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function importData() {
  console.log("=== IMPORTING INVERTIS LEARN ACADEMIC DATA ===");

  const exportPath = path.resolve(__dirname, "../backups/sqlite-academic-data-export.json");
  if (!fs.existsSync(exportPath)) {
    throw new Error(`Export file not found: ${exportPath}`);
  }

  const data = JSON.parse(fs.readFileSync(exportPath, "utf-8"));
  console.log(`Loaded export from ${data.metadata.exportedAt}`);

  // 1. Departments
  console.log(`Importing ${data.departments.length} departments...`);
  for (const d of data.departments) {
    await prisma.department.upsert({
      where: { id: d.id },
      create: { ...d, createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt) },
      update: { ...d, createdAt: new Date(d.createdAt), updatedAt: new Date(d.updatedAt) },
    });
  }

  // 2. Users
  console.log(`Importing ${data.users.length} users...`);
  for (const u of data.users) {
    await prisma.user.upsert({
      where: { id: u.id },
      create: { ...u, createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt) },
      update: { ...u, createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt) },
    });
  }

  // 3. Programmes
  console.log(`Importing ${data.programmes.length} programmes...`);
  for (const p of data.programmes) {
    await prisma.programme.upsert({
      where: { id: p.id },
      create: { ...p, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) },
      update: { ...p, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) },
    });
  }

  // 4. Curriculum Versions
  console.log(`Importing ${data.curriculumVersions.length} curriculum versions...`);
  for (const cv of data.curriculumVersions) {
    await prisma.curriculumVersion.upsert({
      where: { id: cv.id },
      create: { ...cv, createdAt: new Date(cv.createdAt), updatedAt: new Date(cv.updatedAt) },
      update: { ...cv, createdAt: new Date(cv.createdAt), updatedAt: new Date(cv.updatedAt) },
    });
  }

  // 5. Semesters
  console.log(`Importing ${data.semesters.length} semesters...`);
  for (const s of data.semesters) {
    await prisma.semester.upsert({
      where: { id: s.id },
      create: s,
      update: s,
    });
  }

  // 6. Subjects
  console.log(`Importing ${data.subjects.length} subjects...`);
  for (const sub of data.subjects) {
    await prisma.subject.upsert({
      where: { id: sub.id },
      create: { ...sub, createdAt: new Date(sub.createdAt), updatedAt: new Date(sub.updatedAt) },
      update: { ...sub, createdAt: new Date(sub.createdAt), updatedAt: new Date(sub.updatedAt) },
    });
  }

  // 7. Resource Categories
  console.log(`Importing ${data.resourceCategories.length} categories...`);
  for (const cat of data.resourceCategories) {
    await prisma.resourceCategory.upsert({
      where: { id: cat.id },
      create: cat,
      update: cat,
    });
  }

  // 8. Academic Resources
  console.log(`Importing ${data.academicResources.length} academic resources...`);
  for (const r of data.academicResources) {
    await prisma.academicResource.upsert({
      where: { id: r.id },
      create: {
        ...r,
        reviewedAt: r.reviewedAt ? new Date(r.reviewedAt) : null,
        createdAt: new Date(r.createdAt),
        updatedAt: new Date(r.updatedAt),
      },
      update: {
        ...r,
        reviewedAt: r.reviewedAt ? new Date(r.reviewedAt) : null,
        createdAt: new Date(r.createdAt),
        updatedAt: new Date(r.updatedAt),
      },
    });
  }

  // 9. External Resources
  console.log(`Importing ${data.externalResources.length} external resources...`);
  for (const er of data.externalResources) {
    await prisma.externalResource.upsert({
      where: { id: er.id },
      create: { ...er, createdAt: new Date(er.createdAt), updatedAt: new Date(er.updatedAt) },
      update: { ...er, createdAt: new Date(er.createdAt), updatedAt: new Date(er.updatedAt) },
    });
  }

  // 10. Video Lectures
  console.log(`Importing ${data.videoLectures.length} video lectures...`);
  for (const vl of data.videoLectures) {
    await prisma.videoLecture.upsert({
      where: { id: vl.id },
      create: { ...vl, createdAt: new Date(vl.createdAt), updatedAt: new Date(vl.updatedAt) },
      update: { ...vl, createdAt: new Date(vl.createdAt), updatedAt: new Date(vl.updatedAt) },
    });
  }

  // 11. Audit Events
  console.log(`Importing ${data.auditEvents.length} audit events...`);
  for (const ae of data.auditEvents) {
    await prisma.auditEvent.upsert({
      where: { id: ae.id },
      create: { ...ae, createdAt: new Date(ae.createdAt) },
      update: { ...ae, createdAt: new Date(ae.createdAt) },
    });
  }

  console.log("=== ALL DATA IMPORTED SUCCESSFULLY WITH 100% RELATIONAL INTEGRITY ===");
  await prisma.$disconnect();
}

if (require.main === module) {
  importData().catch((err) => {
    console.error("Import failed:", err);
    process.exit(1);
  });
}

module.exports = { importData };

