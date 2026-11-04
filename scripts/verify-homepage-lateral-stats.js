/**
 * INVERTIS LEARN: Verification Suite for Homepage Lateral Entry Course Statistics
 * Verifies that:
 * 1. B.Tech CSE (Regular) - Lateral Entry displays 3 Years, 6 Semesters, 88 Verified Subjects, Resources Active.
 * 2. B.Tech CSE (AI Specialization) - Lateral Entry displays 3 Years, 6 Semesters, 62 Verified Subjects, Resources Active.
 * 3. No "0 Semesters" appears on the homepage cards.
 * 4. Regular 4-year programmes remain unaffected (8 Semesters, 110 & 82 subjects).
 * 5. Database subject count remains exactly 220 (zero duplicates).
 * 6. Syllabus, PYQ, Notes, and Labs listings properly reflect lateral entry statistics.
 * 7. Semesters 1 & 2 are excluded (404), Semesters 3-8 are accessible.
 */

const http = require("http");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        hostname: parsed.hostname,
        port: parsed.port || 3000,
        path: parsed.pathname + parsed.search,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            text: () => Promise.resolve(data),
          });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function runVerification() {
  console.log("================================================================================");
  console.log("   HOMEPAGE LATERAL ENTRY COURSE STATISTICS ACCEPTANCE SUITE");
  console.log("================================================================================\n");

  // -------------------------------------------------------------------------
  // TEST 1: Database Subject Record Integrity (Zero Duplication)
  // -------------------------------------------------------------------------
  console.log("Test 1: Database Subject Record Integrity");
  const totalDbSubjects = await prisma.subject.count();
  assert(totalDbSubjects === 220, `Total database subjects remains exactly 220 (Found ${totalDbSubjects}, zero duplicates created)`);
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 2: Homepage (/): B.Tech CSE (Regular) - Lateral Entry Card
  // -------------------------------------------------------------------------
  console.log("Test 2: Homepage B.Tech CSE (Regular) - Lateral Entry Card");
  const homeResp = await fetch("http://localhost:3000/");
  assert(homeResp.statusCode === 200, "GET / (Homepage) returns HTTP 200 OK");
  const homeHtml = await homeResp.text();

  // Extract the BTECH-CSE-LE card
  const leRegIdx = homeHtml.indexOf("BTECH-CSE-LE");
  assert(leRegIdx !== -1, "Homepage contains BTECH-CSE-LE card");

  const leRegSnippet = homeHtml.substring(leRegIdx - 300, leRegIdx + 2000);

  // Check duration
  assert(leRegSnippet.includes("3") && leRegSnippet.includes("Years Duration"), "BTECH-CSE-LE displays '3 Years Duration'");
  // Check semesters: must be 6, NOT 0
  assert(/6(<!-- -->)?\s*Semesters/.test(leRegSnippet), "BTECH-CSE-LE displays '6 Semesters'");
  assert(!/0(<!-- -->)?\s*Semesters/.test(leRegSnippet), "BTECH-CSE-LE does NOT display '0 Semesters'");
  // Check curriculum: must be 88 Verified Subjects
  assert(/88(<!-- -->)?\s*Verified Subjects/.test(leRegSnippet), "BTECH-CSE-LE displays '88 Verified Subjects'");
  // Check resources active
  assert(leRegSnippet.includes("Resources Active"), "BTECH-CSE-LE displays 'Resources Active'");
  // Check links
  assert(leRegSnippet.includes("/syllabus/BTECH-CSE-LE"), "BTECH-CSE-LE links to '/syllabus/BTECH-CSE-LE'");
  assert(leRegSnippet.includes("/pyq/BTECH-CSE-LE"), "BTECH-CSE-LE links to '/pyq/BTECH-CSE-LE'");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 3: Homepage (/): B.Tech CSE (AI Specialization) - Lateral Entry Card
  // -------------------------------------------------------------------------
  console.log("Test 3: Homepage B.Tech CSE (AI Specialization) - Lateral Entry Card");
  const leAiIdx = homeHtml.indexOf("BTECH-CSE-AI-LE");
  assert(leAiIdx !== -1, "Homepage contains BTECH-CSE-AI-LE card");

  const leAiSnippet = homeHtml.substring(leAiIdx - 300, leAiIdx + 2000);

  // Check duration
  assert(leAiSnippet.includes("3") && leAiSnippet.includes("Years Duration"), "BTECH-CSE-AI-LE displays '3 Years Duration'");
  // Check semesters: must be 6, NOT 0
  assert(/6(<!-- -->)?\s*Semesters/.test(leAiSnippet), "BTECH-CSE-AI-LE displays '6 Semesters'");
  assert(!/0(<!-- -->)?\s*Semesters/.test(leAiSnippet), "BTECH-CSE-AI-LE does NOT display '0 Semesters'");
  // Check curriculum: must be 62 Verified Subjects
  assert(/62(<!-- -->)?\s*Verified Subjects/.test(leAiSnippet), "BTECH-CSE-AI-LE displays '62 Verified Subjects'");
  // Check resources active
  assert(leAiSnippet.includes("Resources Active"), "BTECH-CSE-AI-LE displays 'Resources Active'");
  // Check links
  assert(leAiSnippet.includes("/syllabus/BTECH-CSE-AI-LE"), "BTECH-CSE-AI-LE links to '/syllabus/BTECH-CSE-AI-LE'");
  assert(leAiSnippet.includes("/pyq/BTECH-CSE-AI-LE"), "BTECH-CSE-AI-LE links to '/pyq/BTECH-CSE-AI-LE'");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 4: Regression Protection for Regular Four-Year Programmes
  // -------------------------------------------------------------------------
  console.log("Test 4: Regression Protection for Regular Programmes on Homepage");
  const regSnippet = homeHtml.substring(homeHtml.indexOf("BTECH-CSE</span>"), homeHtml.indexOf("BTECH-CSE</span>") + 2000);
  assert(/8(<!-- -->)?\s*Semesters/.test(regSnippet), "Regular B.Tech CSE retains '8 Semesters'");
  assert(/110(<!-- -->)?\s*Verified Subjects/.test(regSnippet), "Regular B.Tech CSE retains '110 Verified Subjects'");
  assert(regSnippet.includes("4") && regSnippet.includes("Years Duration"), "Regular B.Tech CSE retains '4 Years Duration'");

  const aiRegSnippet = homeHtml.substring(homeHtml.indexOf("BTECH-CSE-AI</span>"), homeHtml.indexOf("BTECH-CSE-AI</span>") + 2000);
  assert(/8(<!-- -->)?\s*Semesters/.test(aiRegSnippet), "Regular B.Tech CSE-AI retains '8 Semesters'");
  assert(/82(<!-- -->)?\s*Verified Subjects/.test(aiRegSnippet), "Regular B.Tech CSE-AI retains '82 Verified Subjects'");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 5: Syllabus Library (/syllabus) Listing
  // -------------------------------------------------------------------------
  console.log("Test 5: Verification of /syllabus Listing");
  const sylResp = await fetch("http://localhost:3000/syllabus");
  assert(sylResp.statusCode === 200, "GET /syllabus returns HTTP 200 OK");
  const sylHtml = await sylResp.text();

  const sylLeRegIdx = sylHtml.indexOf("BTECH-CSE-LE");
  const sylLeRegSnippet = sylHtml.substring(sylLeRegIdx, sylLeRegIdx + 1200);
  assert(/6(<!-- -->)?\s*Sems/.test(sylLeRegSnippet), "Syllabus listing shows '6 Sems' for BTECH-CSE-LE");
  assert(/88(<!-- -->)?\s*Total/.test(sylLeRegSnippet), "Syllabus listing shows '88 Total' subjects for BTECH-CSE-LE");

  const sylLeAiIdx = sylHtml.indexOf("BTECH-CSE-AI-LE");
  const sylLeAiSnippet = sylHtml.substring(sylLeAiIdx, sylLeAiIdx + 1200);
  assert(/6(<!-- -->)?\s*Sems/.test(sylLeAiSnippet), "Syllabus listing shows '6 Sems' for BTECH-CSE-AI-LE");
  assert(/62(<!-- -->)?\s*Total/.test(sylLeAiSnippet), "Syllabus listing shows '62 Total' subjects for BTECH-CSE-AI-LE");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 6: PYQ Library (/pyq) Listing
  // -------------------------------------------------------------------------
  console.log("Test 6: Verification of /pyq Listing");
  const pyqResp = await fetch("http://localhost:3000/pyq");
  assert(pyqResp.statusCode === 200, "GET /pyq returns HTTP 200 OK");
  const pyqHtml = await pyqResp.text();

  const pyqLeRegIdx = pyqHtml.indexOf("BTECH-CSE-LE");
  const pyqLeRegSnippet = pyqHtml.substring(pyqLeRegIdx, pyqLeRegIdx + 1200);
  assert(/6(<!-- -->)?\s*Sems/.test(pyqLeRegSnippet), "PYQ listing shows '6 Sems' for BTECH-CSE-LE");
  assert(/88(<!-- -->)?\s*Courses/.test(pyqLeRegSnippet), "PYQ listing shows '88 Courses' for BTECH-CSE-LE");

  const pyqLeAiIdx = pyqHtml.indexOf("BTECH-CSE-AI-LE");
  const pyqLeAiSnippet = pyqHtml.substring(pyqLeAiIdx, pyqLeAiIdx + 1200);
  assert(/6(<!-- -->)?\s*Sems/.test(pyqLeAiSnippet), "PYQ listing shows '6 Sems' for BTECH-CSE-AI-LE");
  assert(/62(<!-- -->)?\s*Courses/.test(pyqLeAiSnippet), "PYQ listing shows '62 Courses' for BTECH-CSE-AI-LE");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 7: Navigation & Semester Constraints for Lateral Entry
  // -------------------------------------------------------------------------
  console.log("Test 7: Navigation & Semester Constraints");
  const sem1Resp = await fetch("http://localhost:3000/syllabus/BTECH-CSE-LE/semester/1");
  assert(sem1Resp.statusCode === 404, "GET /syllabus/BTECH-CSE-LE/semester/1 returns 404 (Semester 1 excluded)");

  const sem2Resp = await fetch("http://localhost:3000/syllabus/BTECH-CSE-LE/semester/2");
  assert(sem2Resp.statusCode === 404, "GET /syllabus/BTECH-CSE-LE/semester/2 returns 404 (Semester 2 excluded)");

  const sem3Resp = await fetch("http://localhost:3000/syllabus/BTECH-CSE-LE/semester/3");
  assert(sem3Resp.statusCode === 200, "GET /syllabus/BTECH-CSE-LE/semester/3 returns 200 OK (Semester 3 accessible)");

  const subjResp = await fetch("http://localhost:3000/syllabus/BTECH-CSE-LE/semester/3/BCS-301");
  assert(subjResp.statusCode === 200, "GET /syllabus/BTECH-CSE-LE/semester/3/BCS-301 returns 200 OK (Subject detail accessible)");
  const subjHtml = await subjResp.text();
  assert(subjHtml.includes("Data Structures"), "BCS-301 renders Data Structures");
  assert(subjHtml.includes("Course Outcomes (COs)"), "BCS-301 renders Course Outcomes");
  console.log("");

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log("================================================================================");
  console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
  console.log("================================================================================");

  await prisma.$disconnect();

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runVerification().catch(async (err) => {
  console.error("FATAL ERROR running verification:", err);
  await prisma.$disconnect();
  process.exit(1);
});
