const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function testMcs() {
  const buf = fs.readFileSync('public/uploads/syllabus/subjects/MCS-101_Syllabus.pdf');
  const parser = new PDFParse(new Uint8Array(buf));
  await parser.load();
  const res = await parser.getText();
  console.log('--- MCS-101 TEXT ---');
  console.log(res.text);
}

testMcs().catch(console.error);
