const fs = require("fs");
const path = require("path");

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../storage/pyq-classification-full.json"), "utf-8"));
const verified = data.classified.filter(c => c.status === "MATCHED" || c.status === "SHARED_CSE");

console.log(`=== 71 VERIFIED CSE QUESTION PAPERS (${verified.length}) ===\n`);

const byProg = {};

verified.forEach(item => {
  item.matchedSubjects.forEach(sub => {
    const key = `${sub.programmeCode} (Sem ${sub.semesterNumber})`;
    if (!byProg[key]) byProg[key] = [];
    byProg[key].push({
      file: item.filename,
      code: sub.subjectCode,
      name: sub.subjectName,
      session: item.detectedSession,
      type: item.detectedExamType,
      size: item.fileSize,
      isShared: item.status === "SHARED_CSE"
    });
  });
});

Object.keys(byProg).sort().forEach(k => {
  console.log(`--- ${k}: ${byProg[k].length} papers ---`);
  byProg[k].forEach(p => {
    console.log(`  • [${p.code}] ${p.name} (${p.session}, ${p.type})${p.isShared ? " [SHARED]" : ""}`);
    console.log(`    File: ${p.file} (${(p.size / 1024).toFixed(1)} KB)`);
  });
  console.log("");
});

