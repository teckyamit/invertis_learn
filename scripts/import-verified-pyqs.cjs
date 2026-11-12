const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importPyqs() {
  console.log("=== INGESTING VERIFIED CSE PREVIOUS YEAR QUESTION PAPERS ===\n");

  const classData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../storage/pyq-classification-full.json"), "utf-8")
  );
  const dupData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../storage/pyq-duplicates.json"), "utf-8")
  );

  const duplicateFiles = new Set(dupData.map(d => d.duplicate.file));

  // Get PYQ Category
  let pyqCategory = await prisma.resourceCategory.findUnique({ where: { code: "PYQ" } });
  if (!pyqCategory) {
    pyqCategory = await prisma.resourceCategory.create({
      data: {
        code: "PYQ",
        name: "Previous-Year Paper",
        description: "Official previous-year examination papers"
      }
    });
  }

  const publicDest = path.resolve(__dirname, "../public/uploads/pyq");
  const storageDest = path.resolve(__dirname, "../storage/uploads/pyq");

  if (!fs.existsSync(publicDest)) fs.mkdirSync(publicDest, { recursive: true });
  if (!fs.existsSync(storageDest)) fs.mkdirSync(storageDest, { recursive: true });

  const verifiedItems = classData.classified.filter(
    c => (c.status === "MATCHED" || c.status === "SHARED_CSE") && !duplicateFiles.has(c.file)
  );

  console.log(`Processing ${verifiedItems.length} unique verified CSE question papers...`);

  let importedFiles = 0;
  let importedResourceLinks = 0;
  const courseCounts = {};

  for (const item of verifiedItems) {
    const rawCodes = item.matchedSubjects.map(s => s.subjectCode.replace(/[^A-Za-z0-9]/g, "")).sort();
    const uniqueCodes = Array.from(new Set(rawCodes));
    const sessionClean = (item.detectedSession || "2024-2025").replace(/[^0-9\-]/g, "").replace("-", "_");
    const typeClean = item.detectedExamType === "MID_SEMESTER" ? "MidSem" : "EndSem";

    // Clean, canonical stored filename
    const storedFileName = `${uniqueCodes.join("_")}_${typeClean}_${sessionClean}.pdf`;
    const targetPublic = path.join(publicDest, storedFileName);
    const targetStorage = path.join(storageDest, storedFileName);

    // Copy physical file to both storage roots (if not already there or different size)
    const srcBuf = fs.readFileSync(item.file);
    fs.writeFileSync(targetPublic, srcBuf);
    fs.writeFileSync(targetStorage, srcBuf);
    importedFiles++;

    // Create / update AcademicResource for each matched subject
    for (const sub of item.matchedSubjects) {
      const progKey = `${sub.programmeCode} (Sem ${sub.semesterNumber})`;
      courseCounts[progKey] = (courseCounts[progKey] || 0) + 1;

      const title = `${sub.subjectCode} - ${sub.subjectName} End-Semester Examination ${item.detectedSession || "2024-25"}`;

      // Upsert resource record
      const existing = await prisma.academicResource.findFirst({
        where: {
          subjectId: sub.subjectId,
          categoryId: pyqCategory.id,
          storedFileName: storedFileName
        }
      });

      const resourceData = {
        subjectId: sub.subjectId,
        categoryId: pyqCategory.id,
        title,
        originalFileName: item.filename,
        storedFileName,
        storagePath: `uploads/pyq/${storedFileName}`,
        mimeType: "application/pdf",
        fileSizeBytes: srcBuf.length,
        versionNumber: 1,
        academicYear: item.detectedSession || "2024-2025",
        examType: item.detectedExamType || "END_SEMESTER",
        hasSolutions: false,
        isPublished: true,
        provenanceStatus: "VERIFIED",
        sourceReference: "Invertis University Faculty of Engineering & Technology (FOET) Examination Archive 2024-25"
      };

      if (existing) {
        await prisma.academicResource.update({
          where: { id: existing.id },
          data: resourceData
        });
      } else {
        await prisma.academicResource.create({
          data: resourceData
        });
      }

      importedResourceLinks++;
    }
  }

  console.log("\n=== INGESTION COMPLETE ===");
  console.log(`Unique PDF files copied:       ${importedFiles}`);
  console.log(`AcademicResource records created: ${importedResourceLinks}`);
  console.log("\nCourse & Semester Breakdown:");
  Object.keys(courseCounts).sort().forEach(k => {
    console.log(`  • ${k}: ${courseCounts[k]} question papers`);
  });
  console.log("==========================\n");

  await prisma.$disconnect();
}

importPyqs().catch(console.error);

