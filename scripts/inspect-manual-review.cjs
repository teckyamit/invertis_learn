const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function inspectManual() {
  const classData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../storage/pyq-classification-full.json"), "utf-8")
  );
  const review = classData.classified.filter(c => c.status === "NEEDS_MANUAL_REVIEW");

  console.log(`=== INSPECTING ${review.length} MANUAL REVIEW ITEMS ===\n`);

  for (const item of review) {
    console.log(`--------------------------------------------------`);
    console.log(`File:    ${item.filename}`);
    console.log(`Code:    ${item.detectedCode} | Title: ${item.detectedTitle}`);
    console.log(`Course:  ${item.detectedCourse} | Sem: ${item.detectedSemester}`);

    // Search DB by code, partial code, and name
    const codeCandidates = await prisma.subject.findMany({
      where: {
        OR: [
          { code: { contains: item.detectedCode.replace(/[^A-Za-z0-9]/g, "") } },
          { name: { contains: item.detectedTitle.split(" ")[0] } }
        ]
      },
      include: {
        semester: {
          include: {
            curriculumVersion: {
              include: { programme: true }
            }
          }
        }
      }
    });

    console.log(`Possible DB matches (${codeCandidates.length}):`);
    for (const c of codeCandidates.slice(0, 5)) {
      console.log(`  - [${c.semester.curriculumVersion.programme.code}] Sem ${c.semester.semesterNumber}: ${c.code} "${c.name}"`);
    }
  }

  await prisma.$disconnect();
}

inspectManual().catch(console.error);

