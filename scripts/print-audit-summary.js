const d = require('./comprehensive-audit.json');
console.log('Total Programmes:', d.totalProgrammes);
console.log('Active Programmes:', d.activeProgrammesCount);
console.log('Inactive Programmes:', d.inactiveProgrammesCount);
console.log('Total Semesters:', d.totalSemestersCount);
console.log('Total Subjects:', d.totalSubjectsCount);
for (const p of d.programmes) {
  if (p.hasCurriculum) {
    console.log(`- ${p.code} (${p.name}): ${p.subjectsCount} subjects, ${p.subjectsWithIsolatedPdf} isolated PDFs, ${p.subjectsWithDetails} with details`);
  }
}
