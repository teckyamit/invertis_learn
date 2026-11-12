const fs = require('fs');
const path = require('path');

function parseTextToSubjects() {
  const allParsed = {};
  
  for (let y = 1; y <= 4; y++) {
    const raw = fs.readFileSync(path.join(__dirname, `btech_cc_year_${y}_raw.txt`), 'utf-8');
    const lines = raw.split('\n');
    let currentCode = null;
    let currentData = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check for code like "BCSICT 501: Cloud Computing" or "BCSICT501 Cloud Computing" or "BCSICT501 - ..."
      // or "ENG 105: ENGLISH"
      const match = line.match(/^([A-Z]{3,7}\s*\d{3,4}|IIOT\d)\s*[:-]?\s*(.*)/i);
      
      if (match && !line.includes('Hours per week') && !line.includes('Total Credits') && !line.includes('Continuous Assessment') && !line.startsWith('Sl.') && !line.startsWith('No.')) {
        // Normalize code
        const code = match[1].replace(/\s+/g, '').toUpperCase();
        const rawTitle = match[2].trim();
        
        // Check if next lines indicate a subject header
        const nextFew = lines.slice(i, i + 10).join(' ');
        if (nextFew.includes('Course Objective') || nextFew.includes('L T P') || nextFew.includes('MODULE') || nextFew.includes('Unit') || nextFew.includes('Text Books') || nextFew.includes('Course Outcome')) {
          if (currentCode && currentData) {
            allParsed[currentCode] = currentData;
          }
          currentCode = code;
          currentData = {
            rawCode: match[1].trim(),
            normalizedCode: code,
            title: rawTitle,
            year: y,
            rawText: line + '\n'
          };
          continue;
        }
      }
      
      if (currentData) {
        currentData.rawText += line + '\n';
      }
    }
    if (currentCode && currentData) {
      allParsed[currentCode] = currentData;
    }
  }
  
  console.log(`Total parsed subjects across 4 years: ${Object.keys(allParsed).length}`);
  Object.keys(allParsed).forEach(k => {
    console.log(`- ${k}: ${allParsed[k].title.substring(0, 35)} (${allParsed[k].rawText.length} chars)`);
  });
  
  fs.writeFileSync(path.join(__dirname, 'parsed_subjects_raw.json'), JSON.stringify(allParsed, null, 2));
}

parseTextToSubjects();

