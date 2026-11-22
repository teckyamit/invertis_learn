/**
 * scripts/merge-academic-datasets.cjs
 * 
 * Extracts and normalizes academic resource datasets from the comprehensive
 * audit reports into the canonical JSON files in data/academic-resources/:
 * 1. resource-registry.json
 * 2. subject-resource-mappings.json
 * 3. existing-resource-actions.json
 * 4. rejected-resource-candidates.json
 * 5. uncovered-syllabus-topics.json
 */

const fs = require('fs');
const path = require('path');

const REPORT_B_PATH = 'C:/Users/amitp/.gemini/antigravity/brain/b8f499ed-4ced-49c7-9a45-e44e4aa6579c/.user_uploaded/media_1795367352969_e887d8cc.html';
const OUTPUT_DIR = path.join(__dirname, '..', 'data', 'academic-resources');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('[*] Reading Report B audit report...');
const htmlContent = fs.readFileSync(REPORT_B_PATH, 'utf8');
const match = htmlContent.match(/const AUDIT_DATA = ({.*?});/s);

if (!match) {
  console.error('[!] Failed to extract AUDIT_DATA from Report B HTML');
  process.exit(1);
}

const auditData = JSON.parse(match[1]);
console.log(`[*] Successfully parsed AUDIT_DATA:`);
console.log(`    - Resource Registry items: ${auditData.resourceRegistry?.length || 0}`);
console.log(`    - Subject mappings: ${auditData.subjects?.length || 0}`);
console.log(`    - Existing resource actions: ${auditData.existingResourceAudit?.length || 0}`);
console.log(`    - Discrepancies: ${auditData.discrepancies?.length || 0}`);

// 1. Resource Registry
const resourceRegistry = auditData.resourceRegistry || [];
const registryPath = path.join(OUTPUT_DIR, 'resource-registry.json');
fs.writeFileSync(registryPath, JSON.stringify(resourceRegistry, null, 2), 'utf8');
console.log(`[+] Wrote ${resourceRegistry.length} resources to ${registryPath}`);

// 2. Subject Resource Mappings
const subjectMappings = auditData.subjects || [];
const mappingsPath = path.join(OUTPUT_DIR, 'subject-resource-mappings.json');
fs.writeFileSync(mappingsPath, JSON.stringify(subjectMappings, null, 2), 'utf8');
console.log(`[+] Wrote ${subjectMappings.length} subject mappings to ${mappingsPath}`);

// 3. Existing Resource Actions
const existingActions = auditData.existingResourceAudit || [];
const actionsPath = path.join(OUTPUT_DIR, 'existing-resource-actions.json');
fs.writeFileSync(actionsPath, JSON.stringify(existingActions, null, 2), 'utf8');
console.log(`[+] Wrote ${existingActions.length} existing actions to ${actionsPath}`);

