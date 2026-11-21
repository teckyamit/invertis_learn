# Invertis Learn — Baseline Audit Report & Master Remediation Plan

**Audit Date:** November 21, 2026  
**Auditor:** Full-Stack Engineering, Security & Performance Team (GRAVITAS Reliability Runtime)  
**Production Target:** [https://invertislearn.vercel.app/](https://invertislearn.vercel.app/)  
**Baseline Git Commit:** `3f3dda3daae2378b3fde3d1c204cdca87dc47473`  
**Improvement Branch:** `improvement-audit-remediation`  

---

## 1. Executive Summary

This baseline audit evaluates the Invertis Learn platform against the findings from the Google Gemini Website Audit Report (dated November 21, 2026) alongside independent static, architectural, security, performance, accessibility, and database assessments.

The codebase represents a modern Next.js 15 App Router platform with Prisma ORM, Neon PostgreSQL, Tailwind CSS, and custom academic categorization. While its foundational technical stability is high (TypeScript: 0 errors, ESLint: 0 warnings, production build: passing), several key user-facing inconsistencies, SEO omissions, hardcoded metadata labels, and missing accessibility affordances were confirmed during repository reconnaissance.

---

## 2. Technology Stack & Repository Architecture

| Component | Technology | Version / Configuration |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `15.5.29` (Server Actions, dynamic rendering) |
| **Runtime** | Node.js | `>=22.14 <25` |
| **Language** | TypeScript | `5.6.3` (Strict mode, full type safety) |
| **UI Library** | React & React DOM | `19.2.9` |
| **Styling** | Tailwind CSS & PostCSS | `tailwindcss: 3.4.14`, `postcss: 8.5.32` |
| **Database ORM** | Prisma Client | `5.21.1` |
| **Database Engine** | PostgreSQL | Neon Serverless (`ep-quiet-frost-b30h0q0g-pooler`) |
| **PDF Processing** | `pdf-lib` & `pdf-parse` | `pdf-lib: 1.17.1`, `pdf-parse: 2.4.5` |
| **Icons** | Lucide React | `1.70.0` |
| **Deployment** | Vercel Serverless | CI/CD triggered from GitHub repository |

---

## 3. Gemini Audit Findings Verification Status

| ID | Gemini Audit Finding | Repository Grounding & Status | Confirmed Root Cause | Severity |
| :---: | :--- | :---: | :--- | :---: |
| **1** | Inaccurate or misunderstood 496+ available resource count | **Confirmed** | Total resources in `getCatalogueCounts` counted all database rows indiscriminately without clear category differentiation on the homepage. | High |
| **2** | Empty PYQ, notes, and video lecture sections | **Confirmed** | Several subjects with syllabus-only records lacked contextual guidance, clear contribution calls-to-action, or resource request buttons. | Medium |
| **3** | Incorrect Diploma lateral-entry semester range (`Lateral: III–VIII`) | **Confirmed** | In `src/app/page.tsx` line 282 & `EngineeringDirectory.tsx` line 396, `(Lateral: III–VIII)` was hardcoded instead of dynamically evaluating the programme's 6-semester limit (`III–VI`). | High |
| **4** | Inconsistent Ph.D. programme duration (3 Years vs 3–6 Years) | **Confirmed** | `src/app/page.tsx` rendered `{prog.durationYears} Years` (3), while `PhdOverviewSection.tsx` specified "Minimum 3 years up to 6 years" per UGC/Invertis regulations. | Medium |
| **5** | About page overstating supported engineering departments | **Confirmed** | `src/app/about/page.tsx` implied full coverage of all engineering faculties, whereas active resources are specifically focused on Computer Science & Engineering. | Medium |
| **6** | Inconsistent programme names and subject codes (e.g., `BAS101` vs `BAS-101`) | **Confirmed** | Search queries required exact substring matches and failed when students searched hyphen-less codes (`MCS102` for `MCS-102`). | High |
| **7** | Duplicate programme badges (`BTECH-019` shown twice) | **Confirmed** | In `EngineeringDirectory.tsx` line 203–212, both `regular.officialCode` and `lateral.officialCode` printed `"BTECH-019"` independently. | Medium |
| **8** | Spelling, punctuation, and grammar errors | **Confirmed** | Minor wording discrepancies and punctuation anomalies across hero headers and cards. | Low |
| **9** | Global subject search hidden in the footer | **Confirmed** | `src/components/layout/Navbar.tsx` completely lacked a search link/icon; search was only linked in `Footer.tsx` line 8. | High |
| **10** | Ph.D. navigation tabs clipped on mobile/narrow screens | **Confirmed** | `src/components/phd/PhdHubClient.tsx` tab strip lacked horizontal scroll indicators and overflow affordances. | Medium |
| **11** | Incomplete subject card click targets | **Confirmed** | In `SubjectCard.tsx`, only the small "Explore" link was clickable; clicking card titles, badges, or body was inactive. | Medium |
| **12** | Truncated search placeholders | **Confirmed** | Placeholder `"Search CSE program, code, or specialization..."` truncated on mobile viewports. | Low |
| **13** | Poorly presented footer elements | **Confirmed** | Footer contained an unauthenticated link to `/admin` and plain text links. | Medium |
| **14** | Preselected copyright confirmation checkbox | **Confirmed** | `ResourceUploadModal.tsx` initialized `confirmedPermission` to `true` by default; API did not strictly require explicit `true`. | High |
| **15** | Poor Google Search discoverability / Zero indexing | **Confirmed** | No `sitemap.xml` or `robots.txt` existed anywhere in the repository. | High |
| **16** | Missing or insufficient SEO infrastructure | **Confirmed** | Missing dynamic XML sitemap, robots configuration, and structured educational schema. | High |
| **17** | Lack of personalized semester shortcuts | **Confirmed** | Students had to navigate 4-5 clicks on every visit to find their specific semester. | Medium |
| **18** | Missing resource request functionality | **Confirmed** | No mechanism existed for students to request missing PYQs or notes. | Medium |
| **19** | Insufficient resource verification and freshness information | **Confirmed** | Missing clear provenance and verification indicators on select cards. | Medium |

---

## 4. Newly Discovered Architecture & Security Findings

1. **Missing Dynamic SEO Endpoints:**
   Next.js metadata routes `src/app/sitemap.ts` and `src/app/robots.ts` were absent, causing 404s for search engine crawlers.
2. **Missing Search Bar in Global Header:**
   The top navigation had no direct access to `/search`, forcing discovery through footers.
3. **Upload Consent Security:**
   Server-side route `/api/resources/submit` accepted uploads without verifying that `confirmedPermission` was explicitly affirmed.
4. **Curator Route Privacy:**
   `/admin` was publicly linked in the student-facing footer navigation.

---

## 5. Performance Baseline Measurements

- **TypeScript Compilation:** 0 errors (`tsc --noEmit --incremental false`)
- **ESLint Code Quality:** 0 warnings (`eslint src --max-warnings=0`)
- **Unit & Regression Suite:** 7/7 suites passed (`scripts/test-subject-reorganization.cjs`)
- **Next.js Production Build:** Passing (All dynamic routes marked `ƒ server-rendered on demand`)
- **Server Response Time (TTFB - Vercel Production):** ~600–850 ms (warm), ~1.8–2.4 s (cold start with database pooler wake-up)

---

## 6. Master Five-Phase Remediation Roadmap

- **Phase 1: Academic Data Accuracy & Resource Reliability**
  - Fix Diploma lateral entry range (`III–VI`)
  - Standardize Ph.D. duration (3–6 Years)
  - Clarify About page scope to CSE focus
  - Fix duplicate BTECH-019 badges
  - Implement normalized subject search matching (`MCS102` &rarr; `MCS-102`)
  - Enforce un-checked copyright consent on client & server
  - Contextualize empty states

- **Phase 2: Performance, Security & Backend Reliability**
  - Configure security headers (CSP, HSTS, X-Content-Type-Options)
  - Server-side upload validation and rate limiting
  - Protect curator endpoints and clean footer links
  - Selective data fetching for theory vs practical courses

- **Phase 3: UI/UX, Navigation & Accessibility**
  - Add prominent Search in desktop and mobile navigation
  - Make subject cards fully clickable (accessible touch targets)
  - Shorten search placeholder to "Search programme or code"
  - Fix Ph.D. tabs overflow with horizontal scroll affordances
  - Clean footer: remove public curator link, enhance contrast

- **Phase 4: SEO, Google Indexing & Discoverability**
  - Generate dynamic `src/app/sitemap.ts`
  - Implement `src/app/robots.ts`
  - Enhance structured data (`WebSite`, `BreadcrumbList`)
  - Add Google Search Console instructions

- **Phase 5: Student Experience & Academic Enhancements**
  - Add "My Semester" lightweight localStorage shortcut
  - Implement lightweight Resource Request system
  - Implement Content Report mechanism
  - Add Curator Demand & Reports dashboard tab
