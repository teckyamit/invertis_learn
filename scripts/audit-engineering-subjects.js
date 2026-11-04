const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runAudit() {
  console.log('Starting Universal Engineering Syllabus Audit...\n');

  // Identify all engineering programmes
  const engineeringDepts = await prisma.department.findMany({
    where: {
      OR: [
        { code: 'ENG' },
        { name: { contains: 'Engineering' } },
        { name: { contains: 'Technology' } }
      ]
    },
    include: {
      programmes: {
        include: {
          curriculumVersions: {
            where: { isCurrent: true },
            include: {
              semesters: {
                orderBy: { semesterNumber: 'asc' },
                include: {
                  subjects: {
                    include: {
                      resources: {
                        where: { isPublished: true },
                        include: { category: true }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  console.log(`Found ${engineeringDepts.length} Engineering Department(s).`);

  let totalProgrammes = 0;
  let programmesWithCurriculum = 0;
  let totalSemesters = 0;
  let totalSubjects = 0;
  let subjectsWithFullSyllabus = 0;
  let subjectsWithPartialSyllabus = 0;
  let subjectsWithNoSyllabusDetails = 0;
  let subjectsWithPdf = 0;
  let subjectsWithValidIsolatedPdf = 0;

  const programmeSummaries = [];
  const incompleteSubjects = [];
  const verifiedSubjects = [];

  for (const dept of engineeringDepts) {
    console.log(`\n======================================================`);
    console.log(`DEPARTMENT: ${dept.name} (${dept.code})`);
    console.log(`======================================================`);

    for (const prog of dept.programmes) {
      totalProgrammes++;
      const currentCv = prog.curriculumVersions[0];
      const progInfo = {
        code: prog.code,
        name: prog.name,
        category: prog.category,
        degreeLevel: prog.degreeLevel,
        hasOfficialSyllabus: prog.hasOfficialSyllabus,
        curriculumVersion: currentCv ? currentCv.versionYear : null,
        semesterCount: currentCv ? currentCv.semesters.length : 0,
        subjectsCount: 0,
        fullyExtractedCount: 0,
        partialCount: 0,
        noDataCount: 0,
        pdfCount: 0,
        validPdfCount: 0
      };

      if (!currentCv || currentCv.semesters.length === 0) {
        programmeSummaries.push(progInfo);
        console.log(`- [${prog.code}] ${prog.name}: No active curriculum version/semesters in DB.`);
        continue;
      }

      programmesWithCurriculum++;

      for (const sem of currentCv.semesters) {
        totalSemesters++;
        for (const sub of sem.subjects) {
          totalSubjects++;
          progInfo.subjectsCount++;

          const syllabusRes = sub.resources.find(r => r.category.code === 'SYLLABUS');
          let hasPdf = false;
          let hasValidIsolatedPdf = false;

          if (syllabusRes) {
            hasPdf = true;
            progInfo.pdfCount++;
            totalSubjectsWithPdf();

            const physicalPath = path.join(process.cwd(), 'public', syllabusRes.storagePath);
            if (fs.existsSync(physicalPath)) {
              const filename = path.basename(physicalPath);
              // Check if isolated subject PDF
              if (filename.includes('_Syllabus.pdf') && !filename.toLowerCase().includes('year')) {
                hasValidIsolatedPdf = true;
                progInfo.validPdfCount++;
                subjectsWithValidIsolatedPdf++;
              }
            }
          }

          // Inspect syllabusDetails JSON
          let details = null;
          let hasModules = false;
          let hasOutcomes = false;
          let hasBooks = false;

          if (sub.syllabusDetails) {
            try {
              details = JSON.parse(sub.syllabusDetails);
              if (details.modules && details.modules.length > 0) hasModules = true;
              if (details.outcomes && details.outcomes.length > 0) hasOutcomes = true;
              if ((details.textBooks && details.textBooks.length > 0) || (details.referenceBooks && details.referenceBooks.length > 0)) hasBooks = true;
            } catch (e) {}
          }

          const isPractical = sub.subjectType === 'PRACTICAL';
          const hasExperiments = details && details.labExperiments && details.labExperiments.length > 0;

          // Evaluation of completeness
          let status = 'NONE';
          if (hasModules || (isPractical && hasExperiments)) {
            if (hasModules && hasOutcomes && hasBooks) {
              status = 'COMPLETE';
              progInfo.fullyExtractedCount++;
              subjectsWithFullSyllabus++;
              verifiedSubjects.push({
                programme: prog.code,
                semester: sem.semesterNumber,
                code: sub.code,
                name: sub.name,
                type: sub.subjectType,
                hasPdf: hasValidIsolatedPdf,
                pdfFile: syllabusRes ? syllabusRes.storedFileName : null
              });
            } else {
              status = 'PARTIAL';
              progInfo.partialCount++;
              subjectsWithPartialSyllabus++;
              incompleteSubjects.push({
                programme: prog.code,
                semester: sem.semesterNumber,
                code: sub.code,
                name: sub.name,
                type: sub.subjectType,
                missing: [
                  !hasModules && !isPractical ? 'modules' : null,
                  !hasOutcomes ? 'course_outcomes' : null,
                  !hasBooks && !isPractical ? 'books' : null,
                  !hasValidIsolatedPdf ? 'isolated_pdf' : null
                ].filter(Boolean)
              });
            }
          } else {
            status = 'NO_DATA';
            progInfo.noDataCount++;
            subjectsWithNoSyllabusDetails++;
            incompleteSubjects.push({
              programme: prog.code,
              semester: sem.semesterNumber,
              code: sub.code,
              name: sub.name,
              type: sub.subjectType,
              missing: ['all_syllabus_data', !hasValidIsolatedPdf ? 'isolated_pdf' : null].filter(Boolean)
            });
          }
        }
      }

      programmeSummaries.push(progInfo);
      console.log(`- [${prog.code}] ${prog.name}: ${progInfo.subjectsCount} subjects across ${progInfo.semesterCount} semesters. (Complete: ${progInfo.fullyExtractedCount}, Partial: ${progInfo.partialCount}, No Data: ${progInfo.noDataCount}, PDFs: ${progInfo.validPdfCount})`);
    }
  }

  function totalSubjectsWithPdf() {
    subjectsWithPdf++;
  }

  console.log('\n======================================================');
  console.log('AUDIT SUMMARY TOTALS');
  console.log('======================================================');
  console.log(`Total Engineering Programmes: ${totalProgrammes}`);
  console.log(`Programmes with Seeded Semesters: ${programmesWithCurriculum}`);
  console.log(`Total Semesters Across Engineering: ${totalSemesters}`);
  console.log(`Total Engineering Subjects: ${totalSubjects}`);
  console.log(`Subjects with Full Syllabus (Modules + COs + Books): ${subjectsWithFullSyllabus}`);
  console.log(`Subjects with Partial Syllabus (Modules or Labs): ${subjectsWithPartialSyllabus}`);
  console.log(`Subjects with No Structured Syllabus Data: ${subjectsWithNoSyllabusDetails}`);
  console.log(`Subjects with Verified Isolated PDFs: ${subjectsWithValidIsolatedPdf}`);

  // Write audit report file
  const auditData = {
    totalProgrammes,
    programmesWithCurriculum,
    totalSemesters,
    totalSubjects,
    subjectsWithFullSyllabus,
    subjectsWithPartialSyllabus,
    subjectsWithNoSyllabusDetails,
    subjectsWithValidIsolatedPdf,
    programmes: programmeSummaries,
    incompleteSubjectsCount: incompleteSubjects.length,
    incompleteSubjectsSample: incompleteSubjects.slice(0, 20),
    verifiedSubjectsCount: verifiedSubjects.length
  };

  fs.writeFileSync('scripts/audit-results.json', JSON.stringify(auditData, null, 2));
  console.log('\nAudit report written to scripts/audit-results.json');

  await prisma.$disconnect();
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});

