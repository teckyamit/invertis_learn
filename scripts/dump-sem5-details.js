const fs = require('fs');
const path = require('path');

const raw3 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_3_raw.txt'), 'utf-8');
const pages = raw3.split(/-- \d+ of \d+ --/);

for (let i = 4; i <= 13; i++) {
  console.log(`\n=== PAGE ${i + 1} ===`);
  console.log(pages[i]);
}

