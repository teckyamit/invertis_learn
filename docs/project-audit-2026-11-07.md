# Invertis Learn project audit

Date: 7 November 2026. Scope: current working tree, local database, application routes, components, schema, storage, content-generation scripts, configuration, build and available verification scripts.

## Assessment

The project builds successfully and has a usable academic browsing foundation. It is not ready for public production use until upload security, framework security updates, content provenance, and broken lateral-entry resource routes are addressed. No application code or database records were changed during this audit. Existing changes were preserved; this report is the only intentional source addition. Build output was regenerated.

This is a repository and local-runtime audit, not a penetration test or certification of academic accuracy. Browser visual/keyboard testing, deployment infrastructure, backups, and comparison of every academic statement against original university documents remain unverified.

## Project map

- Next.js 14.2.15 App Router, React 18, TypeScript, Tailwind, Lucide icons.
- Prisma 5 with SQLite; local public-directory PDF storage.
- Features: programme/engineering directories, syllabus navigation, PYQs and upload, notes, labs, project archive, external learning links, video lectures, career pathways, about page.
- Server components query Prisma directly; client components handle filtering, previews and uploads.
- Lateral-entry curriculum reuse lives in `src/lib/lateralEntry.ts`.
- Six API route files: one PYQ listing/upload endpoint and five download endpoints.
- No implemented authentication/session or administrative review workflow was found. The User model alone does not enforce permissions.

### Local data inventory

| Entity | Count |
|---|---:|
| Departments | 9 |
| Programmes | 62 |
| Curriculum versions | 3 |
| Semesters | 20 |
| Subjects | 220 |
| Resource records | 263 |
| Distinct referenced resource files | 244 |
| External resources | 68 |
| Video lectures | 32 |

Resource records comprise 220 syllabi, 7 PYQs, 10 notes, 11 lab resources and 15 project resources. Actual curricula exist for BTECH-CSE, MTECH-CSE and BTECH-CSE-AI; catalogue size should not be presented as equivalent content coverage. Lateral-entry programmes reuse parent curricula rather than owning additional subject records.

## Prioritized findings

### P1 — Anonymous visitors can publish question papers

Evidence: `src/app/api/pyq/route.ts:65`, especially the unconditional `isPublished: true` at line 135. POST has no authentication, authorization, moderation, rate limit or uploader attribution. The UI's statement that faculty/admins upload verified papers is not enforced. A visitor can submit arbitrary titles and documents against any known subject ID and immediately publish them.

Recommended action: preserve public reading, but require authorized writes or a controlled submission/review workflow. Record uploader and approval metadata; default submissions to unpublished.

### P1 — Upload validation permits resource exhaustion and non-PDF content

Evidence: `src/app/api/pyq/route.ts:97–114`. Only the filename extension is checked. The entire multipart request and file are buffered without an application size limit; writes are synchronous. There is no PDF parsing/content validation, bounded metadata schema, file cleanup if the database insert fails, or collision-resistant naming beyond a millisecond timestamp.

Recommended action: enforce request/file limits before buffering where possible, validate field types and allowed values, validate PDF content, use UUID names and asynchronous storage, and clean up partial writes. Use the storage interface consistently.

### P1 — Installed framework predates a confirmed security fix

