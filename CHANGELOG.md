# Changelog

All notable changes to **Invertis Learn** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Cloud object storage adapter (AWS S3 / Cloudflare R2) for serverless deployments.
- Multi-region Neon PostgreSQL database integration.
- Student discussion boards and peer-reviewed lecture notes.

---

## [1.0.0] - 2026-11-11

### Added
- **CSE Previous Year Question Papers (PYQs) Integration**:
  - Automated extraction, text classification, and deduplication of examination question papers from the FOET 2024–25 archive.
  - Added 73 verified subject mappings across 5 CSE programmes (`BTECH-CSE`, `BTECH-CSE-AI`, `BTECH-CSE-CC`, `DIP-CSE`, `MTECH-CSE`).
  - Added responsive dual-action `View PDF` (inline streaming) and `Download PDF` (attachment) controls in `PYQCard`.
  - Added cryptographic deduplication (SHA-256) preventing redundant storage of shared and multi-semester papers.
  - Added complete test suite `scripts/test-pyq-integration.cjs` verifying 100% of PYQ files and HTTP routes.
- **GitHub Actions Continuous Integration (`.github/workflows/ci.yml`)**:
  - Automated workflow verifying TypeScript compilation, ESLint rules, database seeding, regression checks, and production build on every push and pull request.
- **Catalogue Snapshot Serialization (`prisma/catalogue.json`)**:
  - Exported complete database snapshot (9 departments, 61 programmes, 379 subjects, 494 academic resources, 68 external links, 32 video lectures) for deterministic seeding.
- **Professional Repository Standards**:
  - Issue templates for bug reports and feature requests.
  - Standardized pull request template.
  - Strict `.gitignore` protecting secrets, local databases, and temporary artifacts while preserving production PDFs.

### Changed
- **4-Tier Academic Hierarchy**:
  - Standardized academic ordering globally: 1. Diploma, 2. Undergraduate (UG), 3. Postgraduate (PG), 4. Doctoral (Ph.D.).
- **Lateral-Entry Standardization**:
  - Unified eligibility, durations (4 Years Regular vs. 3 Years Lateral), and curriculum mappings across all eligible B.Tech and Diploma programmes.
- **Global PDF Reliability Architecture**:
  - Standardized "Open in Tab" and "Download PDF" handlers across all 379 subjects with byte-range streaming (`Accept-Ranges: bytes`) and directory traversal protection.
- **Creator Profile & Social Integration**:
  - Dedicated "Meet the Creator" profile honoring Amit Kumar Pal with verified social presence and bio.

### Fixed
- Fixed lateral-entry curriculum count calculations dynamically resolving active semesters III–VIII.
- Fixed mobile navbar drawer positioning and ERP button accessibility.
- Fixed redundant file copies across B.Tech Cloud Computing and Artificial Intelligence syllabi.
- Removed deprecated `BTECH-CSE-IOT` specialization cleanly across database and UI without orphaned records.

---

## [0.9.0] - 2026-11-04

### Added
- Initial Next.js 15 App Router architecture with Tailwind CSS and Prisma ORM.
- Core subject syllabus viewer with module breakdowns, textbooks, and reference links.
- HMAC session-based curator authentication system.
- Comprehensive database schema covering departments, programmes, curricula, subjects, and resource categories.

