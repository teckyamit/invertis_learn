const http = require('http');

const urls = [
  'http://127.0.0.1:3000/engineering',
  'http://127.0.0.1:3000/syllabus/DIP-CSE',
  'http://127.0.0.1:3000/syllabus/DIP-CSE?entry=lateral',
  'http://127.0.0.1:3000/syllabus/DIP-CSE/semester/1',
  'http://127.0.0.1:3000/syllabus/DIP-CSE/semester/3',
  'http://127.0.0.1:3000/syllabus/DIP-CSE/semester/5/DCS501',
  'http://127.0.0.1:3000/syllabus/DIP-CSE/semester/6/DCS601',
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          statusCode: res.statusCode,
          length: data.length,
          hasTitle: data.includes('Diploma in Computer Science') || data.includes('DCS501') || data.includes('Web Technology') || data.includes('DIP-CSE'),
          hasBadge: data.includes('Lateral Entry Available') || data.includes('Full Resources Live'),
        });
      });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function main() {
  console.log('Testing live Diploma routes...');
  for (const u of urls) {
    const res = await fetchUrl(u);
    console.log(JSON.stringify(res, null, 2));
  }
}

main();

