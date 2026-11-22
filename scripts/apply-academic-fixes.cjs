/**
 * scripts/apply-academic-fixes.cjs
 * 
 * Applies academic discrepancy fixes to prisma/catalogue.json:
 * - DISC-01: Verify M.Tech Sem I subject titles
 * - DISC-04: Remove duplicate BCS201 from Semester I
 * - DISC-06: Standardize DEC351 / DCS-351 lab code
 * - DISC-07: Fix typos in PhDCS 105 syllabus text
 */

const fs = require('fs');
const path = require('path');

const CATALOGUE_PATH = path.join(__dirname, '..', 'prisma', 'catalogue.json');
const cat = JSON.parse(fs.readFileSync(CATALOGUE_PATH, 'utf8'));

console.log('[*] Applying Academic Discrepancy Fixes to catalogue.json...');

// 1. DISC-01: Ensure MCS-102..MCS-105 canonical titles
const mcsFixes = {
  'MCS-102': 'Foundation of Computer Science',
  'MCS-103': 'Advanced Computer Networks',
  'MCS-104': 'Distributed Systems',
  'MCS-105': 'Cloud Computing'
};

cat.data.subject.forEach(sub => {
  if (mcsFixes[sub.code]) {
    if (sub.name !== mcsFixes[sub.code]) {
      console.log(`[DISC-01] Updating ${sub.code} name: "${sub.name}" -> "${mcsFixes[sub.code]}"`);
      sub.name = mcsFixes[sub.code];
    }
  }
});

// 2. DISC-04: Remove duplicate BCS201 from Sem 1
const dupSubjectId = 'cmw12ph0r00013r89j4xd6cy8';
const beforeSubCount = cat.data.subject.length;
cat.data.subject = cat.data.subject.filter(s => s.id !== dupSubjectId);
const removedSub = beforeSubCount - cat.data.subject.length;

// Clean up any resources attached specifically to the duplicate subject
cat.data.academicResource = cat.data.academicResource.filter(r => r.subjectId !== dupSubjectId);
cat.data.externalResource = cat.data.externalResource.filter(r => r.subjectId !== dupSubjectId);
cat.data.videoLecture = cat.data.videoLecture.filter(r => r.subjectId !== dupSubjectId);

console.log(`[DISC-04] Removed duplicate BCS201 from Sem 1: ${removedSub > 0 ? 'Success' : 'Already removed'}`);

// 3. DISC-06: DEC351 / DCS-351 Lab Code
const dec351 = cat.data.subject.find(s => s.code === 'DEC351');
if (dec351) {
  console.log(`[DISC-06] Standardizing DEC351: name is "${dec351.name}"`);
  // Ensure the name mentions alias for search transparency
  if (!dec351.name.includes('DCS-351')) {
    dec351.name = 'Digital Electronics Lab (DEC351 / DCS-351)';
  }
}

// 4. DISC-07: PhDCS 105 Typos
const phd105 = cat.data.subject.find(s => s.code === 'PhDCS 105');
if (phd105 && phd105.syllabusDetails) {
  let details = phd105.syllabusDetails;
  details = details.replace(/Peremption Ceiling Protocol/g, 'Preemption Ceiling Protocol');
  details = details.replace(/flexible constrains/g, 'flexible constraints');
  details = details.replace(/Time System, Issues in real time computing/g, 'Real-Time Systems, Issues in real-time computing');
  phd105.syllabusDetails = details;
  console.log(`[DISC-07] Fixed spelling errors in PhDCS 105 syllabusDetails.`);
}

fs.writeFileSync(CATALOGUE_PATH, JSON.stringify(cat, null, 2), 'utf8');
console.log('[+] Saved updated catalogue.json successfully.');
