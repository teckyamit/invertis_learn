const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function cleanText(t) {
  if (!t) return '';
  return t.replace(/\s+/g, ' ').trim();
}

function extractFromPdfText(text, subjectCode, subjectName) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let objectives = [];
  let outcomes = [];
  const modules = [];
  let textBooks = [];
  let referenceBooks = [];
  let labExperiments = [];

  let currentSection = null;
  let currentModule = null;

  const moduleRegex = /^(?:MODULE|UNIT|Section)\s*[-:]?\s*([0-9IVX]+)[:.-]?\s*(.*)/i;
  const isLab = subjectCode.includes('LAB') || subjectCode.endsWith('P') || /lab/i.test(subjectName) || /lab/i.test(text.substring(0, 300));

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect Section Headers
    if (/^Course\s+Objectives?[:]?$/i.test(line)) {
      currentSection = 'OBJECTIVES';
      continue;
    }

    if (/^(?:Course\s+Outcomes?(?:\s*\(COs\))?|Expected\s+Outcomes?)[:]?$/i.test(line)) {
      currentSection = 'OUTCOMES';
      continue;
    }

    if (/^(?:List\s+of\s+Experiments?|Laboratory\s+Exercises?)[:]?$/i.test(line)) {
      currentSection = 'EXPERIMENTS';
      continue;
    }

    if (/^(?:Text\s*Books?|Recommended\s*Textbooks?|Prescribed\s*Books?)[:]?$/i.test(line)) {
      if (currentModule) {
        modules.push(currentModule);
        currentModule = null;
      }
      currentSection = 'TEXTBOOKS';
      continue;
    }

    if (/^(?:References?|Reference\s*Books?|Suggested\s*Readings?|Text\s*\/\s*Reference\s*Books?)[:]?$/i.test(line)) {
      if (currentModule) {
        modules.push(currentModule);
        currentModule = null;
      }
      currentSection = 'REFERENCES';
      continue;
    }

    // Module Match
    const modMatch = line.match(moduleRegex);
    if (modMatch) {
      if (currentModule) {
        modules.push(currentModule);
      }
      currentSection = 'MODULE';
      const unitNum = modMatch[1];
      const rawTitle = modMatch[2] ? modMatch[2].trim() : '';
      currentModule = {
        title: rawTitle ? `MODULE-${unitNum}: ${rawTitle}` : `MODULE-${unitNum}: Course Core Topics`,
        topics: ''
      };
      continue;
    }

    // Section Content
    if (currentSection === 'OBJECTIVES') {
      if (/^(?:CO\d+|MODULE|UNIT|Text|References?|List\s+of)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*/.test(line) || /^CO\d+/i.test(line)) {
        objectives.push(line.replace(/^[0-9]+[.)]\s*/, '').trim());
      } else if (objectives.length > 0) {
        objectives[objectives.length - 1] += ' ' + line;
      }
    } else if (currentSection === 'OUTCOMES') {
      if (/^(?:MODULE|UNIT|Text|References?|List\s+of)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      const coMatch = line.match(/^(?:CO\s*(\d+)[:.]?|Course\s+Outcome\s*(\d+)[:.]?|[0-9]+[.)])\s*(.*)/i);
      if (coMatch) {
        outcomes.push(coMatch[3] ? coMatch[3].trim() : line);
      } else if (outcomes.length > 0 && !line.startsWith('--')) {
        outcomes[outcomes.length - 1] += ' ' + line;
      }
    } else if (currentSection === 'MODULE' && currentModule) {
      if (/^(?:Text|References?|Course\s+Outcome|Course\s+Obj|List\s+of\s+Exp)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^--\s*\d+\s*of\s*\d+\s*--$/.test(line)) continue;
      currentModule.topics = (currentModule.topics ? currentModule.topics + ' ' : '') + line;
    } else if (currentSection === 'EXPERIMENTS' || (isLab && /^[0-9]+[.)]/.test(line))) {
      if (/^(?:Text|References?|Course\s+Outcome)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        labExperiments.push(line.trim());
      } else if (labExperiments.length > 0 && !line.startsWith('--')) {
        labExperiments[labExperiments.length - 1] += ' ' + line;
      }
    } else if (currentSection === 'TEXTBOOKS') {
      if (/^(?:References?|Course\s+Outcome|MODULE|UNIT)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        textBooks.push(line.replace(/^[0-9]+[.)]\s*/, '').trim());
      } else if (textBooks.length > 0 && !line.startsWith('--')) {
        textBooks[textBooks.length - 1] += ' ' + line;
      } else if (!line.startsWith('--') && line.length > 3) {
        textBooks.push(line.trim());
      }
    } else if (currentSection === 'REFERENCES') {
      if (/^(?:Course\s+Outcome|MODULE|UNIT)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        referenceBooks.push(line.replace(/^[0-9]+[.)]\s*/, '').trim());
      } else if (referenceBooks.length > 0 && !line.startsWith('--')) {
        referenceBooks[referenceBooks.length - 1] += ' ' + line;
      } else if (!line.startsWith('--') && line.length > 3) {
        referenceBooks.push(line.trim());
      }
    }
  }

  if (currentModule) {
    modules.push(currentModule);
  }

  // Refine outcomes
  if (outcomes.length === 0 && objectives.length > 0 && objectives.some(o => /CO\d+/i.test(o))) {
    outcomes = objectives;
    objectives = [];
  }

  // Refine module titles if generic
  for (const m of modules) {
    if (m.title.endsWith('Course Core Topics') && m.topics.length > 10) {
      const firstSentence = m.topics.split(/[.:;]/)[0];
      if (firstSentence && firstSentence.length < 50 && firstSentence.length > 4) {
        m.title = m.title.replace('Course Core Topics', firstSentence.trim());
      }
    }
  }

  return {
    objectives: objectives.map(cleanText).filter(Boolean),
    outcomes: outcomes.map(cleanText).filter(Boolean),
    modules: modules.filter(m => m.topics && m.topics.trim().length > 10).map(m => ({
      title: cleanText(m.title),
      topics: cleanText(m.topics)
    })),
    textBooks: textBooks.map(cleanText).filter(Boolean),
    referenceBooks: referenceBooks.map(cleanText).filter(Boolean),
    labExperiments: labExperiments.map(cleanText).filter(Boolean)
  };
}

