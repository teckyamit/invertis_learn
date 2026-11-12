const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const prisma = new PrismaClient();

async function runPhase3Verification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 3 (FACULTY NOTES & LEARNING RESOURCES) TEST");
  console.log("==================================================================");

  let passedAll = true;
  let checkCount = 0;
  let passCount = 0;

  function assert(condition, message) {
    checkCount++;
    if (condition) {
      passCount++;
      console.log(`  [PASS] ${message}`);
    } else {
      console.error(`  [FAIL] ${message}`);
      passedAll = false;
      process.exitCode = 1;
    }
  }

  // 1. Verify Category in DB
  console.log("\nStep 1: Verify NOTES Resource Category in Database");
  const notesCat = await prisma.resourceCategory.findUnique({
    where: { code: 'NOTES' }
  });
  assert(!!notesCat, "ResourceCategory 'NOTES' exists in database");

  // 2. Verify BCS-301 (Data Structures) Notes
  console.log("\nStep 2: Verify BCS-301 Data Structures Learning Resources");
  const bcs301Notes = await prisma.academicResource.findMany({
    where: {
      category: { code: 'NOTES' },
      subject: { code: 'BCS-301' }
    },
    orderBy: { createdAt: 'asc' }
  });
  assert(bcs301Notes.length === 4, `BCS-301 has 4 learning resources (Found: ${bcs301Notes.length})`);
  assert(bcs301Notes.some(n => n.unitNumber === 1 && n.resourceType === 'LECTURE_NOTES'), "Contains Unit 1 Lecture Notes (Arrays/Stacks/Queues)");
  assert(bcs301Notes.some(n => n.unitNumber === 2 && n.resourceType === 'LECTURE_NOTES'), "Contains Unit 2 Lecture Notes (Trees/AVL)");
  assert(bcs301Notes.some(n => n.unitNumber === 3 && n.resourceType === 'UNIT_SUMMARY'), "Contains Unit 3 Revision Summary (Sorting/Searching)");
  assert(bcs301Notes.some(n => n.resourceType === 'PPT_SLIDES'), "Contains Comprehensive Course PPT Slide Deck");

  const sampleNote = bcs301Notes[0];
  assert(sampleNote.provenanceStatus === "PRACTICE" && !sampleNote.authorName, `Practice material has no unverified author attribution: '${sampleNote.authorName}'`);

  // 3. Verify Physical PDF Validity on Disk
  console.log("\nStep 3: Verify Physical PDF Validity of Notes Documents on Disk");
  const notesDir = require("./lib/storage-path.cjs").resourcePath('notes');
  assert(fs.existsSync(notesDir), `Notes upload directory exists: ${notesDir}`);

  for (const n of bcs301Notes) {
    const fullPath = require("./lib/storage-path.cjs").resourcePath(n.storagePath);
    assert(fs.existsSync(fullPath), `Physical file exists: ${n.storedFileName}`);
    const bytes = fs.readFileSync(fullPath);
    const pdfDoc = await PDFDocument.load(bytes);
    assert(pdfDoc.getPageCount() >= 1, `File ${n.storedFileName} is a valid PDF (Pages: ${pdfDoc.getPageCount()})`);
  }

  // 4. Verify Multi-Course Resource Diversity
  console.log("\nStep 4: Verify Multi-Course & Multi-Programme Resource Seeding");
  const allNotes = await prisma.academicResource.findMany({
    where: { category: { code: 'NOTES' } },
    include: { subject: true }
  });
  assert(allNotes.length >= 10, `Total seeded notes is at least 10 (Found: ${allNotes.length})`);

  const subjectsWithNotes = Array.from(new Set(allNotes.map(n => n.subject.code)));
  console.log(`  Subjects with active learning resources: ${subjectsWithNotes.join(', ')}`);
  assert(subjectsWithNotes.includes('BCS-301'), "Includes BCS-301 Data Structures");
  assert(subjectsWithNotes.includes('BCS-302'), "Includes BCS-302 IT Infrastructure");
  assert(subjectsWithNotes.includes('BCS-303'), "Includes BCS-303 Digital Electronics");
  assert(subjectsWithNotes.includes('BCS201'), "Includes BCS201 Programming in C");
  assert(subjectsWithNotes.includes('BAS102'), "Includes BAS102 Engineering Mathematics-I");
  assert(subjectsWithNotes.includes('MCS-101'), "Includes MCS-101 M.Tech Advanced Architecture");

  // 5. Verify Subject Isolation
  console.log("\nStep 5: Verify Subject Isolation for Learning Notes");
  const bcs302Notes = await prisma.academicResource.findMany({
    where: { category: { code: 'NOTES' }, subject: { code: 'BCS-302' } }
  });
  assert(bcs302Notes.length === 1, `BCS-302 has exactly 1 note (Found: ${bcs302Notes.length})`);
  assert(bcs302Notes[0].title.includes("Data Center"), "BCS-302 note is specific to Data Center, not Data Structures");

  const bas102Notes = await prisma.academicResource.findMany({
    where: { category: { code: 'NOTES' }, subject: { code: 'BAS102' } }
  });
  assert(bas102Notes.length === 1, `BAS102 has exactly 1 note (Found: ${bas102Notes.length})`);
  assert(bas102Notes[0].title.includes("Matrices"), "BAS102 note is specific to Mathematics formula sheet");

  // 6. Verify Resource Types Distribution
  console.log("\nStep 6: Verify Resource Types Distribution");
  const types = allNotes.map(n => n.resourceType);
  assert(types.includes('LECTURE_NOTES'), "Has LECTURE_NOTES type resources");
  assert(types.includes('UNIT_SUMMARY'), "Has UNIT_SUMMARY type resources");
  assert(types.includes('PPT_SLIDES'), "Has PPT_SLIDES type resources");
  assert(types.includes('FORMULA_SHEET'), "Has FORMULA_SHEET type resources");

  console.log("\n==================================================================");
  console.log(`TOTAL CHECKS: ${checkCount} | PASSED: ${passCount} | FAILED: ${checkCount - passCount}`);
  if (passedAll) {
    console.log("RESULT: ALL PHASE 3 ACCEPTANCE CRITERIA PASSED! (100%)");
  } else {
    console.log("RESULT: SOME ACCEPTANCE TESTS FAILED");
  }
  console.log("==================================================================");
}

runPhase3Verification()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

