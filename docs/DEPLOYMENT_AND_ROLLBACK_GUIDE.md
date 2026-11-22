# Invertis Learn — Production Deployment and Rollback Guide

**Project:** Invertis Learn  
**Target Platform:** Vercel + Neon Serverless PostgreSQL  
**Repository Branch:** `main`  
**Active Work Branch:** `improvement-production-readiness-audit`  

---

## 1. Pre-Deployment Verification Checklist

Before pushing changes or promoting a release, execute and confirm these quality gates:

```powershell
# 1. Typecheck (zero errors required)
npm run typecheck

# 2. Linting (zero warnings required)
npm run lint

# 3. Production Build
npm run build
```

---

## 2. Vercel Environment Variables Checklist

Ensure the following variables are configured in **Vercel Project Settings → Environment Variables**:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Neon pooled connection string (`?sslmode=require&pgbouncer=true`) |
| `DIRECT_URL` | Yes | Neon direct unpooled connection string (for migrations) |
| `NEXT_PUBLIC_APP_URL` | Yes | Canonical site origin (`https://invertislearn.vercel.app`) |
| `NEXT_PUBLIC_GOATCOUNTER_ENDPOINT` | Optional | GoatCounter analytics URL (e.g. `https://invertislearn.goatcounter.com/count`) |
| `NEXT_PUBLIC_GOATCOUNTER_ENABLED` | Optional | Set to `"true"` to activate analytics beacon |
| `CURATOR_PASSWORD_HASH` | Yes | SHA-256 / bcrypt hash for authenticated curator actions |
| `BLOB_READ_WRITE_TOKEN` | Optional | Vercel Blob token for cloud PDF storage |

---

## 3. Database Safety Rules (Zero-Destructive Mandate)

> [!CAUTION]
> **Strict Invariant:** All 379 academic subjects, 6 canonical CSE programmes, and 494 resources must be preserved. Never run destructive database commands in production:
> - `npx prisma migrate reset` — **PROHIBITED**
> - `npx prisma db push --force-reset` — **PROHIBITED**
> - `DROP TABLE` or `TRUNCATE` queries — **PROHIBITED**

If schema changes are needed in the future:
1. Generate migration using `npx prisma migrate dev --create-only`.
2. Inspect the generated SQL file in `prisma/migrations/`.
3. Apply non-destructively using `npx prisma migrate deploy`.

---

## 4. Git Release & Merge Workflow

1. Commit all verified changes to the audit branch:
   ```bash
   git add .
   git commit -m "feat(core): complete master production audit and enhancements"
   ```
2. Push branch to remote repository:
   ```bash
   git push origin improvement-production-readiness-audit
   ```
3. Open a Pull Request into `main`.
4. Once CI passes, merge into `main` using standard squash or merge commit.
5. Vercel automatically deploys the updated `main` branch to production.

---

## 5. Instant Rollback Procedure

If unexpected runtime behavior occurs on the live website:

### Method A: Vercel Instant Deployment Promotion (Zero Downtime — < 15 seconds)
1. Go to the [Vercel Dashboard](https://vercel.com).
2. Select the **Invertis Learn** project.
3. Navigate to the **Deployments** tab.
4. Locate the last known good deployment (e.g., prior deployment commit `3d72259`).
5. Click the three dots (`...`) menu on the right.
6. Select **Promote to Production**.
7. Vercel instantly routes 100% of incoming production traffic to the previous build with zero rebuild time.

### Method B: Git Revert (Clean VCS History)
```bash
git checkout main
git pull origin main
git revert HEAD -m 1
git push origin main
```
Vercel will build and deploy the reverted commit automatically.
