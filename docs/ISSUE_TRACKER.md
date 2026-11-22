# Invertis Learn — 21 Issue Resolution Tracker

**Project:** Invertis Learn  
**Status:** All 21 Issues + 1 Integration Verified & Closed  
**Branch:** `improvement-production-readiness-audit`  
**Test Suite Status:** 13/13 Passed (100%)  
**Production Build:** Clean (Exit Code 0)  

| Issue ID | Priority | Category | Description | Status | Verification Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-001** | P1 | Security | Download API path sanitization (`id` regex, directory traversal blocking) | **Verified / Closed** | `src/lib/download.ts` regex `/^[A-Za-z0-9_-]{1,128}$/` + realpath boundary checks |
| **SEC-002** | P1 | Security | Public upload and request API hardening (PDF magic bytes, 10MB limit, rate limiting) | **Verified / Closed** | Verified `/api/resources/submit` and `/api/resources/request` PDF buffer validation |
| **SEC-003** | P1 | Security | Curator authentication, session cookies, and RBAC authorization verification | **Verified / Closed** | Verified `src/lib/access.ts`, `curator_session` HttpOnly Secure cookie and bcrypt/crypto hash checks |
| **SEC-004** | P2 | Security | HTTP security headers (HSTS, CSP, nosniff, Referrer-Policy, Permissions-Policy) | **Verified / Closed** | `next.config.mjs` with comprehensive CSP, HSTS (`max-age=63072000`), whitelisting GoatCounter |
| **PERF-001** | P2 | Performance | Cold-start mitigation, ISR caching, Prisma pooling, and bundle optimization | **Verified / Closed** | Verified Neon pgbouncer pooling, fallback catalogue cache, dynamic code-splitting |
| **UX-002** | P1 | UX / Performance | Missing navigation loading feedback (top progress bar, loading skeletons, aria-busy) | **Verified / Closed** | `src/components/common/NavigationProgress.tsx` & `src/app/loading.tsx` mounted in layout |
| **UX-001** | P1 | UX / Layout | Horizontal tab bar overflow clips 'Thesis & Viva' tab on `/phd` | **Verified / Closed** | `src/components/phd/PhdHubClient.tsx` streamlined labels to prevent overflow/clipping |
| **UX-003** | P2 | UX / Design | Programme card badge line-splitting and trailing bullet artifacts on `/engineering` | **Verified / Closed** | `src/components/engineering/EngineeringDirectory.tsx` badges have `whitespace-nowrap shrink-0`, removed orphan bullets |
| **UX-004** | P2 | UX / Navigation | Top navigation label 'Engineering' overstates scope (rename to 'CSE Programmes') | **Verified / Closed** | `src/components/layout/Navbar.tsx` and `Footer.tsx` visible label updated to `CSE Programmes` |
| **UX-005** | P3 | UX / Content | Minor copy typos and label truncation on `/phd` sub-tabs | **Verified / Closed** | `src/components/phd/PhdPublicationGuide.tsx` removed truncate on Pass titles |
| **SRCH-002** | P2 | Search / UX | Search dropdowns and Enter key synchronization with URL search parameters | **Verified / Closed** | `src/components/search/SearchFilterForm.tsx` auto-submits on dropdown selection with Enter key support |
| **RESP-001** | P2 | Responsiveness | Mobile and tablet responsiveness across 320px–1920px viewports | **Verified / Closed** | Mobile drawer, responsive flex grids, site-container padding clamp verified |
| **DATA-001** | P1 | Academic Data | Diploma CSE displays incorrect 4-year scheme and lateral semester range (Sem III–VIII) | **Verified / Closed** | `src/app/syllabus/[programmeCode]/page.tsx`, `programmes/[programmeCode]/page.tsx`, `EntryModeSelector.tsx` use dynamic `getLateralSemesterRangeRoman()` |
| **DATA-002** | P1 | Academic Data | Broken YouTube playlist on M.Tech CSE MCS-101 (replace with active GATE Smashers COA) | **Verified / Closed** | `src/components/video/VideoLecturesSection.tsx` replaced with verified active GATE Smashers playlist `PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX` |
| **DATA-003** | P2 | Academic Data | Programme naming inconsistencies and official B.Tech CSE code alignment (BTECH-001) | **Verified / Closed** | `src/lib/admissionModes.ts` added `officialCode: "BTECH-001"` for regular B.Tech CSE |
| **DATA-004** | P2 | Academic Data | PDF encoding mojibake (`â€¢`) in BCS-351 lab manual and clear practice provenance | **Verified / Closed** | Sanitized all lab manual PDFs in `storage/` and `public/`, eliminating UTF-8 bullet mismatch in Type1 Helvetica |
| **SRCH-001** | P2 | Search | Search acronyms (DBMS, OS, CN, DSA), programme queries, and typo tolerance | **Verified / Closed** | `src/app/search/page.tsx` added `ACRONYM_SYNONYMS` dictionary and multi-variant query resolution |
| **SEO-001** | P1 | Technical SEO | Zero Google Search discoverability, dynamic sitemap coverage, robots.txt, metadata | **Verified / Closed** | `src/app/sitemap.ts` includes all core & legal routes; `src/app/layout.tsx` embeds Schema.org JSON-LD |
| **A11Y-001** | P2 | Accessibility | Low-contrast muted text, focus ring outlines, and ARIA dialog/tab semantics | **Verified / Closed** | `src/app/globals.css` `:focus-visible` 2px blue ring, high-contrast text tokens |
| **PRIV-001** | P2 | Privacy / Legal | Missing footer legal pages (Privacy, Terms, Disclaimer, Contact/Report) | **Verified / Closed** | Created `/privacy`, `/terms`, `/disclaimer`, `/contact` pages and linked in `Footer.tsx` |
| **ERR-001** | P2 | Error Handling | Custom 404, error boundaries, invalid slug handling, and status codes | **Verified / Closed** | `src/app/not-found.tsx` with search recovery links and `src/app/error.tsx` reset action |
| **ANALYTICS-001** | P2 | Analytics | Lightweight, privacy-first GoatCounter visitor analytics & public metrics widget | **Verified / Closed** | `GoatCounter.tsx` SPA tracker and `InvertisLearnInNumbers.tsx` mounted on homepage |
