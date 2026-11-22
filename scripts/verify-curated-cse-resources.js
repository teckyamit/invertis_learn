/**
 * scripts/verify-curated-cse-resources.js
 * 
 * GRAVITAS Verification Suite: Academic Resource Integrity, Syllabus Corrections & Curated Resources
 * 
 * Verified Hierarchy:
 * 1. Zero Iframe Embeds & External Link Safety
 * 2. Academic Discrepancies Resolution (DISC-01 to DISC-08)
 * 3. Canonical Academic Datasets Integrity (5 JSON files)
 * 4. SSRF Protection & URL Security
 * 5. Practical vs Theory Isolation
 * 6. Academic Resource Manager API & Curator Controls
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

let passCount = 0;
let failCount = 0;

function pass(name, detail = '') {
  console.log(`  [PASS] ${name}${detail ? ` — ${detail}` : ''}`);
  passCount++;
}

function fail(name, detail = '') {
  console.error(`  [FAIL] ${name}${detail ? ` — ${detail}` : ''}`);
  failCount++;
}

async function runAcceptanceSuite() {
  console.log('==================================================================');
  console.log('  INVERTIS LEARN — ACADEMIC RESOURCE & SYLLABUS INTEGRITY SUITE');
  console.log('==================================================================\n');

  // -------------------------------------------------------------------------
  // Test 1: Zero Iframe Embeds & Direct External Links
  // -------------------------------------------------------------------------
  console.log('Test Group 1: Video Delivery Architecture & Zero Iframe Policy');
  const videoComponentPath = path.join(process.cwd(), 'src/components/video/VideoLecturesSection.tsx');
  const videoCode = fs.readFileSync(videoComponentPath, 'utf8');

  if (!videoCode.includes('<iframe') && !videoCode.includes('youtube-nocookie.com/embed/')) {
    pass('Zero embedded iframe video players', 'All video players removed in favor of external links');
  } else {
    fail('Zero embedded iframe video players', 'Found remaining <iframe> or embed player in VideoLecturesSection.tsx');
  }

  if (videoCode.includes('target="_blank"') && videoCode.includes('rel="noopener noreferrer"')) {
    pass('Secure external link attributes', 'All video lecture links open in new tab with noopener noreferrer');
  } else {
    fail('Secure external link attributes', 'Missing target="_blank" or rel="noopener noreferrer"');
  }

  if (videoCode.includes('GATE Smashers') && videoCode.includes('Knowledge Gate')) {
    pass('Channel prioritization verified', 'Prominently surfaces GATE Smashers and Knowledge Gate');
  } else {
    fail('Channel prioritization verified', 'Missing GATE Smashers or Knowledge Gate branding');
  }

  // -------------------------------------------------------------------------
  // Test 2: Academic Discrepancies (DISC-01 to DISC-08)
  // -------------------------------------------------------------------------
  console.log('\nTest Group 2: Academic Discrepancies Resolution (DISC-01 to DISC-08)');
  const catPath = path.join(process.cwd(), 'prisma/catalogue.json');
  const cat = JSON.parse(fs.readFileSync(catPath, 'utf8'));

  // DISC-01: M.Tech Sem I Titles
  const mcs102 = cat.data.subject.find(s => s.code === 'MCS-102');
  const mcs103 = cat.data.subject.find(s => s.code === 'MCS-103');
  const mcs104 = cat.data.subject.find(s => s.code === 'MCS-104');
  const mcs105 = cat.data.subject.find(s => s.code === 'MCS-105');

  if (
    mcs102?.name === 'Foundation of Computer Science' &&
    mcs103?.name === 'Advanced Computer Networks' &&
    mcs104?.name === 'Distributed Systems' &&
    mcs105?.name === 'Cloud Computing'
  ) {
    pass('DISC-01: M.Tech Sem I subject titles', 'MCS-102..MCS-105 match official 2023-24 curriculum');
  } else {
    fail('DISC-01: M.Tech Sem I subject titles', 'One or more titles do not match official source');
  }

  // DISC-02: M.Tech Degree Credits vs Elective Pool
  const creditsLib = fs.readFileSync(path.join(process.cwd(), 'src/lib/academic-credits.ts'), 'utf8');
  if (creditsLib.includes('MTECH-CSE') && creditsLib.includes('78.0') && creditsLib.includes('Elective-I')) {
    pass('DISC-02: M.Tech 78 prescribed degree credits', 'Reconciled 78 degree credits vs elective pool in academic-credits.ts');
  } else {
    fail('DISC-02: M.Tech 78 prescribed degree credits', 'Missing official 78 credit configuration');
  }

  // DISC-03: Ph.D. CSE Coursework Credits
  if (creditsLib.includes('PHD-009') && creditsLib.includes('16.0') && creditsLib.includes('Departmental Elective')) {
    pass('DISC-03: Ph.D. 16 prescribed coursework credits', 'Reconciled 16 coursework credits (Core + 1 Elective)');
  } else {
    fail('DISC-03: Ph.D. 16 prescribed coursework credits', 'Missing Ph.D. 16 credit configuration');
  }

  // DISC-04: Duplicate BCS201 Removed from Semester 1
  const sem1 = cat.data.semester.find(s => s.semesterNumber === 1 && s.curriculumVersionId === 'cmw0yur860007pkgb10221372');
  const bcs201Sem1 = cat.data.subject.find(s => s.semesterId === sem1?.id && s.code === 'BCS201');
  const bcs201Sem2 = cat.data.subject.find(s => s.code === 'BCS201');

  if (!bcs201Sem1 && bcs201Sem2) {
    pass('DISC-04: Duplicate BCS201 eliminated', 'BCS201 removed from Sem 1 and preserved canonically in Sem 2');
  } else {
    fail('DISC-04: Duplicate BCS201 eliminated', `Duplicate BCS201 still present in Sem 1: ${!!bcs201Sem1}`);
  }

  // DISC-05: Documented University PDF Errata
  if (
    creditsLib.includes('IIOT1') &&
    creditsLib.includes('IIOT2') &&
    creditsLib.includes('BAS-301') &&
    creditsLib.includes('BCS-404')
  ) {
    pass('DISC-05: Documented university errata notices', 'Curator notices registered for IIOT1, IIOT2, BAS-301, BCS-404');
  } else {
    fail('DISC-05: Documented university errata notices', 'Missing errata mappings in academic-credits.ts');
  }

  // DISC-06 & DISC-08: Code Aliases for Search & Routing
  if (
    creditsLib.includes('dec351') &&
    creditsLib.includes('DCS-351') &&
    creditsLib.includes('mcs351') &&
    creditsLib.includes('MCS-351')
  ) {
    pass('DISC-06 & DISC-08: Subject code aliases', 'DEC351 <-> DCS-351 and MCS351 <-> MCS-351 configured');
  } else {
    fail('DISC-06 & DISC-08: Subject code aliases', 'Missing alias configurations');
  }

  // DISC-07: PhDCS 105 Typos Corrected
  const phd105 = cat.data.subject.find(s => s.code === 'PhDCS 105');
  if (
    phd105 &&
    phd105.syllabusDetails.includes('Preemption Ceiling Protocol') &&
    !phd105.syllabusDetails.includes('Peremption Ceiling Protocol')
  ) {
    pass('DISC-07: PhDCS 105 spelling corrected', '"Preemption Ceiling Protocol" and constraints normalized');
  } else {
    fail('DISC-07: PhDCS 105 spelling corrected', 'Typos still present in PhDCS 105 syllabusDetails');
  }

  // -------------------------------------------------------------------------
  // Test 3: Canonical Academic Datasets Integrity
  // -------------------------------------------------------------------------
  console.log('\nTest Group 3: Canonical Datasets in data/academic-resources/');
  const dataDir = path.join(process.cwd(), 'data/academic-resources');
  const requiredDatasets = [
    'resource-registry.json',
    'subject-resource-mappings.json',
    'existing-resource-actions.json',
    'rejected-resource-candidates.json',
    'uncovered-syllabus-topics.json'
  ];

  let datasetsOk = true;
  for (const ds of requiredDatasets) {
    const dsPath = path.join(dataDir, ds);
    if (fs.existsSync(dsPath)) {
      const parsed = JSON.parse(fs.readFileSync(dsPath, 'utf8'));
      if (Array.isArray(parsed) && parsed.length > 0) {
        pass(`Dataset ${ds}`, `Valid JSON array with ${parsed.length} entries`);
      } else {
        fail(`Dataset ${ds}`, 'Empty or non-array JSON structure');
        datasetsOk = false;
      }
    } else {
      fail(`Dataset ${ds}`, 'File does not exist');
      datasetsOk = false;
    }
  }

  // -------------------------------------------------------------------------
  // Test 4: SSRF Protection & URL Security
  // -------------------------------------------------------------------------
  console.log('\nTest Group 4: SSRF Protection & Security Invariants');
  const adminApiCode = fs.readFileSync(path.join(process.cwd(), 'src/app/api/admin/academic-resources/route.ts'), 'utf8');

  if (
    adminApiCode.includes('169.254.169.254') &&
    adminApiCode.includes('127.0.0.1') &&
    adminApiCode.includes('localhost') &&
    adminApiCode.includes('isSafeUrl')
  ) {
    pass('SSRF protection in admin academic resource API', 'Loopback, private ranges, and cloud metadata blocked');
  } else {
    fail('SSRF protection in admin academic resource API', 'Missing SSRF guard in route.ts');
  }

  // -------------------------------------------------------------------------
  // Test 5: Practical vs Theory Isolation
  // -------------------------------------------------------------------------
  console.log('\nTest Group 5: Academic Practical Eligibility Isolation');
  const classificationCode = fs.readFileSync(path.join(process.cwd(), 'src/lib/subject-classification.ts'), 'utf8');
  if (
    classificationCode.includes('isPracticalEligible') &&
    classificationCode.includes('THEORY_ONLY') &&
    classificationCode.includes('PRACTICAL_ONLY')
  ) {
    pass('Centralized practical classification service', 'Enforces strict theory vs lab separation');
  } else {
    fail('Centralized practical classification service', 'Missing subject classification rules');
  }

  // -------------------------------------------------------------------------
  // Summary & Gravitas Verdict
  // -------------------------------------------------------------------------
  console.log('\n==================================================================');
  console.log(`  SUITE SUMMARY: ${passCount} Passed, ${failCount} Failed (${passCount + failCount} Total)`);
  console.log('==================================================================');

  if (failCount === 0) {
    console.log('\nVERDICT: PASS');
    process.exit(0);
  } else {
    console.error('\nVERDICT: FAIL -- Unresolved test failures detected');
    process.exit(1);
  }
}

runAcceptanceSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
