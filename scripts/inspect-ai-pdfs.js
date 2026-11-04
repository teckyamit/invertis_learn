const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const uploadDir = 'C:\\Users\\amitp\\.gemini\\antigravity\\brain\\b8f499ed-4ced-49c7-9a45-e44e4aa6579c\\.user_uploaded';
const files = [
  'media_1793768968232_90080010.pdf',
  'media_1793768968262_48da2cb4.pdf',
  'media_1793768968269_62050bb0.pdf',
  'media_1793768968347_1bf7eb92.pdf'
];

async function inspect() {
  for (const f of files) {
    const fullPath = path.join(uploadDir, f);
    const bytes = fs.readFileSync(fullPath);
    const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
    console.log(`FILE: ${f} -> Page count: ${doc.getPageCount()}`);
  }
}

inspect().catch(console.error);
