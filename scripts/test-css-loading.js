// scripts/test-css-loading.js
const http = require("http");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({ statusCode: res.statusCode, headers: res.headers, data });
      });
    }).on("error", reject);
  });
}

async function verifyAll() {
  console.log("=================================================");
  console.log("INVERTIS LEARN: FULL SITE CSS VERIFICATION SUITE");
  console.log("=================================================\n");

  const routes = [
    { name: "Homepage", path: "/" },
    { name: "Engineering Directory", path: "/engineering" },
    { name: "Regular Programme (BTECH-CSE)", path: "/programmes/BTECH-CSE" },
    { name: "Unified Lateral (BTECH-CSE?entry=lateral)", path: "/programmes/BTECH-CSE?entry=lateral" },
    { name: "Unified Lateral Syllabus", path: "/syllabus/BTECH-CSE?entry=lateral" },
    { name: "Semester 2 Navigation", path: "/syllabus/BTECH-CSE/semester/2" },
    { name: "Subject Syllabus (BCS201)", path: "/syllabus/BTECH-CSE/semester/2/BCS201" },
    { name: "Academic Resources Hub", path: "/resources" },
    { name: "PYQ Hub", path: "/pyq" },
    { name: "PYQ BTECH-CSE", path: "/pyq/BTECH-CSE" },
    { name: "Career Pathways", path: "/career-pathways" },
    { name: "About Page", path: "/about" },
    { name: "All Programmes Directory", path: "/programmes" }
  ];

  let passCount = 0;
  let failCount = 0;

  for (const route of routes) {
    try {
      const page = await fetchUrl(route.path);
      if (page.statusCode !== 200) {
        console.error(`[FAIL] ${route.name} (${route.path}) -> HTTP ${page.statusCode}`);
        failCount++;
        continue;
      }

      // Check for stylesheet link
      const hasCssLink = page.data.includes("/_next/static/css/");
      // Check for Tailwind/brand design classes
      const hasBrandNavy = page.data.includes("brand-navy") || page.data.includes("#101E3A") || page.data.includes("INVERTIS");
      const hasSiteContainer = page.data.includes("site-container");

      if (hasCssLink && hasBrandNavy && hasSiteContainer) {
        console.log(`[PASS] ${route.name.padEnd(35)} -> HTTP 200 | CSS Linked | Design Tokens Verified`);
        passCount++;
      } else {
        console.error(`[FAIL] ${route.name.padEnd(35)} -> Missing CSS link or tokens (css: ${hasCssLink}, brand: ${hasBrandNavy}, container: ${hasSiteContainer})`);
        failCount++;
      }
    } catch (err) {
      console.error(`[FAIL] ${route.name} (${route.path}) -> Error: ${err.message}`);
      failCount++;
    }
  }

  // Also verify that the active layout.css returns 200 and has the complete design system
  const engPage = await fetchUrl("/engineering");
  const match = /href="(\/_next\/static\/css\/[^"]+)"/.exec(engPage.data);
  if (match) {
    const cssRes = await fetchUrl(match[1]);
    console.log(`\nActive Stylesheet: ${match[1]}`);
    console.log(`HTTP Status: ${cssRes.statusCode}`);
    console.log(`Size: ${cssRes.data.length} bytes`);

    const checks = [
      { name: "Brand Navy (#101E3A)", check: cssRes.data.includes("101e3a") || cssRes.data.includes("101E3A") },
      { name: "Brand Blue (#2563EB)", check: cssRes.data.includes("2563eb") || cssRes.data.includes("2563EB") },
      { name: "Font Heading (Plus Jakarta Sans)", check: cssRes.data.includes("Plus Jakarta Sans") },
      { name: "Font Body (Inter)", check: cssRes.data.includes("Inter") },
      { name: "Site Container (.site-container)", check: cssRes.data.includes("site-container") },
      { name: "Card Hero (.card-hero)", check: cssRes.data.includes("card-hero") },
      { name: "Card Standard (.card-standard)", check: cssRes.data.includes("card-standard") },
      { name: "No Scrollbar (.no-scrollbar)", check: cssRes.data.includes("no-scrollbar") }
    ];

    console.log("\nDesign System Rules in Compiled CSS:");
    for (const c of checks) {
      if (c.check) {
        console.log(`  [PASS] ${c.name}`);
        passCount++;
      } else {
        console.error(`  [FAIL] ${c.name}`);
        failCount++;
      }
    }
  }

  console.log("\n=================================================");
  console.log(`TOTAL CHECKS: ${passCount + failCount}`);
  console.log(`PASSED: ${passCount}`);
  console.log(`FAILED: ${failCount}`);
  console.log("=================================================");

  if (failCount > 0) process.exit(1);
}

verifyAll().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
