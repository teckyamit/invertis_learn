const fs = require('fs');
const path = require('path');

for (let y = 1; y <= 4; y++) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n================== YEAR ${y} EVALUATION SCHEMES ==================`);
  
  // Find "STUDY AND EVALUATION SCHEME" occurrences
  const regex = /STUDY AND EVALUATION SCHEME[\s\S]*?(?=(STUDY AND EVALUATION SCHEME|-- \d+ of \d+ --\s+Detailed Syllabi|Detailed Syllabi|COURSE CODE|MODULE|Unit 1|Unit I|$))/gi;
  let match;
  let count = 0;
  while ((match = regex.exec(text)) !== null && count < 3) {
    count++;
    console.log(`\n--- Match ${count} in Year ${y} ---`);
    console.log(match[0].substring(0, 1500));
  }
}

