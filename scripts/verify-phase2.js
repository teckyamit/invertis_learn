const { PDFDocument } = require("pdf-lib");
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runPhase2Verification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 2 (PYQ LIBRARY WITH DEMO PAPERS) VERIFICATION");
  console.log("==================================================================");

  let passedAll = true;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
    } else {
      console.error(`  [FAIL] ${message}`);
      passedAll = false;
      process.exitCode = 1;
    }
  }

  // 1. Verify PYQ Category
  console.log("\nStep 1: Verify PYQ Category in Database");
  const pyqCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'PYQ' }
  });
  assert(!!pyqCategory, "PYQ Resource Category exists in database");

  // 2. Verify BCS-301 Demo Papers
  console.log("\nStep 2: Verify BCS-301 (Data Structures) Seeded Demo Papers");
  const bcs301 = await prisma.subject.findFirst({
    where: { code: 'BCS-301' },
    include: {
      resources: {
        where: { category: { code: 'PYQ' } },
        orderBy: [{ academicYear: 'desc' }, { createdAt: 'desc' }]
      }
    }
  });
  assert(!!bcs301, "BCS-301 Data Structures exists");
  assert(bcs301.resources.length >= 3, `BCS-301 retains at least 3 seeded papers (Found: ${bcs301.resources.length})`);

  const sessions = bcs301.resources.map(r => r.academicYear);
  assert(sessions.includes("2023-2024"), "Contains Session 2023-2024 Mid-Semester paper");
  assert(sessions.includes("2022-2023"), "Contains Session 2022-2023 End-Semester paper");
  assert(sessions.includes("2021-2022"), "Contains Session 2021-2022 End-Semester paper");

  const midSem = bcs301.resources.find(r => r.examType === "MID_SEMESTER");
  assert(!!midSem, "Correctly identifies Mid-Semester exam type");

  const withSolutions = bcs301.resources.find(r => r.hasSolutions);
  assert(!!withSolutions && withSolutions.academicYear === "2021-2022", "Session 2021-2022 has solutions flagged as true");

  // 3. Verify Physical Files on Disk
  console.log("\nStep 3: Verify Physical PDF Validity on Disk");
  for (const res of bcs301.resources) {
    const filePath = require("./lib/storage-path.cjs").resourcePath("pyq/" + res.storedFileName);
    assert(fs.existsSync(filePath), `Physical file exists: ${res.storedFileName}`);
    const content = await PDFDocument.load(fs.readFileSync(filePath));
    assert(content.getPageCount() > 0, `File ${res.storedFileName} is a readable PDF document`);
  }

  // 4. Verify BCS-302 & BCS-303 Isolation
  console.log("\nStep 4: Verify Subject Isolation (BCS-302 & BCS-303)");
  const bcs302 = await prisma.subject.findFirst({
    where: { code: 'BCS-302' },
    include: { resources: { where: { category: { code: 'PYQ' } } } }
  });
  assert(bcs302.resources.length === 1, `BCS-302 has exactly 1 past paper (Found: ${bcs302.resources.length})`);
  assert(bcs302.resources[0].storedFileName === "BCS302_EndSem_2022_23.pdf", "BCS-302 points to IT Infrastructure paper");

  const bcs303 = await prisma.subject.findFirst({
    where: { code: 'BCS-303' },
    include: { resources: { where: { category: { code: 'PYQ' } } } }
  });
  assert(bcs303.resources.length === 1, `BCS-303 has exactly 1 past paper (Found: ${bcs303.resources.length})`);
  assert(bcs303.resources[0].storedFileName === "BCS303_EndSem_2022_23.pdf", "BCS-303 points to Digital Electronics paper");

  // 5. Verify M.Tech CSE Paper
  console.log("\nStep 5: Verify M.Tech CSE Paper Integration");
  const mcs101 = await prisma.subject.findFirst({
    where: { code: 'MCS-101' },
    include: { resources: { where: { category: { code: 'PYQ' } } } }
  });
  assert(mcs101.resources.length === 1, `MCS-101 has 1 past paper (Found: ${mcs101.resources.length})`);
  assert(mcs101.resources[0].storedFileName === "MCS101_EndSem_2022_23.pdf", "MCS-101 points to Advanced Computer Architecture paper");

  console.log("\n==================================================================");
  if (passedAll) {
    console.log("RESULT: ALL PHASE 2 DEMO PAPERS VERIFICATION PASSED! (100%)");
  } else {
    console.log("RESULT: SOME VERIFICATION CHECKS FAILED");
  }
  console.log("==================================================================");

  await prisma.$disconnect();
}

runPhase2Verification();
