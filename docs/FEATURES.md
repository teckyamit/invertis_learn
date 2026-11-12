# Invertis Learn — Feature Specifications & Verification Matrix

This document provides a comprehensive overview of all verified implemented features, partially implemented features, and planned future capabilities in **Invertis Learn**.

---

## 1. Feature Implementation Status Matrix

| Module | Feature | Implementation Status | Verification Method |
| :--- | :--- | :---: | :--- |
| **Academic Hierarchy** | 4-Tier Programme Ordering (Diploma, UG, PG, Ph.D.) | **Implemented** | Unit & UI verified (`src/lib/academicLevels.ts`) |
| **Programme Catalog** | Responsive Programme Cards with Badges & Specializations | **Implemented** | Browser tested across all viewports |
| **Lateral Entry** | Standardized Badging, Duration (4y/3y), and Sem III–VIII Reuse | **Implemented** | Automated regression & data audit |
| **Lateral Entry** | Legacy URL 301 Redirect Consolidation | **Implemented** | Verified in `next.config.mjs` |
| **Curriculum Hub** | Semester-wise Navigation with Contact Hours & Credits | **Implemented** | End-to-end verified across all 6 courses |
| **Subject Details** | Unit Breakdown, Course Outcomes, Textbooks & References | **Implemented** | SSR verified with structured JSON schema |
| **PDF Service** | Canonical "Open in Tab" (`inline=1`) with HTTP Range Streaming | **Implemented** | E2E verified with `%PDF-` signature checks |
| **PDF Service** | Canonical "Download PDF" with UTF-8 Content-Disposition | **Implemented** | E2E verified with binary size validation |
| **PDF Reliability** | 100% Physical PDF Presence for All 379 Active Subjects | **Implemented** | Audited via `audit-pdf-reliability.cjs` |
| **Provenance** | SHA-256 Tamper-Evident Checksums & University Citation | **Implemented** | Registered in `AcademicResource` DB schema |
| **PYQ Library** | Exam Paper Archive with Year & Semester Filtering | **Implemented** | Verified on `/pyq` and dynamic routes |
| **Lecture Notes** | Unit-wise Notes, Cheatsheets, and Formula Sheets | **Implemented** | Verified on `/notes` |
| **Lab Manuals** | Practical Experiment Manuals and Viva Voce Guides | **Implemented** | Verified on `/labs` |
| **Video Lectures** | Curated YouTube Playlists & Topic Lectures Mapped to Units | **Implemented** | Verified on subject syllabus pages |
| **External Resources** | Mapped Reference Links (NPTEL, GeeksforGeeks, MDN) | **Implemented** | Verified on subject syllabus pages |
| **Career Pathways** | Software Engineering Domain Roadmaps & Skill Guides | **Implemented** | Verified on `/career-pathways` |
| **Curator Dashboard** | HMAC-SHA256 Session Auth, CSRF & Ingestion Controls | **Implemented** | Verified on `/admin` and API routes |
| **Search Engine** | Real-time Search across Programmes, Codes, and Names | **Implemented** | Verified on `/search` |
| **User Authentication** | Student Personal Profiles & Bookmarking | **Planned** | Not yet implemented |
| **Interactive Quizzes** | Unit-wise Self-Assessment & MCQ Practice | **Planned** | Not yet implemented |
| **AI Study Assistant** | In-context Syllabus Question Answering | **Planned** | Not yet implemented |

---

## 2. Detailed Feature Breakdown

