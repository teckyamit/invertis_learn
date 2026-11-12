const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prog = await prisma.programme.findUnique({
    where: { code: 'DIP-CSE' },
    include: {
      curriculumVersions: {
        include: {
          semesters: {
            include: {
              subjects: true
            }
          }
        }
      }
    }
  });

  if (!prog) return;

  for (const cv of prog.curriculumVersions) {
    for (const sem of cv.semesters) {
      for (const sub of sem.subjects) {
        if (!sub.syllabusDetails) continue;
        try {
          const details = JSON.parse(sub.syllabusDetails);
          let changed = false;

          // Convert outcomes string to string[] if needed
          if (details.outcomes && typeof details.outcomes === 'string') {
            const raw = details.outcomes.trim();
            // Split by sentence or CO markers
            const split = raw
              .split(/(?<=[.!?])\s+(?=[A-Z])/)
              .map(s => s.trim())
              .filter(Boolean);
            details.outcomes = split.length > 0 ? split : [raw];
            changed = true;
          }

          if (changed) {
            await prisma.subject.update({
              where: { id: sub.id },
              data: {
                syllabusDetails: JSON.stringify(details)
              }
            });
            console.log(`Normalized outcomes for ${sub.code} (${sub.name}) -> ${details.outcomes.length} items`);
          }
        } catch (e) {
          console.error(`Error processing ${sub.code}:`, e.message);
        }
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

