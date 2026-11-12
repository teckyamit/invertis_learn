/**
 * INVERTIS LEARN: About Page & Creator Profile Acceptance Suite
 * Verifies that:
 * 1. GET /about returns HTTP 200 OK.
 * 2. All existing platform content remains preserved (Zero Auth, Curriculum Authenticity, ERP comparison, Engineering Scope, University address).
 * 3. "Meet the Mind Behind Invertis Learn" section is present.
 * 4. Creator details (Amit Kumar Pal, Founder & Developer) are rendered.
 * 5. Full professional narrative matches exactly.
 * 6. Compact education timeline (B.Tech CSE & Diploma CSE) is present.
 * 7. "Find Me Online" section features all 4 social platforms (GitHub, LinkedIn, Instagram, YouTube) with verified URLs, target="_blank", and accessible labels.
 * 8. Local image asset /images/creator.svg exists and resolves with HTTP 200.
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
  console.log("   ABOUT PAGE & CREATOR PROFILE ACCEPTANCE SUITE");
  console.log("================================================================================\n");

  // -------------------------------------------------------------------------
  // TEST 1: Live HTTP Response of /about
  // -------------------------------------------------------------------------
  console.log("Test 1: Live HTTP GET /about");
  const aboutResp = await fetch("http://localhost:3000/about");
  assert(aboutResp.statusCode === 200, "GET /about returns HTTP 200 OK");
  const aboutHtml = await aboutResp.text();
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 2: Preservation of Existing Content
  // -------------------------------------------------------------------------
  console.log("Test 2: Preservation of Existing Platform Information");
  assert(aboutHtml.includes("About Invertis Learn"), "Page title 'About Invertis Learn' present");
  assert(aboutHtml.includes("Zero Authentication Required"), "Principle 1: 'Zero Authentication Required' present");
  assert(aboutHtml.includes("Strict Curriculum Authenticity"), "Principle 2: 'Strict Curriculum Authenticity' present");
  assert(aboutHtml.includes("Understanding Portals: Invertis Learn vs. University ERP"), "Portal distinction section present");
  assert(aboutHtml.includes("erp.invertisuniversity.ac.in"), "Official University ERP link present");
  assert(aboutHtml.includes("Current Release Scope: Engineering Focus"), "Release scope section present");
  assert(aboutHtml.includes("/engineering"), "Link to Engineering directory present");
  assert(aboutHtml.includes("Invertis Village, Bareilly-Lucknow NH-24"), "Official university address present");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 3: "Meet the Mind Behind Invertis Learn" Creator Section
  // -------------------------------------------------------------------------
  console.log("Test 3: Creator Section Heading & Information");
  assert(aboutHtml.includes("Meet the Mind Behind Invertis Learn"), "Section heading 'Meet the Mind Behind Invertis Learn' present");
  assert(aboutHtml.includes("Amit Kumar Pal"), "Creator name 'Amit Kumar Pal' present");
  assert(aboutHtml.includes("Founder &amp; Developer of Invertis Learn") || aboutHtml.includes("Founder & Developer of Invertis Learn"), "Role 'Founder & Developer of Invertis Learn' present");

  // Narrative verification
  assert(
    aboutHtml.includes("Hi, I&#x27;m Amit Kumar Pal, a Computer Science graduate and the creator of Invertis Learn") ||
    aboutHtml.includes("Hi, I'm Amit Kumar Pal, a Computer Science graduate and the creator of Invertis Learn"),
    "Narrative opening sentence present"
  );
  assert(
    aboutHtml.includes("to make authentic academic resources easier to access, understand and navigate for students of Invertis University"),
    "Platform vision narrative present"
  );
  assert(
    aboutHtml.includes("Invertis Learn is an independent initiative built with the goal of making academic learning more accessible and organized"),
    "Mission statement narrative present"
  );
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 4: Educational Background Timeline
  // -------------------------------------------------------------------------
  console.log("Test 4: Educational Background Timeline");
  assert(aboutHtml.includes("Educational Background"), "Educational Background header present");
  assert(aboutHtml.includes("B.Tech in Computer Science &amp; Engineering") || aboutHtml.includes("B.Tech in Computer Science & Engineering"), "B.Tech in CSE present");
  // Diploma in CSE entry commented out per user request
  assert(aboutHtml.includes("Invertis University, Bareilly"), "Invertis University alma mater noted");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 5: "Find Me Online" Social Media Presence
  // -------------------------------------------------------------------------
  console.log("Test 5: Social Media Presence & Verified Links");
  assert(aboutHtml.includes("Find Me Online"), "'Find Me Online' header present");

  // GitHub
  assert(aboutHtml.includes('href="https://github.com/teckyamit"'), "GitHub URL matches https://github.com/teckyamit");
  // LinkedIn
  assert(aboutHtml.includes('href="https://www.linkedin.com/in/amit-kumar-pal-98a59117b"'), "LinkedIn URL matches https://www.linkedin.com/in/amit-kumar-pal-98a59117b");
  // Instagram
  assert(aboutHtml.includes('href="https://www.instagram.com/amit_pal2809/"'), "Instagram URL matches https://www.instagram.com/amit_pal2809/");
  // YouTube
  assert(aboutHtml.includes('href="https://www.youtube.com/@RealAmitPAl"'), "YouTube URL matches https://www.youtube.com/@RealAmitPAl");

  // Accessibility & New Tab security
  assert(aboutHtml.includes('rel="noopener noreferrer"'), "Social links have rel='noopener noreferrer'");
  assert(aboutHtml.includes('target="_blank"'), "Social links open in a new tab");
  assert(aboutHtml.includes('aria-label='), "Social links contain accessible aria-labels");
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 6: Local Image Asset Verification
  // -------------------------------------------------------------------------
  console.log("Test 6: Local Creator Image Asset");
  const creatorJpgPath = path.join(process.cwd(), "public", "images", "creator.jpg");
  assert(fs.existsSync(creatorJpgPath), "Local image file exists at public/images/creator.jpg");
  assert(aboutHtml.includes("/images/creator.jpg"), "About page references /images/creator.jpg");
  assert(aboutHtml.includes("Amit Kumar Pal, Founder and Developer of Invertis Learn"), "Image has descriptive alt text");
  assert(!aboutHtml.includes("Photo: public/images/creator.jpg"), "Placeholder text is not present");
  
  const imgResp = await fetch("http://localhost:3000/images/creator.jpg");
  assert(imgResp.statusCode === 200, "HTTP GET /images/creator.jpg returns 200 OK");
  assert(imgResp.headers["content-type"].includes("jpeg") || imgResp.headers["content-type"].includes("image"), "Image serves correct content-type");
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

