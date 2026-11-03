const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runPhase2Verification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 2 (PYQ LIBRARY) ACCEPTANCE VERIFICATION");
  console.log("==================================================================");

  let passedAll = true;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
    } else {
      console.error(`  [FAIL] ${message}`);
      passedAll = false;
    }
  }

  // 1. Verify PYQ Category
  console.log("\nStep 1: Verify PYQ Category in Database");
  const pyqCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'PYQ' }
  });
  assert(!!pyqCategory, "PYQ Resource Category exists in database");

  // 2. Verify Subject Association for BCS-301
  console.log("\nStep 2: Retrieve BCS-301 (Data Structures) for PYQ Integration");
  const bcs301 = await prisma.subject.findFirst({
    where: { code: 'BCS-301' }
  });
  assert(!!bcs301, "BCS-301 Data Structures exists");

  // 3. Test Multi-Paper Creation for BCS-301 (Verifying Non-Unique Constraint)
  console.log("\nStep 3: Test Multiple PYQ Papers for the Same Subject");
  const dummyPaper1 = await prisma.academicResource.upsert({
    where: { id: 'test-pyq-2022-23' },
    update: {},
    create: {
      id: 'test-pyq-2022-23',
      subjectId: bcs301.id,
      categoryId: pyqCategory.id,
      title: 'BCS-301 Data Structures End-Semester Exam 2022-23',
      originalFileName: 'BCS301_EndSem_2022_23.pdf',
      storedFileName: 'BCS301_EndSem_2022_23.pdf',
      storagePath: 'uploads/pyq/BCS301_EndSem_2022_23.pdf',
      fileSizeBytes: 245000,
      academicYear: '2022-2023',
      examType: 'END_SEMESTER',
      hasSolutions: false,
      isPublished: true,
    }
  });

  const dummyPaper2 = await prisma.academicResource.upsert({
    where: { id: 'test-pyq-2021-22' },
    update: {},
    create: {
      id: 'test-pyq-2021-22',
      subjectId: bcs301.id,
      categoryId: pyqCategory.id,
      title: 'BCS-301 Data Structures End-Semester Exam 2021-22',
      originalFileName: 'BCS301_EndSem_2021_22.pdf',
      storedFileName: 'BCS301_EndSem_2021_22.pdf',
      storagePath: 'uploads/pyq/BCS301_EndSem_2021_22.pdf',
      fileSizeBytes: 260000,
      academicYear: '2021-2022',
      examType: 'END_SEMESTER',
      hasSolutions: true,
      isPublished: true,
    }
  });

  assert(!!dummyPaper1 && !!dummyPaper2, "Successfully created multiple distinct PYQ papers for BCS-301");

  // 4. Query PYQs for BCS-301
  console.log("\nStep 4: Query PYQ Archive for BCS-301");
  const bcs301Pyqs = await prisma.academicResource.findMany({
    where: {
      subjectId: bcs301.id,
      categoryId: pyqCategory.id,
    },
    orderBy: { academicYear: 'desc' }
  });
  assert(bcs301Pyqs.length >= 2, `Found ${bcs301Pyqs.length} PYQ papers for BCS-301`);
  const sessions = bcs301Pyqs.map(p => p.academicYear);
  assert(sessions.includes('2022-2023'), "Includes Session 2022-2023 paper");
  assert(sessions.includes('2021-2022'), "Includes Session 2021-2022 paper");

  // 5. Subject Isolation Check
  console.log("\nStep 5: Verify Subject Isolation (BCS-302 has no BCS-301 papers)");
  const bcs302 = await prisma.subject.findFirst({ where: { code: 'BCS-302' } });
  const bcs302Pyqs = await prisma.academicResource.findMany({
    where: {
      subjectId: bcs302.id,
      categoryId: pyqCategory.id,
    }
  });
  assert(!bcs302Pyqs.some(p => p.title.includes('Data Structures')), "BCS-302 does NOT contain Data Structures papers");

  // 6. Verify PYQ Upload Directory exists
  console.log("\nStep 6: Verify Physical Storage Directory");
  const pyqDir = path.join(process.cwd(), 'public', 'uploads', 'pyq');
  assert(fs.existsSync(pyqDir), `Directory public/uploads/pyq exists on disk`);

  // Clean up test records
  await prisma.academicResource.deleteMany({
    where: { id: { in: ['test-pyq-2022-23', 'test-pyq-2021-22'] } }
  });
  console.log("  [CLEANUP] Test records cleaned up successfully");

  console.log("\n==================================================================");
  if (passedAll) {
    console.log("RESULT: ALL PHASE 2 ACCEPTANCE CRITERIA PASSED SUCCESSFULLY! (100%)");
  } else {
    console.log("RESULT: SOME ACCEPTANCE TESTS FAILED");
  }
  console.log("==================================================================");

  await prisma.$disconnect();
}

runPhase2Verification();
