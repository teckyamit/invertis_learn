/**
 * Invertis Learn: Seed Lateral Entry Programmes
 * Registers B.Tech CSE (Regular) - Lateral Entry and B.Tech CSE (AI Specialization) - Lateral Entry
 * in the database without creating duplicate subject records.
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedLateralEntryProgrammes() {
  console.log("==================================================================");
  console.log("   REGISTERING LATERAL ENTRY PROGRAMMES IN INVERTIS LEARN");
  console.log("==================================================================\n");

  const engDept = await prisma.department.findFirst({
    where: {
      OR: [{ code: "ENG" }, { name: { contains: "Engineering" } }],
    },
  });

  if (!engDept) {
    throw new Error("Engineering department (ENG) not found in database.");
  }

  const lateralProgrammes = [
    {
      code: "BTECH-CSE-LE",
      name: "B.Tech CSE (Regular) - Lateral Entry",
      degreeLevel: "UNDERGRADUATE",
      category: "UNDERGRADUATE",
      durationYears: 3,
      isLateralEntry: true,
      hasOfficialSyllabus: true,
      departmentId: engDept.id,
      eligibility:
        "3-Year Polytechnic Diploma in Engineering / Technology or B.Sc. Degree with Mathematics (Minimum 50% aggregate marks, 45% for SC/ST candidates); Direct Admission to 2nd Year (Semester III).",
      specializations: JSON.stringify([
        "Core Computer Science",
        "Software Engineering",
        "Algorithms & Systems",
        "Lateral Admission Pathway",
      ]),
      description:
        "3-year undergraduate lateral entry engineering programme designed for diploma holders and B.Sc. graduates. Students join directly in the 2nd Year (Semester III) and follow the verified Invertis University B.Tech CSE (Regular) curriculum through Semester VIII.",
      careerProspects:
        "Software Development Engineer (SDE), Full-Stack Systems Architect, Backend Engineer, Cloud Infrastructure Engineer.",
      officialSourceUrl: "https://www.invertisuniversity.ac.in/ug-programmes",
    },
    {
      code: "BTECH-CSE-AI-LE",
      name: "B.Tech CSE (AI Specialization) - Lateral Entry",
      degreeLevel: "UNDERGRADUATE",
      category: "UNDERGRADUATE",
      durationYears: 3,
      isLateralEntry: true,
      hasOfficialSyllabus: true,
      departmentId: engDept.id,
      eligibility:
        "3-Year Polytechnic Diploma in CSE/IT/ECE or B.Sc. Degree with Mathematics (Minimum 60% aggregate); Direct Admission to 2nd Year (Semester III).",
      specializations: JSON.stringify([
        "Artificial Intelligence",
        "Deep Learning",
        "Machine Learning Systems",
        "Lateral Admission Pathway",
      ]),
      description:
        "3-year specialized undergraduate lateral entry programme entering directly into the 2nd Year (Semester III) of the B.Tech CSE (Artificial Intelligence & Machine Learning) curriculum through Semester VIII.",
      careerProspects:
        "AI/ML Engineer, Data Systems Specialist, Computer Vision Engineer, Autonomous Systems Developer.",
      officialSourceUrl: "https://www.invertisuniversity.ac.in/ug-programmes",
    },
  ];

  for (const progData of lateralProgrammes) {
    const existing = await prisma.programme.findUnique({
      where: { code: progData.code },
    });

    if (existing) {
      await prisma.programme.update({
        where: { code: progData.code },
        data: progData,
      });
      console.log(`[UPDATED] ${progData.name} (${progData.code})`);
    } else {
      await prisma.programme.create({
        data: progData,
      });
      console.log(`[CREATED] ${progData.name} (${progData.code})`);
    }
  }

  console.log("\n==================================================================");
  console.log("   LATERAL ENTRY PROGRAMMES REGISTERED SUCCESSFULLY");
  console.log("==================================================================\n");
}

seedLateralEntryProgrammes()
  .catch((err) => {
    console.error("Error seeding lateral entry programmes:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