async function standardizeEngineeringSyllabi() {
  console.log('==================================================================');
  console.log('  STANDARDIZING ALL ENGINEERING SUBJECT SYLLABI (PHASE 4)');
  console.log('==================================================================\n');

  const subjects = await prisma.subject.findMany({
    where: {
      semester: {
        curriculumVersion: {
          isCurrent: true,
          programme: {
            department: { code: 'ENG' }
          }
        }
      }
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
    },
    orderBy: [
      { semester: { curriculumVersion: { programme: { code: 'asc' } } } },
      { semester: { semesterNumber: 'asc' } },
      { code: 'asc' }
    ]
  });

  console.log(`Found ${subjects.length} total engineering subjects across active programmes.\n`);

  const subjectsDir = path.join(process.cwd(), 'public', 'uploads', 'syllabus', 'subjects');

  let updatedCount = 0;
  let alreadyVerifiedCount = 0;
  let completeCount = 0;
  let inReviewCount = 0;

  const results = {
    totalAudited: subjects.length,
    verifiedAndEligible: [],
    inReviewOrPending: []
  };

  for (const sub of subjects) {
    const progCode = sub.semester.curriculumVersion.programme.code;
    const syllabusRes = sub.resources.find(r => r.category.code === 'SYLLABUS');
    const existingDetails = sub.syllabusDetails ? JSON.parse(sub.syllabusDetails) : null;

    let hasExistingModules = existingDetails?.modules && existingDetails.modules.length > 0;
    let hasExistingLabs = existingDetails?.labExperiments && existingDetails.labExperiments.length > 0;

    let pdfFile = syllabusRes ? syllabusRes.storedFileName : null;
    let pdfPath = pdfFile ? path.join(subjectsDir, pdfFile) : null;
    let pdfExists = pdfPath ? fs.existsSync(pdfPath) : false;

    let extractedDetails = null;

    // If PDF exists and either no modules or incomplete data, extract from PDF
    if (pdfExists) {
      try {
        const buf = fs.readFileSync(pdfPath);
        const parser = new PDFParse(new Uint8Array(buf));
        await parser.load();
        const pdfText = (await parser.getText()).text || '';
        extractedDetails = extractFromPdfText(pdfText, sub.code, sub.name);
      } catch (err) {
        console.warn(`[WARN] PDF parse failed for ${sub.code} (${pdfFile}):`, err.message);
      }
    }

    // Merge strategy: preserve existing high-quality authentic data, enrich with extracted data
    let mergedDetails = null;

    if (hasExistingModules || hasExistingLabs) {
      mergedDetails = { ...existingDetails };
      if (extractedDetails) {
        if ((!mergedDetails.outcomes || mergedDetails.outcomes.length === 0) && extractedDetails.outcomes.length > 0) {
          mergedDetails.outcomes = extractedDetails.outcomes;
        }
        if ((!mergedDetails.textBooks || mergedDetails.textBooks.length === 0) && extractedDetails.textBooks.length > 0) {
          mergedDetails.textBooks = extractedDetails.textBooks;
        }
        if ((!mergedDetails.referenceBooks || mergedDetails.referenceBooks.length === 0) && extractedDetails.referenceBooks.length > 0) {
          mergedDetails.referenceBooks = extractedDetails.referenceBooks;
        }
        if ((!mergedDetails.labExperiments || mergedDetails.labExperiments.length === 0) && extractedDetails.labExperiments.length > 0) {
          mergedDetails.labExperiments = extractedDetails.labExperiments;
        }
      }
    } else if (extractedDetails && (extractedDetails.modules.length > 0 || extractedDetails.labExperiments.length > 0)) {
      mergedDetails = extractedDetails;
    }

    const hasContent = mergedDetails && ((mergedDetails.modules && mergedDetails.modules.length > 0) || (mergedDetails.labExperiments && mergedDetails.labExperiments.length > 0));
    const isEligible = pdfExists && hasContent;

    if (mergedDetails) {
      const detailsJson = JSON.stringify(mergedDetails);
      if (detailsJson !== sub.syllabusDetails) {
        await prisma.subject.update({
          where: { id: sub.id },
          data: { syllabusDetails: detailsJson }
        });
        updatedCount++;
      } else {
        alreadyVerifiedCount++;
      }
    }

    if (isEligible) {
      completeCount++;
      results.verifiedAndEligible.push({
        programme: progCode,
        semester: sub.semester.semesterNumber,
        code: sub.code,
        name: sub.name,
        type: sub.subjectType,
        pdfFile,
        modulesCount: mergedDetails.modules ? mergedDetails.modules.length : 0,
        outcomesCount: mergedDetails.outcomes ? mergedDetails.outcomes.length : 0,
        booksCount: (mergedDetails.textBooks ? mergedDetails.textBooks.length : 0) + (mergedDetails.referenceBooks ? mergedDetails.referenceBooks.length : 0),
        labsCount: mergedDetails.labExperiments ? mergedDetails.labExperiments.length : 0
      });
    } else {
      inReviewCount++;
      results.inReviewOrPending.push({
        programme: progCode,
        semester: sub.semester.semesterNumber,
        code: sub.code,
        name: sub.name,
        type: sub.subjectType,
        reason: !pdfExists ? 'MISSING_ISOLATED_PDF' : 'PENDING_UNIT_DIGITIZATION'
      });
    }
  }

  console.log('==================================================================');
  console.log(`TOTAL SUBJECTS AUDITED: ${subjects.length}`);
  console.log(`SUBJECTS UPDATED IN DATABASE: ${updatedCount}`);
  console.log(`PREVIOUSLY VERIFIED: ${alreadyVerifiedCount}`);
  console.log(`ELIGIBLE & VERIFIED FOR PDF DOWNLOAD: ${completeCount}`);
  console.log(`IN REVIEW / PENDING (NO MISLEADING PDF DOWNLOAD): ${inReviewCount}`);
  console.log('==================================================================\n');

  fs.writeFileSync('scripts/standardization-results.json', JSON.stringify(results, null, 2));
  console.log('Results saved to scripts/standardization-results.json');

  await prisma.$disconnect();
}

standardizeEngineeringSyllabi().catch(console.error);

