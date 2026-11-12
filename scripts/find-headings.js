const fs = require('fs');
const path = require('path');

for (let y = 1; y <= 4; y++) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n================== YEAR ${y} SUBJECT HEADINGS ==================`);
  
  // Find lines with course codes like BCSI, BCSICT, BCSAI, ENG, MAT, PHY, CHY, BEE, BME, IIOT, HAS
  const matches = text.match(/([A-Z]{3,6}\s*\d{3,4}|IIOT\d)[\s\S]{0,100}?(?=\n)/g) || [];
  const unique = Array.from(new Set(matches.map(m => m.trim()))).slice(0, 40);
  console.log(unique.join('\n'));
}

