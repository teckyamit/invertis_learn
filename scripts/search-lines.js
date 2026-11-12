const fs = require('fs');
const path = require('path');

const raw1 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_1_raw.txt'), 'utf-8');
const lines = raw1.split('\n');

['BCSI101', 'PHY106', 'BEE102', 'BME101', 'BCSI103', 'ENG113', 'BCSI201', 'BCSI202', 'ENG107', 'PHY108', 'BCSI203', 'BCSI204', 'ENG114'].forEach(c => {
  console.log(`\n=== SEARCH ${c} ===`);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(c)) {
      console.log(`Line ${i}: ${lines[i].trim()}`);
      for (let j = 1; j <= 4 && i + j < lines.length; j++) {
        console.log(`  + ${lines[i + j].trim()}`);
      }
    }
  }
});

