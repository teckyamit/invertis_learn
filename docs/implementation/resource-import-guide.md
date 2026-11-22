# Academic Resource Import & Seeding Guide

**Target Audience:** DevOps Engineers, Database Administrators, Backend Developers  
**Scripts:** `scripts/merge-academic-datasets.cjs`, `scripts/seed-curated-cse-resources.js`  

---

## 1. Overview

The academic resource import pipeline takes normalized datasets from `data/academic-resources/` and ingests them into Invertis Learn.

### Canonical Data Files (`data/academic-resources/`)
1. `resource-registry.json` — Master repository of all 79 curated resources.
2. `subject-resource-mappings.json` — 24 subject-to-resource association mappings with unit coverage.
3. `existing-resource-actions.json` — 28 evaluated legacy resources with KEEP/REPLACE/REMOVE decisions.
4. `rejected-resource-candidates.json` — Rejected items (paywalls, dead URLs, low academic rigor).
5. `uncovered-syllabus-topics.json` — Documented curriculum gaps.

---

## 2. Generating Datasets

To refresh canonical JSON datasets from an updated audit report:
```bash
node scripts/merge-academic-datasets.cjs
```
This extracts and validates all items, generating formatted JSON files in `data/academic-resources/`.

---

## 3. Seeding Execution

### 3.1 Dry-Run Mode (Safe Audit)
Always run with `--dry-run` first to audit changes without writing to database or catalogue:
```bash
node scripts/seed-curated-cse-resources.js --dry-run
```
Expected output:
```
[Catalogue Summary]
  External Resources: 31 created, 2 updated
  Video Lectures:     41 created, 0 updated
  Total Academic Resources Preserved: 492
```

### 3.2 Production Ingestion
When ready to persist:
```bash
node scripts/seed-curated-cse-resources.js
```
The script will:
- Connect to Neon PostgreSQL if `DATABASE_URL` is available.
- Fall back gracefully to `prisma/catalogue.json` in offline/sandboxed environments.
- Guarantee **100% preservation** of all 492 `AcademicResource` rows (PYQs, uploaded faculty notes, lab manuals).
- Ensure **100% idempotency** (zero duplicate rows upon subsequent runs).

---

## 4. Verification Check

After seeding, verify platform integrity with:
```bash
node scripts/verify-curated-cse-resources.js
```
All 17 checks must return `[PASS]` and conclude with `VERDICT: PASS`.