// 4. Rejected Resource Candidates
// Collect all resources rejected due to paywalls, dead URLs, low academic rigor, or deprecation
const rejectedCandidates = [
  ...existingActions
    .filter(a => a.recommendedAction === 'REMOVE' || a.recommendedAction === 'REPLACE')
    .map(a => ({
      candidateId: a.auditId,
      subjectCode: a.subjectCode,
      title: a.title,
      url: a.url,
      provider: a.provider,
      rejectionReason: a.issue,
      actionTaken: a.recommendedAction,
      replacementResourceId: a.replacementResourceId || null,
      source: 'Report B - Existing Resource Audit'
    })),
  {
    candidateId: 'REJ-EXT-01',
    subjectCode: 'MCS-102',
    title: 'Discrete Mathematics Foundations - Gate Smashers',
    url: 'https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Mo364Qmtv68AqzQKvWV',
    provider: 'GATE Smashers',
    rejectionReason: 'Curriculum mismatch: MCS-102 at Invertis is Theory of Computation / Formal Languages, not Discrete Math propositional logic.',
    actionTaken: 'REPLACE',
    replacementResourceId: 'RES-VID-004',
    source: 'Gemini Discrepancy DISC-01'
  },
  {
    candidateId: 'REJ-EXT-02',
    subjectCode: 'MCS-101',
    title: 'Computer Architecture by Prof. Onur Mutlu (CMU / ETH Zurich)',
    url: 'https://www.youtube.com/playlist?list=PL5Q2soXY2Zi8J7U_N5y_9iE_oI4qR4XfE',
    provider: 'Onur Mutlu Lectures',
    rejectionReason: 'Dead YouTube playlist — YouTube returns "The playlist does not exist."',
    actionTaken: 'REPLACE',
    replacementResourceId: 'RES-VID-003',
    source: 'Report A / B Broken Link Discovery'
  },
  {
    candidateId: 'REJ-EXT-03',
    subjectCode: 'BCS201',
    title: 'CS50 2023 - Lecture 1 - C',
    url: 'https://www.youtube.com/watch?v=4XpnKVfyG_U',
    provider: 'CS50',
    rejectionReason: 'Dead YouTube link — YouTube returns Video Unavailable.',
    actionTaken: 'REPLACE',
    replacementResourceId: 'RES-VID-023',
    source: 'Report B Block 1 Audit'
  },
  {
    candidateId: 'REJ-EXT-04',
    subjectCode: 'MCS-201',
    title: 'W3Schools: Interactive SQL Reference',
    url: 'https://www.w3schools.com/sql/',
    provider: 'W3Schools',
    rejectionReason: 'Insufficient academic depth for Postgraduate M.Tech syllabus; commercial ad-heavy platform.',
    actionTaken: 'REMOVE',
    replacementResourceId: 'RES-NOTE-006',
    source: 'Report B Resource Quality Standard'
  },
  {
    candidateId: 'REJ-EXT-05',
    subjectCode: 'MCS-322',
    title: 'Stanford Online: Algorithms Specialization Notes',
    url: 'https://online.stanford.edu/courses/soe-ycs0001-algorithms-specialization',
    provider: 'Stanford Online / edX',
    rejectionReason: 'Paywalled / subscription required for full access beyond promotional syllabus.',
    actionTaken: 'REMOVE',
    replacementResourceId: 'RES-NOTE-021',
    source: 'Report B Open Access Standard'
  }
];

// Deduplicate rejected candidates by URL/title
const uniqueRejected = [];
const seenUrls = new Set();
for (const cand of rejectedCandidates) {
  const key = `${cand.subjectCode}|${cand.url || cand.title}`;
  if (!seenUrls.has(key)) {
    seenUrls.add(key);
    uniqueRejected.push(cand);
  }
}

const rejectedPath = path.join(OUTPUT_DIR, 'rejected-resource-candidates.json');
fs.writeFileSync(rejectedPath, JSON.stringify(uniqueRejected, null, 2), 'utf8');
console.log(`[+] Wrote ${uniqueRejected.length} rejected resource candidates to ${rejectedPath}`);

// 5. Uncovered Syllabus Topics
const uncoveredTopicsList = [];
subjectMappings.forEach(sub => {
  if (Array.isArray(sub.uncoveredTopics) && sub.uncoveredTopics.length > 0) {
    uncoveredTopicsList.push({
      programmeId: sub.programmeId,
      programmeName: sub.programmeName,
      semester: sub.semester,
      subjectCode: sub.subjectCode,
      subjectName: sub.subjectName,
      coverageClassification: sub.coverageClassification,
      uncoveredTopics: sub.uncoveredTopics,
      recommendedChanges: sub.recommendedChanges
    });
  }
});

const uncoveredPath = path.join(OUTPUT_DIR, 'uncovered-syllabus-topics.json');
fs.writeFileSync(uncoveredPath, JSON.stringify(uncoveredTopicsList, null, 2), 'utf8');
console.log(`[+] Wrote ${uncoveredTopicsList.length} subjects with uncovered topics to ${uncoveredPath}`);

console.log('[*] Phase 2: All 5 canonical datasets generated successfully.');
