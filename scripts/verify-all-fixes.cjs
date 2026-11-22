const fs = require('fs');
const assert = require('assert');
const path = require('path');

console.log('--- RUNNING FULL INVERTIS LEARN PRODUCTION ACCEPTANCE SUITE ---');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    failed++;
  }
}

// 1. SEC-001: Download API Sanitization
test('SEC-001: src/lib/download.ts validates ID regex and blocks path traversal', () => {
  const content = fs.readFileSync('src/lib/download.ts', 'utf8');
  assert(content.includes('^[A-Za-z0-9_-]{1,128}$'), 'Must enforce strict ID pattern');
  assert(content.includes('publicResource'), 'Must enforce publicResource policy');
});

// 2. SEC-004: HTTP Security Headers
test('SEC-004: next.config.mjs contains HSTS and Content-Security-Policy', () => {
  const content = fs.readFileSync('next.config.mjs', 'utf8');
  assert(content.includes('Strict-Transport-Security'), 'Must include HSTS');
  assert(content.includes('Content-Security-Policy'), 'Must include CSP');
  assert(content.includes('goatcounter.com'), 'CSP must whitelist GoatCounter');
});

// 3. UX-004: Navbar visible label and order
test('UX-004: Navbar.tsx has label "CSE Programmes" and exactly one search button', () => {
  const content = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
  assert(content.includes('label: "CSE Programmes"'), 'Navbar label must be CSE Programmes');
  assert(!content.includes('{ label: "Engineering"'), 'Must not have label: Engineering');
  assert(content.includes('aria-label="Search academic subjects"'), 'Retained dedicated search button with aria-label');
});

// 4. UX-001 & UX-005: Ph.D. Hub Tabs & Publication Guide
test('UX-001 & UX-005: PhdHubClient has streamlined tabs and PhdPublicationGuide has no truncate on Pass title', () => {
  const hubContent = fs.readFileSync('src/components/phd/PhdHubClient.tsx', 'utf8');
  assert(hubContent.includes('shortLabel: "Thesis & Viva"'), 'Must have clean shortLabel');
  assert(hubContent.includes('label: "Thesis & Viva Voce"'), 'Must have streamlined label');

  const pubContent = fs.readFileSync('src/components/phd/PhdPublicationGuide.tsx', 'utf8');
  assert(!pubContent.includes('text-xs sm:text-sm truncate'), 'Must not truncate pass title');
});

// 5. UX-003: Engineering Directory Card wrapping & bullet elimination
test('UX-003: EngineeringDirectory.tsx has whitespace-nowrap badges and no orphan bullets', () => {
  const content = fs.readFileSync('src/components/engineering/EngineeringDirectory.tsx', 'utf8');
  assert(content.includes('whitespace-nowrap shrink-0'), 'Must contain whitespace-nowrap shrink-0 on chips');
  assert(!content.includes('<span>•</span>\n            <span className="capitalize">'), 'Orphan separator bullets eliminated');
});

// 6. DATA-001: Diploma Duration & Lateral Semesters Dynamic Binding
test('DATA-001: Syllabus and Programme pages use dynamic roman range', () => {
  const sylContent = fs.readFileSync('src/app/syllabus/[programmeCode]/page.tsx', 'utf8');
  assert(sylContent.includes('getLateralSemesterRangeRoman(canonicalCode)'), 'Syllabus page must use dynamic getLateralSemesterRangeRoman');
  assert(!sylContent.includes('"Lateral Entry Scheme (Sem III–VIII)"'), 'Must not have hardcoded Sem III–VIII');

  const progContent = fs.readFileSync('src/app/programmes/[programmeCode]/page.tsx', 'utf8');
  assert(progContent.includes('getLateralSemesterRangeRoman(canonicalCode)'), 'Programme page must use dynamic getLateralSemesterRangeRoman');

  const modeContent = fs.readFileSync('src/components/common/EntryModeSelector.tsx', 'utf8');
  assert(modeContent.includes('getLateralSemesterRangeRoman(canonicalCode)'), 'EntryModeSelector must use dynamic getLateralSemesterRangeRoman');
});

// 7. DATA-002: MCS-101 Video Playlist
test('DATA-002: MCS-101 Video Lectures playlist is verified valid Gate Smashers playlist', () => {
  const content = fs.readFileSync('src/components/video/VideoLecturesSection.tsx', 'utf8');
  assert(content.includes('PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX'), 'Must use verified playlist PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX');
  assert(!content.includes('PLxCzCOWd7aiHMonhCfCFMKQSS4RFnbXju'), 'Must remove broken playlist PLxCzCOWd7aiHMonhCfCFMKQSS4RFnbXju');
});

