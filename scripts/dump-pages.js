const fs = require('fs');
const path = require('path');

function getPageSummaries(y) {
  const filePath = path.join(__dirname, `btech_cc_year_${y}_raw.txt`);
  const text = fs.readFileSync(filePath, 'utf-8');
  const pages = text.split(/-- \d+ of \d+ --/);
  console.log(`\n=================== YEAR ${y} (PAGES: ${pages.length}) ===================`);
  pages.forEach((p, idx) => {
    const firstLines = p.trim().split('\n').filter(Boolean).slice(0, 3).join(' | ');
    console.log(`Page ${idx + 1}: ${firstLines.substring(0, 90)}`);
  });
}

for (let y = 1; y <= 4; y++) {
  getPageSummaries(y);
}

