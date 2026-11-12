// Export complete snapshot of all 11 models directly from current SQLite database
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const db = new PrismaClient();

async function main() {
  console.log("Exporting complete snapshot from SQLite...");
  
  const snapshot = {
    format: "invertis-learn-complete-v1",
    exportedAt: new Date().toISOString(),
    sourceDatabase: "sqlite",
    data: {
      department: await db.department.findMany(),
      user: await db.user.findMany(),
      programme: await db.programme.findMany(),
      curriculumVersion: await db.curriculumVersion.findMany(),
      semester: await db.semester.findMany(),
      subject: await db.subject.findMany(),
      resourceCategory: await db.resourceCategory.findMany(),
      academicResource: await db.academicResource.findMany(),
      externalResource: await db.externalResource.findMany(),
      videoLecture: await db.videoLecture.findMany(),
      auditEvent: await db.auditEvent.findMany(),
    }
  };

  const counts = {};
  for (const [model, records] of Object.entries(snapshot.data)) {
    counts[model] = records.length;
    console.log(`  - ${model}: ${records.length} records`);
  }
  snapshot.counts = counts;

  const outPath = path.resolve(__dirname, "../backups/complete-academic-and-auth-snapshot.json");
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2), "utf8");
  console.log(`Snapshot saved to ${outPath}`);
}

main()
  .catch((e) => {
    console.error("Export error:", e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());

