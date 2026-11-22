# Database Migration, Integrity & Rollback Guide

**Target Audience:** Lead Database Engineer, DevOps Engineer  
**Policy:** Zero Destructive Operations (`prisma migrate reset` and `db push --force-reset` strictly prohibited)  

---

## 1. Zero-Downtime Migration Policy

All database operations across Invertis Learn adhere to strict additive and non-destructive standards:
1. Existing tables (`Subject`, `Programme`, `Semester`, `AcademicResource`, `AuditEvent`, `CuratorSession`) must never be dropped or truncated.
2. `AcademicResource` entries (representing student uploads, previous exam papers, faculty lecture notes, and lab manuals) must remain 100% intact.
3. Seeding scripts must use idempotent upsert logic matching on unique keys or existing URL paths.

---

## 2. Snapshot & Backup Architecture

Before executing production database changes, complete snapshots are maintained in:
- `backups/complete-academic-and-auth-snapshot.json`
- `prisma/catalogue.json`

### Creating a Pre-Migration Snapshot
```bash
node -e "
const fs = require('fs');
const cat = fs.readFileSync('prisma/catalogue.json', 'utf8');
fs.writeFileSync('backups/pre-resource-migration-snapshot-' + Date.now() + '.json', cat, 'utf8');
console.log('Snapshot created successfully.');
"
```

---

## 3. Rollback Procedures

If an unexpected regression occurs following seeding:

### Step 1: Revert Catalogue State
Restore `prisma/catalogue.json` from the pre-migration snapshot:
```bash
git checkout HEAD -- prisma/catalogue.json
```

### Step 2: Database Restoration
If database rows were updated incorrectly, run the restoration utility:
```bash
node scripts/backup.cjs
```
This restores all canonical catalog records from the validated snapshot.

### Step 3: Verification
Run the verification suite to ensure baseline restoration:
```bash
node scripts/verify-curated-cse-resources.js
```
The suite must return `VERDICT: PASS` across all 17 checks.
