const fs = require('fs');
const path = require('path');

const raw4 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_4_raw.txt'), 'utf-8');
const pages = raw4.split(/-- \d+ of \d+ --/);

for (let i = 4; i < pages.length; i++) {
  console.log(`\n================ PAGE ${i + 1} ================`);
  console.log(pages[i]);
}

