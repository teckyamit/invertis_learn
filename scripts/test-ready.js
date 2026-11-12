const fs = require('fs');
const path = require('path');

// Let's read the 4 raw text files and inspect the detailed syllabus pages
const raw1 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_1_raw.txt'), 'utf-8');
const raw2 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_2_raw.txt'), 'utf-8');
const raw3 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_3_raw.txt'), 'utf-8');
const raw4 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_4_raw.txt'), 'utf-8');

console.log('Year 1 raw length:', raw1.length);
console.log('Year 2 raw length:', raw2.length);
console.log('Year 3 raw length:', raw3.length);
console.log('Year 4 raw length:', raw4.length);

