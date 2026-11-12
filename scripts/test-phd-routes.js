const http = require('http');

const urls = [
  'http://127.0.0.1:3000/engineering',
  'http://127.0.0.1:3000/phd',
  'http://127.0.0.1:3000/syllabus/PHD-009',
  'http://127.0.0.1:3000/syllabus/PHD-009/semester/1',
  'http://127.0.0.1:3000/programmes/PHD-009'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasSyllabusText: data.includes('PhD-032') || data.includes('PhDCS 103') || data.includes('Ph.D.')
        });
      });
    }).on('error', err => resolve({ url, status: 'ERROR: ' + err.message }));
  });
}

async function run() {
  for (const u of urls) {
    const result = await checkUrl(u);
    console.log(result.status, result.url, result.hasSyllabusText ? '(Syllabus content verified)' : '');
  }
}

run();

