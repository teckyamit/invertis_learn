const fs = require('fs');
const path = require('path');

for (let y = 1; y <= 4; y++) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  const matches = text.match(/.{0,50}IIOT\d.{0,100}/gi) || [];
  console.log(`Year ${y}: ${matches.length} matches for IIOT`);
  matches.forEach(m => console.log('  ', m.trim().replace(/\n/g, ' ')));
}

