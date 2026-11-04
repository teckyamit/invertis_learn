const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

async function testSamplePdfs() {
  const dir = 'public/uploads/syllabus/subjects';
  const sampleFiles = [
    'BCS-301_Syllabus.pdf',
    'BCS-302_Syllabus.pdf',
    'BCS-051_Syllabus.pdf',
    'BCS-071_Syllabus.pdf',
    'MTCS-101_Syllabus.pdf',
    'MTCS-201_Syllabus.pdf',
    'BCSAI201_Syllabus.pdf',
    'BCSAI301_Syllabus.pdf'
  ];

  for (const f of sampleFiles) {
    const fullPath = path.join(dir, f);
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${f}`);
      continue;
    }
    const buf = fs.readFileSync(fullPath);
    const parser = new PDFParse(new Uint8Array(buf));
    await parser.load();
    const res = await parser.getText();
    const txt = (res.text || '').trim();
    console.log(`\n======================================================`);
    console.log(`FILE: ${f} (Length: ${txt.length} chars)`);
    console.log(`PREVIEW (first 400 chars):`);
    console.log(txt.substring(0, 400));
  }
}

testSamplePdfs().catch(console.error);

