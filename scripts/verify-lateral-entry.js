/**
 * Automated Acceptance Test Suite for Invertis Learn:
 * B.Tech CSE Lateral Entry Programmes (Regular & AI Specialization)
 */

const http = require("http");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body: data });
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function runVerification() {
  console.log("================================================================================");
  console.log("   AUTOMATED VERIFICATION: B.TECH CSE LATERAL ENTRY PROGRAMMES");
  console.log("================================================================================\n");

  let totalTests = 0;
  let passedTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`[PASS] Test ${totalTests}: ${message}`);
    } else {
      console.error(`[FAIL] Test ${totalTests}: ${message}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // PHASE 1 & 2: Database Registration & Parent Mapping Verification
    // -------------------------------------------------------------------------
    console.log("Step 1: Database Programme Registration & Attributes");

    const regularLE = await prisma.programme.findUnique({
      where: { code: "BTECH-CSE-LE" },
      include: { department: true },
    });
    assert(regularLE !== null, "BTECH-CSE-LE exists in database");
    assert(regularLE?.isLateralEntry === true, "BTECH-CSE-LE has isLateralEntry=true");
    assert(regularLE?.durationYears === 3, "BTECH-CSE-LE has durationYears=3");
    assert(regularLE?.hasOfficialSyllabus === true, "BTECH-CSE-LE has hasOfficialSyllabus=true");
    assert(regularLE?.department?.code === "ENG", "BTECH-CSE-LE is under Engineering department (ENG)");

    const aiLE = await prisma.programme.findUnique({
      where: { code: "BTECH-CSE-AI-LE" },
      include: { department: true },
    });
    assert(aiLE !== null, "BTECH-CSE-AI-LE exists in database");
    assert(aiLE?.isLateralEntry === true, "BTECH-CSE-AI-LE has isLateralEntry=true");
    assert(aiLE?.durationYears === 3, "BTECH-CSE-AI-LE has durationYears=3");
    assert(aiLE?.hasOfficialSyllabus === true, "BTECH-CSE-AI-LE has hasOfficialSyllabus=true");
    assert(aiLE?.department?.code === "ENG", "BTECH-CSE-AI-LE is under Engineering department (ENG)");

    // -------------------------------------------------------------------------
    // PHASE 3: Shared Reference Architecture & Zero Duplicate Subjects
    // -------------------------------------------------------------------------
    console.log("\nStep 2: Shared Reference Architecture (Zero Duplicate Subjects)");

    const totalSubjectsInDb = await prisma.subject.count();
    // Verify that subject count is exactly the original 220 subjects (220 = 138 regular + 82 AI)
    assert(totalSubjectsInDb === 220, `Total database subjects remains exactly 220 (Zero duplicates created: Found ${totalSubjectsInDb})`);

    // Verify parent subjects are identical for Sem 3 to 8
    const bcs301InDb = await prisma.subject.findFirst({
      where: { code: "BCS-301" },
      include: { semester: { include: { curriculumVersion: { include: { programme: true } } } } }
    });
    assert(bcs301InDb?.semester?.curriculumVersion?.programme?.code === "BTECH-CSE", "BCS-301 is physically owned by parent BTECH-CSE without duplication");

    const bcsai301InDb = await prisma.subject.findFirst({
      where: { code: "BCSAI 301" },
      include: { semester: { include: { curriculumVersion: { include: { programme: true } } } } }
    });
    assert(bcsai301InDb?.semester?.curriculumVersion?.programme?.code === "BTECH-CSE-AI", "BCSAI 301 is physically owned by parent BTECH-CSE-AI without duplication");

    // -------------------------------------------------------------------------
    // PHASE 4 & 5: Live UI & Programme Directory Verification (/engineering)
    // -------------------------------------------------------------------------
    console.log("\nStep 3: Live UI & Engineering Directory");

    const engRes = await fetchUrl("/engineering");
    assert(engRes.statusCode === 200, "GET /engineering returns HTTP 200 OK");
    assert(engRes.body.includes("B.Tech CSE (Regular)"), "Engineering Directory displays 'B.Tech CSE (Regular)'");
    assert(engRes.body.includes("B.Tech CSE (Regular) - Lateral Entry"), "Engineering Directory displays 'B.Tech CSE (Regular) - Lateral Entry'");
    assert(engRes.body.includes("B.Tech CSE (AI Specialization)"), "Engineering Directory displays 'B.Tech CSE (AI Specialization)'");
    assert(engRes.body.includes("B.Tech CSE (AI Specialization) - Lateral Entry"), "Engineering Directory displays 'B.Tech CSE (AI Specialization) - Lateral Entry'");
    assert(engRes.body.includes("3 Years (6 Semesters: Sem III to VIII)"), "Engineering Directory displays 3 Years / 6 Semesters for lateral entry");

    // -------------------------------------------------------------------------
    // Programme Semesters Page (/syllabus/BTECH-CSE-LE)
    // -------------------------------------------------------------------------
    console.log("\nStep 4: Lateral Entry Semesters Page (/syllabus/BTECH-CSE-LE)");

    const regularLERes = await fetchUrl("/syllabus/BTECH-CSE-LE");
    assert(regularLERes.statusCode === 200, "GET /syllabus/BTECH-CSE-LE returns HTTP 200 OK");
    assert(/3(<!-- -->)?\s*Academic Years/.test(regularLERes.body), "BTECH-CSE-LE shows 3 Academic Years duration");
    assert(/6(<!-- -->)?\s*Semesters/.test(regularLERes.body), "BTECH-CSE-LE shows 6 Semesters count");
    assert(regularLERes.body.includes("Semester III"), "BTECH-CSE-LE displays Semester III");
    assert(regularLERes.body.includes("Semester IV"), "BTECH-CSE-LE displays Semester IV");
    assert(regularLERes.body.includes("Semester V"), "BTECH-CSE-LE displays Semester V");
    assert(regularLERes.body.includes("Semester VI"), "BTECH-CSE-LE displays Semester VI");
    assert(regularLERes.body.includes("Semester VII"), "BTECH-CSE-LE displays Semester VII");
    assert(regularLERes.body.includes("Semester VIII"), "BTECH-CSE-LE displays Semester VIII");
    assert(!regularLERes.body.includes("/syllabus/BTECH-CSE-LE/semester/1\"") && !regularLERes.body.includes("/syllabus/BTECH-CSE-LE/semester/1 "), "BTECH-CSE-LE does NOT link to Semester 1");
    assert(!regularLERes.body.includes("/syllabus/BTECH-CSE-LE/semester/2\"") && !regularLERes.body.includes("/syllabus/BTECH-CSE-LE/semester/2 "), "BTECH-CSE-LE does NOT link to Semester 2");

    // -------------------------------------------------------------------------
    // AI Lateral Entry Semesters Page (/syllabus/BTECH-CSE-AI-LE)
    // -------------------------------------------------------------------------
    console.log("\nStep 5: AI Lateral Entry Semesters Page (/syllabus/BTECH-CSE-AI-LE)");

    const aiLERes = await fetchUrl("/syllabus/BTECH-CSE-AI-LE");
    assert(aiLERes.statusCode === 200, "GET /syllabus/BTECH-CSE-AI-LE returns HTTP 200 OK");
    assert(/3(<!-- -->)?\s*Academic Years/.test(aiLERes.body), "BTECH-CSE-AI-LE shows 3 Academic Years duration");
    assert(/6(<!-- -->)?\s*Semesters/.test(aiLERes.body), "BTECH-CSE-AI-LE shows 6 Semesters count");
    assert(aiLERes.body.includes("Semester III"), "BTECH-CSE-AI-LE displays Semester III");
    assert(aiLERes.body.includes("Semester VIII"), "BTECH-CSE-AI-LE displays Semester VIII");

    // -------------------------------------------------------------------------
    // Semester Subjects Page & 404 Prevention
    // -------------------------------------------------------------------------
    console.log("\nStep 6: Semester Constraints & Zero Empty Year 1 Pages");

    const sem1Res = await fetchUrl("/syllabus/BTECH-CSE-LE/semester/1");
    assert(sem1Res.statusCode === 404, "GET /syllabus/BTECH-CSE-LE/semester/1 returns 404 (No empty Sem 1 page)");

    const sem2Res = await fetchUrl("/syllabus/BTECH-CSE-LE/semester/2");
    assert(sem2Res.statusCode === 404, "GET /syllabus/BTECH-CSE-LE/semester/2 returns 404 (No empty Sem 2 page)");

    const sem3Res = await fetchUrl("/syllabus/BTECH-CSE-LE/semester/3");
    assert(sem3Res.statusCode === 200, "GET /syllabus/BTECH-CSE-LE/semester/3 returns HTTP 200 OK");
    assert(sem3Res.body.includes("BCS-301"), "Semester 3 lists Data Structures (BCS-301)");
    assert(sem3Res.body.includes("/syllabus/BTECH-CSE-LE/semester/3/BCS-301"), "Subject card links under BTECH-CSE-LE namespace");

    // -------------------------------------------------------------------------
    // Subject Detail Page Consistency & Layout Standard
    // -------------------------------------------------------------------------
    console.log("\nStep 7: Subject Detail Page Consistency (BCS-301 under BTECH-CSE-LE)");

    const subjectRes = await fetchUrl("/syllabus/BTECH-CSE-LE/semester/3/BCS-301");
    assert(subjectRes.statusCode === 200, "GET /syllabus/BTECH-CSE-LE/semester/3/BCS-301 returns HTTP 200 OK");
    assert(subjectRes.body.includes("Data Structures"), "Subject page displays Data Structures name");
    assert(subjectRes.body.includes("Course Outcomes (COs)"), "Subject page includes Course Outcomes section");
    assert(subjectRes.body.includes("Unit-Wise Detailed Syllabus"), "Subject page includes Unit-Wise Detailed Syllabus");
    assert(subjectRes.body.includes("Recommended Textbooks"), "Subject page includes Recommended Textbooks");
    assert(subjectRes.body.includes("Reference Books"), "Subject page includes Reference Books");
    assert(subjectRes.body.includes("External Learning Resources"), "Subject page includes External Learning Resources");
    assert(subjectRes.body.includes("Download Official PDF"), "Subject page includes Official PDF Download button");
    assert(!subjectRes.body.includes("<object") && !subjectRes.body.includes("<iframe"), "Subject page has zero embedded PDF viewers");

    // -------------------------------------------------------------------------
    // AI Lateral Entry Subject Detail Page (BCSAI 301)
    // -------------------------------------------------------------------------
    console.log("\nStep 8: AI Lateral Entry Subject Detail (BCSAI 301 under BTECH-CSE-AI-LE)");

    const aiSubRes = await fetchUrl("/syllabus/BTECH-CSE-AI-LE/semester/3/BCSAI%20301");
    assert(aiSubRes.statusCode === 200, "GET /syllabus/BTECH-CSE-AI-LE/semester/3/BCSAI 301 returns HTTP 200 OK");
    assert(aiSubRes.body.includes("Computer Networks"), "Subject page displays Computer Networks");
    assert(aiSubRes.body.includes("BTECH-CSE-AI-LE"), "Breadcrumbs reflect BTECH-CSE-AI-LE");

    // -------------------------------------------------------------------------
    // Regular Programme Regression Check
    // -------------------------------------------------------------------------
    console.log("\nStep 9: Regular Programme Regression Protection");

    const regSem1Res = await fetchUrl("/syllabus/BTECH-CSE/semester/1/BCS101");
    assert(regSem1Res.statusCode === 200, "Regular BTECH-CSE Semester 1 (BCS101) remains accessible");

    const regSem2Res = await fetchUrl("/syllabus/BTECH-CSE/semester/2/BCS201");
    assert(regSem2Res.statusCode === 200, "Regular BTECH-CSE Semester 2 (BCS201) remains accessible");

    console.log("\n================================================================================");
    console.log(`   LATERAL ENTRY VERIFICATION RESULT: ${passedTests} / ${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
    console.log("================================================================================\n");

    if (passedTests === totalTests) {
      console.log("All Lateral Entry verification tests passed successfully!");
      process.exit(0);
    } else {
      console.error("Some verification tests failed.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Verification execution error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runVerification();