### 2.1 4-Tier Academic Hierarchy
- Programmed with strict priority: **Diploma (1) $\rightarrow$ Undergraduate (2) $\rightarrow$ Postgraduate (3) $\rightarrow$ Doctoral (4)**.
- Consistently applied across homepage showcase grids, programme catalog filters, and search result groupings.
- All 6 active programmes adhere to this taxonomy:
  - **Diploma**: Diploma in Computer Science & Engineering (`DIP-CSE`, 3 Years)
  - **Undergraduate**: B.Tech CSE Core (`BTECH-CSE`, 4 Years), B.Tech CSE AI & ML (`BTECH-CSE-AI`, 4 Years), B.Tech CSE Cloud Computing (`BTECH-CSE-CC`, 4 Years)
  - **Postgraduate**: M.Tech Computer Science & Engineering (`MTECH-CSE`, 2 Years)
  - **Doctoral**: Ph.D. in Computer Science & Engineering (`PHD-009`, 3 Years)

### 2.2 Lateral Entry Integration
- For eligible 4-year undergraduate and 3-year diploma programmes, lateral entry is displayed as an **integrated admission pathway** on the main course card rather than as a disconnected duplicate course.
- **Duration Badge**: Shows "4 Years Regular / 3 Years Lateral".
- **Semesters**: Semesters I and II are strictly restricted for lateral-entry pathways; Semesters III through VIII dynamically reuse verified parent curriculum data without duplication.
- **SEO & Permalinks**: Legacy URLs (`/syllabus/BTECH-CSE-LE`, `/programmes/BTECH-CSE-LAT`) redirect with HTTP 301 to canonical query parameters (`?entry=lateral`).

### 2.3 Official Syllabus & PDF Service
- **Interactive Syllabus View**: Displays weekly lecture, tutorial, and practical contact hours, credits, evaluation schemes (Continuous Assessment vs. End-Semester Exam), unit topics, and prescribed textbooks.
- **Physical Availability Assurance**: Active "Open in Tab" and "Download PDF" buttons render strictly when a validated physical PDF exists on disk.
- **In-Progress Graceful State**: When a document is undergoing departmental ingestion, an amber notice clearly informs the student that the official syllabus is being digitized while interactive units remain accessible.
- **Verified Badge**: Green `ShieldCheck` badge with `Verified by Invertis Learn` displayed alongside official Invertis Academic Council regulation references.

### 2.4 Academic Resource Hubs
- **Previous Year Question Papers (PYQs)**: Sourced from previous university examinations, filterable by semester (Semesters 1 through 8) and academic session.
- **Notes & Cheatsheets**: Unit-level summaries, syntax references, and formulas provided by faculty and academic curators.
- **Lab Manuals**: Lab guidelines, code templates, and viva voce question banks for practical engineering courses.
- **Project Manuals**: Capstone project guidelines, IEEE synopsis templates, and industrial training report formats.

### 2.5 Curated Learning & Video Lectures
- Embedded YouTube playlists and topic lectures from reputable educational channels (NPTEL-NOC IITM, MIT OpenCourseWare, freeCodeCamp).
- Mapped directly to individual course units to facilitate structured self-paced learning.
- External documentation links to MDN, GeeksforGeeks, and official language specifications.

### 2.6 Curator & Administrative Dashboard
- Accessible at `/admin` using the secret key configured in `CURATOR_ACCESS_KEY`.
- Protected by HMAC-SHA256 session tokens stored in secure `HttpOnly` cookies.
- CSRF protection enforces origin verification for all administrative modifications.
- Allows upload, review, and publication status toggling of academic papers and notes.

---

## 3. Known Limitations & Architecture Boundaries

1. **Local File Persistence**:
   - Files uploaded via the Curator portal reside on local disk (`storage/uploads/`). Deploying to an ephemeral serverless platform (e.g., standard Vercel) without external cloud object storage (S3) will result in uploaded files being lost on redeploy.
2. **Single SQLite Database File**:
   - SQLite provides excellent read performance but uses file-level write locking. While entirely sufficient for typical university academic portal workloads, deployments requiring high concurrent write throughput should migrate to PostgreSQL via Prisma.
3. **No Student Account System**:
   - Student users browse the catalog and download resources without logging in. Personal study planners and bookmarking are slated for future iterations.

