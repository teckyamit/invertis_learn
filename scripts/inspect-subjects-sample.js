const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspect() {
  const subjects = await prisma.subject.findMany({
    where: {
      code: { in: ['BCS201', 'BAS102', 'BCSAI 103', 'BCSAI 301', 'BCSAI 104', 'BCS-301'] }
    },
    include: {
      semester: {
        include: {
          curriculumVersion: {
            include: { programme: true }
          }
        }
      },
      resources: {
        include: { category: true }
      }
    }
  });

  for (const s of subjects) {
    console.log(`\n--------------------------------------------------`);
    console.log(`[${s.code}] ${s.name} (${s.subjectType})`);
    console.log(`Programme: ${s.semester.curriculumVersion.programme.code} - ${s.semester.title}`);
    console.log(`Credits: ${s.credits}, L-T-P: ${s.lectureHours}-${s.tutorialHours}-${s.practicalHours}`);
    console.log(`Eval Marks: ${s.evaluationMarks}`);
    console.log(`Resources: ${s.resources.map(r => `${r.category.code}: ${r.storedFileName}`).join(', ')}`);
    if (s.syllabusDetails) {
      try {
        const d = JSON.parse(s.syllabusDetails);
        console.log(`Modules: ${d.modules ? d.modules.length : 0}`);
        console.log(`Outcomes: ${d.outcomes ? d.outcomes.length : 0}`);
        console.log(`Textbooks: ${d.textBooks ? d.textBooks.length : 0}`);
        console.log(`Reference Books: ${d.referenceBooks ? d.referenceBooks.length : 0}`);
        console.log(`Lab Experiments: ${d.labExperiments ? d.labExperiments.length : 0}`);
      } catch (e) {
        console.log('syllabusDetails JSON parse error');
      }
    } else {
      console.log('syllabusDetails: null');
    }
  }

  await prisma.$disconnect();
}

inspect().catch(console.error);
