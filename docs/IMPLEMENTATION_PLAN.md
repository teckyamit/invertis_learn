# Invertis Learn — Master Implementation Plan (Phases 1–6)
**Date:** November 22, 2026  
**Implementation Branch:** `improvement-production-readiness-audit`  
**Architect:** Senior Full-Stack Engineering Team (Antigravity with Gravitas Runtime)

---

## Phase 1 — Security Hardening, Database Protection and API Safety
**Issues:** `SEC-001`, `SEC-002`, `SEC-003`, `SEC-004`

- **Task 1.1 (SEC-001 - Download APIs):**  
  Audit `src/lib/download.ts` and all download routes (`/api/pyq/download`, `/api/notes/download`, `/api/lab-manual/download`, `/api/syllabus/download`, `/api/files/[...path]`). Enforce strict database ID and basename validation, reject path traversal, verify `isPublished: true` for non-curators, ensure `X-Content-Type-Options: nosniff`, and enforce safe Content-Disposition headers.
- **Task 1.2 (SEC-002 - Upload & Request APIs):**  
  Verify server-side PDF validation in `src/app/api/resources/submit/route.ts` and `/api/pyq/route.ts` (enforce `%PDF-` magic bytes, 10 MB limit, unencrypted, 1-500 pages, UUID storage keys, rate limiting via `allowAttempt`, duplicate detection). Harden `/api/resources/request/route.ts` and `/api/resources/report/route.ts`.
- **Task 1.3 (SEC-003 - Curator Authentication & RBAC):**  
  Audit `src/lib/access.ts`, `/api/admin/session/route.ts`, and `/api/admin/resources/route.ts`. Verify HMAC-SHA256 session token security, `sameOrigin` CSRF protection, timing-safe credential verification, and ensure non-curator requests receive immediate 401/403 responses.
- **Task 1.4 (SEC-004 - HTTP Security Headers):**  
  Update `next.config.mjs` to include `Strict-Transport-Security` (`max-age=63072000; includeSubDomains; preload`), `Content-Security-Policy` (configured for Vercel, fonts, GoatCounter, and PDF previews), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## Phase 2 — Performance Optimization and Loading Experience
**Issues:** `PERF-001`, `UX-002`

- **Task 2.1 (UX-002 - Navigation Loading Feedback):**  
  Implement a lightweight, accessible top progress bar (`src/components/common/NavigationProgress.tsx`) and root loading boundary (`src/app/loading.tsx`) with `aria-busy` feedback within 150 ms of transition initiation.
- **Task 2.2 (PERF-001 - Caching & Rendering Strategy):**  
  Verify `unstable_cache` and Incremental Static Regeneration (`revalidate = 3600`) across static programme and syllabus pages. Ensure cache invalidation (`revalidateTag("catalogue")`, `revalidatePath`) fires when a curator approves or rejects a document.
- **Task 2.3 (PERF-001 - Client Bundle Optimization):**  
  Verify `next/dynamic` lazy loading for heavy interactive components (PDF viewer modals, upload modals).

---

## Phase 3 — UI/UX, Search Interaction and Responsive Design
**Issues:** `UX-001`, `UX-003`, `UX-004`, `UX-005`, `SRCH-002`, `RESP-001`

- **Task 3.1 (UX-001 & UX-005 - Ph.D. Hub Tabs & Copy):**  
  Streamline tab labels in `src/components/phd/PhdHubClient.tsx` to eliminate desktop horizontal clipping of `Thesis & Viva`. Ensure clean responsive wrapping. Fix copy typo `55% aggregate marksto confirm` in `src/data/phdData.ts` and prevent truncation on Pass 3 button.
- **Task 3.2 (UX-003 - Engineering Programme Cards):**  
  In `src/components/engineering/EngineeringDirectory.tsx`, add `whitespace-nowrap shrink-0` to badges (`BTECH-019`, `BTECH-008`, `Resources Live`). Replace inline bullet separator text with clean flex chips to eliminate orphan bullets (`• Diploma •`).
- **Task 3.3 (UX-004 - CSE Navigation Label Scope):**  
  Update `src/components/layout/Navbar.tsx` visible label from `Engineering` to `CSE Programmes` while strictly preserving `/engineering` route compatibility. Update breadcrumbs and footer consistently.
- **Task 3.4 (SRCH-002 - Search Synchronization):**  
  In `src/app/search/page.tsx`, synchronize query parameters, add auto-submit on dropdown selection change, ensure Enter key submits immediately, and provide reliable filter reset.
- **Task 3.5 (RESP-001 - Viewport Audit):**  
  Audit and tune styles for 320px, 375px, 390px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px viewports to eliminate horizontal layout overflow.

---

