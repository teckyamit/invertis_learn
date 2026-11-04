const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const prisma = new PrismaClient();

async function runPhase4Verification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 4 (PRACTICAL & LAB MANUALS) VERIFICATION");
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
    }
  }

  // 1. Verify Category in DB
  console.log("\nStep 1: Verify LAB_MANUAL Resource Category in Database");
  const labCat = await prisma.resourceCategory.findUnique({
    where: { code: 'LAB_MANUAL' }
  });
  assert(!!labCat, "ResourceCategory 'LAB_MANUAL' exists in database");

  // 2. Verify BCS-351 (Data Structures Lab)
  console.log("\nStep 2: Verify BCS-351 Data Structures Lab Resources");
  const bcs351 = await prisma.subject.findFirst({
    where: { code: 'BCS-351' },
    include: {
      resources: {
        where: { category: { code: 'LAB_MANUAL' } }
      }
    }
  });
  assert(!!bcs351, "BCS-351 subject record retrieved");
  assert(bcs351.subjectType === 'PRACTICAL', "BCS-351 is marked as PRACTICAL course");
  assert(bcs351.resources.length === 3, `BCS-351 has 3 lab resources (Found: ${bcs351.resources.length})`);
  assert(bcs351.resources.some(r => r.resourceType === 'LAB_MANUAL'), "Contains Official Lab Manual");
  assert(bcs351.resources.some(r => r.resourceType === 'VIVA_QUESTIONS'), "Contains Viva Voce Q&A Guide");
  assert(bcs351.resources.some(r => r.resourceType === 'CODE_TEMPLATE'), "Contains Code Implementation Templates");

  const details351 = JSON.parse(bcs351.syllabusDetails || '{}');
  assert(details351.labExperiments && details351.labExperiments.length === 21, `Has 21 prescribed lab experiments (Found: ${details351.labExperiments?.length})`);

  // 3. Verify Other Practical Subjects Enrichment
  console.log("\nStep 3: Verify Multi-Course Practical Enrichment");
  const practicalCodes = ['BCS-352', 'BCS-353', 'BCS-354', 'BCS-251', 'BAS151'];
  for (const c of practicalCodes) {
    const sub = await prisma.subject.findFirst({
      where: { code: c },
      include: {
        resources: {
          where: { category: { code: 'LAB_MANUAL' } }
        }
      }
    });
    assert(!!sub, `Subject ${c} retrieved`);
    assert(sub.resources.length >= 1, `Subject ${c} has active lab manuals (Found: ${sub.resources.length})`);
    const details = JSON.parse(sub.syllabusDetails || '{}');
    assert(details.labExperiments && details.labExperiments.length > 0, `Subject ${c} has prescribed experiments list (${details.labExperiments?.length} experiments)`);
  }

  // 4. Verify Physical Lab Manual PDF Validity on Disk
  console.log("\nStep 4: Verify Physical Lab Manual PDFs Validity on Disk");
  const labsDir = path.join(process.cwd(), 'public', 'uploads', 'lab_manuals');
  assert(fs.existsSync(labsDir), `Lab manuals upload directory exists: ${labsDir}`);

  const allLabs = await prisma.academicResource.findMany({
    where: { category: { code: 'LAB_MANUAL' } }
  });
  assert(allLabs.length >= 11, `Total seeded lab resources is at least 11 (Found: ${allLabs.length})`);

  for (const l of allLabs) {
    const fullPath = path.join(process.cwd(), 'public', l.storagePath);
    assert(fs.existsSync(fullPath), `Physical file exists: ${l.storedFileName}`);
    const bytes = fs.readFileSync(fullPath);
    const pdfDoc = await PDFDocument.load(bytes);
    assert(pdfDoc.getPageCount() >= 1, `File ${l.storedFileName} is a valid PDF (Pages: ${pdfDoc.getPageCount()})`);
  }

  // 5. Verify Subject Isolation for Lab Manuals
  console.log("\nStep 5: Verify Subject Isolation for Lab Manuals");
  const bcs352 = await prisma.subject.findFirst({
    where: { code: 'BCS-352' },
    include: {
      resources: {
        where: { category: { code: 'LAB_MANUAL' } }
      }
    }
  });
  assert(bcs352.resources.length === 2, `BCS-352 has exactly 2 lab resources (Found: ${bcs352.resources.length})`);
  assert(bcs352.resources.every(r => r.title.includes("Linux") || r.title.includes("IT Infrastructure")), "BCS-352 resources are specific to Linux/IT Infrastructure, not Data Structures");

  const bas151 = await prisma.subject.findFirst({
    where: { code: 'BAS151' },
    include: {
      resources: {
        where: { category: { code: 'LAB_MANUAL' } }
      }
    }
  });
  assert(bas151.resources.length === 1, `BAS151 has exactly 1 lab manual (Found: ${bas151.resources.length})`);
  assert(bas151.resources[0].title.includes("Physics"), "BAS151 manual is specific to Physics Lab");

  // 6. Verify Resource Types Distribution
  console.log("\nStep 6: Verify Resource Types Distribution");
  const types = allLabs.map(l => l.resourceType);
  assert(types.includes('LAB_MANUAL'), "Has LAB_MANUAL type resources");
  assert(types.includes('VIVA_QUESTIONS'), "Has VIVA_QUESTIONS type resources");
  assert(types.includes('CODE_TEMPLATE'), "Has CODE_TEMPLATE type resources");

  console.log("\n==================================================================");
  console.log(`TOTAL CHECKS: ${checkCount} | PASSED: ${passCount} | FAILED: ${checkCount - passCount}`);
  if (passedAll) {
    console.log("RESULT: ALL PHASE 4 ACCEPTANCE CRITERIA PASSED! (100%)");
  } else {
    console.log("RESULT: SOME ACCEPTANCE TESTS FAILED");
  }
  console.log("==================================================================");
}

runPhase4Verification()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

