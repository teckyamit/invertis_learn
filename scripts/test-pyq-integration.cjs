const http = require("http");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    http.get(url, { headers }, (res) => {
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
  console.log("================================================================================");
  console.log("            INVERTIS LEARN — CSE PYQ INTEGRATION & INTEGRITY TEST               ");
  console.log("================================================================================\n");

  const pyqCategory = await prisma.resourceCategory.findUnique({ where: { code: "PYQ" } });
  if (!pyqCategory) throw new Error("PYQ category not found in DB");

  const pyqs = await prisma.academicResource.findMany({
    where: { categoryId: pyqCategory.id },
    include: {
      subject: {
        include: {
          semester: {
            include: { curriculumVersion: { include: { programme: true } } }
          }
        }
      }
    }
  });

  console.log(`[DATABASE AUDIT] Found ${pyqs.length} total PYQ records in database.`);

  let allFilesExist = true;
  let allMagicBytesValid = true;

  // 1. File verification on disk (public and storage mirrors)
  for (const pyq of pyqs) {
    const pubPath = path.resolve(__dirname, "../public", pyq.storagePath);
    const storPath = path.resolve(__dirname, "../storage", pyq.storagePath);

    const pubExists = fs.existsSync(pubPath);
    const storExists = fs.existsSync(storPath);

    if (!pubExists && !storExists) {
      console.error(`  [FAIL] Missing file: ${pyq.storagePath}`);
      allFilesExist = false;
      continue;
    }

    const checkFile = pubExists ? pubPath : storPath;
    const stat = fs.statSync(checkFile);
    if (stat.size !== pyq.fileSizeBytes) {
      console.error(`  [FAIL] File size mismatch for ${pyq.storedFileName}: disk=${stat.size}, db=${pyq.fileSizeBytes}`);
      allFilesExist = false;
    }

    const header = Buffer.alloc(5);
    const fd = fs.openSync(checkFile, "r");
    fs.readSync(fd, header, 0, 5, 0);
    fs.closeSync(fd);

    if (header.toString("utf-8") !== "%PDF-") {
      console.error(`  [FAIL] Invalid PDF magic bytes for ${pyq.storedFileName}`);
      allMagicBytesValid = false;
    }
  }

  if (allFilesExist && allMagicBytesValid) {
    console.log(`  [PASS] 100% of ${pyqs.length} PYQ PDF files are physically verified on disk with valid %PDF- headers.`);
  }

  // 2. HTTP Route Testing for representative subjects from each CSE course
  const sampleCodes = [
    { prog: "BTECH-CSE", code: "BCS-401", sem: 4 },
    { prog: "BTECH-CSE-AI", code: "BCSAI 401", sem: 4 },
    { prog: "BTECH-CSE-CC", code: "BCSI404", sem: 4 },
    { prog: "DIP-CSE", code: "DCS401", sem: 4 },
    { prog: "MTECH-CSE", code: "MCS-202", sem: 2 }
  ];

  console.log("\n[HTTP ROUTE AUDIT] Probing endpoints for representative CSE programmes...");
  let passedHttp = true;

  for (const item of sampleCodes) {
    const sub = await prisma.subject.findFirst({
      where: {
        code: item.code,
        semester: {
          semesterNumber: item.sem,
          curriculumVersion: { programme: { code: item.prog } }
        }
      },
      include: {
        resources: {
          where: { categoryId: pyqCategory.id }
        }
      }
    });

    if (!sub || sub.resources.length === 0) {
      console.error(`  [FAIL] No PYQs found for sample subject ${item.prog} [${item.code}]`);
      passedHttp = false;
      continue;
    }

    const samplePyq = sub.resources[0];
    console.log(`\n• Programme: [${item.prog}] | Subject: ${item.code} | PYQ: ${samplePyq.storedFileName}`);

    // Test Open in Tab (inline)
    const openUrl = `http://127.0.0.1:3000/api/pyq/download?file=${encodeURIComponent(samplePyq.storedFileName)}&name=${encodeURIComponent(samplePyq.title)}&inline=1`;
    try {
      const openRes = await fetchUrl(openUrl);
      const isPdf = openRes.body.slice(0, 5).toString("utf-8") === "%PDF-";
      const disp = openRes.headers["content-disposition"] || "";
      const type = openRes.headers["content-type"] || "";

      if (openRes.statusCode === 200 && isPdf && type === "application/pdf" && disp.includes("inline")) {
        console.log(`  ✓ View PDF route: 200 OK, application/pdf, inline disposition (${openRes.body.length} bytes)`);
      } else {
        console.error(`  ✗ View PDF failed: status=${openRes.statusCode}, type=${type}, disp=${disp}`);
        passedHttp = false;
      }
    } catch (e) {
      console.error(`  ✗ HTTP request error: ${e.message}`);
      passedHttp = false;
    }

    // Test Download (attachment)
    const dlUrl = `http://127.0.0.1:3000/api/pyq/download?file=${encodeURIComponent(samplePyq.storedFileName)}&name=${encodeURIComponent(samplePyq.title)}`;
    try {
      const dlRes = await fetchUrl(dlUrl);
      const isPdf = dlRes.body.slice(0, 5).toString("utf-8") === "%PDF-";
      const disp = dlRes.headers["content-disposition"] || "";

      if (dlRes.statusCode === 200 && isPdf && disp.includes("attachment")) {
        console.log(`  ✓ Download PDF route: 200 OK, application/pdf, attachment disposition (${dlRes.body.length} bytes)`);
      } else {
        console.error(`  ✗ Download PDF failed: status=${dlRes.statusCode}`);
        passedHttp = false;
      }
    } catch (e) {
      console.error(`  ✗ HTTP request error: ${e.message}`);
      passedHttp = false;
    }

    // Test HTTP Byte-Range request (RFC 7233)
    try {
      const rangeRes = await fetchUrl(openUrl, { Range: "bytes=0-4" });
      const partialPdf = rangeRes.body.toString("utf-8");
      if (rangeRes.statusCode === 206 && partialPdf === "%PDF-" && rangeRes.headers["content-range"]) {
        console.log(`  ✓ HTTP Byte Range route: 206 Partial Content, Content-Range: ${rangeRes.headers["content-range"]}`);
      } else {
        console.error(`  ✗ Range request failed: status=${rangeRes.statusCode}, body=${partialPdf}`);
        passedHttp = false;
      }
    } catch (e) {
      console.error(`  ✗ Range request error: ${e.message}`);
      passedHttp = false;
    }

    // Test Subject Syllabus Page rendering
    const pageUrl = `http://127.0.0.1:3000/syllabus/${encodeURIComponent(item.prog)}/semester/${item.sem}/${encodeURIComponent(item.code)}`;
    try {
      const pageRes = await fetchUrl(pageUrl);
      if (pageRes.statusCode === 200) {
        console.log(`  ✓ Syllabus page render: 200 OK (/syllabus/${item.prog}/semester/${item.sem}/${item.code})`);
      } else {
        console.error(`  ✗ Syllabus page failed: status=${pageRes.statusCode}`);
        passedHttp = false;
      }
    } catch (e) {
      console.error(`  ✗ Page request error: ${e.message}`);
      passedHttp = false;
    }
  }

  await prisma.$disconnect();

  console.log("\n================================================================================");
  if (allFilesExist && allMagicBytesValid && passedHttp) {
    console.log("  >>> ALL INTEGRATION, STORAGE, STREAMING, AND UI AUDITS PASSED 100% <<<        ");
  } else {
    console.log("  >>> SOME AUDIT CHECKS FAILED. See output above. <<<                           ");
  }
  console.log("================================================================================\n");

  if (!allFilesExist || !allMagicBytesValid || !passedHttp) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
