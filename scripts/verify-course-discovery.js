const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyDiscovery() {
  console.log('==================================================================');
  console.log('INVERTIS LEARN - UNIVERSITY COURSE DISCOVERY & IMPORT VERIFICATION');
  console.log('==================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Verify Faculties / Departments
  console.log('Step 1: Verify All 9 Discovered Faculties & Departments');
  const depts = await prisma.department.findMany({ orderBy: { code: 'asc' } });
  assert(depts.length === 9, `Expected 9 departments, found: ${depts.length}`);
  const deptCodes = depts.map(d => d.code);
  assert(deptCodes.includes('ENG'), 'Faculty of Engineering & Technology (ENG) exists');
  assert(deptCodes.includes('CA'), 'Faculty of Computer Applications (CA) exists');
  assert(deptCodes.includes('MGMT'), 'Faculty of Management & Commerce (MGMT) exists');
  assert(deptCodes.includes('PHARM'), 'Faculty of Pharmaceutical Sciences (PHARM) exists');
  assert(deptCodes.includes('LAW'), 'Faculty of Legal Studies (LAW) exists');
  assert(deptCodes.includes('SCI'), 'Faculty of Applied Sciences & Humanities (SCI) exists');
  assert(deptCodes.includes('AGRI'), 'Faculty of Agriculture (AGRI) exists');
  assert(deptCodes.includes('EDU'), 'Faculty of Education (EDU) exists');
  assert(deptCodes.includes('JMC'), 'Faculty of Journalism & Mass Communication (JMC) exists');

  // 2. Verify Total Programmes and Categories
  console.log('\nStep 2: Verify University-Wide Programme Count and Category Distribution');
  const totalProgs = await prisma.programme.count();
  assert(totalProgs >= 49, `Catalog size must be at least 49 (Found: ${totalProgs})`);

  const ugProgs = await prisma.programme.count({ where: { category: 'UNDERGRADUATE' } });
  const pgProgs = await prisma.programme.count({ where: { category: 'POSTGRADUATE' } });
  const dipProgs = await prisma.programme.count({ where: { category: 'DIPLOMA' } });
  const phdProgs = await prisma.programme.count({ where: { category: 'DOCTORAL' } });

  console.log(`  Distribution: UG=${ugProgs}, PG=${pgProgs}, Diploma=${dipProgs}, Ph.D.=${phdProgs}`);
  assert(ugProgs >= 20, `UG programmes count verified (Found: ${ugProgs})`);
  assert(pgProgs >= 10, `PG programmes count verified (Found: ${pgProgs})`);
  assert(dipProgs >= 5, `Diploma programmes count verified (Found: ${dipProgs})`);
  assert(phdProgs >= 8, `Doctoral programmes count verified (Found: ${phdProgs})`);

  // 3. Verify Engineering Department Offerings (Phase 3 Requirement)
  console.log('\nStep 3: Verify Engineering Department Offerings (B.Tech, AI, Cloud, Lateral, Diploma, M.Tech)');
  const engDept = await prisma.department.findUnique({ where: { code: 'ENG' } });
  const engProgs = await prisma.programme.findMany({ where: { departmentId: engDept.id } });
  assert(engProgs.length >= 20, `Engineering offerings count verified (Found: ${engProgs.length})`);

  const engCodes = engProgs.map(p => p.code);
  assert(engCodes.includes('BTECH-CSE'), 'B.Tech CSE exists');
  assert(engCodes.includes('BTECH-CSE-AI'), 'B.Tech CSE with AI & ML exists');
  assert(engCodes.includes('BTECH-CSE-CC'), 'B.Tech CSE with Cloud Computing exists');
  assert(engCodes.includes('BTECH-CSE-IOT'), 'B.Tech CSE with IoT exists');
  assert(engCodes.includes('BTECH-ME'), 'B.Tech Mechanical Engineering exists');
  assert(engCodes.includes('BTECH-CE'), 'B.Tech Civil Engineering exists');
  assert(engCodes.includes('BTECH-EE'), 'B.Tech Electrical Engineering exists');
  assert(engCodes.includes('BTECH-BT'), 'B.Tech Biotechnology Engineering exists');
  assert(engCodes.includes('BTECH-CSE-LAT'), 'B.Tech CSE (Lateral Entry) exists');
  assert(engCodes.includes('DIP-CSE'), 'Polytechnic Diploma in CSE exists');
  assert(engCodes.includes('DIP-CE'), 'Polytechnic Diploma in Civil exists');
  assert(engCodes.includes('DIP-EE'), 'Polytechnic Diploma in Electrical exists');
  assert(engCodes.includes('DIP-ME-PROD'), 'Polytechnic Diploma in Mechanical exists');
  assert(engCodes.includes('MTECH-CSE'), 'M.Tech CSE exists');
  assert(engCodes.includes('PHD-009'), 'Ph.D. in CSE exists');

  // 4. Verify Lateral Entry Distinctions
  console.log('\nStep 4: Verify Lateral Entry Programmes & Duration');
  const lateralProgs = await prisma.programme.findMany({ where: { isLateralEntry: true } });
  assert(lateralProgs.length >= 5, `Found ${lateralProgs.length} Lateral Entry programmes`);
  const btechCseLat = lateralProgs.find(p => p.code === 'BTECH-CSE-LAT');
  assert(btechCseLat && btechCseLat.durationYears === 3, 'B.Tech CSE Lateral duration is 3 years');
  const dipLat = lateralProgs.find(p => p.code === 'DIP-ENG-LAT');
  assert(dipLat && dipLat.durationYears === 2, 'Polytechnic Diploma Lateral duration is 2 years');

  // 5. Verify Gold-Standard Curriculum Integrity (Preservation of B.Tech & M.Tech CSE)
  console.log('\nStep 5: Verify Gold-Standard Curriculum Integrity');
  const btechCse = await prisma.programme.findUnique({
    where: { code: 'BTECH-CSE' },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: { subjects: true }
          }
        }
      }
    }
  });
  assert(btechCse && btechCse.hasOfficialSyllabus === true, 'B.Tech CSE hasOfficialSyllabus flag is true');
  const btechTotalSubs = btechCse.curriculumVersions[0].semesters.reduce((acc, sem) => acc + sem.subjects.length, 0);
  assert(btechTotalSubs >= 109, `B.Tech CSE has at least 109 authentic subjects (Found: ${btechTotalSubs})`);

  const mtechCse = await prisma.programme.findUnique({
    where: { code: 'MTECH-CSE' },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: { subjects: true }
          }
        }
      }
    }
  });
  assert(mtechCse && mtechCse.hasOfficialSyllabus === true, 'M.Tech CSE hasOfficialSyllabus flag is true');
  const mtechTotalSubs = mtechCse.curriculumVersions[0].semesters.reduce((acc, sem) => acc + sem.subjects.length, 0);
  assert(mtechTotalSubs === 28, `M.Tech CSE has exactly 28 subjects (Found: ${mtechTotalSubs})`);

  const totalSubjects = await prisma.subject.count();
  assert(totalSubjects >= 137, `Grand total subjects remains authentic without data loss (Found: ${totalSubjects})`);

  // 6. Verify Non-Syllabus Discovered Programme Metadata Integrity
  console.log('\nStep 6: Verify Metadata Integrity for Non-Syllabus Discovered Programmes');
  const bbaFintech = await prisma.programme.findUnique({ where: { code: 'BBA-FINTECH' } });
  assert(bbaFintech && bbaFintech.hasOfficialSyllabus === false, 'BBA-FinTech hasOfficialSyllabus is false (Zero-hallucination)');
  assert(bbaFintech.eligibility && bbaFintech.eligibility.length > 10, 'BBA-FinTech has official eligibility criteria');
  assert(bbaFintech.specializations && bbaFintech.specializations.includes('Digital Banking'), 'BBA-FinTech has valid specializations');

  console.log('\n==================================================================');
  console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  if (failed === 0) {
    console.log('RESULT: ALL COURSE DISCOVERY ACCEPTANCE CRITERIA PASSED! (100%)');
  } else {
    console.error('RESULT: SOME ACCEPTANCE CRITERIA FAILED.');
    process.exit(1);
  }
  console.log('==================================================================');
}

verifyDiscovery()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