Evidence: `package.json` pins Next.js 14.2.15. The official [December 2025 Next.js advisory](https://nextjs.org/blog/security-update-2025-12-11) identifies App Router denial-of-service issues in 14.x and lists 14.2.35 as the fix for that advisory. This project uses the App Router. Do not interpret this as an assertion that stable Next.js 14 is affected by React2Shell RCE; that is a different advisory.

Recommended action: choose a currently supported patched release, review migration requirements and rerun regression checks. `npm audit --json` returned zero findings in this environment, contradicting the applicable vendor advisory; that result is not sufficient security assurance.

### P1 — Generated materials are presented as verified official resources

Evidence: `scripts/generate-pyq-pdfs.js` constructs examination questions and institutional headers; `scripts/seed-demo-pyqs.js:20` publishes those demo papers with historical exam titles. `src/components/pyq/PYQSection.tsx` describes them as official university papers. Lab/project generation scripts similarly use “Official” labels, and the notes generator assigns named faculty authors without a source-verification record in this workflow.

The syllabus detail page computes `VERIFIED` from a filename convention plus the existence of modules/experiments (`src/app/syllabus/[programmeCode]/semester/[semesterNumber]/[subjectCode]/page.tsx:134–147`). Those checks do not establish provenance or academic correctness. This conflicts with the repository's documented zero-invented-data policy.

Recommended action: separate practice/demo material from official archives, remove unsupported author/institution claims, and store source document, source page, reviewer, verification date and status. Preserve original supplied documents. Do not delete or rewrite the current materials without reviewing their provenance.

### P1 — Lateral-entry resource navigation produces 404s

Programme-level notes/lab/PYQ pages resolve parent curricula and generate links using the lateral programme code. Their semester pages query that code directly without parent resolution; lateral programmes have no own curricula. The dedicated PYQ subject route has the same issue.

Confirmed against the production server:

| Route | Status |
|---|---:|
| `/notes/BTECH-CSE-LE` | 200 |
| `/notes/BTECH-CSE-LE/semester/3` | 404 |
| `/labs/BTECH-CSE-LE/semester/3` | 404 |
| `/pyq/BTECH-CSE-LE/semester/3` | 404 |
| `/pyq/BTECH-CSE-LE/semester/3/BCS-301` | 404 |
| `/syllabus/BTECH-CSE-LE/semester/3/BCS-301` | 200 |

Evidence: semester route queries at line 26 in the notes, labs and PYQ pages; direct programme filtering at line 36 in the PYQ subject page. Reuse one resolver and semester eligibility check across every resource route. Add tests for both lateral programmes and all resource families.

### P2 — Publication and activity restrictions are inconsistent

Download endpoints accept filenames and read public files without consulting resource publication state. Files under `public/uploads` are directly accessible regardless of `isPublished`. The resources hub counts/includes resources without publication filters; subject detail routes omit active-subject/programme checks.

Impact: hiding a record does not withdraw its file, and inactive content can remain accessible by URL. If withdrawal/moderation is intended, move controlled files out of public storage and serve by resource ID with centralized eligibility checks. Align discovery and detail query filters.

### P2 — Verification scripts can report false success

`verify-phase2.js` reported two failed checks but returned exit code 0. The phase 1–4 assertion helpers do not consistently fail the process when assertions fail. Phase 2 assumes an exact seeded count and a `%PDF-1.4` header; the additional uploaded document is a parseable PDF, so the header failure does not establish corruption.

The lateral-entry suite passed 54/54 while missing the four broken routes reproduced above. Mobile/CSS suites inspect response strings and source classes, not actual viewport layout or interactions. There is no configured lint setup: `npm run lint` opens the ESLint setup prompt. No CI configuration or standard general test command was found.

Recommended action: make failed assertions return nonzero, isolate test fixtures, replace brittle seeded-count/header assertions, configure lint, and add route/workflow tests plus actual browser checks.

### P2 — Setup and data reconstruction are not documented or repeatable

There is no README or migration history. `start.bat` installs packages/generates Prisma but does not create environment configuration, initialize the database or reproduce the current dataset. `db:seed` points to one base seed while the current catalogue/content requires numerous separate scripts; the base seed uses a CSE department while subsequent scripts expect ENG. Several extraction scripts contain absolute paths to another tool's historical upload directory.

Recommended action: document supported Node version, setup, ordered seed/import workflow, migrations, deployment storage and backup/restore. Validate fresh setup against an isolated database before changing the existing one. SQLite and filesystem uploads require durable storage in deployment.

### P2 — Modal accessibility is incomplete

PYQ upload/preview and other preview/information modals use ordinary divs without dialog semantics, focus trapping/restoration or Escape handlers. Several icon-only close buttons have no accessible name. Evidence includes `src/components/pyq/PYQUploadModal.tsx`, `PYQSection.tsx`, and the programme directory modal.

Recommended action: use a shared accessible dialog primitive and validate keyboard and screen-reader flows. Existing responsive class checks do not cover this.

### P2 — Generated notes/labs silently omit overflowing content

Both generation scripts return early when vertical position falls below thresholds instead of creating another page: `scripts/generate-and-seed-phase3-notes.js:40,45` and `scripts/generate-and-seed-phase4-labs.js:39,44`. This discards content when a document exceeds one page. Existing tests accept one-page documents without checking completeness.

Recommended action: paginate with measured text layout and verify rendered output and source-to-output completeness before regenerating any academic files.

### Other maintenance and content concerns

- Seven resource records have file-size metadata inconsistent with disk. Recalculate during controlled import; file presence alone is insufficient.
- All 220 syllabus JSON fields parse, but 11 subjects have neither modules nor experiments. Review whether these are legitimate project/seminar omissions or incomplete imports before populating anything.
- Career salary/certification recommendations lack source dates; `verificationUrl` is optional and no populated entries were found. Verify with issuing organizations before claiming current availability or market demand. Course-route mappings themselves all match the database.
- Multiple current curriculum versions are permitted by the schema, while pages often select the first without a deterministic preference. Enforce a single-current-version rule in the write workflow.
- Duplicate download endpoints and repeated programme/semester query code have already diverged. Shared query/storage helpers would reduce defects.
- `LocalStorageProvider` uses paths relative to its uploads root while active upload code stores `uploads/...` paths relative to public. The provider is bypassed; reconcile contracts before integrating it.
- Global CSS imports Google Fonts while layout also uses `next/font/google`, adding duplicate font-loading mechanisms.
- Local PDF reads are synchronous and PYQ listing is unpaginated. Address these before scaling, without treating them as measured performance failures.
- Many pre-existing working-tree changes were present: 44 modified tracked files plus three untracked files before this report. Establish a reviewed baseline before implementation work.

## Verification results

| Check | Result |
|---|---|
| TypeScript, `tsc --noEmit --incremental false` | Pass |
| Prisma schema validation | Pass |
| Production build | Pass; initial sandbox spawn EPERM resolved with approved external build |
| Phase 1 | Pass |
| Phase 2 | Two failed assertions, incorrectly exits 0 |
| Phase 3 / Phase 4 | 31/31 and 54/54 pass |
| Phase 5 / Phase 6 | 25/25 and 34/34 pass |
| Course discovery | 42/42 pass |
| Existing lateral-entry suite | 54/54 pass; coverage gap demonstrated |
| Homepage lateral stats | 39/39 pass |
| B.Tech AI | 36/36 pass |
| Curated resources | 20/20 pass |
| Mobile static/HTTP suite | 22/22 pass; not visual QA |
| CSS loading suite | 20/20 pass |
| Lint | Not configured; setup prompt |
| Referenced files | All exist |
| PDF structural parsing | All 244 distinct files load with pdf-lib |
| File-size metadata | 7 mismatches |
| Career course targets | No missing database matches |

No destructive seed/import scripts were run. No exploit, arbitrary upload or database mutation was used to demonstrate security issues. PDF parsing establishes structural readability, not academic accuracy, rendering quality or safety. External educational links and institutional affiliations were not exhaustively verified. Runtime checks used a local production server, stopped after testing.

## Suggested implementation order

1. Preserve the working-tree/database baseline; fix upload controls and update the framework.
2. Establish content provenance and accurate official/demo labels.
3. Fix lateral-entry resolution across all resource routes and add regression coverage.
4. Repair lint/test failure behavior, document reproducible setup and data workflows.
5. Address dialog accessibility, content completeness, metadata consistency and shared query/storage code.

Feature expansion should follow these foundations. This audit does not apply the recommended fixes.
