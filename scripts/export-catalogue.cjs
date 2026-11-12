const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const db = new PrismaClient();
const models = [
  "department",
  "programme",
  "curriculumVersion",
  "semester",
  "subject",
  "resourceCategory",
  "academicResource",
  "externalResource",
  "videoLecture"
];

async function main() {
  console.log("Exporting current database catalogue to prisma/catalogue.json...");
  const data = {};
  for (const model of models) {
    data[model] = await db[model].findMany();
    console.log(`  - ${model}: ${data[model].length} records`);
  }

  const snapshot = {
    format: 1,
    exportedAt: new Date().toISOString(),
    data
  };

  const targetPath = path.join(__dirname, "../prisma/catalogue.json");
  fs.writeFileSync(targetPath, JSON.stringify(snapshot, null, 2), "utf-8");
  console.log(`Successfully updated ${targetPath}`);
  await db.$disconnect();
}

main().catch(err => {
  console.error("Export error:", err);
  process.exit(1);
});

