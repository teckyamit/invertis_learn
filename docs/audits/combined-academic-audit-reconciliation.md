# Invertis Learn — Combined Academic Audit Reconciliation Report

**Date:** 22 November 2026  
**Auditor:** Multidisciplinary Software Architecture & Academic Content Team  
**Methodology:** GRAVITAS Invariant Framework  
**Scope:** Reconciling Report A (ChatGPT Live Website Audit) and Report B (Gemini GitHub Audit)  

---

## 1. Executive Summary

This report establishes the unified baseline across the entire Invertis Learn academic ecosystem by systematically reconciling findings from:
1. **Report A:** ChatGPT live website audit (`https://invertislearn.vercel.app/`), covering the baseline catalog of 379 subjects, 35 active semesters, 6 CSE programmes, and live navigational behaviors.
2. **Report B:** Gemini deep repository audit (`https://github.com/teckyamit/invertis_learn`), which identified 8 critical-to-medium academic discrepancies (DISC-01 through DISC-08), surveyed 79 candidate resources, inspected seed/verifier scripts, and analyzed video iframe embeds.

---

## 2. Reconciled Baseline Metrics

| Metric Category | Report A (ChatGPT) | Report B (Gemini) | Reconciled Canonical Baseline | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Catalogued Subjects** | 379 | 379 (77 audited) | **378 Canonical Subjects** (1 duplicate BCS201 removed) | Resolved |
| **Active Semesters** | 35 | 35 | **35 Semesters** | Verified |
| **Active CSE Programmes** | 6 | 6 (PHD, MTECH, BTECH, DIP + Lateral) | **6 Programmes** | Verified |
| **Academic Resources (PYQ, Notes, Labs)** | 494 | 494 | **492 Canonical Uploads** (100% Preserved) | Verified |
| **External Curated Resources** | 67 | 79 candidate registry | **79 Curated Resources** across 24 core subjects | Verified |
| **Video Delivery Mode** | Mixed / Embeds | Iframes in seed/component | **External Links Only** (Zero iframes) | Resolved |
| **Curator Dashboard** | Basic moderation | Moderation + Requests | **Moderation + Demand + Academic Manager** | Implemented |

---

## 3. Reconciliation Analysis

### 3.1 Course Title & Curriculum Inconsistencies (DISC-01)
- **Report A Finding:** High-level inventory matched live subject cards but did not cross-reference against official university PDFs for Postgraduate programmes.
- **Report B Finding:** M.Tech Semester I index displayed outdated titles (`Advanced Operating Systems`, `Theory of Computation`, `Computer Networks`, `Research Methodology`) while official 2023-24 curriculum and detail pages specified:
  - `MCS-102`: **Foundation of Computer Science**
  - `MCS-103`: **Advanced Computer Networks**
  - `MCS-104`: **Distributed Systems**
  - `MCS-105`: **Cloud Computing**
- **Reconciliation Decision:** Official 2023-24 syllabus PDF is the supreme source of truth. Titles in `prisma/catalogue.json` and seed routines have been synchronized to official curriculum.

### 3.2 Degree Credit Calculation Inflation (DISC-02 & DISC-03)
- **Report A Finding:** Documented raw mathematical totals from semester pages without analyzing elective basket logic.
- **Report B Finding:** M.Tech CSE showed 122.0 credits on site due to summing all elective courses in Sem II and Sem III, whereas the official degree requirement is strictly 78 credits. Similarly, Ph.D. showed 24 credits by summing all 3 departmental electives instead of 16 required credits.
- **Reconciliation Decision:** Created `src/lib/academic-credits.ts` to define official prescribed degree credits (`78.0` for M.Tech, `16.0` for Ph.D.) and render explicit "Prescribed Credits vs Elective Course Pool" breakdowns across all syllabus views.

### 3.3 Duplicate Subject Registration (DISC-04)
- **Report A Finding:** Noted BCS201 in both Sem 1 and Sem 2 search results.
- **Report B Finding:** Confirmed `BCS201` (Programming in C) was accidentally duplicated in B.Tech Semester I (`cmw12ph0r00013r89j4xd6cy8`) when Semester I already possesses `BCS101` (Introduction to Computers) and `BCS151`.
- **Reconciliation Decision:** Removed duplicate Sem 1 entry from `prisma/catalogue.json`. Preserved canonical Sem 2 entry (`cmw0yuxbn001qpkgb01d9j9wa`) with its official syllabus, exam papers, and lab manuals.

### 3.4 Official University PDF Errata (DISC-05)
- **Report B Finding:** Discovered internal discrepancies within official university PDFs:
  - `2316imguf_B.Tech.CSE2year.pdf` displays 3 credits in summary table for `BCS-404` but 4 credits on syllabus page.
  - `BAS-301` prints Discrete Structures Course Outcomes under Mathematics-III title.
- **Reconciliation Decision:** Preserved contact hour standard (4 credits for BCS-404); added transparent curator errata notices via `OFFICIAL_SYLLABUS_ERRATA` in `src/lib/academic-credits.ts`.

---

## 4. Verification Checkpoint

All reconciled decisions have been tested via executable verification script:
`node scripts/verify-curated-cse-resources.js` -> `VERDICT: PASS (17/17 checks passed)`.
