const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const userUploadedDir = path.join(
  process.env.USERPROFILE || 'C:\\Users\\amitp',
  '.gemini',
  'antigravity',
  'brain',
  'b8f499ed-4ced-49c7-9a45-e44e4aa6579c',
  '.user_uploaded'
);

const files = [
  { year: 1, file: 'media_1794217481486_b16af621.pdf' },
  { year: 2, file: 'media_1794217481423_88dcfe26.pdf' },
  { year: 3, file: 'media_1794217481378_345509a0.pdf' },
  { year: 4, file: 'media_1794217481378_f3607196.pdf' },
];

async function main() {
  for (const item of files) {
    const fullPath = path.join(userUploadedDir, item.file);
    if (!fs.existsSync(fullPath)) {
      console.log(`Year ${item.year}: File not found: ${fullPath}`);
      continue;
    }
    const buf = fs.readFileSync(fullPath);
    const parser = new PDFParse(new Uint8Array(buf));
    await parser.load();
    const res = await parser.getText();
    const text = typeof res === 'string' ? res : (res.text || JSON.stringify(res));
    console.log(`\n=== Year ${item.year} (${item.file}) ===`);
    console.log(`Length: ${text.length} chars`);
    console.log(`First 300 chars:\n${text.substring(0, 300)}`);
    
    const outPath = path.join(__dirname, `btech_cc_year_${item.year}_raw.txt`);
    fs.writeFileSync(outPath, text);
    console.log(`Saved text to ${outPath}`);
  }
}

main().catch(console.error);
