const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test 1: Subject Classification & Practical Eligibility Logic
const {
  getSubjectClassification,
  isPracticalEligible,
  isBibliographicEntry,
  getClassificationBadge
} = require('../src/lib/subject-classification.ts');

console.log('=== TEST SUITE: SUBJECT REORGANIZATION & CURRICULUM CORRECTION ===\n');

// 1.1 Test MCS-101 (Theory only)
const mcs101Classification = getSubjectClassification({
  code: 'MCS-101',
  name: 'Advanced Computer Architecture',
  subjectType: 'THEORY',
  lectureHours: 3,
  tutorialHours: 1,
  practicalHours: 0
});
assert.strictEqual(mcs101Classification, 'THEORY_ONLY', 'MCS-101 must be classified as THEORY_ONLY');
assert.strictEqual(isPracticalEligible({
  code: 'MCS-101',
  name: 'Advanced Computer Architecture',
  subjectType: 'THEORY',
  practicalHours: 0
}), false, 'MCS-101 must NOT be practical eligible');
console.log('✔ Test 1.1 Passed: MCS-101 correctly classified as THEORY_ONLY and ineligible for practicals');

// 1.2 Test Dedicated Lab (BCS-351)
const bcs351Classification = getSubjectClassification({
  code: 'BCS-351',
  name: 'Data Structures Lab',
  subjectType: 'PRACTICAL',
  lectureHours: 0,
  practicalHours: 3
});
assert.strictEqual(bcs351Classification, 'PRACTICAL_ONLY', 'BCS-351 must be classified as PRACTICAL_ONLY');
assert.strictEqual(isPracticalEligible({
  code: 'BCS-351',
  subjectType: 'PRACTICAL',
  practicalHours: 3
}), true, 'BCS-351 must be practical eligible');
console.log('✔ Test 1.2 Passed: BCS-351 correctly classified as PRACTICAL_ONLY');

// 1.3 Test Integrated Theory + Practical
const integratedClassification = getSubjectClassification({
  code: 'INT-101',
  name: 'Robotics & Control Systems',
  subjectType: 'THEORY',
  lectureHours: 3,
  practicalHours: 2
});
assert.strictEqual(integratedClassification, 'THEORY_WITH_PRACTICAL', 'Subject with L>0 and P>0 must be THEORY_WITH_PRACTICAL');
assert.strictEqual(isPracticalEligible({
  code: 'INT-101',
  lectureHours: 3,
  practicalHours: 2
}), true, 'Integrated subject must be practical eligible');
console.log('✔ Test 1.3 Passed: Integrated subject correctly classified as THEORY_WITH_PRACTICAL');

// 1.4 Test Bibliographic Detection
const book1 = '1. Kai Hwang, “Advanced Computer Architecture,” McGraw-Hill.';
const book2 = '2. Hwang and Briggs, “Computer Architecture and Parallel Processing,”';
const book3 = 'McGraw Hill.';
const validExp1 = 'Implementation of Matrix Multiplication using Strassen algorithm';
const validExp2 = 'To determine the wavelength of monochromatic light by Newton\'s ring.';

assert.strictEqual(isBibliographicEntry(book1), true, 'Kai Hwang line must be identified as bibliographic');
assert.strictEqual(isBibliographicEntry(book2), true, 'Hwang & Briggs line must be identified as bibliographic');
assert.strictEqual(isBibliographicEntry(book3), true, 'Standalone McGraw Hill must be identified as bibliographic');
assert.strictEqual(isBibliographicEntry(validExp1), false, 'Matrix multiplication experiment must NOT be bibliographic');
assert.strictEqual(isBibliographicEntry(validExp2), false, 'Newton ring experiment must NOT be bibliographic');
console.log('✔ Test 1.4 Passed: Bibliographic detector accurately discriminates books vs engineering experiments');

// 1.5 Test Snapshot Cleanliness
const snapPath = path.join(__dirname, '../backups/complete-academic-and-auth-snapshot.json');
const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
const subjects = snap.data.subject || [];

const mcs101Record = subjects.find(s => s.code === 'MCS-101');
assert(mcs101Record, 'MCS-101 must exist in snapshot');
const mcs101D = JSON.parse(mcs101Record.syllabusDetails);
assert.strictEqual(mcs101D.labExperiments.length, 0, 'MCS-101 must have 0 lab experiments');
assert.strictEqual(mcs101D.referenceBooks.length, 2, 'MCS-101 must have exactly 2 reference books');
assert.strictEqual(mcs101D.metadata.subjectClassification, 'THEORY_ONLY', 'MCS-101 metadata must be THEORY_ONLY');
console.log('✔ Test 1.5 Passed: MCS-101 in snapshot verified: 0 experiments, 2 reference books, THEORY_ONLY');

const bcs086Record = subjects.find(s => s.code === 'BCS-086');
assert(bcs086Record, 'BCS-086 must exist in snapshot');
const bcs086D = JSON.parse(bcs086Record.syllabusDetails);
assert.strictEqual(bcs086D.labExperiments.length, 0, 'BCS-086 must have 0 lab experiments');
assert.strictEqual(bcs086D.referenceBooks.length, 4, 'BCS-086 must have 4 reference books');
console.log('✔ Test 1.5b Passed: BCS-086 in snapshot verified: 0 experiments, 4 reference books');

// 1.6 Global Audit: No theory subject with P=0 has books in labExperiments
let theoryWithBooksInLabs = 0;
for (const s of subjects) {
  if (!s.syllabusDetails) continue;
  const d = JSON.parse(s.syllabusDetails);
  const exps = d.labExperiments || [];
  const booksInLab = exps.filter(e => isBibliographicEntry(e));
  if (booksInLab.length > 0) {
    theoryWithBooksInLabs++;
    console.error(`Subject ${s.code} still has ${booksInLab.length} books in labExperiments!`);
  }
}
assert.strictEqual(theoryWithBooksInLabs, 0, 'Zero subjects should have book citations in labExperiments');
console.log(`✔ Test 1.6 Passed: All ${subjects.length} subjects verified: ZERO book citations in labExperiments`);

console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===\n');
