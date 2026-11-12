const http = require('http');

const urls = [
  'http://localhost:3000/engineering',
  'http://localhost:3000/syllabus/BTECH-CSE-CC',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/1',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/2',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/3',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/4',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/5',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/6',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/7',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/8',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/1/ENG105',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/3/BCSI301',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/4/BCSICT401',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/5/BCSICT501',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/6/BCSICT602',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/7/BCSICT701',
  'http://localhost:3000/syllabus/BTECH-CSE-CC/semester/8/BCSAI803',
  'http://localhost:3000/uploads/syllabus/btech_cse_cc/BTech_CSE_CC_Year_1_Syllabus.pdf'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          ok: res.statusCode === 200,
          length: data.length,
          titleSnippet: (data.match(/<title>([^<]*)<\/title>/) || [])[1] || null
        });
      });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', ok: false, error: err.message });
    });
  });
}

async function verifyAll() {
  console.log('=== VERIFYING B.TECH CSE (CLOUD COMPUTING) LIVE ROUTES ===');
  let passCount = 0;
  for (const u of urls) {
    const res = await checkUrl(u);
    const mark = res.ok ? '✓' : '✗';
    console.log(`${mark} [${res.status}] ${res.url} ${res.titleSnippet ? `| Title: ${res.titleSnippet}` : `(${res.length} bytes)`}`);
    if (res.ok) passCount++;
  }
  console.log(`\nResults: ${passCount} / ${urls.length} passed.`);
  if (passCount !== urls.length) process.exit(1);
}

verifyAll();
