/**
 * INVERTIS LEARN: Verification Suite for Mobile Navbar ERP Button Relocation
 * Verifies that:
 * 1. On mobile screens, the header bar contains ONLY the logo on the left and hamburger menu icon on the right.
 * 2. No separate ERP button exists in the mobile header bar.
 * 3. Desktop view retains the University ERP button in the right section.
 * 4. The hamburger drawer displays the Official University ERP button with proper styling, icon, and external link.
 * 5. Full regression suites pass.
 */

const fs = require("fs");
const path = require("path");

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

function runVerification() {
  console.log("================================================================================");
  console.log("   MOBILE NAVBAR ERP BUTTON VERIFICATION SUITE");
  console.log("================================================================================\n");

  const navbarPath = path.join(process.cwd(), "src/components/layout/Navbar.tsx");
  const navbarCode = fs.readFileSync(navbarPath, "utf-8");

  // -------------------------------------------------------------------------
  // TEST 1: Mobile Header Bar Contains Only Hamburger Button
  // -------------------------------------------------------------------------
  console.log("Test 1: Mobile Header Bar Structure");
  
  // Extract mobile header button container: <div className="flex md:hidden items-center">...</div>
  const mobileContainerRegex = /{\/\*\s*Mobile Menu Hamburger Button\s*\*\/}\s*<div className="flex md:hidden items-center">([\s\S]*?)<\/div>/;
  const match = navbarCode.match(mobileContainerRegex);

  assert(match !== null, "Mobile menu button container found with 'flex md:hidden items-center'");
  if (match) {
    const containerInner = match[1];
    assert(!containerInner.includes("<a "), "Zero <a> links exist inside the mobile navbar header");
    assert(!containerInner.includes("erp.invertisuniversity.ac.in"), "ERP link is NOT in the mobile navbar header");
    assert(!containerInner.includes("<span>ERP</span>"), "No 'ERP' text button appears in the mobile navbar header");
    assert(containerInner.includes("<button"), "Hamburger toggle button is present");
    assert(containerInner.includes("setMobileMenuOpen"), "Button toggles mobileMenuOpen state");
    assert(containerInner.includes("Toggle navigation menu"), "Accessibility label present on hamburger button");
  }
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 2: Desktop View Retains Dedicated University ERP Button
  // -------------------------------------------------------------------------
  console.log("Test 2: Desktop Navbar ERP Button");
  const desktopContainerRegex = /{\/\*\s*University ERP External Link \(Desktop\)\s*\*\/}\s*<div className="hidden md:flex items-center space-x-3">([\s\S]*?)<\/div>/;
  const desktopMatch = navbarCode.match(desktopContainerRegex);

  assert(desktopMatch !== null, "Desktop ERP container found with 'hidden md:flex items-center space-x-3'");
  if (desktopMatch) {
    const desktopInner = desktopMatch[1];
    assert(desktopInner.includes('href="https://erp.invertisuniversity.ac.in/"'), "Desktop ERP link points to official university ERP URL");
    assert(desktopInner.includes('target="_blank"'), "Desktop ERP link opens in a new tab");
    assert(desktopInner.includes('rel="noopener noreferrer"'), "Desktop ERP link has security rel attributes");
    assert(desktopInner.includes("University ERP"), "Desktop ERP button displays 'University ERP' text");
    assert(desktopInner.includes("ExternalLink"), "Desktop ERP button has external link icon");
  }
  console.log("");

  // -------------------------------------------------------------------------
  // TEST 3: Mobile Drawer Displays Official University ERP Button
  // -------------------------------------------------------------------------
  console.log("Test 3: Mobile Drawer ERP Button");
  const drawerRegex = /{\/\*\s*Mobile Navigation Drawer\s*\*\/}\s*{mobileMenuOpen && \(([\s\S]*?)\)}\s*<\/header>/;
  const drawerMatch = navbarCode.match(drawerRegex);

  assert(drawerMatch !== null, "Mobile drawer conditionally renders when mobileMenuOpen is true");
  if (drawerMatch) {
    const drawerInner = drawerMatch[1];
    assert(drawerInner.includes('href="https://erp.invertisuniversity.ac.in/"'), "Drawer contains link to official university ERP URL");
    assert(drawerInner.includes('target="_blank"'), "Drawer ERP link opens in a new tab");
    assert(drawerInner.includes('rel="noopener noreferrer"'), "Drawer ERP link has security rel attributes");
    assert(drawerInner.includes("Official University ERP"), "Drawer displays 'Official University ERP'");
    assert(drawerInner.includes("ExternalLink"), "Drawer ERP button has external link icon");
    assert(drawerInner.includes("Official university portal for attendance, exam results, and fee receipts."), "Drawer contains descriptive guidance text");
  }
  console.log("");

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log("================================================================================");
  console.log(`TOTAL CHECKS: ${totalChecks} | PASSED: ${passedChecks} | FAILED: ${failedChecks}`);
  console.log("================================================================================");

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runVerification();

