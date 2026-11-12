const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const { SEMESTER_1_SUBJECTS } = require('./btech-cc-data-sem1');
const { SEMESTER_2_SUBJECTS } = require('./btech-cc-data-sem2');
const { SEMESTER_3_SUBJECTS } = require('./btech-cc-data-sem3');
const { SEMESTER_4_SUBJECTS } = require('./btech-cc-data-sem4');
const { SEMESTER_5_SUBJECTS } = require('./btech-cc-data-sem5');
const { SEMESTER_6_SUBJECTS } = require('./btech-cc-data-sem6');
const { SEMESTER_7_SUBJECTS } = require('./btech-cc-data-sem7');
const { SEMESTER_8_SUBJECTS } = require('./btech-cc-data-sem8');

const ALL_SEMESTERS = [
  { semesterNumber: 1, title: 'Semester I', subjects: SEMESTER_1_SUBJECTS },
  { semesterNumber: 2, title: 'Semester II', subjects: SEMESTER_2_SUBJECTS },
  { semesterNumber: 3, title: 'Semester III', subjects: SEMESTER_3_SUBJECTS },
  { semesterNumber: 4, title: 'Semester IV', subjects: SEMESTER_4_SUBJECTS },
  { semesterNumber: 5, title: 'Semester V', subjects: SEMESTER_5_SUBJECTS },
  { semesterNumber: 6, title: 'Semester VI', subjects: SEMESTER_6_SUBJECTS },
  { semesterNumber: 7, title: 'Semester VII', subjects: SEMESTER_7_SUBJECTS },
  { semesterNumber: 8, title: 'Semester VIII', subjects: SEMESTER_8_SUBJECTS }
];

