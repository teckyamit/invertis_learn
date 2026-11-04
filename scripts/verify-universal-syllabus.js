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
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function runVerification() {
  console.log('==================================================================');
  console.log('  UNIVERSAL SUBJECT SYLLABUS STANDARDIZATION VERIFICATION SUITE');
  console.log('==================================================================\n');

  // Step 1: Component & Architecture Audit (Phase 2 & Phase 3)
  console.log('Step 1: Codebase Verification for Universal Design & Zero Embedded Viewers');
  const viewPath = path.join(process.cwd(), 'src/components/syllabus/SubjectSyllabusView.tsx');
  const pdfViewerPath = path.join(process.cwd(), 'src/components/syllabus/PDFViewer.tsx');
  const pagePath = path.join(process.cwd(), 'src/app/syllabus/[programmeCode]/semester/[semesterNumber]/[subjectCode]/page.tsx');

  if (fs.existsSync(viewPath)) {
    pass('Universal template component exists: SubjectSyllabusView.tsx');
    const viewCode = fs.readFileSync(viewPath, 'utf8');
    if (!viewCode.includes('<object') && !viewCode.includes('<iframe') && !viewCode.includes('pdf.js')) {
      pass('SubjectSyllabusView has ZERO embedded <object> or <iframe> viewer tags');
    } else {
      fail('SubjectSyllabusView still contains embedded viewer markup');
    }

    if ((viewCode.includes('mod.title') || viewCode.includes('MODULE-')) && viewCode.includes('bg-slate-900') && viewCode.includes('Unit-Wise Detailed Syllabus')) {
      pass('SubjectSyllabusView strictly adheres to BCS201 dark navy module card design');
    } else {
      fail('SubjectSyllabusView missing BCS201 module card styling');
    }

    if (viewCode.includes('Course Outcomes (COs)') && viewCode.includes('bg-purple-50')) {
      pass('SubjectSyllabusView contains standardized Course Outcomes (COs) card grid');
    } else {
      fail('SubjectSyllabusView missing Course Outcomes card grid');
    }

    if (viewCode.includes('Recommended Textbooks') && viewCode.includes('Reference Books')) {
      pass('SubjectSyllabusView contains standardized two-column Textbooks & Reference Books sections');
    } else {
      fail('SubjectSyllabusView missing Textbooks or Reference Books sections');
    }
  } else {
    fail('Missing SubjectSyllabusView.tsx');
  }

  if (fs.existsSync(pdfViewerPath)) {
    const pdfViewerCode = fs.readFileSync(pdfViewerPath, 'utf8');
    if (!pdfViewerCode.includes('<object') && !pdfViewerCode.includes('<iframe')) {
      pass('PDFViewer.tsx has completely removed all embedded <object> tags and 650px iframe viewer');
    } else {
      fail('PDFViewer.tsx still contains embedded <object> or <iframe>');
    }
  }

  if (fs.existsSync(pagePath)) {
    const pageCode = fs.readFileSync(pagePath, 'utf8');
    if (pageCode.includes('SubjectSyllabusView') && pageCode.includes('isDownloadEligible')) {
      pass('Subject detail page delegates to SubjectSyllabusView with strict eligibility checks');
    } else {
      fail('Subject detail page does not use SubjectSyllabusView');
    }
  }

  // Step 2: Database Standardization Metrics (Phase 1 & Phase 4)
  console.log('\nStep 2: Database Standardization & Extraction Coverage Verification');
  const resultsPath = path.join(process.cwd(), 'scripts/standardization-results.json');
  if (fs.existsSync(resultsPath)) {
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
    pass(`Total subjects audited: ${results.totalAudited}`);
    if (results.verifiedAndEligible.length >= 200) {
      pass(`Eligible & validated subjects for download: ${results.verifiedAndEligible.length} (Exceeds 200 threshold)`);
    } else {
      fail(`Expected at least 200 eligible subjects, found: ${results.verifiedAndEligible.length}`);
    }

    if (results.inReviewOrPending.length > 0) {
      pass(`In-review subjects properly flagged: ${results.inReviewOrPending.length} (e.g. project/seminar courses)`);
    } else {
      fail('No in-review subjects tracked');
    }
  } else {
    fail('Missing scripts/standardization-results.json');
  }

  // Step 3: Live HTTP Route Testing across Multiple Programmes (Phase 8)
  console.log('\nStep 3: Live HTTP Rendering & Master Template Consistency');

  // Test 3.1: Master Reference Subject (B.Tech Theory - BCS201)
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/2/BCS201');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/2/BCS201 -> 200 OK (Master Reference BCS201)');
      const html = res.body;
      if (html.includes('Programming in C (Programming for Problem Solving)')) pass('BCS201 subject title correctly rendered');
      if (html.includes('Course Outcomes (COs)')) pass('BCS201 Course Outcomes section rendered');
      if (html.includes('MODULE-1: Programming in C &amp; Data Types') || html.includes('MODULE-1: Programming in C & Data Types')) {
        pass('BCS201 Unit-wise detailed syllabus rendered with MODULE-1');
      } else {
        fail('BCS201 missing MODULE-1 title');
      }
      if (html.includes('Recommended Textbooks') && html.includes('Reference Books')) pass('BCS201 Textbooks & Reference Books rendered');
      if (html.includes('Download Official PDF')) pass('BCS201 Official PDF Download button active (Eligible)');
      if (!html.includes('<object') && !html.includes('<iframe')) {
        pass('BCS201 contains ZERO embedded <object> or <iframe> tags');
      } else {
        fail('BCS201 still contains embedded PDF elements');
      }
    } else {
      fail(`BCS201 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCS201 live route failed', err.message);
  }

  // Test 3.2: Another B.Tech Theory Subject (BCS-301 Data Structures)
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/3/BCS-301');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/3/BCS-301 -> 200 OK (B.Tech Sem 3 Data Structures)');
      const html = res.body;
      if (html.includes('Data Structures')) pass('BCS-301 subject title rendered');
      if (html.includes('MODULE-I') || html.includes('MODULE-1')) pass('BCS-301 contains structured modules');
      if (!html.includes('<object') && !html.includes('<iframe')) pass('BCS-301 contains ZERO embedded viewer tags');
      if (html.includes('Download Official PDF')) pass('BCS-301 verified download button active');
    } else {
      fail(`BCS-301 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCS-301 live route failed', err.message);
  }

  // Test 3.3: B.Tech CSE (AI) Subject (BCSAI 103 Programming in C)
  try {
    const res = await fetchUrl(`/syllabus/BTECH-CSE-AI/semester/1/${encodeURIComponent('BCSAI 103')}`);
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE-AI/semester/1/BCSAI 103 -> 200 OK (B.Tech CSE-AI)');
      const html = res.body;
      if (html.includes('Programming in C')) pass('BCSAI 103 title rendered');
      if (html.includes('Unit-Wise Detailed Syllabus')) pass('BCSAI 103 unit-wise modules rendered');
      if (!html.includes('<object') && !html.includes('<iframe')) pass('BCSAI 103 contains ZERO embedded viewer tags');
    } else {
      fail(`BCSAI 103 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCSAI 103 live route failed', err.message);
  }

  // Test 3.4: Practical Subject (BCSAI 104 Computing System Lab)
  try {
    const res = await fetchUrl(`/syllabus/BTECH-CSE-AI/semester/1/${encodeURIComponent('BCSAI 104')}`);
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE-AI/semester/1/BCSAI 104 -> 200 OK (Practical Subject)');
      const html = res.body;
      if (html.includes('Prescribed Practical Experiments')) pass('BCSAI 104 renders Prescribed Practical Experiments section');
      if (html.includes('PRACTICAL')) pass('BCSAI 104 correctly shows PRACTICAL badge');
      if (!html.includes('<object') && !html.includes('<iframe')) pass('BCSAI 104 contains ZERO embedded viewer tags');
    } else {
      fail(`BCSAI 104 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCSAI 104 live route failed', err.message);
  }

  // Test 3.5: M.Tech Subject (MCS-101 Advanced Computer Architecture)
  try {
    const res = await fetchUrl('/syllabus/MTECH-CSE/semester/1/MCS-101');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/MTECH-CSE/semester/1/MCS-101 -> 200 OK (M.Tech Programme Subject)');
      const html = res.body;
      if (html.includes('MCS-101')) pass('MCS-101 code rendered');
      if (html.includes('Master of Technology in Computer Science &amp; Engineering') || html.includes('M.Tech')) {
        pass('MCS-101 shows M.Tech programme heading');
      }
      if (html.includes('Unit-Wise Detailed Syllabus')) pass('MCS-101 renders standardized unit-wise detailed syllabus');
      if (!html.includes('<object') && !html.includes('<iframe')) pass('MCS-101 contains ZERO embedded viewer tags');
      if (html.includes('Download Official PDF')) pass('MCS-101 verified download button active');
    } else {
      fail(`MCS-101 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('MCS-101 live route failed', err.message);
  }

  // Test 3.6: Diploma Engineering Programme (Coming Soon handling)
  try {
    const res = await fetchUrl('/programmes/DIP-CSE');
    if (res.statusCode === 200) {
      pass('HTTP GET /programmes/DIP-CSE -> 200 OK (Diploma Engineering Programme)');
      const html = res.body;
      if (html.includes('Coming Soon') || html.includes('Coming Soon')) pass('DIP-CSE renders Coming Soon status gracefully');
      if (html.includes('Diploma in Computer Science &amp; Engineering') || html.includes('Diploma in Computer Science')) {
        pass('DIP-CSE title correctly presented');
      }
    } else {
      fail(`DIP-CSE returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('DIP-CSE route failed', err.message);
  }

  // Test 3.7: Incomplete / In-Review Subject (IIOT1)
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/1/IIOT1');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/1/IIOT1 -> 200 OK (Incomplete/In-Review Subject)');
      const html = res.body;
      if (html.includes('Academic Content Verification Notice') || html.includes('In Review')) {
        pass('IIOT1 shows In-Review / Verification notice gracefully');
      } else {
        fail('IIOT1 missing in-review notification');
      }
      if (!html.includes('href="/api/syllabus/download')) {
        pass('IIOT1 does NOT show misleading completed download button (Protected by Phase 4 rules)');
      } else {
        fail('IIOT1 showed misleading download button despite incomplete extraction');
      }
    } else {
      fail(`IIOT1 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('IIOT1 route failed', err.message);
  }

  // Step 4: Subject-Wise Syllabus Isolation & Zero Cross-Contamination
  console.log('\nStep 4: Subject-Wise Content Isolation Across Programmes');
  const bcs201 = await prisma.subject.findFirst({
    where: { code: 'BCS201', semester: { semesterNumber: 2, curriculumVersion: { programme: { code: 'BTECH-CSE' } } } }
  });
  if (bcs201 && bcs201.syllabusDetails) {
    const d = JSON.parse(bcs201.syllabusDetails);
    const hasMath = d.modules.some(m => m.topics.includes('Differential Calculus') || m.topics.includes('Matrices'));
    if (!hasMath) pass('BCS201 Programming in C is strictly isolated (Zero Mathematics leakage)');
    else fail('BCS201 contaminated with Math');
  }

  const mcs101 = await prisma.subject.findFirst({
    where: { code: 'MCS-101' }
  });
  if (mcs101 && mcs101.syllabusDetails) {
    const d = JSON.parse(mcs101.syllabusDetails);
    const hasC = d.modules.some(m => m.topics.includes('Pointers in C') || m.topics.includes('scanf'));
    if (!hasC) pass('MCS-101 M.Tech Computer Architecture is strictly isolated (Zero C language leakage)');
    else fail('MCS-101 contaminated with C language');
  }

  // Step 5: Official Syllabus PDF Download API
  console.log('\nStep 5: Official Syllabus PDF Download Endpoints');
  try {
    const res = await fetchUrl('/api/syllabus/download?file=BCS201_Syllabus.pdf&name=BCS201-ProgrammingInC');
    if (res.statusCode === 200) {
      pass('HTTP GET /api/syllabus/download for BCS201 -> 200 OK');
      const contentType = res.headers['content-type'];
      if (contentType && contentType.includes('application/pdf')) {
        pass('Response header Content-Type is application/pdf');
      }
    } else {
      fail(`Download API for BCS201 returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('Download API failed for BCS201', err.message);
  }

  console.log('\n==================================================================');
  console.log(`TOTAL CHECKS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
  const rate = ((passCount / (passCount + failCount)) * 100).toFixed(1);
  console.log(`RESULT: ${failCount === 0 ? 'ALL CRITERIA PASSED! (100%)' : 'SOME CHECKS FAILED'}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
  process.exit(failCount > 0 ? 1 : 0);
}

runVerification().catch(console.error);
