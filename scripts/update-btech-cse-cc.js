const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("Updating BTECH-CSE-CC with authentic Invertis University Cloud Computing data...");

  const officialUrl = "https://www.invertisuniversity.ac.in/ug-programmes/btech-in-cse-with-specialization-in-cloud-computing";
  const officialName = "B.Tech in CSE with Specialization in Cloud Computing";
  const officialDesc = "4-year undergraduate degree programme designed to address enterprise demand for scalable cloud infrastructure, virtualization, automated system deployment, and secure cloud operations.";
  const officialElig = "10+2 with Physics and Mathematics as compulsory subjects, plus Chemistry/Computer Science/Technical Vocational subject (Minimum 50% aggregate, 45% for SC/ST); JEE Main / IUEEE / Merit.";
  const officialSpecs = JSON.stringify([
    "Cloud Architecture & Virtualization",
    "Cloud Storage & Database Management",
    "DevOps & Containerization",
    "Cloud Security & Compliance",
    "Cloud Economics & Microservices"
  ]);
  const officialCareer = "Cloud Solutions Architect, DevOps Engineer, Site Reliability Engineer (SRE), Cloud Systems Administrator, Cloud Security Analyst";

  // 1. Update Database
  const updatedProg = await prisma.programme.update({
    where: { code: "BTECH-CSE-CC" },
    data: {
      name: officialName,
      officialSourceUrl: officialUrl,
      description: officialDesc,
      eligibility: officialElig,
      specializations: officialSpecs,
      careerProspects: officialCareer,
    },
  });

  console.log("Database updated successfully:");
  console.log({
    code: updatedProg.code,
    name: updatedProg.name,
    officialSourceUrl: updatedProg.officialSourceUrl,
    eligibility: updatedProg.eligibility,
  });

  // 2. Update prisma/catalogue.json
  const cataloguePath = path.join(__dirname, "..", "prisma", "catalogue.json");
  if (fs.existsSync(cataloguePath)) {
    const raw = fs.readFileSync(cataloguePath, "utf-8");
    const catalogue = JSON.parse(raw);

    for (const dept of catalogue.departments || []) {
      for (const prog of dept.programmes || []) {
        if (prog.code === "BTECH-CSE-CC") {
          prog.name = officialName;
          prog.officialSourceUrl = officialUrl;
          prog.description = officialDesc;
          prog.eligibility = officialElig;
          prog.specializations = officialSpecs;
          prog.careerProspects = officialCareer;
          console.log("catalogue.json updated for BTECH-CSE-CC.");
        }
      }
    }

    fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2), "utf-8");
    console.log("Saved prisma/catalogue.json.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

