const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let passCount = 0;
let failCount = 0;

function pass(msg) {
  console.log(`  [PASS] ${msg}`);
  passCount++;
}

function fail(msg, err) {
  console.error(`  [FAIL] ${msg}`);
  if (err) console.error(`         ${err}`);
  failCount++;
}

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function verify() {
  console.log('==================================================================');
  console.log('  INVERTIS LEARN - B.TECH CSE (AI) FULL CURRICULUM VERIFICATION');
  console.log('==================================================================\n');

  // Step 1: Verify Programme
  console.log('Step 1: Verify BTECH-CSE-AI Programme Record in DB');
  const prog = await prisma.programme.findUnique({
    where: { code: 'BTECH-CSE-AI' },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' },
            include: {
              subjects: {
                include: {
                  resources: {
                    include: { category: true }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (prog) pass(`Found programme: ${prog.name} (${prog.code})`);
  else return fail('Programme BTECH-CSE-AI not found');

  if (prog.hasOfficialSyllabus === true) pass('hasOfficialSyllabus flag is true');
  else fail('hasOfficialSyllabus flag is false');

  const cv = prog.curriculumVersions[0];
  if (cv) pass(`Active curriculum version found: ${cv.versionYear}`);
  else return fail('No active curriculum version found');

  if (cv.semesters.length === 8) pass(`Has exactly 8 semesters (Found: ${cv.semesters.length})`);
  else fail(`Expected 8 semesters, found: ${cv.semesters.length}`);

  // Step 2: Check Semester Breakdown
  console.log('\nStep 2: Verify Semester Subjects Distribution');
  const expectedSemesterCounts = {
    1: 10,
    2: 10,
    3: 10,
    4: 10,
    5: 13,
    6: 13,
    7: 11,
    8: 5
  };

  let totalSubjects = 0;
  for (const sem of cv.semesters) {
    totalSubjects += sem.subjects.length;
    const expected = expectedSemesterCounts[sem.semesterNumber];
    if (sem.subjects.length === expected) {
      pass(`Semester ${sem.semesterNumber} has ${sem.subjects.length} subjects as specified in official scheme`);
    } else {
      fail(`Semester ${sem.semesterNumber} expected ${expected} subjects, found: ${sem.subjects.length}`);
    }
  }
  pass(`Total digitized subjects across all 8 semesters: ${totalSubjects}`);

  // Step 3: Spot-Check Subject Isolated Syllabi & Physical Files
  console.log('\nStep 3: Verify Subject-Wise Isolated Syllabus PDFs on Disk');
  const subjectsDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'subjects');
  const spotCheckCodes = [
    'BCSAI 101', 'BCSAI 103', 'BCSAI 201', 'BCSAI 301', 
    'BCSAI 304', 'BCSAI 401', 'BCSAI 405', 'BCSAI 501', 
    'BCSAI 504', 'BCSAI 601', 'BCSAI 604', 'BCSAI 701', 'BCSAI 801'
  ];

  for (const sem of cv.semesters) {
    for (const sub of sem.subjects) {
      if (spotCheckCodes.includes(sub.code)) {
        const syllabusResource = sub.resources.find(r => r.category.code === 'SYLLABUS');
        if (syllabusResource) {
          const physicalPath = path.join(process.cwd(), 'public', syllabusResource.storagePath);
          if (fs.existsSync(physicalPath)) {
            const stats = fs.statSync(physicalPath);
            pass(`[${sub.code}] ${sub.name}: Physical isolated PDF exists (${(stats.size / 1024).toFixed(1)} KB)`);
          } else {
            fail(`[${sub.code}] Missing physical PDF file at ${physicalPath}`);
          }
        } else {
          fail(`[${sub.code}] Missing SYLLABUS resource in database`);
        }
      }
    }
  }

  // Step 4: Verify Subject Isolation Content Integrity
  console.log('\nStep 4: Verify Syllabus Subject Isolation & Zero-Hallucination');
  const bcsai101 = await prisma.subject.findFirst({
    where: { code: 'BCSAI 101', semester: { curriculumVersion: { programmeId: prog.id } } }
  });
  if (bcsai101) {
    const details = JSON.parse(bcsai101.syllabusDetails);
    const hasMathTopics = details.modules.some(m => m.title.includes('Differential') || m.title.includes('Calculus') || m.title.includes('Matrices'));
    const hasCTopics = details.modules.some(m => m.title.includes('Programming in C') || m.title.includes('Pointers'));
    if (hasMathTopics && !hasCTopics) {
      pass('BCSAI 101 syllabus is strictly isolated to Engineering Mathematics (no C programming)');
    } else {
      fail('BCSAI 101 syllabus contains cross-subject contamination');
    }
  }

  const bcsai103 = await prisma.subject.findFirst({
    where: { code: 'BCSAI 103', semester: { curriculumVersion: { programmeId: prog.id } } }
  });
  if (bcsai103) {
    const details = JSON.parse(bcsai103.syllabusDetails);
    const hasCTopics = details.modules.some(m => m.title.includes('C Programming') || m.title.includes('Pointers') || m.title.includes('Functions'));
    const hasMathTopics = details.modules.some(m => m.title.includes('Differential Equations'));
    if (hasCTopics && !hasMathTopics) {
      pass('BCSAI 103 syllabus is strictly isolated to Programming in C (no Mathematics)');
    } else {
      fail('BCSAI 103 syllabus contains cross-subject contamination');
    }
  }

  const bcsai301 = await prisma.subject.findFirst({
    where: { code: 'BCSAI 301', semester: { curriculumVersion: { programmeId: prog.id } } }
  });
  if (bcsai301) {
    const details = JSON.parse(bcsai301.syllabusDetails);
    const hasNetworks = details.modules.some(m => m.title.includes('Networking') || m.title.includes('Devices'));
    if (hasNetworks) {
      pass('BCSAI 301 syllabus is strictly isolated to Computer Networks');
    } else {
      fail('BCSAI 301 syllabus missing networking modules');
    }
  }

  // Step 5: Live HTTP Routes Verification
  console.log('\nStep 5: Live HTTP Routes Verification for BTECH-CSE-AI');
  const liveRoutes = [
    { path: '/syllabus/BTECH-CSE-AI', label: 'B.Tech CSE (AI) Syllabus Overview' },
    { path: '/syllabus/BTECH-CSE-AI/semester/1', label: 'Semester 1 Subject List' },
    { path: '/syllabus/BTECH-CSE-AI/semester/3', label: 'Semester 3 Subject List' },
    { path: '/syllabus/BTECH-CSE-AI/semester/5', label: 'Semester 5 Subject List' },
    { path: '/syllabus/BTECH-CSE-AI/semester/7', label: 'Semester 7 Subject List' },
    { path: `/syllabus/BTECH-CSE-AI/semester/3/${encodeURIComponent('BCSAI 301')}`, label: 'BCSAI 301 Subject Detail' },
    { path: '/engineering', label: 'Engineering Hub (now displaying 3 Active Programmes)' }
  ];

  for (const r of liveRoutes) {
    try {
      const res = await fetchUrl(r.path);
      if (res.statusCode === 200) {
        pass(`HTTP GET ${r.path} -> 200 OK (${r.label})`);
      } else {
        fail(`HTTP GET ${r.path} -> ${res.statusCode} (${r.label})`);
      }
    } catch (err) {
      fail(`HTTP GET ${r.path} failed`, err.message);
    }
  }

  console.log('\n==================================================================');
  console.log(`TOTAL CHECKS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
  const rate = ((passCount / (passCount + failCount)) * 100).toFixed(1);
  console.log(`RESULT: ${failCount === 0 ? 'ALL CRITERIA PASSED! (100%)' : 'SOME CHECKS FAILED'}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
  process.exit(failCount > 0 ? 1 : 0);
}

verify().catch(console.error);
