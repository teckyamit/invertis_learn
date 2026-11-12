// Safe, High-Performance Neon PostgreSQL Data Migration Script for Invertis Learn
// Uses batch createMany() for high-speed transfer over network latency with complete fidelity

const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const snapshotPath = path.resolve(__dirname, "../backups/complete-academic-and-auth-snapshot.json");

if (!fs.existsSync(snapshotPath)) {
  console.error("Critical: Complete snapshot backup not found at", snapshotPath);
  process.exit(1);
}

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
console.log(`Loaded complete snapshot exported at: ${snapshot.exportedAt}`);

const db = new PrismaClient();

const insertionOrder = [
  "department",
  "user",
  "programme",
  "curriculumVersion",
  "semester",
  "subject",
  "resourceCategory",
  "academicResource",
  "externalResource",
  "videoLecture",
  "auditEvent",
];

function chunkArray(array, chunkSize = 100) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

async function main() {
  console.log("Connecting to target database...");
  await db.$connect();
  console.log("Connected successfully to target database!");

  // Safety check: ensure target database is empty
  const existingDepts = await db.department.count();
  if (existingDepts > 0) {
    console.log(`Target database already contains ${existingDepts} department records.`);
    console.log("Checking record counts against snapshot...");
    let matches = true;
    for (const model of insertionOrder) {
      const count = await db[model].count();
      const expected = snapshot.counts[model];
      console.log(`  - ${model}: ${count} / ${expected} expected`);
      if (count !== expected) matches = false;
    }
    if (matches) {
      console.log("\nAll records in target database already match the snapshot perfectly. No data modified.");
      return;
    } else {
      console.warn("\nWarning: Target database contains partial data. Aborting to avoid corrupting records.");
      process.exit(1);
    }
  }

  console.log("\nBeginning batch data transfer to Neon PostgreSQL...");

  for (const model of insertionOrder) {
    const rawRecords = snapshot.data[model];
    console.log(`Migrating ${rawRecords.length} records for model '${model}'...`);

    const formatted = rawRecords.map((raw) => {
      const row = { ...raw };
      for (const dateField of ["createdAt", "updatedAt", "reviewedAt"]) {
        if (row[dateField]) {
          row[dateField] = new Date(row[dateField]);
        }
      }
      return row;
    });

    const chunks = chunkArray(formatted, 100);
    for (const chunk of chunks) {
      await db[model].createMany({ data: chunk });
    }
    console.log(`  ✓ Completed '${model}'`);
  }

  console.log("\nVerifying migrated record counts on Neon PostgreSQL:");
  let allMatched = true;
  for (const model of insertionOrder) {
    const count = await db[model].count();
    const expected = snapshot.counts[model];
    const match = count === expected ? "PASS" : "FAIL";
    console.log(`  [${match}] ${model}: ${count} (expected: ${expected})`);
    if (count !== expected) allMatched = false;
  }

  if (!allMatched) {
    throw new Error("Validation failed: Target database record counts do not match SQLite snapshot.");
  }

  console.log("\nData migration to Neon PostgreSQL completed with 100% verification!");
}

main()
  .catch((e) => {
    console.error("Migration error:", e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
