const fs = require('fs');

function auditSnapshot() {
  const snapPath = 'backups/complete-academic-and-auth-snapshot.json';
  if (!fs.existsSync(snapPath)) {
    console.error(`File ${snapPath} not found`);
    return;
  }

  const snap = JSON.parse(fs.readFileSync(snapPath, 'utf8'));
  const subjects = snap.data.subject || [];
  console.log(`Auditing ${subjects.length} subjects from snapshot...`);

  const bookPatterns = [
    /mcgraw[- ]*hill/i,
    /wiley/i,
    /pearson/i,
    /prentice[- ]*hall/i,
    /addison[- ]*wesley/i,
    /oxford/i,
    /tata\s+mcgraw/i,
    /springer/i,
    /edition/i,
    /isbn/i,
    /publication/i,
    /publishers?/i,
    /kaufman/i,
    /narosa/i,
    /dhanpat\s*rai/i,
    /s\.\s*chand/i,
    /bpb/i,
    /cengage/i,
    /vol(?:ume)?\.?\s*\d+/i,
    /\bpp\.\s*\d+/i,
    /kai\s+hwang/i,
    /hennessy/i,
    /patterson/i,
    /tanenbaum/i,
    /galvin/i,
    /forouzan/i,
    /balaguruswamy/i,
    /silberschatz/i,
    /korth/i,
    /cormen/i,
    /an\s+imprint\s+of/i
  ];

  const issues = [];
  for (const sub of subjects) {
    if (!sub.syllabusDetails) continue;
    let d;
    try {
      d = JSON.parse(sub.syllabusDetails);
    } catch (err) {
      issues.push({ id: sub.id, code: sub.code, error: 'JSON_PARSE_ERROR' });
      continue;
    }

    const exps = d.labExperiments || [];
    const refBooks = d.referenceBooks || [];
    const textBooks = d.textBooks || [];

    const booksInLab = exps.filter(e => bookPatterns.some(p => p.test(e)));
    const standalonePubs = refBooks.filter(b => 
      /^(?:mcgraw[- ]*hill\.?|wiley\.?|pearson\.?|tata\s+mcgraw[- ]*hill\.?|phi\.?|tmh\.?|oxford\s+university\s+press\.?|morgan\s+kaufmann\.?|new\s+age\s+international\.?|morgan\s+kufmann\s*\(an\s+imprint\s+of\s+elsevier\)\.?)$/i.test(b.trim())
    );

    const isTheory = (sub.subjectType === 'THEORY' || sub.subjectType === 'CORE') && (sub.practicalHours === 0 || !sub.practicalHours);
    const theoryWithLabs = isTheory && exps.length > 0;

    if (booksInLab.length > 0 || standalonePubs.length > 0 || theoryWithLabs) {
      issues.push({
        id: sub.id,
        code: sub.code,
        name: sub.name,
        type: sub.subjectType,
        pHours: sub.practicalHours,
        booksInLab,
        standalonePubs,
        theoryWithLabs,
        allExps: exps,
        refBooks,
        textBooks
      });
    }
  }

  console.log(`\n=== AUDIT RESULTS (${issues.length} subjects flagged) ===`);
  for (const item of issues) {
    console.log(`\n[${item.code}] ${item.name} | Type: ${item.type} | Practical Hours: ${item.pHours}`);
    if (item.booksInLab.length > 0) {
      console.log(`  --> BOOKS IN LAB EXPERIMENTS (${item.booksInLab.length}):`);
      item.booksInLab.forEach(b => console.log(`      * ${b}`));
    }
    if (item.standalonePubs.length > 0) {
      console.log(`  --> STANDALONE PUBLISHERS IN REF BOOKS:`);
      item.standalonePubs.forEach(p => console.log(`      * ${p}`));
    }
    if (item.theoryWithLabs && item.booksInLab.length === 0) {
      console.log(`  --> THEORY SUBJECT WITH EXPERIMENTS: ${item.allExps.length} experiments`);
    }
  }

  // Summary by category
  const bookInExpList = issues.filter(i => i.booksInLab.length > 0);
  const standalonePubList = issues.filter(i => i.standalonePubs.length > 0);
  const theoryWithLabsList = issues.filter(i => i.theoryWithLabs);
  console.log(`\nSUMMARY:`);
  console.log(`- Subjects with books wrongly in labExperiments: ${bookInExpList.length} (${bookInExpList.map(i => i.code).join(', ')})`);
  console.log(`- Subjects with standalone publisher names in refBooks: ${standalonePubList.length} (${standalonePubList.map(i => i.code).join(', ')})`);
  console.log(`- Theory subjects with non-empty labExperiments: ${theoryWithLabsList.length} (${theoryWithLabsList.map(i => i.code).join(', ')})`);
}

auditSnapshot();
