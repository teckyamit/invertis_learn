const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
async function m() {
  const progs = ["BTECH-CSE", "BTECH-CSE-AI", "BTECH-CSE-CC", "DIP-CSE", "MTECH-CSE", "PHD-009"];
  for (const prog of progs) {
    const sub = await p.subject.findFirst({
      where: {
        semester: {
          curriculumVersion: {
            programme: { code: prog }
          }
        }
      },
      select: { code: true, name: true }
    });
    console.log(prog, sub);
  }
  await p.$disconnect();
}
m();