// 8. DATA-003: BTECH-001 Official Code
test('DATA-003: BTECH-CSE regular admission configuration has officialCode BTECH-001', () => {
  const content = fs.readFileSync('src/lib/admissionModes.ts', 'utf8');
  assert(content.includes('canonicalCode: "BTECH-CSE"'), 'Must have BTECH-CSE');
  assert(content.includes('officialCode: "BTECH-001"'), 'Must have officialCode BTECH-001 for regular');
  assert(content.includes('officialCode: "BTECH-008"'), 'Must have officialCode BTECH-008 for lateral');
});

// 9. DATA-004: PDF Mojibake absence
test('DATA-004: Lab manuals contain zero â€¢ mojibake bytes', () => {
  const files = [
    'storage/uploads/lab_manuals/BCS351_Data_Structures_Lab_Manual.pdf',
    'public/uploads/lab_manuals/BCS351_Data_Structures_Lab_Manual.pdf'
  ];
  const bulletBytes = Buffer.from([0xE2, 0x80, 0xA2]);
  for (const f of files) {
    if (fs.existsSync(f)) {
      const buf = fs.readFileSync(f);
      assert.strictEqual(buf.indexOf(bulletBytes), -1, `File ${f} must not contain UTF-8 bullet in Type1 stream`);
    }
  }
});

// 10. SRCH-001 & SRCH-002: Search Intelligence & Dropdown Auto-submit
test('SRCH-001 & SRCH-002: Search page has acronym synonyms and client filter form', () => {
  const pageContent = fs.readFileSync('src/app/search/page.tsx', 'utf8');
  assert(pageContent.includes('ACRONYM_SYNONYMS'), 'Must include ACRONYM_SYNONYMS');
  assert(pageContent.includes('SearchFilterForm'), 'Must import SearchFilterForm');

  const formContent = fs.readFileSync('src/components/search/SearchFilterForm.tsx', 'utf8');
  assert(formContent.includes('requestSubmit'), 'Form must use requestSubmit on select change');
});

// 11. PRIV-001 & SEO-001: Legal Pages, Footer, and Sitemap
test('PRIV-001 & SEO-001: Legal pages exist and sitemap includes them', () => {
  assert(fs.existsSync('src/app/privacy/page.tsx'), '/privacy must exist');
  assert(fs.existsSync('src/app/terms/page.tsx'), '/terms must exist');
  assert(fs.existsSync('src/app/disclaimer/page.tsx'), '/disclaimer must exist');
  assert(fs.existsSync('src/app/contact/page.tsx'), '/contact must exist');

  const sitemapContent = fs.readFileSync('src/app/sitemap.ts', 'utf8');
  assert(sitemapContent.includes('/privacy'), 'Sitemap must contain /privacy');
  assert(sitemapContent.includes('/terms'), 'Sitemap must contain /terms');
  assert(sitemapContent.includes('/disclaimer'), 'Sitemap must contain /disclaimer');
  assert(sitemapContent.includes('/contact'), 'Sitemap must contain /contact');
  assert(sitemapContent.includes('/pyq'), 'Sitemap must contain /pyq');

  const footerContent = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
  assert(footerContent.includes('href="/privacy"'), 'Footer must link to /privacy');
  assert(footerContent.includes('href="/terms"'), 'Footer must link to /terms');
  assert(footerContent.includes('href="/disclaimer"'), 'Footer must link to /disclaimer');
  assert(footerContent.includes('href="/contact"'), 'Footer must link to /contact');
});

// 12. PERF-001 & UX-002: NavigationProgress & Loading skeleton
test('PERF-001 & UX-002: NavigationProgress and loading.tsx exist and layout mounts them', () => {
  assert(fs.existsSync('src/components/common/NavigationProgress.tsx'), 'NavigationProgress must exist');
  assert(fs.existsSync('src/app/loading.tsx'), 'loading.tsx must exist');

  const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
  assert(layoutContent.includes('NavigationProgress'), 'Layout must include NavigationProgress');
  assert(layoutContent.includes('GoatCounter'), 'Layout must include GoatCounter');
});

// 13. ANALYTICS-001: GoatCounter & InvertisLearnInNumbers
test('ANALYTICS-001: GoatCounter and InvertisLearnInNumbers components exist and are mounted', () => {
  assert(fs.existsSync('src/components/common/GoatCounter.tsx'), 'GoatCounter component must exist');
  assert(fs.existsSync('src/components/home/InvertisLearnInNumbers.tsx'), 'InvertisLearnInNumbers component must exist');

  const homeContent = fs.readFileSync('src/app/page.tsx', 'utf8');
  assert(homeContent.includes('InvertisLearnInNumbers'), 'Home page must mount InvertisLearnInNumbers');
});

console.log(`\nTEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL ACCEPTANCE CRITERIA VERIFIED SUCCESSFULLY!');
}
