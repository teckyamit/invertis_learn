/**
 * Automated Verification Suite for Phase 5:
 * Department Knowledge Centre & Capstone Academic Projects
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
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
  console.log("   AUTOMATED VERIFICATION: PHASE 5 - DEPARTMENT KNOWLEDGE CENTRE & CAPSTONE");
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
    // 1. Verify Database Category
    const category = await prisma.resourceCategory.findUnique({
      where: { code: "PROJECT_ARCHIVE" },
    });
    assert(category !== null, "Resource category 'PROJECT_ARCHIVE' exists in database");

    // 2. Verify Database Capstone Resources
    const projectResources = await prisma.academicResource.findMany({
      where: { category: { code: "PROJECT_ARCHIVE" } },
      include: { subject: true },
    });
    assert(projectResources.length >= 10, `Found ${projectResources.length} capstone resources (>= 10 expected)`);

    // 3. Verify association with capstone subjects
    const capstoneCodes = ["BCS-753", "BCS-854", "BCS-754", "BCSAI 706", "BCSAI 802", "MCS-394"];
    const associatedCodes = new Set(projectResources.map(r => r.subject?.code).filter(Boolean));
    const allFound = capstoneCodes.every(code => associatedCodes.has(code));
    assert(allFound, `Capstone subjects properly associated with project archives: ${Array.from(associatedCodes).join(", ")}`);

    // 4. Verify Physical Document Assets
    const projectUploadsDir = require("./lib/storage-path.cjs").resourcePath("projects");
    const requiredFiles = [
      "Invertis_BTech_Capstone_Project_Manual_2023-24.pdf",
      "Invertis_Industrial_Training_Internship_Report_Guide.pdf",
      "Invertis_IEEE_Project_Synopsis_Template.pdf",
      "Invertis_MTech_Thesis_Colloquium_Guide_2023-24.pdf",
    ];

    for (const file of requiredFiles) {
      const fullPath = path.join(projectUploadsDir, file);
      const exists = fs.existsSync(fullPath);
      let isPdf = false;
      if (exists) {
        const buffer = fs.readFileSync(fullPath);
        isPdf = buffer.slice(0, 5).toString() === "%PDF-";
      }
      assert(exists && isPdf, `Document ${file} exists on disk and is a valid PDF`);
    }

    // 5. Test Live HTTP: Projects Hub Page (/projects)
    const projectsHubRes = await fetchUrl("/projects");
    assert(projectsHubRes.statusCode === 200, "GET /projects returns HTTP 200 OK");
    assert(projectsHubRes.body.includes("Department Knowledge Centre &amp; Capstone Projects") || 
           projectsHubRes.body.includes("Department Knowledge Centre & Capstone Projects"),
           "Projects Hub contains primary title header");
    assert(projectsHubRes.body.includes("IEEE 4-Page Synopsis Defense"), "Projects Hub contains IEEE milestone timeline");
    assert(projectsHubRes.body.includes("Invertis_IEEE_Project_Synopsis_Template.pdf"), "Projects Hub includes official IEEE template");
    assert(projectsHubRes.body.includes("BCS-753"), "Projects Hub references capstone course BCS-753");

    // 6. Test Live HTTP: Download Endpoint
    const downloadRes = await fetchUrl("/api/projects/download?file=Invertis_IEEE_Project_Synopsis_Template.pdf");
    assert(downloadRes.statusCode === 200, "GET /api/projects/download with valid file returns HTTP 200");
    assert(downloadRes.headers["content-type"] === "application/pdf", "Download returns Content-Type: application/pdf");
    assert(downloadRes.headers["content-disposition"] && downloadRes.headers["content-disposition"].includes("Invertis_IEEE_Project_Synopsis_Template.pdf"), "Download returns appropriate Content-Disposition header");

    // 7. Test Security: Path Traversal Rejection
    const securityRes = await fetchUrl("/api/projects/download?file=../../etc/passwd");
    assert(securityRes.statusCode === 400 || securityRes.statusCode === 404, `Security: Path traversal is blocked (status ${securityRes.statusCode})`);

    // 8. Test Live Capstone Subject Detail Page (/syllabus/BTECH-CSE/semester/7/BCS-753)
    const capstoneRes = await fetchUrl("/syllabus/BTECH-CSE/semester/7/BCS-753");
    assert(capstoneRes.statusCode === 200, "GET /syllabus/BTECH-CSE/semester/7/BCS-753 returns HTTP 200");
    assert(capstoneRes.body.includes("Project Workspace") || capstoneRes.body.includes("Capstone"), "Capstone detail page displays Project Workspace / Capstone section");
    assert(capstoneRes.body.includes("IEEE") || capstoneRes.body.includes("Synopsis"), "Capstone detail page contains IEEE guidelines");

    // 9. Test Live Standard Subject Detail Page (BCS201) remains clean
    const bcs201Res = await fetchUrl("/syllabus/BTECH-CSE/semester/2/BCS201");
    assert(bcs201Res.statusCode === 200, "GET /syllabus/BTECH-CSE/semester/2/BCS201 returns HTTP 200");
    assert(bcs201Res.body.includes("Programming in C"), "BCS201 page renders Programming in C");
    assert(bcs201Res.body.includes("Course Outcomes (COs)"), "BCS201 page preserves Section 2 Course Outcomes");
    assert(bcs201Res.body.includes("Unit-Wise Detailed Syllabus"), "BCS201 page preserves Section 3 Unit-Wise Syllabus");

    // 10. Test Resources Hub Page (/resources) contains link to /projects
    const resourcesRes = await fetchUrl("/resources");
    assert(resourcesRes.statusCode === 200, "GET /resources returns HTTP 200");
    assert(resourcesRes.body.includes("/projects"), "Resources Hub page features direct navigation to /projects");

    console.log("\n================================================================================");
    console.log(`   PHASE 5 VERIFICATION RESULT: ${passedTests} / ${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
    console.log("================================================================================\n");

    if (passedTests === totalTests) {
      console.log("All Phase 5 verification tests passed successfully!");
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

