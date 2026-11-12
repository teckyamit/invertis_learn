const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function runAudit() {
  console.log('====================================================');
  console.log('INVERTIS LEARN — GLOBAL PDF RESOURCE & STORAGE AUDIT');
  console.log('====================================================\n');

  const programmes = await prisma.programme.findMany({
    where: { isActive: true },
    include: {
      department: true,
      curriculumVersions: {
        where: { isCurrent: true },
        include: {
          semesters: {
            orderBy: { semesterNumber: 'asc' },
            include: {
              subjects: {
                where: { isActive: true },
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
    }
  });

  const progSummary = [];
  let totalSubjects = 0;
  let totalWithSyllabusPdf = 0;
  let totalMissingSyllabusPdf = 0;

  const validPdfs = [];
  const missingFilesOnDisk = [];
  const brokenPaths = [];
  const provenanceCounts = {
    VERIFIED: 0,
    UNVERIFIED: 0,
    PRACTICE: 0,
    PENDING: 0,
    OTHER: 0
  };

  for (const prog of programmes) {
    const cur = prog.curriculumVersions[0];
    if (!cur) continue;

    let progSubjCount = 0;
    let progWithPdf = 0;
    const missingSubjs = [];

    for (const sem of cur.semesters) {
      for (const subj of sem.subjects) {
        totalSubjects++;
        progSubjCount++;

        const syl = subj.resources.find(r => r.category.code === 'SYLLABUS');
        if (syl) {
          totalWithSyllabusPdf++;
          progWithPdf++;

          // Track provenance status
          const status = (syl.provenanceStatus || 'UNVERIFIED').toUpperCase();
          if (provenanceCounts[status] !== undefined) {
            provenanceCounts[status]++;
          } else {
            provenanceCounts.OTHER++;
          }

          // Check on-disk existence
          // Storage root defaults to ./storage/uploads, or public/uploads
          const candidates = [
            path.resolve('storage', syl.storagePath.replace(/^uploads[\\/]/, '')),
            path.resolve('storage', 'uploads', syl.storagePath.replace(/^uploads[\\/]/, '')),
            path.resolve('public', syl.storagePath),
            path.resolve('storage', syl.storagePath),
            path.resolve(syl.storagePath),
          ];

          let found = null;
          for (const cand of candidates) {
            if (fs.existsSync(cand)) {
              try {
                const stat = fs.statSync(cand);
                if (stat.isFile() && stat.size > 0) {
                  found = { path: cand, size: stat.size };
                  break;
                }
              } catch (e) {}
            }
          }

          if (found) {
            validPdfs.push({
              programmeCode: prog.code,
              semesterNumber: sem.semesterNumber,
              subjectCode: subj.code,
              subjectName: subj.name,
              resourceId: syl.id,
              storedFileName: syl.storedFileName,
              storagePath: syl.storagePath,
              resolvedPath: found.path,
              actualSizeBytes: found.size,
              dbSizeBytes: syl.fileSizeBytes,
              provenanceStatus: syl.provenanceStatus,
              sourceReference: syl.sourceReference
            });
          } else {
            missingFilesOnDisk.push({
              programmeCode: prog.code,
              semesterNumber: sem.semesterNumber,
              subjectCode: subj.code,
              subjectName: subj.name,
              resourceId: syl.id,
              storedFileName: syl.storedFileName,
              storagePath: syl.storagePath,
              provenanceStatus: syl.provenanceStatus
            });
          }
        } else {
          totalMissingSyllabusPdf++;
          missingSubjs.push({
            semester: sem.semesterNumber,
            code: subj.code,
            name: subj.name
          });
        }
      }
    }

    progSummary.push({
      code: prog.code,
      name: prog.name,
      tier: prog.degreeLevel || prog.category,
      totalSubjects: progSubjCount,
      withSyllabusPdf: progWithPdf,
      missingPdfCount: missingSubjs.length
    });
  }

  console.log('PROGRAMME AUDIT SUMMARY:');
  console.table(progSummary);

  console.log('\n================ AUDIT METRICS ================');
  console.log('Total Active Subjects Across Invertis:', totalSubjects);
  console.log('Subjects With Syllabus Record in DB: ', totalWithSyllabusPdf);
  console.log('Subjects Without Syllabus Record in DB:', totalMissingSyllabusPdf);
  console.log('Physical PDF Files Valid on Disk:    ', validPdfs.length);
  console.log('Physical PDF Files Missing on Disk:  ', missingFilesOnDisk.length);
  console.log('Provenance Status Breakdown:         ', provenanceCounts);
  console.log('================================================\n');

  if (missingFilesOnDisk.length > 0) {
    console.log('MISSING FILES ON DISK (Sample):');
    console.table(missingFilesOnDisk.slice(0, 15));
  }

  return {
    totalSubjects,
    totalWithSyllabusPdf,
    totalMissingSyllabusPdf,
    validPdfsCount: validPdfs.length,
    missingFilesOnDiskCount: missingFilesOnDisk.length,
    missingFilesOnDisk,
    validPdfs,
    progSummary
  };
}

if (require.main === module) {
  runAudit().catch(console.error).finally(() => prisma.$disconnect());
}

module.exports = { runAudit };

