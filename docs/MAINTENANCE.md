# Invertis Learn — Maintenance & Operational Runbooks

This guide provides step-by-step operational runbooks for maintaining, updating, and troubleshooting the **Invertis Learn** platform.

---

## 1. Routine Quality & Audit Commands

Run these routine health checks before deploying updates or after modifying catalogue data:

```bash
# 1. Check TypeScript compilation
npm run typecheck

# 2. Check ESLint rule compliance
npm run lint

# 3. Global Subject PDF Reliability Audit (audits all 379 subjects on disk)
node scripts/audit-pdf-reliability.cjs

# 4. Global End-to-End Download & Route Verification (requires running server)
node scripts/test-pdf-reliability-global.cjs
```

---

## 2. Runbook: Adding a New Academic Programme

To introduce a new academic degree or diploma:

### Step 1: Update Prisma Database
Create a seed or script using Prisma:
```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addProgramme() {
  const dept = await prisma.department.findUnique({ where: { code: "ENG" } });

  const programme = await prisma.programme.create({
    data: {
      departmentId: dept.id,
      code: "BTECH-ECE",
      name: "Bachelor of Technology in Electronics & Communication Engineering",
      degreeLevel: "UNDERGRADUATE",
      category: "UNDERGRADUATE",
      durationYears: 4,
      eligibility: "10+2 with Physics and Mathematics (Min 50% aggregate).",
      isLateralEntry: false,
      isActive: true,
      hasOfficialSyllabus: true,
    },
  });

  // Create primary curriculum version
  const curriculum = await prisma.curriculumVersion.create({
    data: {
      programmeId: programme.id,
      versionYear: "2023-2024",
      regulationName: "Session 2023-24 Regulation",
      isCurrent: true,
    },
  });

  // Create Semesters 1 through 8
  for (let sem = 1; sem <= 8; sem++) {
    await prisma.semester.create({
      data: {
        curriculumVersionId: curriculum.id,
        semesterNumber: sem,
        title: `Semester ${sem}`,
      },
    });
  }
}
```

### Step 2: Register in Academic Levels
If adding a new tier, ensure it is registered with appropriate sorting priority in [`src/lib/academicLevels.ts`](file:///g:/invertis%20learn/src/lib/academicLevels.ts).

---

## 3. Runbook: Adding or Updating a Subject

To add a course subject with syllabus details:

```javascript
const subject = await prisma.subject.create({
  data: {
    semesterId: targetSemesterId,
    code: "BEC-301",
    name: "Electronic Devices & Circuits",
    credits: 4.0,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    subjectType: "THEORY",
    evaluationMarks: "CA: 25, EE: 50, Total: 75",
    syllabusDetails: JSON.stringify({
      objectives: ["Understand semiconductor physics and diode operations."],
      outcomes: ["Analyze transistor bias circuits and amplifier responses."],
      modules: [
        {
          moduleNumber: "Unit 1",
          title: "Semiconductor Diodes",
          topics: "PN junction diode, V-I characteristics, Zener diodes, Rectifiers.",
        },
      ],
      textBooks: ["Electronic Devices and Circuit Theory - Boylestad & Nashelsky."],
    }),
  },
});
```

---

## 4. Runbook: Ingesting & Extracting Master Syllabus PDFs

When Invertis University publishes an updated master composite syllabus PDF:

1. **Place Master PDF in Storage**:
   Save the master document in `storage/uploads/syllabus/` or `public/uploads/syllabus/`.
2. **Execute Ingestion Pipeline**:
   Use `scripts/extract-all-missing-syllabi.cjs` as a template to parse pages and generate isolated subject PDFs:
   ```bash
   node scripts/extract-all-missing-syllabi.cjs
   ```
3. **Register Canonical `AcademicResource`**:
   The script calculates the byte size, generates the SHA-256 checksum, sets `provenanceStatus: "VERIFIED"`, and links the resource to the corresponding `Subject` record.
4. **Audit Reliability**:
   Verify that the subject's PDF is detected with 100% presence:
   ```bash
   node scripts/audit-pdf-reliability.cjs
   ```

---

## 5. Runbook: Troubleshooting PDF Links & Downloads

If a user reports that a syllabus PDF fails to open or download:

| Symptom | Probable Cause | Action |
| :--- | :--- | :--- |
| **HTTP 404: "Resource not available"** | Database record exists, but file is missing from both `storage/uploads/` and `public/uploads/`. | Check `storagePath` in `AcademicResource`. Ensure the file exists under `storage/uploads/<storagePath>` or `public/uploads/<storagePath>`. |
| **HTTP 400: "Invalid filename"** | Filename contains path traversal characters (`..`, `/`, `\`). | Sanitize query parameters. Ensure `?id=...` is used instead of raw file paths. |
| **Download button not visible** | `isAvailable` evaluated to false because `checkPhysicalPdfAvailability` found zero-byte or nonexistent file. | Run `node scripts/audit-pdf-reliability.cjs` to locate the missing subject file and place the valid PDF in storage. |
| **Space in subject code 404** | URL encoding issue in dynamic segment. | Ensure the route handler decodes `params.subjectCode` with `decodeURIComponent()` as implemented in `src/app/syllabus/.../page.tsx`. |

---

## 6. Runbook: Database & Storage Backup

### Creating Backups
To create an immediate timestamped backup of the database and uploaded storage:
```bash
npm run db:backup
```
Backups are archived into:
- `backups/db/dev-<timestamp>.db`
- `backups/storage/storage-<timestamp>.tar.gz`

### Restoring Backups
To restore from the latest snapshot:
```bash
npm run db:restore
```

---

## 7. Runbook: Dependency Updates

To keep dependencies secure without breaking Next.js 15 App Router compatibility:

```bash
# 1. Audit known security vulnerabilities
npm audit

# 2. Update minor and patch releases safely
npm update

# 3. Verify type safety and regression suite
npm run typecheck
npm run lint

# 4. Confirm clean production build
npm run build
```

---

## 8. Runbook: Investigating Production Errors

1. **Check Live Process Status (PM2)**:
   ```bash
   pm2 status
   pm2 logs invertis-learn --lines 100
   ```
2. **Check Nginx Web Server Logs**:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```
3. **Inspect Application Error Boundary Events**:
   Review server console output for `reportError` incident IDs generated by [`src/lib/observability.ts`](file:///g:/invertis%20learn/src/lib/observability.ts).
4. **Emergency Rollback**:
   If an update causes fatal errors:
   ```bash
   git checkout <last-stable-commit>
   npm ci
   npm run build
   pm2 reload invertis-learn
   ```

