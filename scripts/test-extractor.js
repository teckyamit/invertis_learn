const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

function parseSyllabusText(text) {
  // Normalize whitespace and newlines
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  
  // Extract Course Outcomes
  const outcomes = [];
  const coRegex = /^(?:CO\s*(\d+)[:.]?|Course Outcome\s*(\d+)[:.]?)\s*(.*)/i;
  
  let inObjectives = false;
  let inOutcomes = false;
  let inModules = false;
  let inBooks = false;
  let inReferences = false;

  const modules = [];
  let currentModule = null;

  const textBooks = [];
  const referenceBooks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for Course Outcomes header or lines
    if (/^Course\s+Outcomes?(?:\s*\(COs\))?[:]?$/i.test(line) || /^Outcomes?[:]?$/i.test(line)) {
      inOutcomes = true;
      inObjectives = false;
      inModules = false;
      inBooks = false;
      inReferences = false;
      continue;
    }

    // Check for Module headers
    const modMatch = line.match(/^(?:MODULE|UNIT|Section)\s*[-:]?\s*([0-9IVX]+)[:.-]?\s*(.*)/i);
    if (modMatch) {
      inModules = true;
      inOutcomes = false;
      inObjectives = false;
      inBooks = false;
      inReferences = false;

      if (currentModule) {
        modules.push(currentModule);
      }
      currentModule = {
        title: `MODULE-${modMatch[1]}: ${modMatch[2] || 'Detailed Syllabus'}`,
        topics: ''
      };
      continue;
    }

    // Check for Textbooks / References header
    if (/^(?:Text\s*Books?|Recommended\s*Books?|Prescribed\s*Books?)[:]?$/i.test(line)) {
      inBooks = true;
      inModules = false;
      inOutcomes = false;
      inReferences = false;
      if (currentModule) {
        modules.push(currentModule);
        currentModule = null;
      }
      continue;
    }

    if (/^(?:References?|Reference\s*Books?|Text\s*\/\s*Reference\s*Books?)[:]?$/i.test(line)) {
      inReferences = true;
      inBooks = false;
      inModules = false;
      inOutcomes = false;
      if (currentModule) {
        modules.push(currentModule);
        currentModule = null;
      }
      continue;
    }

    // Capture outcomes
    if (inOutcomes || /^CO\s*\d+/i.test(line)) {
      const coMatch = line.match(/^CO\s*(\d+)[:.]?\s*(.*)/i);
      if (coMatch) {
        outcomes.push(coMatch[2].trim());
        continue;
      } else if (inOutcomes && outcomes.length > 0 && !line.startsWith('MODULE') && !line.startsWith('UNIT')) {
        // Multi-line outcome continuation
        outcomes[outcomes.length - 1] += ' ' + line;
        continue;
      }
    }

    // Capture books
    if (inBooks || inReferences) {
      if (/^[0-9]+[.)]\s*(.*)/.test(line)) {
        const bookText = line.replace(/^[0-9]+[.)]\s*/, '').trim();
        if (inBooks) textBooks.push(bookText);
        else referenceBooks.push(bookText);
        continue;
      } else if (inReferences && !line.startsWith('MODULE') && !line.startsWith('Course')) {
        if (referenceBooks.length > 0) {
          referenceBooks[referenceBooks.length - 1] += ' ' + line;
        } else {
          referenceBooks.push(line);
        }
        continue;
      }
    }

    // Capture modules topics
    if (inModules && currentModule) {
      if (!/^Course\s+Outcome/i.test(line) && !/^References?/i.test(line) && !/^Text/i.test(line)) {
        currentModule.topics = (currentModule.topics ? currentModule.topics + ' ' : '') + line;
      }
    }
  }

  if (currentModule) {
    modules.push(currentModule);
  }

  return { outcomes, modules, textBooks, referenceBooks };
}

async function testExtraction() {
  const files = ['BCS-301_Syllabus.pdf', 'BCS-302_Syllabus.pdf', 'MCS-101_Syllabus.pdf'];
  for (const f of files) {
    const fullPath = path.join('public/uploads/syllabus/subjects', f);
    const buf = fs.readFileSync(fullPath);
    const parser = new PDFParse(new Uint8Array(buf));
    await parser.load();
    const res = await parser.getText();
    const parsed = parseSyllabusText(res.text || '');
    console.log(`\n======================================================`);
    console.log(`FILE: ${f}`);
    console.log(`Outcomes (${parsed.outcomes.length}):`, parsed.outcomes);
    console.log(`Modules (${parsed.modules.length}):`, parsed.modules.map(m => m.title));
    console.log(`Textbooks (${parsed.textBooks.length}):`, parsed.textBooks);
    console.log(`References (${parsed.referenceBooks.length}):`, parsed.referenceBooks);
  }
}

testExtraction().catch(console.error);
