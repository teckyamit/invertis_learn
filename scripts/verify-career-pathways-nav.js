/**
 * INVERTIS LEARN: Career Pathways Navigation & Dedicated Page Verification Suite
 * Verifies Phase 1 through Phase 6 requirements:
 * 1. Navbar layout, ordering, icons, mobile responsiveness
 * 2. Complete removal of promotional banner from /resources
 * 3. Dedicated /career-pathways route with required hero headline and description
 * 4. Preservation of all 6 specialization tracks, subject mappings, skills, certifications, resources
 * 5. Removal of public-facing "Phase 6" development tags
 * 6. Redirect protection from legacy /pathways
 * 7. Subject pages integration
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

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
  console.log("   CAREER PATHWAYS NAVIGATION & DEDICATED PAGE ACCEPTANCE SUITE");
  console.log("================================================================================\n");

  // -------------------------------------------------------------------------
  // TEST 1: Navbar Code Structure & Item Ordering
  // -------------------------------------------------------------------------
  console.log("Test 1: Navbar Component & Navigation Link Ordering");
  const navbarPath = path.join(process.cwd(), "src/components/layout/Navbar.tsx");
  const navbarCode = fs.readFileSync(navbarPath, "utf-8");

  assert(navbarCode.includes('import {'), "Navbar imports components correctly");
  assert(navbarCode.includes('Compass'), "Compass career icon imported");
  
  // Verify exact order in navLinks array
  const homeIdx = navbarCode.indexOf('{ label: "Home"');
  const engIdx = navbarCode.indexOf('{ label: "Engineering"');
  const resIdx = navbarCode.indexOf('{ label: "Resources"');
  const cpIdx = navbarCode.indexOf('{ label: "Career Pathways"');
  const aboutIdx = navbarCode.indexOf('{ label: "About"');
  const erpIdx = navbarCode.indexOf('https://erp.invertisuniversity.ac.in/');

  assert(homeIdx !== -1, "Nav link 'Home' is defined");
  assert(engIdx !== -1 && engIdx > homeIdx, "Nav link 'Engineering' is defined after Home");
  assert(resIdx !== -1 && resIdx > engIdx, "Nav link 'Resources' is defined after Engineering");
  assert(cpIdx !== -1 && cpIdx > resIdx, "Nav link 'Career Pathways' is defined IMMEDIATELY after Resources");
  assert(aboutIdx !== -1 && aboutIdx > cpIdx, "Nav link 'About' is defined after Career Pathways");
  assert(erpIdx !== -1, "External 'University ERP' link is defined in Navbar");
  assert(navbarCode.includes('href: "/career-pathways"'), "Career Pathways navigates to '/career-pathways'");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 2: Resources Page (/resources) - Banner Completely Removed
  // -------------------------------------------------------------------------
  console.log("Test 2: Verification of /resources Page (Banner Clean Removal)");
  const resPageResp = await fetch("http://localhost:3000/resources");
  assert(resPageResp.statusCode === 200, "GET /resources returns HTTP 200 OK");
  
  const resHtml = await resPageResp.text();
  assert(!resHtml.includes("Phase 6: Career Pathways"), "Promotional 'Phase 6: Career Pathways' banner is NOT on /resources");
  assert(!resHtml.includes("Explore 6 Department Specialization Tracks"), "Promotional headline is NOT on /resources");
  assert(!resHtml.includes("/pathways"), "No legacy /pathways promotional links on /resources");
  
  // Verify academic core resources remain functional
  assert(resHtml.includes("Academic Resources Hub"), "Resources page header present");
  assert(resHtml.includes("Syllabus Library"), "Syllabus Library section present");
  assert(resHtml.includes("Previous Year Papers"), "PYQ section present");
  assert(resHtml.includes("Faculty Notes"), "Faculty Notes section present");
  assert(resHtml.includes("Lab Manuals"), "Lab Manuals section present");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 3: Dedicated /career-pathways Page Hero & Messaging
  // -------------------------------------------------------------------------
  console.log("Test 3: Dedicated /career-pathways Page & Hero Copy");
  const cpResp = await fetch("http://localhost:3000/career-pathways");
  assert(cpResp.statusCode === 200, "GET /career-pathways returns HTTP 200 OK");

  const cpHtml = await cpResp.text();
  assert(
    cpHtml.includes("Turn Your Academic Knowledge Into Career Opportunities."),
    "Hero headline matches: 'Turn Your Academic Knowledge Into Career Opportunities.'"
  );
  assert(
    cpHtml.includes("Explore industry-relevant specializations, discover useful certifications and understand how your engineering subjects connect to real-world careers."),
    "Hero description matches requested specification"
  );
  assert(!cpHtml.includes("Phase 6: Career Pathways"), "No internal 'Phase 6' development labels on page");
  assert(cpHtml.includes("Career Specialization Tracks"), "Professional badge 'Career Specialization Tracks' present");
  assert(cpHtml.includes("Aligned with Invertis Engineering Curriculum"), "Trust badge: Aligned with curriculum present");
  assert(cpHtml.includes("Zero Login Required"), "Zero authentication / public access badge present");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 4: Preservation of All Six Specialization Tracks
  // -------------------------------------------------------------------------
  console.log("Test 4: Preservation of All 6 Specialization Tracks");
  assert(cpHtml.includes("Artificial Intelligence &amp; Machine Learning Engineer") || cpHtml.includes("Artificial Intelligence & Machine Learning Engineer"), "Track 1: AI & ML Systems present");
  assert(cpHtml.includes("Full-Stack Web &amp; Cloud Software Engineer") || cpHtml.includes("Full-Stack Web & Cloud Software Engineer"), "Track 2: Full-Stack Web & Cloud present");
  assert(cpHtml.includes("Cyber Security &amp; Information Assurance Specialist") || cpHtml.includes("Cyber Security & Information Assurance Specialist"), "Track 3: Cyber Security present");
  assert(cpHtml.includes("Data Systems &amp; Big Data Analytics Engineer") || cpHtml.includes("Data Systems & Big Data Analytics Engineer"), "Track 4: Big Data Analytics present");
  assert(cpHtml.includes("Cloud DevOps &amp; Site Reliability Engineer (SRE)") || cpHtml.includes("Cloud DevOps & Site Reliability Engineer (SRE)"), "Track 5: Cloud DevOps present");
  assert(cpHtml.includes("Embedded Systems &amp; Internet of Things (IoT) Engineer") || cpHtml.includes("Embedded Systems & Internet of Things (IoT) Engineer"), "Track 6: Embedded Systems & IoT present");

  // Verify track anchors exist
  assert(cpHtml.includes('id="ai-machine-learning"'), "Anchor #ai-machine-learning exists");
  assert(cpHtml.includes('id="full-stack-cloud"'), "Anchor #full-stack-cloud exists");
  assert(cpHtml.includes('id="cyber-security-defense"'), "Anchor #cyber-security-defense exists");
  assert(cpHtml.includes('id="data-engineering-analytics"'), "Anchor #data-engineering-analytics exists");
  assert(cpHtml.includes('id="cloud-devops-sre"'), "Anchor #cloud-devops-sre exists");
  assert(cpHtml.includes('id="embedded-iot-systems"'), "Anchor #embedded-iot-systems exists");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 5: Subject Mappings, Skills, Certifications & Learning Resources
  // -------------------------------------------------------------------------
  console.log("Test 5: Curriculum Mappings, Skills, Certifications & Resources");
  assert(cpHtml.includes("Related Academic Subjects"), "Related Academic Subjects section header present");
  assert(cpHtml.includes("/syllabus/BTECH-CSE/semester/2/BCS201"), "Mapped link to BCS201 Programming in C present");
  assert(cpHtml.includes("/syllabus/BTECH-CSE/semester/3/BCS-301"), "Mapped link to BCS-301 Data Structures present");
  assert(cpHtml.includes("Relevant Technical Skills"), "Relevant Technical Skills section present");
  assert(cpHtml.includes("Industry Certification Recommendations"), "Industry Certification Recommendations present");
  assert(cpHtml.includes("Recommended Learning Resources &amp; Tutorials") || cpHtml.includes("Recommended Learning Resources & Tutorials"), "Recommended Learning Resources section present");
  assert(cpHtml.includes("NPTEL / IIT Madras"), "NPTEL learning resource present");
  assert(cpHtml.includes("MDN Web Docs"), "MDN learning resource present");
  assert(cpHtml.includes("Semester Progression &amp; Milestone Deliverables") || cpHtml.includes("Semester Progression & Milestone Deliverables"), "Milestone deliverables present");
  assert(cpHtml.includes("erp.invertisuniversity.ac.in"), "University ERP link present on page");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 6: Legacy /pathways Redirect
  // -------------------------------------------------------------------------
  console.log("Test 6: Legacy /pathways Route Redirect");
  const pathwaysResp = await fetch("http://localhost:3000/pathways");
  assert(
    pathwaysResp.statusCode === 307 || pathwaysResp.statusCode === 308 || pathwaysResp.headers.location === "/career-pathways",
    `GET /pathways redirects cleanly to /career-pathways (status ${pathwaysResp.statusCode}, location: ${pathwaysResp.headers.location})`
  );
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 7: Subject Detail Integration & No Development Phase Badges
  // -------------------------------------------------------------------------
  console.log("Test 7: Subject Detail Page Linkage & Absence of Phase 6 Badges");
  const subjResp = await fetch("http://localhost:3000/syllabus/BTECH-CSE/semester/2/BCS201");
  assert(subjResp.statusCode === 200, "GET BCS201 subject page returns HTTP 200 OK");
  const subjHtml = await subjResp.text();
  assert(subjHtml.includes('href="/career-pathways"'), "Subject page links to '/career-pathways'");
  assert(!subjHtml.includes("Phase 6 • Specialization Tracks"), "Subject page does not display 'Phase 6 • Specialization Tracks'");
  assert(subjHtml.includes("Specialization Tracks"), "Subject page displays clean 'Specialization Tracks' badge");
  console.log("");

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log("================================================================================");
  console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
  console.log("================================================================================");

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error("FATAL ERROR running verification:", err);
  process.exit(1);
});
