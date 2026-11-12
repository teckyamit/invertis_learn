const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { PDFParse } = require("pdf-parse");

const prisma = new PrismaClient();

function getFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(fullPath, files);
    } else if (item.isFile() && item.name.toLowerCase().endsWith(".pdf")) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeCode(code) {
  if (!code) return "";
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function normalizeText(text) {
  if (!text) return "";
  return text.toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ").trim();
}

function romanToNumber(roman) {
  if (!roman) return null;
  const r = roman.trim().toUpperCase();
  const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
  return map[r] || null;
}

async function parsePdfHeader(filePath) {
  try {
    const buffer = new Uint8Array(fs.readFileSync(filePath));
    const parser = new PDFParse(buffer);
    const result = await parser.getText();
    const pageText = result.pages && result.pages[0] ? result.pages[0].text : "";
    const lines = pageText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    let session = null;
    let examType = "END_SEMESTER";
    let courseText = "";
    let semesterNum = null;
    let subjectCode = "";
    let subjectTitle = "";

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Session & Type
      const sessionMatch = line.match(/(EVEN|ODD|SPECIAL|CARRY OVER|MID|END)\s+SEMESTER\s+EXAMINATION\s*[-–—:]*\s*(\d{4}[-–/]\d{2,4})/i)
        || line.match(/EXAMINATION\s*[-–—:]*\s*(\d{4}[-–/]\d{2,4})/i);
      if (sessionMatch && !session) {
        const typeStr = (sessionMatch[1] || "").toUpperCase();
        if (typeStr.includes("MID")) examType = "MID_SEMESTER";
        else if (typeStr.includes("CARRY") || typeStr.includes("BACK") || typeStr.includes("SPECIAL")) examType = "BACK_PAPER";
        else examType = "END_SEMESTER";

        const rawYear = sessionMatch[2] || sessionMatch[1];
        if (rawYear && /\d{4}/.test(rawYear)) {
          if (rawYear.length === 7 && rawYear.includes("-")) {
            const parts = rawYear.split("-");
            session = `${parts[0]}-20${parts[1]}`;
          } else {
            session = rawYear;
          }
        }
      }

      // Course text
      if (!courseText && (line.includes("B. Tech") || line.includes("Diploma") || line.includes("M. Tech") || line.includes("B.Tech") || line.includes("M.Tech"))) {
        courseText = line;
      }

      // Semester
      const semMatch = line.match(/Semester\s*:\s*([IVXLCDM]+|\d+)/i)
        || line.match(/SEM(?:ESTER)?\s*[-:]*\s*([IVXLCDM]+|\d+)/i);
      if (semMatch && !semesterNum) {
        const val = semMatch[1];
        const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 };
        if (/^\d+$/.test(val)) semesterNum = parseInt(val, 10);
        else semesterNum = map[val.toUpperCase()] || null;
      }

      // Subject Code
      const codeMatch = line.match(/SUBJECT\s*CODE\s*:\s*([A-Za-z0-9\/\-_]+(?:\s+[A-Za-z0-9\/\-_]+)*)/i);
      if (codeMatch && !subjectCode) {
        subjectCode = codeMatch[1].trim();
        // Look ahead for subject title
        if (lines[i + 1] && !lines[i + 1].toLowerCase().includes("time:") && !lines[i + 1].toLowerCase().includes("maximum")) {
          subjectTitle = lines[i + 1];
          if (lines[i + 2] && !lines[i + 2].toLowerCase().includes("time:") && !lines[i + 2].toLowerCase().includes("maximum") && !lines[i + 2].toLowerCase().includes("section")) {
            subjectTitle += " " + lines[i + 2];
          }
        }
      }
    }

    return {
      session: session || "2024-2025",
      examType,
      courseText,
      semesterNum,
      subjectCode,
      subjectTitle: subjectTitle.trim(),
      rawPageText: pageText.slice(0, 500)
    };
  } catch (err) {
    return {
      session: "2024-2025",
      examType: "END_SEMESTER",
      courseText: "",
      semesterNum: null,
      subjectCode: "",
      subjectTitle: "",
      rawPageText: "",
      error: err.message
    };
  }
}

