const http = require('http');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function verifyAll() {
  console.log('========================================================================');
  console.log('INVERTIS LEARN - GLOBAL COURSE REORGANIZATION & IOT REMOVAL VERIFICATION');
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Verify BTECH-CSE-IOT is removed from Database
    console.log('Check 1: Database Verification');
    const iotDb = await prisma.programme.findUnique({ where: { code: 'BTECH-CSE-IOT' } });
    assert(iotDb === null, 'BTECH-CSE-IOT does not exist in prisma/dev.db');

    const totalProgrammes = await prisma.programme.count({ where: { isActive: true, isLateralEntry: false } });
    console.log(`  Total active canonical programmes: ${totalProgrammes}`);

    // Verify other specializations remain intact
    const aiProg = await prisma.programme.findUnique({ where: { code: 'BTECH-CSE-AI' } });
    const ccProg = await prisma.programme.findUnique({ where: { code: 'BTECH-CSE-CC' } });
    const dipProg = await prisma.programme.findUnique({ where: { code: 'DIP-CSE' } });
    const regProg = await prisma.programme.findUnique({ where: { code: 'BTECH-CSE' } });
    const mtechProg = await prisma.programme.findUnique({ where: { code: 'MTECH-CSE' } });
    const phdProg = await prisma.programme.findUnique({ where: { code: 'PHD-009' } });

    assert(aiProg !== null, 'BTECH-CSE-AI exists and is intact');
    assert(ccProg !== null, 'BTECH-CSE-CC (Cloud Computing) exists and is intact');
    assert(dipProg !== null, 'DIP-CSE (Diploma) exists and is intact');
    assert(regProg !== null, 'BTECH-CSE (Regular) exists and is intact');
    assert(mtechProg !== null, 'MTECH-CSE exists and is intact');
    assert(phdProg !== null, 'PHD-009 (Ph.D.) exists and is intact');

    // 2. Verify Homepage (/)
    console.log('\nCheck 2: Live Homepage (/)');
    const homeRes = await fetchUrl('/');
    assert(homeRes.status === 200, `Homepage returned status 200`);
    assert(!homeRes.body.includes('BTECH-CSE-IOT'), 'Homepage does not contain BTECH-CSE-IOT');
    assert(!homeRes.body.includes('Internet of Things'), 'Homepage does not contain "Internet of Things"');
    
    // Check order on homepage: Diploma appears before B.Tech, before M.Tech, before Ph.D.
    const dipIdx = homeRes.body.indexOf('Diploma in Computer Science &amp; Engineering') !== -1 ?
      homeRes.body.indexOf('Diploma in Computer Science &amp; Engineering') : homeRes.body.indexOf('Diploma in CSE');
    const btechIdx = homeRes.body.indexOf('B.Tech CSE (Regular)');
    const mtechIdx = homeRes.body.indexOf('M.Tech CSE (Computer Science &amp; Engineering)');
    const phdIdx = homeRes.body.indexOf('Ph.D. in Computer Science &amp; Engineering');

    assert(dipIdx !== -1 && btechIdx !== -1 && mtechIdx !== -1 && phdIdx !== -1, 'All 4 canonical CSE tiers present on homepage');
    assert(dipIdx < btechIdx, `Diploma (idx: ${dipIdx}) appears before B.Tech (idx: ${btechIdx}) on Homepage`);
    assert(btechIdx < mtechIdx, `B.Tech (idx: ${btechIdx}) appears before M.Tech (idx: ${mtechIdx}) on Homepage`);
    assert(mtechIdx < phdIdx, `M.Tech (idx: ${mtechIdx}) appears before Ph.D. (idx: ${phdIdx}) on Homepage`);

    // 3. Verify Engineering Page (/engineering)
    console.log('\nCheck 3: Live Engineering Directory (/engineering)');
    const engRes = await fetchUrl('/engineering');
    assert(engRes.status === 200, 'Engineering page returned status 200');
    assert(!engRes.body.includes('BTECH-CSE-IOT'), 'Engineering page does not contain BTECH-CSE-IOT');
    assert(engRes.body.includes('Diploma Programmes'), 'Engineering page has "Diploma Programmes" section');
    assert(engRes.body.includes('Undergraduate (UG) Programmes'), 'Engineering page has "Undergraduate (UG) Programmes" section');
    assert(engRes.body.includes('Postgraduate (PG) Programmes'), 'Engineering page has "Postgraduate (PG) Programmes" section');
    assert(engRes.body.includes('Doctoral (Ph.D.) Programmes'), 'Engineering page has "Doctoral (Ph.D.) Programmes" section');

    const engDip = engRes.body.indexOf('Diploma Programmes');
    const engUg = engRes.body.indexOf('Undergraduate (UG) Programmes');
    const engPg = engRes.body.indexOf('Postgraduate (PG) Programmes');
    const engPhd = engRes.body.indexOf('Doctoral (Ph.D.) Programmes');

    assert(engDip < engUg, `Diploma section (${engDip}) precedes UG section (${engUg}) in Engineering Directory`);
    assert(engUg < engPg, `UG section (${engUg}) precedes PG section (${engPg}) in Engineering Directory`);
    assert(engPg < engPhd, `PG section (${engPg}) precedes Doctoral section (${engPhd}) in Engineering Directory`);

    // 4. Verify Course Catalog (/programmes)
    console.log('\nCheck 4: Live University Course Catalog (/programmes)');
    const progRes = await fetchUrl('/programmes');
    assert(progRes.status === 200, 'Programmes catalog returned status 200');
    assert(!progRes.body.includes('BTECH-CSE-IOT'), 'Programmes catalog does not contain BTECH-CSE-IOT');
    assert(progRes.body.includes('Diploma Programmes'), 'Programmes catalog has "Diploma Programmes" section');
    assert(progRes.body.includes('Undergraduate (UG) Programmes'), 'Programmes catalog has "Undergraduate (UG) Programmes" section');
    assert(progRes.body.includes('Postgraduate (PG) Programmes'), 'Programmes catalog has "Postgraduate (PG) Programmes" section');
    assert(progRes.body.includes('Doctoral (Ph.D.) Programmes'), 'Programmes catalog has "Doctoral (Ph.D.) Programmes" section');

    const catDip = progRes.body.indexOf('Diploma Programmes');
    const catUg = progRes.body.indexOf('Undergraduate (UG) Programmes');
    const catPg = progRes.body.indexOf('Postgraduate (PG) Programmes');
    const catPhd = progRes.body.indexOf('Doctoral (Ph.D.) Programmes');

    assert(catDip < catUg, `Diploma section (${catDip}) precedes UG section (${catUg}) in Catalog`);
    assert(catUg < catPg, `UG section (${catUg}) precedes PG section (${catPg}) in Catalog`);
    assert(catPg < catPhd, `PG section (${catPg}) precedes Doctoral section (${catPhd}) in Catalog`);

    // 5. Verify Search Page (/search)
    console.log('\nCheck 5: Live Search Page (/search)');
    const searchRes = await fetchUrl('/search');
    assert(searchRes.status === 200, 'Search page returned status 200');
    assert(!searchRes.body.includes('value="BTECH-CSE-IOT"'), 'Search page dropdown does not include BTECH-CSE-IOT');

    // 6. Verify Syllabus Page (/syllabus)
    console.log('\nCheck 6: Live Syllabus Page (/syllabus)');
    const sylRes = await fetchUrl('/syllabus');
    assert(sylRes.status === 200, 'Syllabus page returned status 200');
    assert(!sylRes.body.includes('BTECH-CSE-IOT'), 'Syllabus page does not contain BTECH-CSE-IOT');
    assert(!sylRes.body.includes('(AI, Cloud, IoT)'), 'Syllabus catalog callout does not mention IoT');

    // 7. Verify removed route returns 404
    console.log('\nCheck 7: Removed Route Status');
    const removedRes = await fetchUrl('/programmes/BTECH-CSE-IOT');
    assert(removedRes.status === 404, `Removed course route /programmes/BTECH-CSE-IOT returns 404 (Got: ${removedRes.status})`);

    console.log(`\n========================================================================`);
    console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================================================\n`);

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Verification error:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAll();

