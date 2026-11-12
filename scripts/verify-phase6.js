/**
 * Automated Verification Suite for Phase 6:
 * Career Pathways & Department Specialization Tracks
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

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
  console.log("   AUTOMATED VERIFICATION: PHASE 6 - CAREER PATHWAYS & SPECIALIZATIONS");
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
    // 1. Static Source Code & Data Integrity Checks
    const dataFilePath = path.join(process.cwd(), "src", "data", "careerPathways.ts");
    assert(fs.existsSync(dataFilePath), "Source file src/data/careerPathways.ts exists");

    const dataContent = fs.readFileSync(dataFilePath, "utf8");

    const expectedSlugs = [
      "ai-machine-learning",
      "full-stack-cloud",
      "cyber-security-defense",
      "data-engineering-analytics",
      "cloud-devops-sre",
      "embedded-iot-systems"
    ];

    for (const slug of expectedSlugs) {
      assert(dataContent.includes(`slug: "${slug}"`), `Pathway with slug '${slug}' defined in data source`);
    }

    assert(dataContent.includes("getPathwaysForSubject"), "Exported getPathwaysForSubject helper exists");
    assert(dataContent.includes("BCS201") && dataContent.includes("BCS-301"), "Mapped core course codes (BCS201, BCS-301) present in source");

    // 2. Component Source Integrity Checks
    const componentPath = path.join(process.cwd(), "src", "components", "pathways", "SubjectPathwaysSection.tsx");
    assert(fs.existsSync(componentPath), "Component SubjectPathwaysSection.tsx exists");

    const componentContent = fs.readFileSync(componentPath, "utf8");
    assert(componentContent.includes("Career Pathways & Industry Relevance"), "Component has proper heading");
    assert(componentContent.includes("Explore All 6 Pathways"), "Component links to pathways hub");

    // 3. Live HTTP Testing: /career-pathways Page & legacy redirect
    const legacyRedirectRes = await fetchUrl("/pathways");
    assert(legacyRedirectRes.statusCode === 307 || legacyRedirectRes.statusCode === 308, "GET /pathways redirects to /career-pathways");

    const pathwaysRes = await fetchUrl("/career-pathways");
    assert(pathwaysRes.statusCode === 200, "GET /career-pathways returns HTTP 200 OK");
    assert(pathwaysRes.body.includes("Turn Your Academic Knowledge Into Career Opportunities") ||
           pathwaysRes.body.includes("Career Specialization Tracks"),
           "Pathways Hub contains main title header");
    assert(pathwaysRes.body.includes("Artificial Intelligence &amp; Machine Learning Engineer") ||
           pathwaysRes.body.includes("Artificial Intelligence & Machine Learning Engineer"),
           "Pathways Hub includes AI/ML Engineer track");
    assert(pathwaysRes.body.includes("Full-Stack Web &amp; Cloud Software Engineer") ||
           pathwaysRes.body.includes("Full-Stack Web & Cloud Software Engineer"),
           "Pathways Hub includes Full-Stack Cloud Engineer track");
    assert(pathwaysRes.body.includes("Cyber Security &amp; Information Assurance Specialist") ||
           pathwaysRes.body.includes("Cyber Security & Information Assurance Specialist"),
           "Pathways Hub includes Cyber Security track");
    assert(pathwaysRes.body.includes("Data Systems &amp; Big Data Analytics Engineer") ||
           pathwaysRes.body.includes("Data Systems & Big Data Analytics Engineer"),
           "Pathways Hub includes Data Systems track");
    assert(pathwaysRes.body.includes("Cloud DevOps &amp; Site Reliability Engineer (SRE)") ||
           pathwaysRes.body.includes("Cloud DevOps & Site Reliability Engineer (SRE)"),
           "Pathways Hub includes Cloud DevOps SRE track");
    assert(pathwaysRes.body.includes("Embedded Systems &amp; Internet of Things (IoT) Engineer") ||
           pathwaysRes.body.includes("Embedded Systems & Internet of Things (IoT) Engineer"),
           "Pathways Hub includes Embedded IoT track");

    // Check presence of industry certifications & salary bands
    assert(pathwaysRes.body.includes("AWS Certified Solutions Architect") || pathwaysRes.body.includes("CompTIA Security+"),
           "Pathways Hub renders recognized industry certification badges");
    assert(pathwaysRes.body.includes("Target Industry Positions"), "Pathways Hub displays industry job titles & salary bands");
    assert(pathwaysRes.body.includes("Related Academic Subjects (Invertis University Curriculum)") ||
           pathwaysRes.body.includes("Invertis University Curriculum"),
           "Pathways Hub maps directly to Invertis subjects");

    // 4. Live HTTP Testing: Subject Detail Page Integration (BCS201)
    const bcs201Res = await fetchUrl("/syllabus/BTECH-CSE/semester/2/BCS201");
    assert(bcs201Res.statusCode === 200, "GET /syllabus/BTECH-CSE/semester/2/BCS201 returns HTTP 200");
    assert(bcs201Res.body.includes("Career Pathways &amp; Industry Relevance") ||
           bcs201Res.body.includes("Career Pathways & Industry Relevance"),
           "BCS201 displays Career Pathways & Industry Relevance section");
    assert(bcs201Res.body.includes("FOUNDATIONAL REQUIREMENT") || bcs201Res.body.includes("REQUIREMENT"),
           "BCS201 identifies course as foundational requirement");
    assert(bcs201Res.body.includes("Career Pathways &amp; Specializations") || bcs201Res.body.includes("Career Pathways & Specializations"), "BCS201 roadmap includes Career Pathways & Specializations");

    // 5. Live HTTP Testing: Subject Detail Page Integration (BCS-301 Data Structures)
    const bcs301Res = await fetchUrl("/syllabus/BTECH-CSE/semester/3/BCS-301");
    assert(bcs301Res.statusCode === 200, "GET /syllabus/BTECH-CSE/semester/3/BCS-301 returns HTTP 200");
    assert(bcs301Res.body.includes("Career Pathways &amp; Industry Relevance") ||
           bcs301Res.body.includes("Career Pathways & Industry Relevance"),
           "BCS-301 displays Career Pathways section");

    // 6. Live HTTP Testing: Dedicated Navbar Link and Absence of Banner on Resources
    const navRes = await fetchUrl("/");
    assert(navRes.body.includes("/career-pathways"), "Platform Navbar contains /career-pathways link");

    const resourcesRes = await fetchUrl("/resources");
    assert(resourcesRes.statusCode === 200, "GET /resources returns HTTP 200");
    assert(!resourcesRes.body.includes("Phase 6: Career Pathways"), "Resources Hub cleaned of promotional Phase 6 banner");

    // 7. Zero Authentication Rule
    assert(!pathwaysRes.body.includes("Sign In to Access") && !pathwaysRes.body.includes("Please Login"),
           "Pathways Hub has zero authentication blockers");

    console.log("\n================================================================================");
    console.log(`   PHASE 6 VERIFICATION RESULT: ${passedTests} / ${totalTests} TESTS PASSED (${Math.round(passedTests/totalTests*100)}%)`);
    console.log("================================================================================\n");

    if (passedTests === totalTests) {
      console.log("All Phase 6 verification tests passed successfully!");
      process.exit(0);
    } else {
      console.error("Some verification tests failed.");
      process.exit(1);
    }
  } catch (error) {
    console.error("Verification execution error:", error);
    process.exit(1);
  }
}

runVerification();