## Phase 4 — Academic Data Accuracy, Resource Reliability and Intelligent Search
**Issues:** `DATA-001`, `DATA-002`, `DATA-003`, `DATA-004`, `SRCH-001`

- **Task 4.1 (DATA-001 - Diploma CSE Scheme & Lateral Semesters):**  
  Dynamically bind duration and semester ranges in `src/app/syllabus/[programmeCode]/page.tsx`, `src/app/programmes/[programmeCode]/page.tsx`, and `src/components/common/EntryModeSelector.tsx`. `DIP-CSE` must display `REGULAR 3-YEAR SCHEME` (Semesters I–VI) and Lateral Entry `Semesters III–VI (2 Academic Years)`.
- **Task 4.2 (DATA-002 - Repair Broken MCS-101 Video):**  
  In `src/components/video/VideoLecturesSection.tsx`, replace dead playlist `PLxCzCOWd7aiHMonhCfCFMKQSS4RFnbXju` with active verified GATE Smashers COA playlist `PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX`.
- **Task 4.3 (DATA-003 - Programme Codes & Names):**  
  Synchronize programme display names across homepage, `/engineering`, and syllabus pages. Add `regular.officialCode: "BTECH-001"` in `src/lib/admissionModes.ts` to reflect the official Invertis UG catalog code alongside `lateral.officialCode: "BTECH-008"`.
- **Task 4.4 (DATA-004 - PDF Mojibake Correction & Provenance):**  
  Regenerate practice lab manual PDFs to remove `â€¢` mojibake characters using UTF-8/WinAnsi clean character replacements (`-`). Ensure clear visual distinction between verified university curriculum documents and practice materials.
- **Task 4.5 (SRCH-001 - Intelligent Search Expansion):**  
  In `src/app/search/page.tsx`, add an acronym alias dictionary (`DBMS` -> Database Management Systems, `OS` -> Operating Systems, `CN` -> Computer Networks, `DSA` -> Data Structures, `ACA` -> Advanced Computer Architecture), programme search (`M.Tech CSE`, `Diploma CSE`, `B.Tech CSE`), and fuzzy/typo tolerance.

---

## Phase 5 — SEO, Accessibility, Legal Transparency and GoatCounter Analytics
**Issues:** `SEO-001`, `A11Y-001`, `PRIV-001`, `ANALYTICS-001`

- **Task 5.1 (SEO-001 - Technical SEO):**  
  Expand `src/app/sitemap.ts` to include canonical legal routes and ensure all 379 subjects are covered via catalog fallback. Add structured JSON-LD (`WebSite`, `BreadcrumbList`) and dynamic Open Graph metadata.
- **Task 5.2 (A11Y-001 - Accessibility & WCAG 2.2 AA):**  
  Darken muted text tokens (e.g. `text-slate-400` -> `text-slate-600` for WCAG 4.5:1 ratio), verify keyboard navigation focus rings (`focus-visible:ring-2`), and ensure modal dialog ARIA focus traps.
- **Task 5.3 (PRIV-001 - Legal Pages & Global Footer):**  
  Create static routes: `/privacy` (disclosing localStorage and analytics), `/terms` (academic terms of use), `/disclaimer` (unofficial student companion notice), `/contact` (issue and broken resource reporting). Update `src/components/layout/Footer.tsx` with clear legal links and disclaimer.
- **Task 5.4 (ANALYTICS-001 - GoatCounter Analytics):**  
  Implement privacy-first GoatCounter integration via `src/components/common/GoatCounter.tsx` (environment-configured via `NEXT_PUBLIC_GOATCOUNTER_ENDPOINT` and `NEXT_PUBLIC_GOATCOUNTER_ENABLED`). Support client-side route tracking without duplicate counts. Add public statistics component `InvertisLearnInNumbers.tsx`.

---

## Phase 6 — Error Handling, Complete Testing and Production Readiness
**Issues:** `ERR-001`

- **Task 6.1 (ERR-001 - Error Boundaries):**  
  Harden `src/app/not-found.tsx`, `src/app/error.tsx`, and `src/app/global-error.tsx`. Ensure unknown programme/semester/subject URLs trigger genuine HTTP 404 responses with branded recovery actions.
- **Task 6.2 (Automated Test Execution):**  
  Execute full acceptance test suite, typechecking, linting, regression tests, and resource validator script.
- **Task 6.3 (Final Deliverables):**  
  Generate `docs/INVERTIS_LEARN_FINAL_ENGINEERING_REPORT.md`, `.html`, `docs/INVERTIS_LEARN_IMPLEMENTATION_RESULTS.json`, `docs/RESOURCE_VALIDATION_REPORT.json`, `docs/SEO_AND_ANALYTICS_SETUP.md`, and `docs/DEPLOYMENT_AND_ROLLBACK_GUIDE.md`.
