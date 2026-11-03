const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sem1 = await prisma.semester.findFirst({
    where: {
      semesterNumber: 1,
      curriculumVersion: { programme: { code: 'BTECH-CSE' } }
    }
  });

  if (!sem1) {
    throw new Error("Semester 1 for BTECH-CSE not found");
  }

  const syllabusCategory = await prisma.resourceCategory.findUnique({
    where: { code: 'SYLLABUS' }
  });

  // 1. Update BAS102 to "Engineering Mathematics - I"
  await prisma.subject.updateMany({
    where: {
      code: 'BAS102',
      semesterId: sem1.id
    },
    data: {
      name: 'Engineering Mathematics - I'
    }
  });
  console.log("Updated BAS102 name to 'Engineering Mathematics - I'");

  // 2. Update BCS101 to "Computer Fundamentals (Introduction to Computers)"
  await prisma.subject.updateMany({
    where: {
      code: 'BCS101',
      semesterId: sem1.id
    },
    data: {
      name: 'Computer Fundamentals (Introduction to Computers)'
    }
  });
  console.log("Updated BCS101 name to 'Computer Fundamentals (Introduction to Computers)'");

  // 3. Check if BCS201 is in Sem 1
  let bcs201Sem1 = await prisma.subject.findFirst({
    where: {
      code: 'BCS201',
      semesterId: sem1.id
    }
  });

  // Get BCS201 details from Sem 2
  const bcs201Sem2 = await prisma.subject.findFirst({
    where: {
      code: 'BCS201',
      semester: {
        semesterNumber: 2,
        curriculumVersion: { programme: { code: 'BTECH-CSE' } }
      }
    }
  });

  if (!bcs201Sem1 && bcs201Sem2) {
    bcs201Sem1 = await prisma.subject.create({
      data: {
        semesterId: sem1.id,
        code: 'BCS201',
        name: 'Programming in C (Programming for Problem Solving)',
        lectureHours: bcs201Sem2.lectureHours,
        tutorialHours: bcs201Sem2.tutorialHours,
        practicalHours: bcs201Sem2.practicalHours,
        credits: bcs201Sem2.credits,
        subjectType: 'THEORY',
        electiveGroup: 'Group B (Common 1st Year Cycle)',
        evaluationMarks: bcs201Sem2.evaluationMarks,
        syllabusDetails: bcs201Sem2.syllabusDetails,
        isActive: true
      }
    });
    console.log("Created BCS201 in Semester 1 for Common 1st Year Cycle");
  } else if (bcs201Sem1) {
    await prisma.subject.update({
      where: { id: bcs201Sem1.id },
      data: {
        name: 'Programming in C (Programming for Problem Solving)',
        syllabusDetails: bcs201Sem2.syllabusDetails
      }
    });
    console.log("Updated BCS201 in Semester 1");
  }

  // Also update BCS201 in Semester 2 to have explicit name "Programming in C (Programming for Problem Solving)"
  if (bcs201Sem2) {
    await prisma.subject.update({
      where: { id: bcs201Sem2.id },
      data: {
        name: 'Programming in C (Programming for Problem Solving)'
      }
    });
    console.log("Updated BCS201 in Semester 2");
  }

  // Ensure BCS201 in Sem 1 has its AcademicResource linked to BCS201_Syllabus.pdf
  if (bcs201Sem1) {
    const fs = require('fs');
    const path = require('path');
    const pdfPath = path.join(process.cwd(), 'public/uploads/syllabus/subjects/BCS201_Syllabus.pdf');
    const stats = fs.statSync(pdfPath);

    await prisma.academicResource.upsert({
      where: { id: `syllabus_${bcs201Sem1.id}` },
      update: {
        title: 'Official Syllabus - BCS201 Programming in C',
        originalFileName: 'BCS201_Syllabus.pdf',
        storedFileName: 'BCS201_Syllabus.pdf',
        storagePath: 'uploads/syllabus/subjects/BCS201_Syllabus.pdf',
        fileSizeBytes: stats.size,
        isPublished: true
      },
      create: {
        id: `syllabus_${bcs201Sem1.id}`,
        subjectId: bcs201Sem1.id,
        categoryId: syllabusCategory.id,
        title: 'Official Syllabus - BCS201 Programming in C',
        originalFileName: 'BCS201_Syllabus.pdf',
        storedFileName: 'BCS201_Syllabus.pdf',
        storagePath: 'uploads/syllabus/subjects/BCS201_Syllabus.pdf',
        fileSizeBytes: stats.size,
        isPublished: true
      }
    });
    console.log("Linked BCS201 in Semester 1 to BCS201_Syllabus.pdf");
  }

  console.log("=== SEMESTER 1 SUBJECT ALIGNMENT COMPLETE ===");
}

main().catch(console.error).finally(() => prisma.$disconnect());
