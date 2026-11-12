const http = require('http');

const urls = [
  'http://127.0.0.1:3000/',
  'http://127.0.0.1:3000/about',
  'http://127.0.0.1:3000/resources',
  'http://127.0.0.1:3000/career-pathways',
  'http://127.0.0.1:3000/phd',
  'http://127.0.0.1:3000/syllabus/PHD-009',
  'http://127.0.0.1:3000/syllabus/BTECH-CSE',
  'http://127.0.0.1:3000/syllabus/BTECH-CSE?entry=lateral',
  'http://127.0.0.1:3000/syllabus/MTECH-CSE',
  'http://127.0.0.1:3000/engineering',
  'http://127.0.0.1:3000/syllabus/DIP-CSE',
  'http://127.0.0.1:3000/syllabus/DIP-CSE?entry=lateral'
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          bytes: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function main() {
  console.log('Running site-wide health audit...');
  let allOk = true;
  for (const u of urls) {
    const res = await fetchUrl(u);
    console.log(`${res.status === 200 ? '✓' : '✗'} [${res.status}] ${res.url} (${res.bytes} bytes)`);
    if (res.status !== 200) allOk = false;
  }
  console.log(allOk ? '\nALL KEY PAGES HEALTHY AND VERIFIED LIVE!' : '\nSOME PAGES FAILED!');
}

main();

