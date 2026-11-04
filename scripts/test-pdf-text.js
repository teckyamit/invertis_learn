const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

async function testPdf() {
  const buf = fs.readFileSync('public/uploads/syllabus/subjects/BCSAI103_Syllabus.pdf');
  const parsed = await pdfParse(buf);
  console.log('--- BCSAI 103 TEXT ---');
  console.log(parsed.text);
}

testPdf().catch(console.error);

