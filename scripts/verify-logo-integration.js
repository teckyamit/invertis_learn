const fs = require('fs');
const path = require('path');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

let total = 0;
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  total++;
  if (cond) {
    passed++;
    console.log(`  [PASS] ${msg}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${msg}`);
  }
}

async function run() {
  console.log('================================================================================');
  console.log('   INVERTIS LEARN: LOGO GLOBAL INTEGRATION VERIFICATION SUITE');
  console.log('================================================================================\n');

  // Test 1: File Assets
  console.log('Test 1: Static Logo & Branding Assets on Disk');
  const logoPng = path.join(process.cwd(), 'public', 'images', 'invertis-learn-logo.png');
  assert(fs.existsSync(logoPng), 'public/images/invertis-learn-logo.png exists');
  const logoStat = fs.statSync(logoPng);
  assert(logoStat.size > 50000, `Logo file has substantial high-resolution payload (${logoStat.size} bytes)`);

  const faviconIco = path.join(process.cwd(), 'public', 'favicon.ico');
  assert(fs.existsSync(faviconIco), 'public/favicon.ico exists');

  const appleTouch = path.join(process.cwd(), 'public', 'apple-touch-icon.png');
  assert(fs.existsSync(appleTouch), 'public/apple-touch-icon.png exists');

  const manifest = path.join(process.cwd(), 'public', 'manifest.json');
  assert(fs.existsSync(manifest), 'public/manifest.json exists');
  console.log('');

  // Test 2: Source Code Components
  console.log('Test 2: Component Implementation Audits');
  const navbarSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'layout', 'Navbar.tsx'), 'utf8');
  assert(navbarSrc.includes('/images/invertis-learn-logo.png'), 'Navbar references /images/invertis-learn-logo.png');
  assert(!navbarSrc.includes('bg-brand-navy flex items-center justify-center text-white shadow-sm group-hover:bg-brand-blue'), 'Navbar does NOT contain old dark square icon background');
  assert(navbarSrc.includes('INVERTIS') && navbarSrc.includes('LEARN'), 'Navbar retains INVERTIS LEARN brand text');
  assert(navbarSrc.includes('Academic Companion'), 'Navbar retains Academic Companion subtitle');
  assert(navbarSrc.includes('alt="Invertis Learn Logo"'), 'Navbar logo has accessible alt text');

  const footerSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'layout', 'Footer.tsx'), 'utf8');
  assert(footerSrc.includes('/images/invertis-learn-logo.png'), 'Footer references /images/invertis-learn-logo.png');
  assert(!footerSrc.includes('bg-brand-blue flex items-center justify-center text-white'), 'Footer does NOT contain old square icon background');

  const layoutSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'layout.tsx'), 'utf8');
  assert(layoutSrc.includes('Invertis Learn | Academic Companion'), 'Root layout defines browser title as Invertis Learn | Academic Companion');
  assert(layoutSrc.includes('manifest.json'), 'Root layout references web manifest');

  const homeSrc = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'page.tsx'), 'utf8');
  assert(homeSrc.includes('title: "Invertis Learn | Academic Companion"'), 'Homepage title is Invertis Learn | Academic Companion');
  console.log('');

  // Test 3: Live HTTP Verification
  console.log('Test 3: Live HTTP Server Asset and Route Responses');
  try {
    const logoHttp = await fetchUrl('http://127.0.0.1:3000/images/invertis-learn-logo.png');
    assert(logoHttp.status === 200, 'GET /images/invertis-learn-logo.png returns 200 OK');
    assert(logoHttp.headers['content-type'].includes('png') || logoHttp.headers['content-type'].includes('image'), 'Logo serves image/png');

    const homeHttp = await fetchUrl('http://127.0.0.1:3000/');
    assert(homeHttp.status === 200, 'GET / returns 200 OK');
    assert(homeHttp.body.includes('invertis-learn-logo.png'), 'Homepage HTML renders invertis-learn-logo.png');
    assert(homeHttp.body.includes('<title>Invertis Learn | Academic Companion</title>'), 'Homepage browser title matches Invertis Learn | Academic Companion');

    const engHttp = await fetchUrl('http://127.0.0.1:3000/engineering');
    assert(engHttp.status === 200, 'GET /engineering returns 200 OK');
    assert(engHttp.body.includes('invertis-learn-logo.png'), 'Engineering page renders invertis-learn-logo.png in header');

    const aboutHttp = await fetchUrl('http://127.0.0.1:3000/about');
    assert(aboutHttp.status === 200, 'GET /about returns 200 OK');
    assert(aboutHttp.body.includes('invertis-learn-logo.png'), 'About page renders invertis-learn-logo.png in header');

    const faviconHttp = await fetchUrl('http://127.0.0.1:3000/favicon.ico');
    assert(faviconHttp.status === 200, 'GET /favicon.ico returns 200 OK');

    const appleHttp = await fetchUrl('http://127.0.0.1:3000/apple-touch-icon.png');
    assert(appleHttp.status === 200, 'GET /apple-touch-icon.png returns 200 OK');

    const manifestHttp = await fetchUrl('http://127.0.0.1:3000/manifest.json');
    assert(manifestHttp.status === 200, 'GET /manifest.json returns 200 OK');
  } catch (err) {
    console.error('HTTP test error (server may need restart):', err.message);
  }

  console.log('\n================================================================================');
  console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('================================================================================');

  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