async function main() {
  console.log("=== COMPREHENSIVE CLASSIFICATION & MATCHING PIPELINE ===\n");
  const baseDir = path.resolve(__dirname, "../storage/temp_pyq_extract");
  const files = getFiles(baseDir);

  const allDbSubjects = await prisma.subject.findMany({
    include: {
      semester: {
        include: {
          curriculumVersion: {
            include: {
              programme: true
            }
          }
        }
      }
    }
  });

  console.log(`Auditing ${files.length} PDF files against ${allDbSubjects.length} database subjects...`);

  const classified = [];

  for (const file of files) {
    const relPath = path.relative(baseDir, file).replace(/\\/g, "/");
    const filename = path.basename(file);
    const parentFolder = path.basename(path.dirname(file));

    const header = await parsePdfHeader(file);

    // Fallback from filename if code wasn't parsed from text
    let fallbackCode = "";
    let fallbackTitle = "";
    const fnParts = filename.replace(/\.pdf$/i, "").split("-");
    if (fnParts.length >= 2) {
      fallbackCode = fnParts[0].trim();
      fallbackTitle = fnParts.slice(1).join("-").trim();
    } else {
      fallbackCode = filename.replace(/\.pdf$/i, "").trim();
    }

    let folderSem = null;
    const folderSemMatch = parentFolder.match(/(I|II|III|IV|V|VI|VII|VIII)\s*SEM/i);
    if (folderSemMatch) {
      folderSem = romanToNumber(folderSemMatch[1]);
    }

    const effectiveCode = header.subjectCode || fallbackCode;
    const effectiveTitle = header.subjectTitle || fallbackTitle;
    const effectiveSem = header.semesterNum || folderSem;

    // Check branch exclusion flags from folder and text
    const folderHasCE = parentFolder.includes("(CE)");
    const folderHasME = parentFolder.includes("(ME)");
    const folderHasEE = parentFolder.includes("(EE)");
    
    // Explicit CSE signals
    const folderHasCSE = parentFolder.includes("(CSE") 
      || parentFolder.includes("CSE-AI") 
      || parentFolder.includes("CSE-CC");
    const textHasCSE = header.courseText.includes("CSE") 
      || header.courseText.includes("(AI)") 
      || header.courseText.includes("(CC)") 
      || header.courseText.includes("Computer");

    // Split code if slash-separated e.g. BCSAI401/BCSI401
    const codesToTest = effectiveCode.split("/").map(c => c.trim()).filter(Boolean);
    if (!codesToTest.includes(fallbackCode)) {
      codesToTest.push(fallbackCode);
    }

    const matchedSubjects = [];

    // Search against all DB subjects
    for (const codeItem of codesToTest) {
      const norm = normalizeCode(codeItem);
      if (!norm || norm.length < 3) continue;

      for (const sub of allDbSubjects) {
        const subNorm = normalizeCode(sub.code);
        const progCode = sub.semester.curriculumVersion.programme.code;
        const subSem = sub.semester.semesterNumber;

        const isCseProg = ["BTECH-CSE", "BTECH-CSE-AI", "BTECH-CSE-CC", "DIP-CSE", "MTECH-CSE"].includes(progCode);
        if (!isCseProg) continue;

        // Matching logic
        let isMatch = false;
        let matchRule = "";

        // Rule 1: Exact normalized code match
        if (norm === subNorm) {
          isMatch = true;
          matchRule = "EXACT_CODE";
        }

        if (isMatch) {
          // Check if already added
          if (!matchedSubjects.some(m => m.subjectId === sub.id)) {
            matchedSubjects.push({
              subjectId: sub.id,
              subjectCode: sub.code,
              subjectName: sub.name,
              programmeCode: progCode,
              semesterNumber: subSem,
              matchRule,
              semMatch: effectiveSem === subSem
            });
          }
        }
      }
    }

    // Determine status
    let status = "EXCLUDED";
    let statusReason = "";

    if (matchedSubjects.length > 0) {
      if (matchedSubjects.length === 1) {
        status = "MATCHED";
        statusReason = `Matched to ${matchedSubjects[0].programmeCode} Sem ${matchedSubjects[0].semesterNumber} (${matchedSubjects[0].subjectCode})`;
      } else {
        const uniqueProgs = Array.from(new Set(matchedSubjects.map(m => m.programmeCode)));
        status = "SHARED_CSE";
        statusReason = `Shared across ${uniqueProgs.join(", ")} (${matchedSubjects.map(m => m.subjectCode).join(", ")})`;
      }
    } else {
      if (folderHasCE) {
        status = "EXCLUDED";
        statusReason = "Civil Engineering exclusive (DCE/BCE/MCE)";
      } else if (folderHasME) {
        status = "EXCLUDED";
        statusReason = "Mechanical Engineering exclusive (DME/BME)";
      } else if (folderHasEE) {
        status = "EXCLUDED";
        statusReason = "Electrical Engineering exclusive (DEE/BEE/BPE)";
      } else if (folderHasCSE || textHasCSE) {
        status = "NEEDS_MANUAL_REVIEW";
        statusReason = `CSE folder/text detected (${effectiveCode}) but code not in active database curriculum`;
      } else {
        status = "EXCLUDED";
        statusReason = "Non-CSE engineering programme";
      }
    }

    classified.push({
      file,
      relPath,
      filename,
      parentFolder,
      detectedSession: header.session,
      detectedExamType: header.examType,
      detectedCourse: header.courseText || parentFolder,
      detectedSemester: effectiveSem,
      detectedCode: effectiveCode,
      detectedTitle: effectiveTitle,
      matchedSubjects,
      status,
      statusReason,
      fileSize: fs.statSync(file).size
    });
  }

  // Summary counts
  const summary = {
    totalScanned: classified.length,
    matched: classified.filter(c => c.status === "MATCHED").length,
    sharedCse: classified.filter(c => c.status === "SHARED_CSE").length,
    totalCseVerified: classified.filter(c => c.status === "MATCHED" || c.status === "SHARED_CSE").length,
    needsManualReview: classified.filter(c => c.status === "NEEDS_MANUAL_REVIEW").length,
    excluded: classified.filter(c => c.status === "EXCLUDED").length
  };

  console.log("=== CLASSIFICATION SUMMARY ===");
  console.log(`Total PDFs scanned:             ${summary.totalScanned}`);
  console.log(`Matched (Direct 1:1):           ${summary.matched}`);
  console.log(`Shared across CSE Programs:     ${summary.sharedCse}`);
  console.log(`Total Verified CSE Papers:      ${summary.totalCseVerified}`);
  console.log(`Needs Manual Review:            ${summary.needsManualReview}`);
  console.log(`Excluded (Non-CSE):             ${summary.excluded}`);
  console.log("==============================\n");

  fs.writeFileSync(
    path.resolve(__dirname, "../storage/pyq-classification-full.json"),
    JSON.stringify({ summary, classified }, null, 2),
    "utf-8"
  );
  console.log("Full classification written to storage/pyq-classification-full.json");

  await prisma.$disconnect();
}

main().catch(console.error);
