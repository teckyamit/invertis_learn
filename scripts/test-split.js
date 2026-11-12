const fs = require('fs');
const path = require('path');

function splitSubjects(filePath) {
  const text = fs.readFileSync(filePath, 'utf-8');
  // Look for headings like:
  // ENG 105: ENGLISH or BCSICT501 Cloud Computing
  // or [A-Z]{3,6}\s*\d{3}:? ...
  const lines = text.split('\n');
  const subjects = [];
  let current = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Match something like "BCSICT501 Cloud Computing" or "BCSICT 502 - Network Security" or "ENG 105: ENGLISH"
    // or "IIOT1: Fundamentals..."
    const match = line.match(/^([A-Z]{3,7}\s*\d{3,4}|IIOT\d)\s*[:-]?\s*(.*)/i);
    // Ignore table headers like "COURSE CODE" or "TOTAL"
    if (match && !line.includes('Hours per week') && !line.includes('Total Credits') && !line.includes('Continuous Assessment') && !line.startsWith('Sl.') && !line.startsWith('No.')) {
      const code = match[1].replace(/\s+/g, ' ').trim();
      const rest = match[2].trim();
      if (rest.length > 2 || (lines[i+1] && lines[i+1].includes('L T P'))) {
        if (current) subjects.push(current);
        current = { code, title: rest, startLine: i, lines: [line] };
        continue;
      }
    }
    if (current) {
      current.lines.push(line);
    }
  }
  if (current) subjects.push(current);
  return subjects;
}

for (let y = 1; y <= 4; y++) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const subs = splitSubjects(filePath);
  console.log(`Year ${y}: found ${subs.length} subject blocks`);
  subs.forEach(s => {
    console.log(`  - ${s.code}: ${s.title.substring(0, 40)} (${s.lines.length} lines)`);
  });
}

