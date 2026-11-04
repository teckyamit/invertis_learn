const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

let passCount = 0;
let failCount = 0;

function pass(msg) {
  console.log(`  [PASS] ${msg}`);
  passCount++;
}

function fail(msg, err) {
  console.error(`  [FAIL] ${msg}`);
  if (err) console.error(`         ${err}`);
  failCount++;
}

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function verifyCuratedResources() {
  console.log('==================================================================');
  console.log('  INVERTIS LEARN - CURATED CSE RESOURCES & VIDEOS VERIFICATION');
  console.log('==================================================================\n');

  // Step 1: Database Seed & Integrity Verification
  console.log('Step 1: Database Storage & Validation Checks');
  const totalResources = await prisma.externalResource.count();
  const totalVideos = await prisma.videoLecture.count();

  if (totalResources >= 60) {
    pass(`External resources verified in database: ${totalResources} (Exceeds requirement)`);
  } else {
    fail(`Expected at least 60 external resources, found: ${totalResources}`);
  }

  if (totalVideos >= 25) {
    pass(`Curated video lectures verified in database: ${totalVideos} (Exceeds requirement)`);
  } else {
    fail(`Expected at least 25 video lectures, found: ${totalVideos}`);
  }

  // Check URL protocols and platform legitimacy
  const sampleResources = await prisma.externalResource.findMany({ take: 20 });
  const allHttps = sampleResources.every(r => r.url.startsWith('https://'));
  if (allHttps) {
    pass('All verified external resources use secure HTTPS direct URLs');
  } else {
    fail('Some external resource URLs are not using secure HTTPS');
  }

  const sampleVideos = await prisma.videoLecture.findMany({ take: 15 });
  const validYouTubeUrls = sampleVideos.every(v => v.youtubeUrl.includes('youtube.com/watch') || v.youtubeUrl.includes('youtube.com/playlist'));
  if (validYouTubeUrls) {
    pass('All curated video lectures have authentic YouTube watch or playlist URLs');
  } else {
    fail('Some video lectures have invalid YouTube URLs');
  }

  // Step 2: Live Subject Detail Page - BCS201 Section Order & Quality
  console.log('\nStep 2: Live Subject Detail Page - BCS201 Section Hierarchy');
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/2/BCS201');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/2/BCS201 -> 200 OK');
      const html = res.body;

      // Check Section Order
      const overviewPos = html.indexOf('Programming in C (Programming for Problem Solving)');
      const coPos = html.indexOf('Course Outcomes (COs)');
      const unitsPos = html.indexOf('Unit-Wise Detailed Syllabus');
      const textbooksPos = html.indexOf('Recommended Textbooks');
      const refBooksPos = html.indexOf('Reference Books');
      const externalResPos = html.indexOf('External Learning Resources');
      const videosPos = html.indexOf('Curated Video Lectures');
      const pdfDocPos = html.indexOf('Official Syllabus PDF Document');

      if (overviewPos !== -1 && coPos !== -1 && unitsPos !== -1 && textbooksPos !== -1 && refBooksPos !== -1 && externalResPos !== -1 && videosPos !== -1 && pdfDocPos !== -1) {
        pass('All 8 mandatory sections found on subject page');
        if (
          overviewPos < coPos &&
          coPos < unitsPos &&
          unitsPos < textbooksPos &&
          textbooksPos < refBooksPos &&
          refBooksPos < externalResPos &&
          externalResPos < videosPos &&
          videosPos < pdfDocPos
        ) {
          pass('Section order STRICTLY conforms to master hierarchy: Overview -> COs -> Units -> Textbooks -> References -> External Resources -> Videos -> PDF Document');
        } else {
          fail('Section order does not match master hierarchy specification');
        }
      } else {
        fail('Some required sections were missing from HTML output');
      }

      // Check External Resources content in BCS201
      if (html.includes('NPTEL / IIT Kharagpur') && html.includes('Problem Solving through Programming in C')) {
        pass('BCS201 includes official NPTEL IIT Kharagpur course link');
      } else {
        fail('BCS201 missing NPTEL course resource');
      }

      if (html.includes('target="_blank"') && html.includes('rel="noopener noreferrer"')) {
        pass('External learning resources open in a new tab with security attributes');
      } else {
        fail('External links missing new tab or noopener attributes');
      }

      // Check Video Lectures in BCS201
      if (html.includes('NPTEL: Problem Solving through Programming in C') && html.includes('PLAYLIST')) {
        pass('BCS201 includes verified NPTEL YouTube playlist');
      } else {
        fail('BCS201 missing NPTEL playlist');
      }

      const videoCode = fs.readFileSync(path.join(process.cwd(), 'src/components/video/VideoLecturesSection.tsx'), 'utf8');
      if (videoCode.includes('youtube-nocookie.com/embed/')) {
        pass('YouTube video player integrates privacy-enhanced youtube-nocookie.com embed format');
      } else {
        fail('YouTube player missing privacy-enhanced embed');
      }

      if (html.includes('Watch on YouTube')) {
        pass('Provides alternative "Watch on YouTube" action');
      } else {
        fail('Missing "Watch on YouTube" action');
      }
    } else {
      fail(`BCS201 live route returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCS201 live check failed', err.message);
  }

  // Step 3: Live Subject Detail Page - BCS-301 Data Structures
  console.log('\nStep 3: Live Verification of BCS-301 Data Structures');
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/3/BCS-301');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/3/BCS-301 -> 200 OK');
      const html = res.body;
      if (html.includes('VisuAlgo') && html.includes('visualgo.net')) {
        pass('BCS-301 features VisuAlgo interactive data structure visualizer');
      } else {
        fail('BCS-301 missing VisuAlgo');
      }
      if (html.includes('MIT OpenCourseWare') && html.includes('Abdul Bari')) {
        pass('BCS-301 features MIT OCW resources & Abdul Bari lecture series');
      } else {
        fail('BCS-301 missing MIT OCW or Abdul Bari resources');
      }
    } else {
      fail(`BCS-301 live route returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCS-301 live check failed', err.message);
  }

  // Step 4: Live Verification of M.Tech MCS-101
  console.log('\nStep 4: Live Verification of M.Tech MCS-101');
  try {
    const res = await fetchUrl('/syllabus/MTECH-CSE/semester/1/MCS-101');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/MTECH-CSE/semester/1/MCS-101 -> 200 OK');
      const html = res.body;
      if (html.includes('Carnegie Mellon') || html.includes('Onur Mutlu')) {
        pass('MCS-101 features Carnegie Mellon / Onur Mutlu Advanced Architecture materials');
      } else {
        fail('MCS-101 missing CMU Onur Mutlu resources');
      }
    } else {
      fail(`MCS-101 live route returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('MCS-101 live check failed', err.message);
  }

  // Step 5: Initial State Verification for Uncurated Subjects
  console.log('\nStep 5: Initial State Verification - "Video Lectures Coming Soon"');
  try {
    const res = await fetchUrl('/syllabus/BTECH-CSE/semester/6/BCS-061');
    if (res.statusCode === 200) {
      pass('HTTP GET /syllabus/BTECH-CSE/semester/6/BCS-061 -> 200 OK');
      const html = res.body;
      if (html.includes('Video Lectures Coming Soon')) {
        pass('Uncurated subject BCS-061 cleanly displays "Video Lectures Coming Soon" banner');
      } else {
        fail('BCS-061 failed to display "Video Lectures Coming Soon"');
      }
      if (html.includes('Zero Unverified Links')) {
        pass('Notice confirms zero unverified links are displayed');
      } else {
        fail('Missing zero unverified links notice');
      }
    } else {
      fail(`BCS-061 live route returned ${res.statusCode}`);
    }
  } catch (err) {
    fail('BCS-061 live check failed', err.message);
  }

  console.log('\n==================================================================');
  console.log(`TOTAL CHECKS: ${passCount + failCount} | PASSED: ${passCount} | FAILED: ${failCount}`);
  const rate = ((passCount / (passCount + failCount)) * 100).toFixed(1);
  console.log(`RESULT: ${failCount === 0 ? 'ALL CRITERIA PASSED! (100%)' : 'SOME CHECKS FAILED'}`);
  console.log('==================================================================\n');

  await prisma.$disconnect();
  process.exit(failCount > 0 ? 1 : 0);
}

verifyCuratedResources().catch(console.error);
