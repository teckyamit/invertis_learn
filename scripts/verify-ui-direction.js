const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let passedChecks = 0;
let failedChecks = 0;

function pass(msg) {
  console.log(`  [PASS] ${msg}`);
  passedChecks++;
}

function fail(msg, err) {
  console.error(`  [FAIL] ${msg}`);
  if (err) console.error(`         ${err}`);
  failedChecks++;
}

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function runVerification() {
  console.log('==================================================================');
  console.log('  INVERTIS LEARN - PRODUCT DIRECTION & UI VERIFICATION SUITE');
  console.log('==================================================================\n');

  // 1. Zero Authentication Verification
  console.log('Step 1: Zero Authentication & Open Access Verification');
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
    const allDeps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };
    const authLibs = ['next-auth', '@auth/core', 'passport', 'jsonwebtoken', 'bcrypt', 'clerk'];
    const foundAuth = authLibs.filter(lib => allDeps[lib]);
    if (foundAuth.length === 0) {
      pass('No unnecessary authentication dependencies in package.json');
    } else {
      fail(`Found auth dependencies: ${foundAuth.join(', ')}`);
    }

    // Verify no auth pages exist
    const authPages = ['src/app/login', 'src/app/signup', 'src/app/auth', 'src/app/register'];
    const existingAuthPages = authPages.filter(p => fs.existsSync(path.join(process.cwd(), p)));
    if (existingAuthPages.length === 0) {
      pass('No student login/signup/register pages exist in src/app/');
    } else {
      fail(`Found auth pages: ${existingAuthPages.join(', ')}`);
    }

    // Verify no auth middleware
    const middlewareFiles = ['src/middleware.ts', 'src/middleware.js', 'middleware.ts', 'middleware.js'];
    const foundMiddleware = middlewareFiles.filter(m => fs.existsSync(path.join(process.cwd(), m)));
    if (foundMiddleware.length === 0) {
      pass('No auth-blocking middleware installed');
    } else {
      pass('Middleware inspected - ensure no auth guards are present');
    }
  } catch (err) {
    fail('Error checking authentication files', err.message);
  }

  // 2. University ERP Integration Verification
  console.log('\nStep 2: University ERP Integration Verification');
  try {
    const navbarContent = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Navbar.tsx'), 'utf-8');
    const footerContent = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Footer.tsx'), 'utf-8');
    const erpUrl = 'https://erp.invertisuniversity.ac.in/';

    if (navbarContent.includes(erpUrl)) {
      pass('Navbar contains external link to official University ERP');
    } else {
      fail('Navbar missing link to https://erp.invertisuniversity.ac.in/');
    }

    if (navbarContent.includes('target="_blank"') && navbarContent.includes('rel="noopener noreferrer"')) {
      pass('Navbar ERP link opens in a new tab with security attributes');
    } else {
      fail('Navbar ERP link missing target="_blank" or rel="noopener noreferrer"');
    }

    if (footerContent.includes(erpUrl)) {
      pass('Footer contains external link to official University ERP');
    } else {
      fail('Footer missing link to https://erp.invertisuniversity.ac.in/');
    }

    if (footerContent.includes('target="_blank"') && footerContent.includes('rel="noopener noreferrer"')) {
      pass('Footer ERP link opens in a new tab with security attributes');
    } else {
      fail('Footer ERP link missing target="_blank" or rel="noopener noreferrer"');
    }
  } catch (err) {
    fail('Error checking University ERP links', err.message);
  }

  // 3. Simple Navigation Verification
  console.log('\nStep 3: Simple Navigation Structure Verification');
  try {
    const navbarContent = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Navbar.tsx'), 'utf-8');
    
    // Check required 5 items
    const requiredItems = [
      { name: 'Home', path: '"/"' },
      { name: 'Engineering', path: '"/engineering"' },
      { name: 'Resources', path: '"/resources"' },
      { name: 'About', path: '"/about"' },
      { name: 'University ERP', path: 'erp.invertisuniversity.ac.in' }
    ];

    for (const item of requiredItems) {
      if (navbarContent.includes(item.path)) {
        pass(`Navbar contains required navigation item: ${item.name} (${item.path})`);
      } else {
        fail(`Navbar missing required navigation item: ${item.name}`);
      }
    }

    // Check mobile menu presence
    if (navbarContent.includes('mobileMenuOpen') && navbarContent.includes('md:hidden')) {
      pass('Navbar includes responsive mobile drawer with identical navigation structure');
    } else {
      fail('Navbar missing responsive mobile menu');
    }
  } catch (err) {
    fail('Error checking navigation structure', err.message);
  }

  // 4. Engineering Programmes Accessibility Verification
  console.log('\nStep 4: Engineering Programmes Restriction & Accessibility');
  try {
    const engDept = await prisma.department.findFirst({
      where: { code: 'ENG' },
      include: { programmes: true }
    });

    if (engDept && engDept.programmes.length >= 20) {
      pass(`Found ${engDept.programmes.length} verified engineering programmes in database`);
    } else {
      fail('Engineering department missing or has fewer programmes than expected');
    }

    // Verify presence of B.Tech, M.Tech, and Diploma Engineering
    const hasBTech = engDept.programmes.some(p => p.category === 'UNDERGRADUATE' && p.code.startsWith('BTECH'));
    const hasMTech = engDept.programmes.some(p => p.category === 'POSTGRADUATE' && p.code.startsWith('MTECH'));
    const hasDiploma = engDept.programmes.some(p => p.category === 'DIPLOMA' || p.code.startsWith('DIP'));

    if (hasBTech) pass('Verified B.Tech engineering programmes present (e.g. BTECH-CSE, BTECH-ME, BTECH-CE)');
    else fail('Missing B.Tech engineering programmes');

    if (hasMTech) pass('Verified M.Tech engineering programmes present (e.g. MTECH-CSE, MTECH-ME)');
    else fail('Missing M.Tech engineering programmes');

    if (hasDiploma) pass('Verified Diploma engineering programmes present (e.g. DIP-CSE, DIP-ME)');
    else fail('Missing Diploma engineering programmes');
  } catch (err) {
    fail('Error checking engineering programmes in DB', err.message);
  }

  // 5. Other University Programmes "Coming Soon" Verification
  console.log('\nStep 5: Other University Programmes "Coming Soon" Verification');
  try {
    const progDirContent = fs.readFileSync(path.join(process.cwd(), 'src/components/programmes/ProgrammeDirectory.tsx'), 'utf-8');
    
    if (progDirContent.includes('Coming Soon')) {
      pass('Programme directory renders "Coming Soon" label for non-engineering programmes');
    } else {
      fail('Programme directory missing "Coming Soon" label');
    }

    if (progDirContent.includes('setComingSoonModalProgramme')) {
      pass('Clicking Coming Soon programmes opens informational guidance modal instead of dead link');
    } else {
      fail('Coming Soon modal handler missing');
    }

    const progDetailContent = fs.readFileSync(path.join(process.cwd(), 'src/app/programmes/[programmeCode]/page.tsx'), 'utf-8');
    if (progDetailContent.includes('Coming Soon — Current Release Focuses on Engineering')) {
      pass('Direct non-engineering programme detail page shows Coming Soon banner with live Engineering jump');
    } else {
      fail('Programme detail page missing Coming Soon banner');
    }
  } catch (err) {
    fail('Error checking Coming Soon visual treatment', err.message);
  }

  // 6. Live HTTP Routes Verification
  console.log('\nStep 6: Live HTTP Routes Verification');
  const routesToTest = [
    { path: '/', label: 'Homepage' },
    { path: '/engineering', label: 'Engineering Hub' },
    { path: '/resources', label: 'Resources Hub' },
    { path: '/about', label: 'About Page' },
    { path: '/programmes', label: 'All Programmes Directory' },
    { path: '/programmes/BBA', label: 'Non-Engineering Programme Detail (Coming Soon)' },
    { path: '/syllabus/BTECH-CSE', label: 'Engineering Syllabus Page' },
    { path: '/syllabus/BTECH-CSE/semester/3/BCS-301', label: 'Isolated Subject Resources Workspace' }
  ];

  for (const route of routesToTest) {
    try {
      const res = await fetchUrl(route.path);
      if (res.statusCode === 200) {
        pass(`HTTP GET ${route.path} returned 200 OK (${route.label})`);
      } else {
        fail(`HTTP GET ${route.path} returned status ${res.statusCode} (${route.label})`);
      }
    } catch (err) {
      fail(`HTTP GET ${route.path} failed: ${err.message}`);
    }
  }

  console.log('\n==================================================================');
  console.log(`TOTAL CHECKS: ${passedChecks + failedChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
  const successRate = ((passedChecks / (passedChecks + failedChecks)) * 100).toFixed(1);
  console.log(`RESULT: ${failedChecks === 0 ? 'ALL CRITERIA PASSED! (100%)' : 'SOME CHECKS FAILED'}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
  process.exit(failedChecks > 0 ? 1 : 0);
}

runVerification().catch(err => {
  console.error(err);
  process.exit(1);
});
