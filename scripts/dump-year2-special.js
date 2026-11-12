const fs = require('fs');
const path = require('path');

const raw2 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_2_raw.txt'), 'utf-8');
const pages = raw2.split(/-- \d+ of \d+ --/);

console.log('--- PAGE 28 (BCSICT401) ---');
console.log(pages[27]);

console.log('--- PAGE 29 (BCSICT401 cont.) ---');
console.log(pages[28]);

console.log('--- PAGE 30 (BCSICT402) ---');
console.log(pages[29]);

console.log('--- PAGE 31 (BCSICT402 cont.) ---');
console.log(pages[30]);

console.log('--- PAGE 36 (BCSICT403) ---');
console.log(pages[35]);

