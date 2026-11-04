const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

function extractSyllabusFromText(text, subjectCode) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  let objectives = [];
  let outcomes = [];
  const modules = [];
  let textBooks = [];
  let referenceBooks = [];
  let labExperiments = [];

  let currentSection = null; // 'OBJECTIVES', 'OUTCOMES', 'MODULE', 'TEXTBOOKS', 'REFERENCES', 'EXPERIMENTS'
  let currentModule = null;

  // Helper to test if line starts a new module/unit
  const moduleRegex = /^(?:MODULE|UNIT|Section)\s*[-:]?\s*([0-9IVX]+)[:.-]?\s*(.*)/i;
  
  // Helper to check for list of experiments in labs
  const isLab = subjectCode.includes('LAB') || subjectCode.endsWith('P') || /lab/i.test(text);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect section transitions
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

    // Check for Module header
    const modMatch = line.match(moduleRegex);
    if (modMatch) {
      if (currentModule) {
        modules.push(currentModule);
      }
      currentSection = 'MODULE';
      const unitNum = modMatch[1];
      const title = modMatch[2] ? modMatch[2].trim() : `Unit ${unitNum}`;
      currentModule = {
        title: `MODULE-${unitNum}: ${title}`,
        topics: ''
      };
      continue;
    }

    // Process content according to current section
    if (currentSection === 'OBJECTIVES') {
      if (/^(?:CO\d+|MODULE|UNIT|Text|References?)/i.test(line)) {
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
      if (/^(?:MODULE|UNIT|Text|References?)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      const coMatch = line.match(/^(?:CO\s*(\d+)[:.]?|Course\s+Outcome\s*(\d+)[:.]?|[0-9]+[.)])\s*(.*)/i);
      if (coMatch) {
        outcomes.push(coMatch[3] ? coMatch[3].trim() : line);
      } else if (outcomes.length > 0) {
        outcomes[outcomes.length - 1] += ' ' + line;
      }
    } else if (currentSection === 'MODULE' && currentModule) {
      if (/^(?:Text|References?|Course\s+Outcome|List\s+of\s+Exp)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      // Skip page numbers like "-- 1 of 2 --"
      if (/^--\s*\d+\s*of\s*\d+\s*--$/.test(line)) continue;
      currentModule.topics = (currentModule.topics ? currentModule.topics + ' ' : '') + line;
    } else if (currentSection === 'EXPERIMENTS') {
      if (/^(?:Text|References?|Course\s+Outcome)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        labExperiments.push(line.trim());
      } else if (labExperiments.length > 0) {
        labExperiments[labExperiments.length - 1] += ' ' + line;
      }
    } else if (currentSection === 'TEXTBOOKS') {
      if (/^(?:References?|Course\s+Outcome|MODULE)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        textBooks.push(line.replace(/^[0-9]+[.)]\s*/, '').trim());
      } else if (textBooks.length > 0 && !line.startsWith('--')) {
        textBooks[textBooks.length - 1] += ' ' + line;
      } else if (!line.startsWith('--')) {
        textBooks.push(line.trim());
      }
    } else if (currentSection === 'REFERENCES') {
      if (/^(?:Course\s+Outcome|MODULE)/i.test(line)) {
        currentSection = null;
        i--;
        continue;
      }
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        referenceBooks.push(line.replace(/^[0-9]+[.)]\s*/, '').trim());
      } else if (referenceBooks.length > 0 && !line.startsWith('--')) {
        referenceBooks[referenceBooks.length - 1] += ' ' + line;
      } else if (!line.startsWith('--')) {
        referenceBooks.push(line.trim());
      }
    }
  }

  if (currentModule) {
    modules.push(currentModule);
  }

  // Clean outcomes if they were captured under objectives
  if (outcomes.length === 0 && objectives.length > 0 && objectives.some(o => /CO\d+/i.test(o))) {
    outcomes = objectives;
    objectives = [];
  }

  return {
    objectives: objectives.filter(Boolean),
    outcomes: outcomes.filter(Boolean),
    modules: modules.filter(m => m.topics && m.topics.length > 5),
    textBooks: textBooks.filter(Boolean),
    referenceBooks: referenceBooks.filter(Boolean),
    labExperiments: labExperiments.filter(Boolean)
  };
}

async function run() {
  const testFiles = [
    'BCS-301_Syllabus.pdf',
    'BCS-302_Syllabus.pdf',
    'BCS-401_Syllabus.pdf',
    'BCS-051_Syllabus.pdf',
    'BCS-071_Syllabus.pdf',
    'MCS-101_Syllabus.pdf',
    'MCS-201_Syllabus.pdf'
  ];

  for (const f of testFiles) {
    const fullPath = path.join('public/uploads/syllabus/subjects', f);
    if (!fs.existsSync(fullPath)) continue;
    const buf = fs.readFileSync(fullPath);
    const parser = new PDFParse(new Uint8Array(buf));
    await parser.load();
    const res = await parser.getText();
    const parsed = extractSyllabusFromText(res.text || '', f);
    console.log(`\n==================================================`);
    console.log(`FILE: ${f}`);
    console.log(`Modules: ${parsed.modules.length} ->`, parsed.modules.map(m => m.title));
    console.log(`Outcomes: ${parsed.outcomes.length}`);
    console.log(`Textbooks: ${parsed.textBooks.length}`);
    console.log(`References: ${parsed.referenceBooks.length}`);
  }
}

run().catch(console.error);
