# Invertis Learn — Audit Remediation Changelog
**Document ID:** IL-AUDIT-CHG-001  
**Audit Date:** November 21, 2026  
**Implementation Branch:** `improvement-audit-remediation`  

---

## 1. Summary of Changes

This changelog records all file additions, modifications, and enhancements applied to the Invertis Learn repository during the audit remediation.

---

## 2. Modified Files

| File Path | Description of Changes |
|---|---|
| `src/lib/admissionModes.ts` | Added and exported `getLateralSemesterRangeRoman(code)` helper dynamically deriving lateral semester ranges based on programme configurations (`III–VI` for Diploma, `III–VIII` for B.Tech). |
| `src/app/page.tsx` | Replaced hardcoded `(Lateral: III–VIII)` with dynamic `getLateralSemesterRangeRoman(prog.code)`. Standardized Ph.D. duration string to `3–6 Years (Doctoral Research & Thesis)`. Mounted `<MySemesterWidget />`. |
| `src/components/engineering/EngineeringDirectory.tsx` | Deduplicated duplicate `BTECH-019` badge on Cloud Computing card. Dynamic lateral semester range via helper. Standardized Ph.D. duration copy. Shortened search placeholder to prevent mobile truncation. |
| `src/app/syllabus/[programmeCode]/semester/[semesterNumber]/page.tsx` | Updated lateral entry banner on line 181 to use dynamic `getLateralSemesterRangeRoman(programme.code)`. |
| `src/app/about/page.tsx` | Clarified release scope narrative: explicitly defined Invertis Learn's focus on Computer Science & Engineering (Diploma, B.Tech, Specializations, Lateral, M.Tech, Ph.D.), with other departments planned for future phases. |
| `src/app/search/page.tsx` | Complete overhaul: added normalized query handling (`q`, `normalizedQ` without hyphens/spaces, and `hyphenatedQ` for cross-matching e.g. `MCS102` &harr; `MCS-102`). Added full responsive UI with breadcrumbs, result count, and pagination. |
| `src/components/upload/ResourceUploadModal.tsx` | Mandatory copyright consent: changed `confirmedPermission` state to default to `false` (unchecked). Client validation blocking submission without explicit check. Reset on close. |
| `src/app/api/resources/submit/route.ts` | Strict server-side validation rejecting submissions with HTTP 400 if `rawData.confirmedPermission !== "true"`. |
| `src/components/syllabus/SubjectCard.tsx` | Expanded clickable touch target to entire card surface using `after:absolute after:inset-0` pseudo-overlay. |
| `src/components/layout/Navbar.tsx` | Added "Search" link with icon to desktop navbar and mobile hamburger menu. |
| `src/components/layout/Footer.tsx` | Removed public `/admin` curator review hyperlink. Improved student-facing resource links. |
| `src/components/phd/PhdHubClient.tsx` | Added `overflow-x-auto`, `scroll-smooth`, and `role="tablist"` to eliminate horizontal tab truncation on mobile viewports. |
| `src/app/layout.tsx` | Added Schema.org `WebSite` JSON-LD structured data with `SearchAction` for Google Sitelinks Searchbox. |
| `src/components/syllabus/SubjectSyllabusView.tsx` | Integrated `ResourceRequestModal` and `ReportContentModal`. Added action buttons in header and community support card at the bottom. |
| `src/components/pyq/PYQSection.tsx` | Added "Request Past Papers" button in empty state. Mounted `ResourceRequestModal` with `initialCategory="PYQ"`. |
| `src/components/notes/NotesSection.tsx` | Added "Request Study Notes" button in empty state. Mounted `ResourceRequestModal` with `initialCategory="NOTES"`. |
| `src/components/labs/LabManualSection.tsx` | Added "Request Lab Material" button in empty state. Mounted `ResourceRequestModal` with `initialCategory="LAB_MANUAL"`. |
| `src/components/admin/CuratorDashboard.tsx` | Extended dashboard with master view switcher ("Resource Submissions Moderation" vs "Student Demand & Content Reports"). Integrated `/api/admin/requests` displaying ranked subject demand, student requests, and content reports with resolve actions. |

---

## 3. Newly Created Files

| File Path | Description |
|---|---|
| `docs/audit/BASELINE_AUDIT.md` | Comprehensive baseline audit report mapping all 19 Gemini findings and execution roadmap. |
| `docs/audit/IMPLEMENTATION_REPORT.md` | Phase-by-phase implementation details and technical justifications. |
| `docs/audit/PERFORMANCE_REPORT.md` | Core Web Vitals, production build measurements, and bundle sizes. |
| `docs/audit/SECURITY_REPORT.md` | Threat analysis, curator authentication, upload sanitization, and consent compliance. |
| `docs/audit/TEST_REPORT.md` | Automated test suite execution, TypeScript compiler results, and ESLint verification. |
| `docs/audit/RESOURCE_COVERAGE_REPORT.md` | Complete inventory of CSE academic resources across all 6 programmes. |
| `docs/audit/SEO_REPORT.md` | Technical SEO setup, sitemap, robots, and GSC submission instructions. |
| `docs/audit/DEPLOYMENT_GUIDE.md` | Production merge, environment variables, and Vercel deployment steps. |
| `docs/audit/CHANGELOG.md` | This document. |
| `src/app/sitemap.ts` | Dynamic XML sitemap generator covering ~420 URLs with database and catalogue fallback. |
| `src/app/robots.ts` | Dynamic crawler directives with sitemap reference and administrative disallow rules. |
| `src/components/home/MySemesterWidget.tsx` | Client personalization widget storing current programme and semester in localStorage without login. |
| `src/app/api/resources/request/route.ts` | REST endpoint for student academic material requests with rate-limiting and validation. |
| `src/app/api/resources/report/route.ts` | REST endpoint for reporting syllabus inaccuracies and broken files. |
| `src/app/api/admin/requests/route.ts` | Curator endpoint for viewing ranked student demand, requests, and reports. |
| `src/components/modals/ResourceRequestModal.tsx` | Student modal dialog for requesting missing notes, PYQs, and lab manuals. |
| `src/components/modals/ReportContentModal.tsx` | Student modal dialog for reporting academic content and syllabus issues. |
| `scripts/test-subject-reorganization.cjs` | Dedicated automated test script validating academic classification and bibliographic separation. |

---

## 4. Deleted / Decommissioned Items

- Removed hardcoded lateral entry semester strings across homepage and directory templates.
- Removed `/admin` public link from footer.
- Decommissioned embedded iframe players in favour of verified external links.
