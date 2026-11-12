const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const prisma = new PrismaClient();

async function runSubjectIsolationVerification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - SUBJECT-WISE SYLLABUS ISOLATION ACCEPTANCE TEST");
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

  // -------------------------------------------------------------
  // TEST STEP 1: Select B.Tech CSE
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 1: Select B.Tech CSE ---");
  const btech = await prisma.programme.findUnique({
    where: { code: 'BTECH-CSE' },
    include: {
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' }
          }
        }
      }
    }
  });
  assert(!!btech, "B.Tech CSE programme found");
  assert(btech.curriculumVersions.length > 0, "Current curriculum version exists");
  assert(btech.curriculumVersions[0].semesters.length === 8, "All 8 semesters exist");

  // -------------------------------------------------------------
  // TEST STEP 2: Select Semester 1
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 2: Select Semester 1 ---");
  const sem1 = await prisma.semester.findFirst({
    where: {
      semesterNumber: 1,
      curriculumVersion: { programme: { code: 'BTECH-CSE' } }
    },
    include: {
      subjects: {
        where: { isActive: true },
        include: {
          resources: {
            where: { category: { code: 'SYLLABUS' } }
          }
        },
        orderBy: { code: 'asc' }
      }
    }
  });
  assert(!!sem1, "Semester 1 retrieved");
  const sem1SubjectCodes = sem1.subjects.map(s => s.code);
  const sem1SubjectNames = sem1.subjects.map(s => s.name);
  console.log(`  Semester 1 total subjects: ${sem1.subjects.length}`);
  console.log(`  Codes: ${sem1SubjectCodes.join(', ')}`);

  assert(sem1SubjectCodes.includes('BCS201'), "Semester 1 contains Programming in C (BCS201)");
  assert(sem1SubjectCodes.includes('BAS102'), "Semester 1 contains Engineering Mathematics (BAS102)");
  assert(sem1SubjectCodes.includes('BCS101'), "Semester 1 contains Computer Fundamentals (BCS101)");

  // -------------------------------------------------------------
  // TEST STEP 3: Click Programming in C
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 3 & 4: Click Programming in C (Verify ONLY its syllabus appears) ---");
  const cSubject = sem1.subjects.find(s => s.code === 'BCS201');
  assert(!!cSubject, "Programming in C subject record exists");
  assert(cSubject.name.includes("Programming in C"), `Subject name is '${cSubject.name}'`);
  assert(cSubject.code === 'BCS201', `Subject code is 'BCS201'`);
  assert(cSubject.credits === 3, `Credits is 3.0 (Found: ${cSubject.credits})`);

  const cDetails = JSON.parse(cSubject.syllabusDetails || '{}');
  assert(cDetails.modules && cDetails.modules.length > 0, `Has structured unit-wise modules (${cDetails.modules?.length} modules)`);

  const cTitles = cDetails.modules.map(m => m.title).join(' | ');
  const cTopics = cDetails.modules.map(m => m.topics).join(' | ');
  assert(cTitles.includes("Programming in C"), "Module 1 covers Programming in C");
  assert(cTitles.includes("Operators, Control Structures"), "Module 2 covers Control Structures & Functions");
  assert(cTitles.includes("Arrays, Strings, Pointers & File Handling"), "Module 3 covers Arrays, Pointers & File Handling");

  // Verify Course Outcomes
  assert(cDetails.outcomes && cDetails.outcomes.length > 0, `Has course outcomes (${cDetails.outcomes?.length} outcomes)`);
  assert(cDetails.outcomes.some(o => o.includes("C language")), "Outcomes specifically reference C language programming");

  // CRITICAL ISOLATION CHECK: Must NOT contain other subjects
  assert(!cTopics.includes("Matrices"), "Programming in C does NOT include Matrices (Math)");
  assert(!cTopics.includes("Differential Calculus"), "Programming in C does NOT include Differential Calculus (Math)");
  assert(!cTopics.includes("Semiconductor Diodes"), "Programming in C does NOT include Semiconductor Diodes (Electronics)");
  assert(!cTopics.includes("Newton's ring"), "Programming in C does NOT include Newton's ring (Physics)");

  // PDF Isolation check
  assert(cSubject.resources.length === 1, "Subject has exactly 1 official syllabus PDF attached");
  const cResource = cSubject.resources[0];
  assert(cResource.storedFileName === 'BCS201_Syllabus.pdf', `Resource file is '${cResource.storedFileName}' (NOT composite PDF)`);
  assert(cResource.storagePath === 'uploads/syllabus/subjects/BCS201_Syllabus.pdf', `Resource path is '${cResource.storagePath}'`);

  // Verify physical PDF file
  const cPdfPath = require("./lib/storage-path.cjs").resourcePath(cResource.storagePath);
  assert(fs.existsSync(cPdfPath), `Physical subject PDF exists: ${cPdfPath}`);
  const cPdfDoc = await PDFDocument.load(fs.readFileSync(cPdfPath));
  assert(cPdfDoc.getPageCount() === 2, `PDF contains exactly 2 pages for Programming in C (Found: ${cPdfDoc.getPageCount()})`);

  // -------------------------------------------------------------
  // TEST STEP 4: Click Engineering Mathematics
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 5 & 6: Click Engineering Mathematics (Verify ONLY its syllabus appears) ---");
  const mathSubject = sem1.subjects.find(s => s.code === 'BAS102');
  assert(!!mathSubject, "Engineering Mathematics subject record exists");
  assert(mathSubject.name.includes("Mathematics"), `Subject name is '${mathSubject.name}'`);
  assert(mathSubject.code === 'BAS102', `Subject code is 'BAS102'`);
  assert(mathSubject.credits === 4, `Credits is 4.0 (Found: ${mathSubject.credits})`);

  const mathDetails = JSON.parse(mathSubject.syllabusDetails || '{}');
  assert(mathDetails.modules && mathDetails.modules.length > 0, `Has structured unit-wise modules (${mathDetails.modules?.length} modules)`);

  const mathTitles = mathDetails.modules.map(m => m.title).join(' | ');
  const mathTopics = mathDetails.modules.map(m => m.topics).join(' | ');
  assert(mathTitles.includes("Matrices"), "Module I covers Matrices");
  assert(mathTitles.includes("Differential Calculus"), "Module II covers Differential Calculus");
  assert(mathTitles.includes("Fourier Series & Vector Calculus"), "Module III covers Fourier Series & Vector Calculus");

  // Books
  assert(mathDetails.textBooks && mathDetails.textBooks.length >= 2, `Has recommended textbooks (${mathDetails.textBooks?.length})`);
  assert(mathDetails.textBooks.some(b => b.includes("H.K. Dass")), "Recommends H.K. Dass Higher Engineering Mathematics");
  assert(mathDetails.textBooks.some(b => b.includes("B.S. Grewal")), "Recommends B.S. Grewal Engineering Mathematics");

  assert(mathDetails.referenceBooks && mathDetails.referenceBooks.length >= 2, `Has reference books (${mathDetails.referenceBooks?.length})`);
  assert(mathDetails.referenceBooks.some(b => b.includes("Kreyszig")), "References E. Kreyszig Advanced Engineering Mathematics");

  // CRITICAL ISOLATION CHECK: Must NOT contain other subjects
  assert(!mathTopics.includes("Format of C program"), "Mathematics does NOT include C programming");
  assert(!mathTopics.includes("Pointers to Objects"), "Mathematics does NOT include Pointers");
  assert(!mathTopics.includes("Basic Computer Organization"), "Mathematics does NOT include Computer Organization");
  assert(!mathTopics.includes("Semiconductor"), "Mathematics does NOT include Semiconductors");

  // PDF Isolation check
  assert(mathSubject.resources.length === 1, "Subject has exactly 1 official syllabus PDF attached");
  const mathResource = mathSubject.resources[0];
  assert(mathResource.storedFileName === 'BAS102_Syllabus.pdf', `Resource file is '${mathResource.storedFileName}' (NOT composite PDF)`);
  assert(mathResource.storagePath === 'uploads/syllabus/subjects/BAS102_Syllabus.pdf', `Resource path is '${mathResource.storagePath}'`);

  // Verify physical PDF file
  const mathPdfPath = require("./lib/storage-path.cjs").resourcePath(mathResource.storagePath);
  assert(fs.existsSync(mathPdfPath), `Physical subject PDF exists: ${mathPdfPath}`);
  const mathPdfDoc = await PDFDocument.load(fs.readFileSync(mathPdfPath));
  assert(mathPdfDoc.getPageCount() === 1, `PDF contains exactly 1 page for Mathematics-I (Found: ${mathPdfDoc.getPageCount()})`);

  // -------------------------------------------------------------
  // TEST STEP 5: Verification of Computer Fundamentals (BCS101)
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 7: Verify Computer Fundamentals (BCS101) Subject Isolation ---");
  const cfSubject = sem1.subjects.find(s => s.code === 'BCS101');
  assert(!!cfSubject, "Computer Fundamentals (BCS101) exists");
  const cfDetails = JSON.parse(cfSubject.syllabusDetails || '{}');
  assert(cfDetails.modules?.length === 3, `Has 3 modules (Found: ${cfDetails.modules?.length})`);
  assert(cfDetails.textBooks?.some(b => b.includes("Rajaraman")), "Recommends Rajaraman V. Fundamentals of Computers");
  assert(cfSubject.resources[0]?.storedFileName === 'BCS101_Syllabus.pdf', "Links to BCS101_Syllabus.pdf");

  const cfPdfPath = path.join(process.cwd(), 'public', cfSubject.resources[0].storagePath);
  assert(fs.existsSync(cfPdfPath), `Physical BCS101 PDF exists: ${cfPdfPath}`);
  const cfPdfDoc = await PDFDocument.load(fs.readFileSync(cfPdfPath));
  assert(cfPdfDoc.getPageCount() === 1, `BCS101 PDF is exactly 1 page (Found: ${cfPdfDoc.getPageCount()})`);

  // -------------------------------------------------------------
  // TEST STEP 6: Universal Subject-Level PDF Integrity Check
  // -------------------------------------------------------------
  console.log("\n--- TEST STEP 8: Check Entire Repository for Unintended Composite Syllabi ---");
  const lingeringComposite = await prisma.academicResource.findMany({
    where: {
      category: { code: 'SYLLABUS' },
      NOT: {
        storagePath: { contains: 'subjects/' }
      }
    }
  });
  assert(lingeringComposite.length === 0, `Zero lingering composite PDFs attached to subjects (Found: ${lingeringComposite.length})`);

  console.log("\n==================================================================");
  console.log(`TOTAL CHECKS: ${checkCount} | PASSED: ${passCount} | FAILED: ${checkCount - passCount}`);
  if (passedAll) {
    console.log("RESULT: ALL SUBJECT ISOLATION ACCEPTANCE CRITERIA PASSED! (100%)");
  } else {
    console.log("RESULT: SOME ACCEPTANCE TESTS FAILED");
  }
  console.log("==================================================================");
}

runSubjectIsolationVerification()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
