const fs = require('fs');
const path = require('path');

const raw1 = fs.readFileSync(path.join(__dirname, 'btech_cc_year_1_raw.txt'), 'utf-8');
const sem1_codes = ['ENG105', 'MAT102', 'PHY105', 'BEE101', 'BCSI101', 'IIOT1', 'PHY106', 'BEE102', 'BCSI102', 'BME101', 'BCSI103', 'ENG113'];
const sem2_codes = ['ENG106', 'MAT103', 'PHY107', 'CHY103', 'BCSI201', 'BCSI202', 'IIOT2', 'ENG107', 'PHY108', 'BCSI203', 'BCSI204', 'ENG114', 'SEP200'];

console.log('--- YEAR 1 CODE OCCURRENCES ---');
[...sem1_codes, ...sem2_codes].forEach(c => {
  const norm = c.replace(/(\d+)/, ' $1');
  const r = new RegExp(`(${c}|${norm})`, 'gi');
  const count = (raw1.match(r) || []).length;
  console.log(`${c}: ${count} occurrences`);
});

