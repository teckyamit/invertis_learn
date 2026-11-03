const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runAcceptanceVerification() {
  console.log("==================================================================");
  console.log("INVERTIS LEARN - PHASE 1 ACCEPTANCE CRITERIA VERIFICATION");
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

  // 1. Verify Portal Home Programmes
  console.log("\nStep 1: Verify Active Programmes for Portal Home");
  const programmes = await prisma.programme.findMany({
    where: { isActive: true },
    include: { curriculumVersions: { where: { isCurrent: true } } }
  });
  assert(programmes.length >= 2, `Found ${programmes.length} active programmes`);
  const btech = programmes.find(p => p.code === 'BTECH-CSE');
  const mtech = programmes.find(p => p.code === 'MTECH-CSE');
  assert(!!btech, "B.Tech Computer Science & Engineering exists");
  assert(!!mtech, "M.Tech Computer Science & Engineering exists");

  // 2. Verify B.Tech CSE Semesters
  console.log("\nStep 2: Select B.Tech CSE -> Verify Available Semesters");
  const btechSemesters = await prisma.semester.findMany({
    where: { curriculumVersion: { programmeId: btech.id, isCurrent: true } },
    include: { subjects: true },
    orderBy: { semesterNumber: 'asc' }
  });
  assert(btechSemesters.length === 8, `B.Tech CSE has exactly 8 semesters (Found: ${btechSemesters.length})`);
  const totalBtechSubjects = btechSemesters.reduce((acc, s) => acc + s.subjects.length, 0);
  assert(totalBtechSubjects > 0, `Total B.Tech CSE subjects loaded: ${totalBtechSubjects}`);

  // 3. Verify Semester 3 Subjects Isolation
  console.log("\nStep 3: Select Semester 3 -> Verify ONLY Semester 3 Subjects Appear");
  const sem3 = btechSemesters.find(s => s.semesterNumber === 3);
  assert(!!sem3, "Semester 3 exists");
  const sem3Codes = sem3.subjects.map(s => s.code);
  console.log(`  Semester 3 subjects count: ${sem3.subjects.length}`);
  console.log(`  Semester 3 subject codes: ${sem3Codes.join(', ')}`);
  assert(sem3Codes.includes('BCS-301'), "Includes BCS-301 (Data Structures)");
  assert(sem3Codes.includes('BCS-302'), "Includes BCS-302 (IT Infrastructure Management)");
  assert(sem3Codes.includes('BCS-303'), "Includes BCS-303 (Digital Electronics)");
  assert(sem3Codes.includes('BCS-351'), "Includes BCS-351 (Data Structures Lab)");
  assert(!sem3Codes.includes('BCS-401'), "Does NOT contain Semester 4 subjects");
  assert(!sem3Codes.includes('BCS-201'), "Does NOT contain Semester 2 subjects");

  // 4. Verify Subject 1: BCS-301 Data Structures
  console.log("\nStep 4: Click Data Structures (BCS-301) -> Verify Detailed Metadata & Syllabus");
  const bcs301 = await prisma.subject.findFirst({
    where: { code: 'BCS-301', semesterId: sem3.id },
    include: {
      resources: {
        where: { category: { code: 'SYLLABUS' } }
      }
    }
  });
  assert(!!bcs301, "BCS-301 subject record retrieved");
  assert(bcs301.credits === 3, `Credits is 3.0 (Found: ${bcs301.credits})`);
  assert(bcs301.lectureHours === 2 && bcs301.tutorialHours === 1 && bcs301.practicalHours === 0, `L-T-P is 2-1-0`);
  assert(bcs301.evaluationMarks === "CA: 25, EE: 50, Total: 75", `Evaluation marks: ${bcs301.evaluationMarks}`);

  const details301 = JSON.parse(bcs301.syllabusDetails || '{}');
  assert(details301.objectives?.length === 5, `Has 5 Course Objectives (CO1-CO5)`);
  assert(details301.outcomes?.length === 5, `Has 5 Course Outcomes (CO1-CO5)`);
  assert(details301.modules?.length === 3, `Has 3 Syllabus Modules (Module-I, Module-II, Module-III)`);
  assert(details301.textBooks?.length >= 2, `Has recommended textbooks (${details301.textBooks?.length})`);
  assert(details301.referenceBooks?.length >= 2, `Has reference books (${details301.referenceBooks?.length})`);

  assert(bcs301.resources.length === 1, "Has 1 associated official syllabus PDF resource");
  const resource301 = bcs301.resources[0];
  assert(resource301.storedFileName === 'BCS-301_Syllabus.pdf', `Resource PDF is ${resource301.storedFileName}`);

  // Check physical file existence
  const pdfPath301 = path.join(process.cwd(), 'public', resource301.storagePath);
  assert(fs.existsSync(pdfPath301), `Physical PDF file exists on disk: ${pdfPath301}`);

  // 5. Verify Subject 2: BCS-302 (Distinct Syllabus Verification)
  console.log("\nStep 5: Return to Semester 3 and Open BCS-302 -> Verify Distinct Metadata");
  const bcs302 = await prisma.subject.findFirst({
    where: { code: 'BCS-302', semesterId: sem3.id },
    include: { resources: true }
  });
  assert(!!bcs302, "BCS-302 record retrieved");
  assert(bcs302.name === 'IT Infrastructure Management', `BCS-302 Name is '${bcs302.name}'`);
  const details302 = JSON.parse(bcs302.syllabusDetails || '{}');
  assert(details302.modules?.[0]?.title?.includes("IT Infrastructure"), "Module 1 is specific to IT Infrastructure, not Data Structures");
  assert(details302.textBooks?.[0]?.includes("Phalguni Gupta"), "Textbook is Phalguni Gupta (distinct from Data Structures)");

  // 6. Verify Practical Subject: BCS-351 Data Structures Lab
  console.log("\nStep 6: Open BCS-351 Lab -> Verify Practical Experiments List");
  const bcs351 = await prisma.subject.findFirst({
    where: { code: 'BCS-351', semesterId: sem3.id },
    include: { resources: true }
  });
  assert(bcs351.subjectType === 'PRACTICAL', "Subject type is PRACTICAL");
  assert(bcs351.practicalHours === 4, "Practical hours is 4");
  const details351 = JSON.parse(bcs351.syllabusDetails || '{}');
  assert(details351.labExperiments?.length > 0, `Has ${details351.labExperiments?.length} prescribed lab experiments`);

  // 7. Verify M.Tech CSE Structure & Isolation
  console.log("\nStep 7: Verify M.Tech CSE Architecture");
  const mtechSemesters = await prisma.semester.findMany({
    where: { curriculumVersion: { programmeId: mtech.id, isCurrent: true } },
    include: { subjects: true },
    orderBy: { semesterNumber: 'asc' }
  });
  assert(mtechSemesters.length === 4, `M.Tech CSE has 4 semesters (Found: ${mtechSemesters.length})`);
  const mcs101 = await prisma.subject.findFirst({
    where: { code: 'MCS-101' },
    include: {
      resources: {
        where: { category: { code: 'SYLLABUS' } }
      }
    }
  });
  assert(!!mcs101, "MCS-101 (Advanced Computer Architecture) exists");
  assert(mcs101.resources[0]?.storedFileName === 'MCS-101_Syllabus.pdf', "M.Tech subject links to official subject PDF");

  console.log("\n==================================================================");
  if (passedAll) {
    console.log("RESULT: ALL PHASE 1 ACCEPTANCE CRITERIA PASSED SUCCESSFULLY! (100%)");
  } else {
    console.log("RESULT: SOME ACCEPTANCE TESTS FAILED");
  }
  console.log("==================================================================");

  await prisma.$disconnect();
}

runAcceptanceVerification();
