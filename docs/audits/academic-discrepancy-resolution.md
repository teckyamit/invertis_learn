# Academic Discrepancy Resolution Matrix (DISC-01 to DISC-08)

**Project:** Invertis Learn  
**Status:** 100% Resolved & Executable Verified  
**Standard:** GRAVITAS Engineering Reliability Framework  

---

## Complete Resolution Table

| Discrepancy ID | Programme | Severity | Problem Summary | Official University Source | Resolution Implemented | Verifier Evidence |
| :--- | :--- | :---: | :--- | :--- | :--- | :---: |
| **DISC-01** | MTECH-CSE | Critical | M.Tech Sem I title mismatches on course listings | Official 2023-24 M.Tech PDF (`4451imguf_mtech-cse.pdf`) | Synchronized titles in `prisma/catalogue.json` to: `MCS-102`: Foundation of Computer Science, `MCS-103`: Advanced Computer Networks, `MCS-104`: Distributed Systems, `MCS-105`: Cloud Computing. | PASS |
| **DISC-02** | MTECH-CSE | High | Credit total inflation (122.0 credits displayed by summing elective pool) | 2023-24 M.Tech PDF specifies exactly 78 degree credits | Implemented `PROGRAMME_CREDIT_CONFIGS` in `src/lib/academic-credits.ts`. Displays 78.0 prescribed degree credits with explicit elective pool breakdown. | PASS |
| **DISC-03** | PHD-009 | High | Ph.D. coursework credit inflation (24.0 credits displayed) & missing books | Ph.D. Ordinance Clause 5.1 specifies 8–16 credits (16 with 1 elective) | Displayed 16.0 Required Credits (Core + 1 Elective); restored official reference book lists in catalogue. | PASS |
| **DISC-04** | BTECH-CSE | High | Duplicate BCS201 entry in Semester I and Semester II | 1st-year B.Tech syllabus (`2315imguf_B.Tech.CSE1year.pdf`) places BCS101 in Sem I and BCS201 in Sem II | Removed duplicate subject `cmw12ph0r00013r89j4xd6cy8` from Sem I. Consolidated resources under canonical Sem 2 subject. | PASS |
| **DISC-05** | BTECH-CSE | Medium | Conflicting university syllabus PDFs & errata (IIOT1/IIOT2, BAS-301, BCS-404) | 2nd-year B.Tech PDF (`2316imguf_B.Tech.CSE2year.pdf`) | Preserved CSE-specific titles; registered transparent curator errata notices in `OFFICIAL_SYLLABUS_ERRATA`. | PASS |
| **DISC-06** | DIP-CSE | Medium | Lab code mismatch: `DEC351` in scheme vs `DCS-351` in syllabus detail | Diploma CSE PDF (`cse-diploma-second.pdf`) | Standardized display as `DEC351 (alias DCS-351)` and added bidirectional alias search resolution. | PASS |
| **DISC-07** | PHD-009 | Low | Typographic misspellings inherited from official PDF ("Peremption Ceiling Protocol") | Ph.D. CSE syllabus PDF | Sanitized typos in `syllabusDetails` (`Preemption Ceiling Protocol`, `flexible constraints`) while preserving verbatim syllabus modules. | PASS |
| **DISC-08** | MTECH-CSE | Low | Subject code hyphenation inconsistency (`MCS351`, `MCS393` vs `MCS-394`) | Official scheme formatting | Implemented `getSubjectCodeVariants()` alias resolver in `src/lib/academic-credits.ts` and search page. | PASS |

---

## Architectural Evidence

All 8 resolutions are strictly validated by `scripts/verify-curated-cse-resources.js`:
```
Test Group 2: Academic Discrepancies Resolution (DISC-01 to DISC-08)
  [PASS] DISC-01: M.Tech Sem I subject titles — MCS-102..MCS-105 match official 2023-24 curriculum
  [PASS] DISC-02: M.Tech 78 prescribed degree credits — Reconciled 78 degree credits vs elective pool in academic-credits.ts
  [PASS] DISC-03: Ph.D. 16 prescribed coursework credits — Reconciled 16 coursework credits (Core + 1 Elective)
  [PASS] DISC-04: Duplicate BCS201 eliminated — BCS201 removed from Sem 1 and preserved canonically in Sem 2
  [PASS] DISC-05: Documented university errata notices — Curator notices registered for IIOT1, IIOT2, BAS-301, BCS-404
  [PASS] DISC-06 & DISC-08: Subject code aliases — DEC351 <-> DCS-351 and MCS351 <-> MCS-351 configured
  [PASS] DISC-07: PhDCS 105 spelling corrected — "Preemption Ceiling Protocol" and constraints normalized
```
