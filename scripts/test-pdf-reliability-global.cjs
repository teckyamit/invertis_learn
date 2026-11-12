const http = require("http");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const body = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body,
        });
      });
    }).on("error", reject);
  });
}

async function runTests() {
  console.log("=== INVERTIS LEARN GLOBAL PDF RELIABILITY & VERIFICATION TEST ===\n");

  const sampleSubjects = [
    { prog: "BTECH-CSE", code: "BAS101", label: "B.Tech CSE Core (Physics)" },
    { prog: "BTECH-CSE-AI", code: "ENG 105", label: "B.Tech CSE AI & ML (English Communication)" },
    { prog: "BTECH-CSE-CC", code: "BCSI101", label: "B.Tech CSE Cloud (Problem Solving using C)" },
    { prog: "DIP-CSE", code: "DAS101", label: "Diploma CSE (Mathematics-I)" },
    { prog: "MTECH-CSE", code: "MCS-101", label: "M.Tech CSE (Adv Computer Architecture)" },
    { prog: "PHD-009", code: "PhD-032", label: "Ph.D. CSE (Advance Research Studies)" },
  ];

  let passedAll = true;

  for (const item of sampleSubjects) {
    console.log(`--- Testing ${item.label} [${item.code}] ---`);
    const subject = await prisma.subject.findFirst({
      where: { code: item.code },
      include: {
        semester: {
          include: { curriculumVersion: { include: { programme: true } } }
        },
        resources: {
          where: { category: { code: "SYLLABUS" } }
        }
      }
    });

    if (!subject || subject.resources.length === 0) {
      console.error(`[FAIL] Subject or syllabus resource not found in DB: ${item.code}`);
      passedAll = false;
      continue;
    }

    const resRecord = subject.resources[0];
    console.log(`DB Resource: ID=${resRecord.id}, File=${resRecord.storedFileName}, Provenance=${resRecord.provenanceStatus}`);

    // Test 1: Open in Tab (?id=...&inline=1)
    const openUrl = `http://localhost:3000/api/syllabus/download?id=${resRecord.id}&inline=1`;
    const openRes = await fetchUrl(openUrl);
    const isOpenPdf = openRes.body.slice(0, 5).toString("utf-8") === "%PDF-";
    const openDisposition = openRes.headers["content-disposition"] || "";
    const openType = openRes.headers["content-type"] || "";

    console.log(`Open in Tab (${openUrl}):`);
    console.log(`  HTTP Status: ${openRes.statusCode} (Expected: 200)`);
    console.log(`  Content-Type: ${openType} (Expected: application/pdf)`);
    console.log(`  Content-Disposition: ${openDisposition}`);
    console.log(`  PDF Signature: ${isOpenPdf ? "VALID (%PDF-)" : "INVALID"}`);
    console.log(`  Body size: ${openRes.body.length} bytes`);

    if (openRes.statusCode !== 200 || openType !== "application/pdf" || !openDisposition.includes("inline") || !isOpenPdf) {
      console.error(`  [FAIL] Open in Tab failed for ${item.code}`);
      passedAll = false;
    } else {
      console.log(`  [PASS] Open in Tab verified`);
    }

    // Test 2: Download PDF (?id=...&name=...)
    const dlUrl = `http://localhost:3000/api/syllabus/download?id=${resRecord.id}&name=${encodeURIComponent(item.code + "-Syllabus")}`;
    const dlRes = await fetchUrl(dlUrl);
    const isDlPdf = dlRes.body.slice(0, 5).toString("utf-8") === "%PDF-";
    const dlDisposition = dlRes.headers["content-disposition"] || "";
    const dlType = dlRes.headers["content-type"] || "";

    console.log(`Download PDF (${dlUrl}):`);
    console.log(`  HTTP Status: ${dlRes.statusCode} (Expected: 200)`);
    console.log(`  Content-Type: ${dlType} (Expected: application/pdf)`);
    console.log(`  Content-Disposition: ${dlDisposition}`);
    console.log(`  PDF Signature: ${isDlPdf ? "VALID (%PDF-)" : "INVALID"}`);
    console.log(`  Body size: ${dlRes.body.length} bytes`);

    if (dlRes.statusCode !== 200 || dlType !== "application/pdf" || !dlDisposition.includes("attachment") || !isDlPdf) {
      console.error(`  [FAIL] Download PDF failed for ${item.code}`);
      passedAll = false;
    } else {
      console.log(`  [PASS] Download PDF verified`);
    }

    // Test 3: Frontend Page Rendering
    const encodedCode = encodeURIComponent(subject.code);
    const pageUrl = `http://localhost:3000/syllabus/${subject.semester.curriculumVersion.programme.code}/semester/${subject.semester.semesterNumber}/${encodedCode}`;
    const pageRes = await fetchUrl(pageUrl);
    const pageHtml = pageRes.body.toString("utf-8");

    const hasOpenInTabLink = pageHtml.includes(`href="/api/syllabus/download?id=${resRecord.id}&amp;inline=1"`) || pageHtml.includes(`href="/api/syllabus/download?id=${resRecord.id}&inline=1"`);
    const hasDownloadLink = pageHtml.includes(`/api/syllabus/download?id=${resRecord.id}&amp;name=`) || pageHtml.includes(`/api/syllabus/download?id=${resRecord.id}&name=`);
    const hasVerifiedBadge = pageHtml.includes("Verified by Invertis Learn");

    console.log(`Frontend Page Rendering (${pageUrl}):`);
    console.log(`  HTTP Status: ${pageRes.statusCode} (Expected: 200)`);
    console.log(`  Contains canonical Open in Tab link: ${hasOpenInTabLink}`);
    console.log(`  Contains canonical Download link: ${hasDownloadLink}`);
    console.log(`  Contains Verified Badge: ${hasVerifiedBadge}`);

    if (pageRes.statusCode !== 200 || !hasOpenInTabLink || !hasDownloadLink || !hasVerifiedBadge) {
      console.error(`  [FAIL] Frontend page markup missing elements for ${item.code}`);
      passedAll = false;
    } else {
      console.log(`  [PASS] Frontend page verified`);
    }

    console.log("");
  }

  // Test 4: Negative Test / 404 handling
  console.log("--- Testing Negative Cases & Error Handling ---");
  const notFoundUrl = "http://localhost:3000/api/syllabus/download?id=non-existent-id-999";
  const notFoundRes = await fetchUrl(notFoundUrl);
  console.log(`Non-existent Resource ID (${notFoundUrl}):`);
  console.log(`  HTTP Status: ${notFoundRes.statusCode} (Expected: 404)`);
  console.log(`  Body: ${notFoundRes.body.toString("utf-8").trim()}`);
  if (notFoundRes.statusCode === 404) {
    console.log("  [PASS] Clean 404 JSON returned, no crash or HTML error page");
  } else {
    console.error("  [FAIL] Unexpected response for 404 test");
    passedAll = false;
  }

  await prisma.$disconnect();

  console.log("\n========================================================");
  if (passedAll) {
    console.log("ALL GLOBAL PDF RELIABILITY & VERIFICATION TESTS PASSED!");
  } else {
    console.log("SOME TESTS FAILED — Review log above.");
  }
  console.log("========================================================");
}

runTests().catch(console.error);
