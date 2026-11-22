const fs = require('fs');
const path = require('path');

const navbarPath = path.join(process.cwd(), 'src/components/layout/Navbar.tsx');
const content = fs.readFileSync(navbarPath, 'utf8');

console.log("================================================================================");
console.log("   NAVBAR DUAL-SEARCH DEDUPLICATION & ORDERING ACCEPTANCE SUITE");
console.log("================================================================================\n");

let pass = 0;
let fail = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`  [PASS] ${desc}`);
    pass++;
  } else {
    console.error(`  [FAIL] ${desc}`);
    fail++;
  }
}

// 1. Check navLinks array
const navLinksMatch = content.match(/const navLinks = \[([\s\S]*?)\];/);
check("navLinks array defined", !!navLinksMatch);

const navItems = navLinksMatch ? [...navLinksMatch[1].matchAll(/label:\s*"([^"]+)"/g)].map(m => m[1]) : [];
console.log(`  -> navLinks items: ${JSON.stringify(navItems)}`);
check("Search link is NOT present in navLinks array", !navItems.includes("Search"));
check("navLinks contains exactly 6 primary academic links", navItems.length === 6);
check("navLinks first item is Home", navItems[0] === "Home");
check("navLinks second item is Engineering", navItems[1] === "Engineering");

// 2. Check desktop navigation order
const homeIdx = content.indexOf('{ label: "Home"');
const engIdx = content.indexOf('{ label: "Engineering"');
const resIdx = content.indexOf('{ label: "Resources"');
const cpIdx = content.indexOf('{ label: "Career Pathways"');
const phdIdx = content.indexOf('{ label: "Ph.D. Hub"');
const aboutIdx = content.indexOf('{ label: "About"');
const searchDesktopIdx = content.indexOf('href="/search"');
const erpIdx = content.indexOf('https://erp.invertisuniversity.ac.in/');

check("Desktop order: Home before Engineering", homeIdx < engIdx);
check("Desktop order: Engineering before Resources", engIdx < resIdx);
check("Desktop order: Resources before Career Pathways", resIdx < cpIdx);
check("Desktop order: Career Pathways before Ph.D. Hub", cpIdx < phdIdx);
check("Desktop order: Ph.D. Hub before About", phdIdx < aboutIdx);
check("Desktop order: About before Search button", aboutIdx < searchDesktopIdx);
check("Desktop order: Search button before University ERP", searchDesktopIdx < erpIdx);

// 3. Check desktop controls count
const navSectionMatch = content.match(/<nav className="hidden md:flex[^"]*">([\s\S]*?)<\/nav>/);
const navSection = navSectionMatch ? navSectionMatch[1] : "";
check("Desktop <nav> contains ZERO /search links", !navSection.includes('/search'));

const desktopActionMatch = content.match(/{\/\* Dedicated Search & University ERP Controls \(Desktop\) \*\/}\s*<div className="hidden md:flex[^"]*">([\s\S]*?)<\/div>/);
const desktopActions = desktopActionMatch ? desktopActionMatch[1] : "";
const desktopSearchCount = (desktopActions.match(/href="\/search"/g) || []).length;
check("Desktop action controls contain exactly ONE Search button", desktopSearchCount === 1);

// 4. Check mobile controls count
const mobileDrawerMatch = content.match(/{\/\* Mobile Navigation Drawer \*\/}([\s\S]*?)<\/header>/);
const mobileDrawer = mobileDrawerMatch ? mobileDrawerMatch[1] : "";
check("Mobile drawer contains ZERO duplicate /search links", !mobileDrawer.includes('href="/search"'));

const mobileHeaderMatch = content.match(/{\/\* Mobile Actions: Dedicated Search & Menu Hamburger \*\/}\s*<div className="flex md:hidden[^"]*">([\s\S]*?)<\/div>/);
const mobileHeader = mobileHeaderMatch ? mobileHeaderMatch[1] : "";
const mobileSearchCount = (mobileHeader.match(/href="\/search"/g) || []).length;
check("Mobile header bar contains exactly ONE accessible Search button", mobileSearchCount === 1);

// 5. Active state check
check("isSearchActive state logic implemented", content.includes("const isSearchActive ="));
check("Desktop search button uses isSearchActive for styling", desktopActions.includes("isSearchActive"));
check("Mobile search button uses isSearchActive for styling", mobileHeader.includes("isSearchActive"));

console.log("\n================================================================================");
console.log(`TOTAL CHECKS: ${pass + fail} | PASSED: ${pass} | FAILED: ${fail}`);
console.log("================================================================================");

if (fail > 0) process.exit(1);
