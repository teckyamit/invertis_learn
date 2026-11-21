# Invertis Learn — Production Deployment Guide
**Document ID:** IL-AUDIT-DEP-001  
**Audit Date:** November 21, 2026  
**Implementation Branch:** `improvement-audit-remediation`  
**Base Branch:** `main`  
**Hosting Platform:** Vercel  
**Database:** Neon PostgreSQL  

---

## 1. Overview

This deployment guide provides instructions for reviewing, merging, and deploying the complete audit remediation to the live production website (`https://invertislearn.vercel.app/`).

---

## 2. Pre-Deployment Verification Checklist

Before merging into `main`, ensure that all local validations have passed:

- [x] `npm run typecheck` passes with 0 errors.
- [x] `npm run lint` passes with 0 warnings.
- [x] `npx tsx scripts/test-subject-reorganization.cjs` passes all 7 regression tests.
- [x] `npm run build` completes successfully with exit code 0.
- [x] No sensitive credentials or secrets (`.env` files) are tracked in git.

---

## 3. Merge Procedure (Git CLI)

All work is currently staged and committed on branch `improvement-audit-remediation`.

### Step 1: Ensure Working Tree is Clean
```bash
git status
```

### Step 2: Push the Improvement Branch to GitHub
```bash
git push -u origin improvement-audit-remediation
```

### Step 3: Create and Review Pull Request
Open GitHub repository: `https://github.com/teckyamit/invertis_learn`
Create a Pull Request:
- **Base:** `main`
- **Compare:** `improvement-audit-remediation`
- **Title:** `feat: complete website audit remediation, SEO infrastructure, my semester, and resource request system`
- **Review:** Verify all changed files match `docs/audit/CHANGELOG.md`.

### Step 4: Merge to Main
Merge using squash-and-merge or standard merge commit:
```bash
git checkout main
git merge improvement-audit-remediation
git push origin main
```

---

## 4. Vercel Production Environment Variables

Ensure the following environment variables are set in the Vercel Project Settings (**Settings &rarr; Environment Variables**):

| Variable Name | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Pooled Neon PostgreSQL connection string (`?pgbouncer=true`) |
| `DIRECT_URL` | Yes | Direct Neon PostgreSQL connection string (for migrations) |
| `CURATOR_ACCESS_KEY` | Yes | Secure 32+ character access key for curator dashboard login |
| `SESSION_SECRET` | Yes | Cryptographic secret for signing session cookies |
| `NEXT_PUBLIC_APP_URL` | Yes | Set to `https://invertislearn.vercel.app` |

---

## 5. Post-Deployment Verification (Smoke Tests)

Once Vercel finishes the production deployment:

1. **Homepage:**
   - Verify `<MySemesterWidget />` displays properly.
   - Verify Diploma CSE card displays `(Lateral: III–VI)`.
   - Verify B.Tech CSE Cloud Computing card displays a single `BTECH-019` badge.
2. **Search:**
   - Navigate to `/search`.
   - Search for `MCS102` (without hyphen) &rarr; verify `MCS-102` is returned.
3. **Subject Page:**
   - Navigate to `/syllabus/MTECH-CSE/semester/1/MCS101`.
   - Verify header action buttons ("Request Notes / PYQ" and "Report Issue").
   - Click "Request Notes / PYQ" &rarr; verify modal opens and submits.
4. **Curator Dashboard:**
   - Navigate to `/admin`.
   - Log in using your curator access key.
   - Switch to the "Student Demand & Content Reports" tab &rarr; verify student requests and ranked subject demand are displayed.
5. **SEO & Crawlers:**
   - Visit `https://invertislearn.vercel.app/sitemap.xml` &rarr; verify XML output.
   - Visit `https://invertislearn.vercel.app/robots.txt` &rarr; verify crawler directives.
