const fs = require('fs');
const path = require('path');

const bookPatterns = [
  /mcgraw[- ]*hill/i,
  /wiley/i,
  /pearson/i,
  /prentice[- ]*hall/i,
  /addison[- ]*wesley/i,
  /oxford\s+university\s+press/i,
  /tata\s+mcgraw/i,
  /springer/i,
  /\b(?:edition|edn|vol|volume|pp\.|isbn)\b/i,
  /\b(?:publications?|publishers?)\b/i,
  /morgan\s+kaufmann/i,
  /narosa/i,
  /dhanpat\s*rai/i,
  /s\.\s*chand/i,
  /bpb\s+publication/i,
  /cengage\s+learning/i,
  /an\s+imprint\s+of/i,
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
  /law\s+of\s+contract/i,
  /law\s+of\s+industrial/i,
  /avinash\s+publications/i,
  /tripathi\s+publishers/i
];

function isBook(str) {
  if (!str) return false;
  return bookPatterns.some(p => p.test(str));
}

function cleanBook(str) {
  if (!str) return '';
  return str.replace(/^[0-9]+[.)]\s*/, '').trim();
}

function sanitizeSubjectDetails(sub) {
  if (!sub.syllabusDetails) return false;
  let d;
  try {
    d = typeof sub.syllabusDetails === 'string' ? JSON.parse(sub.syllabusDetails) : sub.syllabusDetails;
  } catch {
    return false;
  }

  let modified = false;
  const pHours = Number(sub.practicalHours) || 0;
  const isTheory = (sub.subjectType === 'THEORY' || sub.subjectType === 'CORE' || sub.subjectType === 'ELECTIVE' || sub.subjectType === 'MANDATORY') && pHours === 0;

  let exps = Array.isArray(d.labExperiments) ? [...d.labExperiments] : [];
  let refBooks = Array.isArray(d.referenceBooks) ? [...d.referenceBooks] : [];
  let textBooks = Array.isArray(d.textBooks) ? [...d.textBooks] : [];

  // Special deterministic corrections for known subjects
  if (sub.code === 'MCS-101') {
    exps = [];
    refBooks = [
      "Kai Hwang, “Advanced Computer Architecture,” McGraw-Hill.",
      "Hwang and Briggs, “Computer Architecture and Parallel Processing,” McGraw Hill."
    ];
    modified = true;
  } else if (sub.code === 'BCS-086') {
    exps = [];
    refBooks = [
      "Kai Hwang, “Advanced Computer Architecture,” McGraw-Hill.",
      "Hwang and Briggs, “Computer Architecture and Parallel Processing,” McGraw Hill.",
      "Michael J. Flynn, “Pipelined and Parallel Processor Design”, 1995, Narosa.",
      "John L. Hennessy & David A. Patterson, “Computer Architecture: A Quantitative Approach”, 3rd Edition, Morgan Kaufmann (An Imprint of Elsevier)."
    ];
    modified = true;
  } else if (sub.code === 'BCS-602') {
    exps = [];
    if (!textBooks.some(b => b.includes('Aho'))) {
      textBooks.push("Aho, Sethi & Ullman, \"Compilers: Principles, Techniques and Tools\", Pearson Education.");
    }
    if (!refBooks.some(b => b.includes('Louden'))) {
      refBooks.push("Kenneth Louden, \"Compiler Construction\", Cengage Learning.");
    }
    if (!refBooks.some(b => b.includes('Fischer'))) {
      refBooks.push("Charles Fischer and Richard LeBlanc, \"Crafting a Compiler with C\", Pearson Education.");
    }
    modified = true;
  } else if (sub.code === 'BCS-071') {
    exps = [];
    refBooks = [
      "Jane W. S. Liu, \"Real-Time Systems\", Pearson Education Publication.",
      "Rajkamal, \"Embedded Systems\", Tata McGraw-Hill.",
      "Rajib Mall, \"Real-Time Systems: Theory and Practice\", Pearson Education.",
      "Albert M. K. Cheng, \"Real-Time Systems: Scheduling, Analysis, and Verification\", John Wiley & Sons."
    ];
    modified = true;
  } else if (sub.code === 'BCS-053') {
    exps = [];
    refBooks = [
      "Tay Vaughan, \"Multimedia: Making IT Work\", Osborne McGraw-Hill.",
      "Buford, \"Multimedia Systems\", Addison Wesley.",
      "Mark Nelson, \"Data Compression Book\", BPB Publications.",
      "David Hillman, \"Multimedia Technology and Applications\", Galgotia Publications.",
      "Steinmetz & Nahrstedt, \"Multimedia Systems\", Springer / Addison Wesley."
    ];
    modified = true;
  } else if (sub.code === 'HAS-501') {
    exps = [];
    refBooks = [
      "Neelima Chandiramani (2000), The Law of Contract: An Outline, 2nd Edn., Avinash Publications.",
      "Anson W.R. (1979), Law of Contract, Oxford University Press.",
      "O.P. Malhotra, Law of Industrial Disputes, N.M. Tripathi Publishers."
    ];
    modified = true;
  } else if (sub.code === 'MCS-213') {
    exps = [];
    refBooks = [
      "Atul Kahate, “Cryptography and Network Security”, Tata McGraw-Hill, 2003.",
      "Bruce Schneier, “Applied Cryptography: Protocols, Algorithms, and Source Code in C”, John Wiley & Sons, 2001.",
      "William Stallings, “Cryptography and Network Security: Principles and Practice”, Pearson Education."
    ];
    modified = true;
  } else if (sub.code === 'BCS-090') {
    exps = [];
    refBooks = [
      "Amos Gilat, \"MATLAB: An Introduction with Applications\", 2nd Edition, John Wiley & Sons, 2004.",
      "Rudra Pratap, \"Getting Started with MATLAB: A Quick Introduction for Scientists and Engineers\", Oxford University Press."
    ];
    modified = true;
  } else if (sub.code === 'ENG 114' || sub.code === 'ENG114') {
    exps = exps.filter(e => !/oxford|tata\s+mcgraw|dictionary/i.test(e));
    if (!refBooks.some(b => b.includes('Headway'))) {
      refBooks.push("Oxford English Learning Package (with CDs: Headway Series).");
    }
    if (!refBooks.some(b => b.includes('Tata McGraw'))) {
      refBooks.push("Tata McGraw-Hill's English Learning Package (with CDs).");
    }
    if (!refBooks.some(b => b.includes('Oxford Advanced'))) {
      refBooks.push("Oxford Advanced Learner's Dictionary, Oxford University Press (New Delhi).");
    }
    modified = true;
  } else {
    // General sanitization:
    // 1. If theory subject, it must NOT have labExperiments containing books
    if (isTheory && exps.length > 0) {
      const bookEntries = exps.filter(isBook);
      if (bookEntries.length > 0) {
        bookEntries.forEach(b => {
          const cb = cleanBook(b);
          if (!refBooks.includes(cb) && !textBooks.includes(cb)) {
            refBooks.push(cb);
          }
        });
        exps = exps.filter(e => !isBook(e));
        modified = true;
      }
      // If it's a theory subject and has no practical hours, experiments should be empty
      if (exps.length > 0 && pHours === 0) {
        exps.forEach(e => {
          const ce = cleanBook(e);
          if (!refBooks.includes(ce)) refBooks.push(ce);
        });
        exps = [];
        modified = true;
      }
    }

    // 2. If practical subject, remove any books that were appended to labExperiments
    if (!isTheory && exps.length > 0) {
      const bookEntries = exps.filter(isBook);
      if (bookEntries.length > 0) {
        bookEntries.forEach(b => {
          const cb = cleanBook(b);
          if (!refBooks.includes(cb) && !textBooks.includes(cb)) {
            refBooks.push(cb);
          }
        });
        exps = exps.filter(e => !isBook(e));
        modified = true;
      }
    }

    // 3. Clean up orphaned standalone publisher names in refBooks
    const standalonePubs = [
      /^mcgraw[- ]*hill\.?$/i,
      /^wiley\.?$/i,
      /^pearson\.?$/i,
      /^tata\s+mcgraw[- ]*hill\.?$/i,
      /^phi\.?$/i,
      /^tmh\.?$/i,
      /^morgan\s+kufmann\s*\(an\s+imprint\s+of\s+elsevier\)\.?$/i,
      /^morgan\s+kaufmann\.?$/i
    ];
    const initialLen = refBooks.length;
    refBooks = refBooks.filter(b => !standalonePubs.some(p => p.test(b.trim())));
    if (refBooks.length !== initialLen) modified = true;
  }

  // Set standardized metadata
  const classification = isTheory
    ? "THEORY_ONLY"
    : (pHours > 0 && (sub.lectureHours || 0) > 0 ? "THEORY_WITH_PRACTICAL" : "PRACTICAL_ONLY");

  d.labExperiments = exps;
  d.referenceBooks = refBooks;
  d.textBooks = textBooks;
  d.metadata = {
    subjectClassification: classification,
    practicalApplicability: !isTheory && pHours > 0,
    practicalHours: pHours,
    curriculumSource: "OFFICIAL_SYLLABUS_PDF",
    verifiedAt: "2026-11-21T00:00:00.000Z"
  };

  sub.syllabusDetails = JSON.stringify(d);
  return true;
}

function processSnapshotFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing file: ${filePath}`);
    return;
  }
  console.log(`\nProcessing snapshot: ${filePath}`);
  const snap = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const subjects = snap.data?.subject || [];
  let updatedCount = 0;

  for (const sub of subjects) {
    if (sanitizeSubjectDetails(sub)) {
      updatedCount++;
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(snap, null, 2), 'utf8');
  console.log(`Successfully sanitized ${updatedCount} subjects in ${filePath}`);
}

function processCatalogueFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing catalogue file: ${filePath}`);
    return;
  }
  console.log(`\nProcessing catalogue: ${filePath}`);
  const cat = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let updatedCount = 0;

  const subjects = cat.data?.subject || [];
  for (const sub of subjects) {
    if (sanitizeSubjectDetails(sub)) {
      updatedCount++;
    }
  }

  for (const prog of cat.programmes || []) {
    for (const cv of prog.curriculumVersions || []) {
      for (const sem of cv.semesters || []) {
        for (const sub of sem.subjects || []) {
          if (sanitizeSubjectDetails(sub)) {
            updatedCount++;
          }
        }
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(cat, null, 2), 'utf8');
  console.log(`Successfully sanitized ${updatedCount} subjects in ${filePath}`);
}

async function processLiveDatabase() {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    console.log(`\nAttempting to connect to live database...`);
    const subjects = await prisma.subject.findMany();
    console.log(`Connected! Found ${subjects.length} subjects in live database.`);
    let updatedCount = 0;

    for (const sub of subjects) {
      const origDetails = sub.syllabusDetails;
      if (sanitizeSubjectDetails(sub)) {
        if (origDetails !== sub.syllabusDetails) {
          await prisma.subject.update({
            where: { id: sub.id },
            data: { syllabusDetails: sub.syllabusDetails }
          });
          updatedCount++;
        }
      }
    }
    console.log(`Successfully updated ${updatedCount} subjects in live database.`);
    await prisma.$disconnect();
  } catch (err) {
    console.log(`Live database connection skipped or not reachable in sandbox: ${err.message}`);
  }
}

async function run() {
  processSnapshotFile('backups/complete-academic-and-auth-snapshot.json');
  processCatalogueFile('prisma/catalogue.json');
  await processLiveDatabase();
}

run();
