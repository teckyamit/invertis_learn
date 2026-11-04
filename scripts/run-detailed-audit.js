const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runDetailedAudit() {
  console.log('Running Deep Engineering Syllabus Audit...');

  const programmes = await prisma.programme.findMany({
    where: {
      department: {
        code: 'ENG'
      }
    },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' },
            include: {
              subjects: {
                orderBy: { code: 'asc' },
                include: {
                  resources: {
                    include: { category: true }
                  }
                }
              }
            }
          }
        }
      }
    },
    orderBy: { code: 'asc' }
  });

  const auditReport = {
    generatedAt: new Date().toISOString(),
    totalProgrammes: programmes.length,
    activeProgrammesCount: 0,
    inactiveProgrammesCount: 0,
    totalSemestersCount: 0,
    totalSubjectsCount: 0,
    programmes: [],
    renderingAudit: {
      componentUsed: 'src/app/syllabus/[programmeCode]/semester/[semesterNumber]/[subjectCode]/page.tsx',
      pdfViewerComponent: 'src/components/syllabus/PDFViewer.tsx',
      hasEmbeddedObjectTag: true,
      hasInlineIframe: false,
      embeddedViewerHeight: '650px',
      needsViewerRemoval: true
    }
  };

  const subjectsDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'subjects');

  for (const prog of programmes) {
    const cv = prog.curriculumVersions[0];
    const progData = {
      code: prog.code,
      name: prog.name,
      category: prog.category,
      hasOfficialSyllabus: prog.hasOfficialSyllabus,
      hasCurriculum: !!cv,
      semestersCount: cv ? cv.semesters.length : 0,
      subjectsCount: 0,
      subjectsWithDetails: 0,
      subjectsWithIsolatedPdf: 0,
      subjectsMissingPdf: 0,
      theoryCount: 0,
      practicalCount: 0,
      electiveCount: 0,
      semesters: []
    };

    if (cv) {
      auditReport.activeProgrammesCount++;
      for (const sem of cv.semesters) {
        auditReport.totalSemestersCount++;
        const semData = {
          semesterNumber: sem.semesterNumber,
          title: sem.title,
          subjectsCount: sem.subjects.length,
          subjects: []
        };

        for (const sub of sem.subjects) {
          auditReport.totalSubjectsCount++;
          progData.subjectsCount++;

          if (sub.subjectType === 'THEORY') progData.theoryCount++;
          else if (sub.subjectType === 'PRACTICAL') progData.practicalCount++;
          if (sub.isElective) progData.electiveCount++;

          const syllabusRes = sub.resources.find(r => r.category.code === 'SYLLABUS');
          let pdfExists = false;
          let pdfFile = null;
          let isIsolated = false;

          if (syllabusRes) {
            pdfFile = syllabusRes.storedFileName;
            const fullPath = path.join(subjectsDir, pdfFile);
            if (fs.existsSync(fullPath)) {
              pdfExists = true;
              isIsolated = true;
              progData.subjectsWithIsolatedPdf++;
            }
          }

          if (!pdfExists) {
            progData.subjectsMissingPdf++;
          }

          let details = null;
          let moduleCount = 0;
          let coCount = 0;
          let bookCount = 0;
          let labCount = 0;

          if (sub.syllabusDetails) {
            try {
              details = JSON.parse(sub.syllabusDetails);
              progData.subjectsWithDetails++;
              moduleCount = details.modules ? details.modules.length : 0;
              coCount = details.outcomes ? details.outcomes.length : 0;
              bookCount = (details.textBooks ? details.textBooks.length : 0) + (details.referenceBooks ? details.referenceBooks.length : 0);
              labCount = details.labExperiments ? details.labExperiments.length : 0;
            } catch (e) {}
          }

          semData.subjects.push({
            code: sub.code,
            name: sub.name,
            type: sub.subjectType,
            credits: sub.credits,
            ltp: `${sub.lectureHours}-${sub.tutorialHours}-${sub.practicalHours}`,
            evaluationMarks: sub.evaluationMarks,
            hasPdf: pdfExists,
            pdfFile,
            isIsolated,
            hasStructuredDetails: !!details,
            moduleCount,
            coCount,
            bookCount,
            labCount
          });
        }
        progData.semesters.push(semData);
      }
    } else {
      auditReport.inactiveProgrammesCount++;
    }

    auditReport.programmes.push(progData);
  }

  fs.writeFileSync('scripts/comprehensive-audit.json', JSON.stringify(auditReport, null, 2));
  console.log('Audit complete: scripts/comprehensive-audit.json');

  await prisma.$disconnect();
}

runDetailedAudit().catch(console.error);

