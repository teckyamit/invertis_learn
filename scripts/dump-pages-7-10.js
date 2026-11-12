const fs = require('fs');
const path = require('path');

const raw3 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_3_raw.txt'), 'utf-8');
const pages = raw3.split(/-- \d+ of \d+ --/);

[7, 8, 9, 10].forEach(p => {
  console.log(`\n================ PAGE ${p + 1} ================`);
  console.log(pages[p]);
});

