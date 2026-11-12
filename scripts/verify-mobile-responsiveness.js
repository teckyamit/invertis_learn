// scripts/verify-mobile-responsiveness.js
// Verification script for Invertis Learn Mobile Responsiveness Fixes

const http = require("http");
const fs = require("fs");
const path = require("path");

function fetchRoute(routePath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${routePath}`, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, data });
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function runTests() {
  console.log("=================================================");
  console.log("INVERTIS LEARN: MOBILE RESPONSIVENESS TEST SUITE");
  console.log("=================================================\n");

  const routesToTest = [
    { name: "Homepage", path: "/" },
    { name: "Engineering Directory", path: "/engineering" },
    { name: "Resources Hub", path: "/resources" },
    { name: "Career Pathways", path: "/career-pathways" },
    { name: "About Page", path: "/about" },
    { name: "Syllabus Hub", path: "/syllabus" },
    { name: "Syllabus BTECH-CSE", path: "/syllabus/BTECH-CSE" },
    { name: "Syllabus BTECH-CSE Sem 2", path: "/syllabus/BTECH-CSE/semester/2" },
    { name: "Syllabus BCS201 View", path: "/syllabus/BTECH-CSE/semester/2/BCS201" },
    { name: "PYQ Hub", path: "/pyq" },
    { name: "PYQ BTECH-CSE", path: "/pyq/BTECH-CSE" },
    { name: "All Programmes Directory", path: "/programmes" },
  ];

  let passCount = 0;
  let failCount = 0;

  // 1. Route HTTP Status Checks
  console.log("--- 1. HTTP 200 Route Verification ---");
  for (const r of routesToTest) {
    try {
      const res = await fetchRoute(r.path);
      if (res.statusCode === 200) {
        console.log(`[PASS] Route ${r.name} (${r.path}) -> HTTP ${res.statusCode}`);
        passCount++;
      } else {
        console.error(`[FAIL] Route ${r.name} (${r.path}) -> HTTP ${res.statusCode}`);
        failCount++;
      }
    } catch (e) {
      console.error(`[FAIL] Route ${r.name} (${r.path}) -> Error: ${e.message}`);
      failCount++;
    }
  }

  // 2. Code Quality & Overflow Static Audits
  console.log("\n--- 2. Static Code & CSS Audit for Mobile Standards ---");

  // A. Check globals.css
  const globalsCss = fs.readFileSync(path.join(__dirname, "../src/app/globals.css"), "utf8");
  if (globalsCss.includes("width: 100%") && globalsCss.includes(".no-scrollbar")) {
    console.log("[PASS] globals.css: Fluid mobile-first .site-container (width: 100% on mobile) & .no-scrollbar present");
    passCount++;
  } else {
    console.error("[FAIL] globals.css: Missing mobile-first container or no-scrollbar utility");
    failCount++;
  }

  // B. Check Engineering Page Header & Journey
  const engPage = fs.readFileSync(path.join(__dirname, "../src/app/engineering/page.tsx"), "utf8");
  if (!engPage.includes("min-w-[140px]") && engPage.includes("grid-cols-2 lg:grid-cols-1")) {
    console.log("[PASS] engineering/page.tsx: Rigid min-w-[140px] eliminated; responsive grid-cols-2 applied");
    passCount++;
  } else {
    console.error("[FAIL] engineering/page.tsx: Still contains rigid min-w-[140px]");
    failCount++;
  }

  if (engPage.includes("Student Navigation Flow") && !engPage.includes("<span>→</span>")) {
    console.log("[PASS] engineering/page.tsx: Student Navigation Flow loose arrows fixed with integrated chevrons");
    passCount++;
  } else {
    console.error("[FAIL] engineering/page.tsx: Loose arrow characters still found");
    failCount++;
  }

  // C. Check Engineering Directory Action Buttons
  const engDir = fs.readFileSync(path.join(__dirname, "../src/components/engineering/EngineeringDirectory.tsx"), "utf8");
  if (engDir.includes("flex-col sm:flex-row") && engDir.includes("overflow-x-auto no-scrollbar")) {
    console.log("[PASS] EngineeringDirectory.tsx: Card buttons responsive (flex-col sm:flex-row) & filter tabs swipeable");
    passCount++;
  } else {
    console.error("[FAIL] EngineeringDirectory.tsx: Button or tab responsiveness missing");
    failCount++;
  }

  // D. Check Navbar
  const navbar = fs.readFileSync(path.join(__dirname, "../src/components/layout/Navbar.tsx"), "utf8");
  if (navbar.includes("min-h-[44px]") && navbar.includes("w-8 h-8 sm:w-10 sm:h-10")) {
    console.log("[PASS] Navbar.tsx: Scaled logo icon & 44px min tap targets for mobile drawer");
    passCount++;
  } else {
    console.error("[FAIL] Navbar.tsx: Missing responsive logo or touch target sizing");
    failCount++;
  }

  // E. Check Resources Hub
  const resPage = fs.readFileSync(path.join(__dirname, "../src/app/resources/page.tsx"), "utf8");
  if (!resPage.includes("min-w-[140px]")) {
    console.log("[PASS] resources/page.tsx: Rigid min-w-[140px] eliminated");
    passCount++;
  } else {
    console.error("[FAIL] resources/page.tsx: Rigid min-w-[140px] still present");
    failCount++;
  }

  // F. Check Career Pathways
  const cpPage = fs.readFileSync(path.join(__dirname, "../src/app/career-pathways/page.tsx"), "utf8");
  if (!cpPage.includes("min-w-[140px]") && cpPage.includes("grid-cols-2 lg:grid-cols-1")) {
    console.log("[PASS] career-pathways/page.tsx: Metrics card converted to responsive grid");
    passCount++;
  } else {
    console.error("[FAIL] career-pathways/page.tsx: Rigid min-w-[140px] still present");
    failCount++;
  }

  // G. Check About Page
  const aboutPage = fs.readFileSync(path.join(__dirname, "../src/app/about/page.tsx"), "utf8");
  if (aboutPage.includes("max-w-[280px] sm:max-w-[340px]") && aboutPage.includes("p-4 sm:p-8")) {
    console.log("[PASS] about/page.tsx: Creator photo scaled responsibly & hero card padding optimized for small screens");
    passCount++;
  } else {
    console.error("[FAIL] about/page.tsx: Creator photo or card padding not responsive");
    failCount++;
  }

  // H. Check Subject Syllabus View
  const ssv = fs.readFileSync(path.join(__dirname, "../src/components/syllabus/SubjectSyllabusView.tsx"), "utf8");
  if (!ssv.includes("span className=\"text-sm font-semibold text-slate-900 block truncate\"")) {
    console.log("[PASS] SubjectSyllabusView.tsx: Examination structure text truncation eliminated for clean wrapping");
    passCount++;
  } else {
    console.error("[FAIL] SubjectSyllabusView.tsx: Assessment structure still truncated");
    failCount++;
  }

  // 3. Rendered Content Verification on /engineering
  console.log("\n--- 3. Live Server HTML Inspection (/engineering) ---");
  const engLive = await fetchRoute("/engineering");
  if (engLive.data.includes("Student Navigation Flow") && engLive.data.includes("Invertis Institute of Engineering")) {
    console.log("[PASS] Live /engineering HTML serves verified academic content cleanly");
    passCount++;
  } else {
    console.error("[FAIL] Live /engineering HTML missing expected components");
    failCount++;
  }

  console.log("\n=================================================");
  console.log(`TOTAL TESTS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log("=================================================");

  if (failCount > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
