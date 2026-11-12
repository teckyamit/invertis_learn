const fs = require('fs');
const path = require('path');

for (let y = 1; y <= 4; y++) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n================== YEAR ${y} ==================`);
  
  // Find lines up to first 120 lines to see the scheme
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  console.log(lines.slice(0, 70).join('\n'));
}

