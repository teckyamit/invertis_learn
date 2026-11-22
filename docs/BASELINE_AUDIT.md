# Invertis Learn — Phase 0 Baseline Audit Report
**Date:** November 22, 2026  
**Environment:** Next.js 15.5.29, React 19.2.9, TypeScript 5.6.3, Tailwind CSS 3.4.14, Prisma 5.21.1 / 5.22.0, Node.js v22.14.0  
**Current Git Branch:** `improvement-production-readiness-audit`  
**Base Commit:** `3d72259`  
**Production Live URL:** https://invertislearn.vercel.app/

---

## 1. Executive Summary & Verification Scope

A complete repository and live audit of Invertis Learn was conducted against the two Google Gemini audit reports (dated November 22, 2026). All 21 issues from the master prompt have been catalogued and classified:

- **Confirmed P0 Outages / Exploits:** 0
- **Confirmed P1 High-Priority Findings:** 5 (DATA-001, DATA-002, UX-001, UX-002, SEO-001)
- **High-Risk Backend Security Checks (Require Code / Local Inspection):** 3 (SEC-001, SEC-002, SEC-003)
- **Confirmed P2 Medium Findings:** 8 (DATA-003, DATA-004, UX-003, UX-004, SRCH-001, SRCH-002, PRIV-001, A11Y-001)
- **Unverified External Check (SEC-004, PERF-001, RESP-001, ERR-001):** 4
- **Confirmed P3 Low Finding:** 1 (UX-005)
- **Additional Integration:** 1 (ANALYTICS-001: GoatCounter Analytics)

---

## 2. Academic Data Baseline (Snapshot Verification)

| Entity / Model | Count | Provenance & Source Notes |
| :--- | :--- | :--- |
| **Programmes (Catalog)** | 61 total (6 canonical CSE) | DIP-CSE, BTECH-CSE, BTECH-CSE-AI, BTECH-CSE-CC, MTECH-CSE, PHD-009 |
| **Curriculum Versions** | 6 current active versions | Invertis University Academic Regulations Session 2023–2024 |
| **Semesters** | 35 active semester nodes | Diploma (6), B.Tech (8), Lateral B.Tech (6), M.Tech (4), Ph.D. (1) |
| **Academic Subjects** | **379 subjects** | 100% catalogued with isolated codes, LTP, credits, marks, and units |
| **Resource Categories** | 5 categories | SYLLABUS, PYQ, NOTES, LAB_MANUAL, PROJECT_ARCHIVE |
| **Academic Resources** | 494 documents | 494 total records in database snapshot |
| **External Resources** | 68 links | Verified tutorials, official documentation, reference links |
| **Video Lectures** | 32 playlists / links | NPTEL, GATE Smashers, Knowledge Gate, MIT OCW, Prof. Onur Mutlu |
| **Departments** | 9 departments | Faculty of Engineering & Technology (ENG) primary |

---

## 3. Technology Stack & Build Health Baseline

- **Framework:** Next.js 15.5.29 (App Router)
- **React:** 19.2.9
- **TypeScript:** 5.6.3 (`npm run typecheck` passed with **0 errors**)
- **Linter:** ESLint 9.39.5 (`npm run lint` passed with **0 warnings**)
- **Unit / Contract Tests:** 19/19 navbar checks passed in `scripts/verify-navbar-search.cjs`
- **Database Engine:** Neon PostgreSQL via Prisma ORM 5.21.1 / 5.22.0
- **Storage:** Dual-storage architecture: local filesystem (`storage/uploads`) + PostgreSQL `ResourceBlob` (fallback for serverless resilience)

---

## 4. Key Findings & Root Causes Identified

1. **DATA-001 (Diploma CSE Duration & Semesters):**  
   - In `src/app/syllabus/[programmeCode]/page.tsx:141`, the badge was hardcoded as `{isLateralSelected ? "Lateral Entry Scheme (Sem III–VIII)" : "Regular 4-Year Scheme"}`.
   - In `src/components/common/EntryModeSelector.tsx:223`, `{lateralDetails.semestersCount} Semesters (Sem III–VIII)` was hardcoded.
   - For `DIP-CSE`, the actual scheme is 3 Academic Years (Semesters I–VI) and Lateral Entry is 2 Academic Years (Semesters III–VI).
2. **DATA-002 (Broken MCS-101 YouTube Playlist):**  
   - In `src/components/video/VideoLecturesSection.tsx:328`, the playlist URL `https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonhCfCFMKQSS4RFnbXju` was dead/deleted.
   - The active official 66-video GATE Smashers Computer Organization and Architecture playlist is `https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX`.
3. **UX-001 & UX-005 (Ph.D. Hub Navigation & Copy):**  
   - The 9 tabs on `/phd` had verbose desktop labels (`Program Overview & Milestones`, `Coursework Syllabus (12 Credits)`, `Thesis & Viva Voce (25 Qs)`), causing the horizontal container to clip `Thesis & Viva` with an overflow scrollbar.
   - Coursework tab copy and publication Pass 3 button had `truncate` cutting text to `Deep Dissection & Virtual Re-Implementation (2 t...`.
4. **UX-003 & UX-004 (Engineering Listing Cards & Nav Scope):**  
   - On `/engineering`, badges lacked `whitespace-nowrap shrink-0`, causing `BTECH-019` to break across lines (`BTECH-` and `019`), and trailing bullets (`• Diploma •`) appeared when flex wrapped.
   - Top navbar link label was `Engineering` despite covering exclusively Computer Science & Engineering programmes.
5. **SRCH-001 & SRCH-002 (Search Intelligence & Sync):**  
   - `/search` searched only literal `code` and `name` strings, missing acronyms (`DBMS`, `OS`, `CN`, `DSA`, `ACA`), programme queries (`M.Tech CSE`), and common spelling typos (`Data Structurs`).
   - Dropdowns required clicking "Apply Search" rather than auto-submitting.
6. **SEC-001, SEC-002, SEC-003, SEC-004 (Security Hardening):**  
   - `/api/pyq/download` resolves database-backed resources and validates storage roots, but needs strict parameter sanitization and security header verification (`nosniff`, `Content-Disposition`, HSTS, and CSP).
   - `/api/resources/submit` already enforces `%PDF-` magic bytes and 10 MB caps, but requires bounded rate limiting and turnstile/bot protections.
   - HTTP security headers in `next.config.mjs` lacked `Strict-Transport-Security` and complete `Content-Security-Policy`.
7. **SEO-001, PRIV-001, ANALYTICS-001:**  
   - Zero Google Search results for `site:invertislearn.vercel.app`. Missing canonical legal pages (`/privacy`, `/terms`, `/disclaimer`, `/contact`). Missing privacy-friendly analytics (GoatCounter).
