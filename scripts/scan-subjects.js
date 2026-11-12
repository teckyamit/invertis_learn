const fs = require('fs');
const path = require('path');

function inspectYear(y) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  
  // Look for sections separated by "L T P C" or Course codes
  const lines = text.split('\n');
  console.log(`\n=================== YEAR ${y} SCAN ===================`);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.match(/^(BCSI|BCSICT|BCSAI|ENG|MAT|PHY|CHY|BEE|BME|IIOT|HAS)\s*\d+/i)) {
      console.log(`Line ${i}: ${l}`);
      // Print next 5 lines
      for (let j = 1; j <= 5 && i + j < lines.length; j++) {
        console.log(`   + ${lines[i + j].trim()}`);
      }
    }
  }
}

for (let y = 1; y <= 4; y++) {
  inspectYear(y);
}