async function seedBTechCC() {
  console.log('=== STARTING B.TECH CSE (CLOUD COMPUTING) SYLLABUS SEEDING ===');

  // 1. Find or create programme
  let programme = await prisma.programme.findFirst({
    where: { code: 'BTECH-CSE-CC' }
  });

  if (!programme) {
    console.log('Creating Programme BTECH-CSE-CC...');
    programme = await prisma.programme.create({
      data: {
        code: 'BTECH-CSE-CC',
        name: 'B.Tech in CSE with Specialization in Cloud Computing',
        durationYears: 4,
        hasOfficialSyllabus: true
      }
    });
  } else {
    console.log('Updating Programme BTECH-CSE-CC to hasOfficialSyllabus = true...');
    programme = await prisma.programme.update({
      where: { id: programme.id },
      data: {
        hasOfficialSyllabus: true,
        durationYears: 4
      }
    });
  }
  console.log(`Programme ID: ${programme.id}, Name: ${programme.name}`);

  // 2. Find or create CurriculumVersion
  let cv = await prisma.curriculumVersion.findFirst({
    where: {
      programmeId: programme.id,
      versionYear: '2023-2024'
    }
  });

  if (!cv) {
    console.log('Creating CurriculumVersion (2023-2024)...');
    cv = await prisma.curriculumVersion.create({
      data: {
        programmeId: programme.id,
        versionYear: '2023-2024',
        regulationName: 'Session 2023-2024 Scheme',
        isCurrent: true
      }
    });
  } else {
    console.log('CurriculumVersion already exists, updating...');
    cv = await prisma.curriculumVersion.update({
      where: { id: cv.id },
      data: {
        regulationName: 'Session 2023-2024 Scheme',
        isCurrent: true
      }
    });
  }
  console.log(`CurriculumVersion ID: ${cv.id}`);

  // 3. Find or create Syllabus Resource Category
  let syllabusCategory = await prisma.resourceCategory.findFirst({
    where: { code: 'SYLLABUS' }
  });
  if (!syllabusCategory) {
    syllabusCategory = await prisma.resourceCategory.create({
      data: {
        code: 'SYLLABUS',
        name: 'Official Syllabus',
        description: 'Official university curriculum and course outlines'
      }
    });
  }

  // 4. Seed Semesters and Subjects
  let totalSubjectsSeeded = 0;
  let totalResourcesLinked = 0;

  for (const semData of ALL_SEMESTERS) {
    console.log(`\n--- Processing Semester ${semData.semesterNumber}: ${semData.title} ---`);

    // Find or create semester
    let semester = await prisma.semester.findFirst({
      where: {
        curriculumVersionId: cv.id,
        semesterNumber: semData.semesterNumber
      }
    });

    if (!semester) {
      semester = await prisma.semester.create({
        data: {
          curriculumVersionId: cv.id,
          semesterNumber: semData.semesterNumber,
          title: semData.title
        }
      });
      console.log(`Created Semester ${semData.semesterNumber} (ID: ${semester.id})`);
    } else {
      semester = await prisma.semester.update({
        where: { id: semester.id },
        data: { title: semData.title }
      });
      console.log(`Updated Semester ${semData.semesterNumber} (ID: ${semester.id})`);
    }

    for (const sub of semData.subjects) {
      const detailsJson = JSON.stringify(sub.syllabusDetails);

      // Find or create subject
      let existingSubject = await prisma.subject.findFirst({
        where: {
          semesterId: semester.id,
          code: sub.code
        }
      });

      if (!existingSubject) {
        existingSubject = await prisma.subject.create({
          data: {
            semesterId: semester.id,
            code: sub.code,
            name: sub.name,
            subjectType: sub.subjectType,
            credits: sub.credits,
            lectureHours: sub.lectureHours,
            tutorialHours: sub.tutorialHours,
            practicalHours: sub.practicalHours,
            evaluationMarks: sub.evaluationMarks,
            syllabusDetails: detailsJson
          }
        });
        console.log(`  + Created: [${sub.code}] ${sub.name} (${sub.credits} Cr)`);
      } else {
        existingSubject = await prisma.subject.update({
          where: { id: existingSubject.id },
          data: {
            name: sub.name,
            subjectType: sub.subjectType,
            credits: sub.credits,
            lectureHours: sub.lectureHours,
            tutorialHours: sub.tutorialHours,
            practicalHours: sub.practicalHours,
            evaluationMarks: sub.evaluationMarks,
            syllabusDetails: detailsJson
          }
        });
        console.log(`  * Updated: [${sub.code}] ${sub.name} (${sub.credits} Cr)`);
      }
      totalSubjectsSeeded++;

      // Create or update AcademicResource for official syllabus
      const cleanStorageCode = sub.code.replace(/[^a-zA-Z0-9]/g, '');
      const pdfFileName = `${cleanStorageCode}_Syllabus.pdf`;
      const relativeStoragePath = `uploads/syllabus/subjects/${pdfFileName}`;
      const fullPdfPath = path.join(process.cwd(), 'public', relativeStoragePath);
      let fileSize = 0;
      if (fs.existsSync(fullPdfPath)) {
        fileSize = fs.statSync(fullPdfPath).size;
      }

      let resource = await prisma.academicResource.findFirst({
        where: {
          subjectId: existingSubject.id,
          categoryId: syllabusCategory.id
        }
      });

      if (!resource) {
        await prisma.academicResource.create({
          data: {
            subjectId: existingSubject.id,
            categoryId: syllabusCategory.id,
            title: `${sub.name} (${sub.code}) Official Syllabus`,
            originalFileName: pdfFileName,
            storedFileName: pdfFileName,
            storagePath: relativeStoragePath,
            mimeType: 'application/pdf',
            fileSizeBytes: fileSize,
            academicYear: '2023-2024',
            isPublished: true
          }
        });
        totalResourcesLinked++;
      } else {
        await prisma.academicResource.update({
          where: { id: resource.id },
          data: {
            title: `${sub.name} (${sub.code}) Official Syllabus`,
            originalFileName: pdfFileName,
            storedFileName: pdfFileName,
            storagePath: relativeStoragePath,
            fileSizeBytes: fileSize,
            isPublished: true
          }
        });
      }
    }
  }

  console.log('\n======================================================');
  console.log('B.TECH CSE (CLOUD COMPUTING) SYLLABUS SEEDING COMPLETE');
  console.log(`Total subjects seeded: ${totalSubjectsSeeded}`);
  console.log(`Curriculum Scheme: Session 2023-2024 Scheme`);
  console.log(`Total Semesters populated: 8 (Semesters I to VIII)`);
  console.log('======================================================');
}

seedBTechCC()
  .catch((err) => {
    console.error('Error seeding BTech CC:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
