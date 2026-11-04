const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function testPdf() {
  const buf = fs.readFileSync('public/uploads/syllabus/subjects/BCSAI103_Syllabus.pdf');
  const uint8 = new Uint8Array(buf);
  const parser = new PDFParse(uint8);
  await parser.load();
  const res = await parser.getText();
  console.log('--- BCSAI 103 EXTRACTED TEXT ---');
  console.log(res);
}

testPdf().catch(console.error);
