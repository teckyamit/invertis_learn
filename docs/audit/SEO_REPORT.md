# Invertis Learn — Technical SEO & Discoverability Report
**Document ID:** IL-AUDIT-SEO-001  
**Audit Date:** November 21, 2026  
**Canonical App URL:** `https://invertislearn.vercel.app`  

---

## 1. Executive Summary

This report outlines the complete technical SEO architecture implemented for Invertis Learn. The website previously lacked an XML sitemap, automated crawler directives (`robots.txt`), and structured JSON-LD data, limiting organic indexing across search engines.

All technical SEO components have now been implemented and verified.

---

## 2. Technical SEO Components

### 2.1 Dynamic XML Sitemap (`src/app/sitemap.ts`)
- **Route:** `https://invertislearn.vercel.app/sitemap.xml`
- **Specification:** Complies with Sitemaps XML protocol 0.9.
- **Coverage (~420 URLs):**
  - Static core pages (`/`, `/about`, `/engineering`, `/syllabus`, `/pyq`, `/notes`, `/labs`, `/projects`, `/career-pathways`, `/phd`).
  - Programme hub pages (`/syllabus/DIP-CSE`, `/syllabus/BTECH-CSE`, etc.).
  - Semester directory pages (`/syllabus/[programmeCode]/semester/[semesterNumber]`).
  - Individual subject detail pages (`/syllabus/[programmeCode]/semester/[semesterNumber]/[subjectCode]`).
- **Resilience:** Queries Neon PostgreSQL database dynamically. If the database is unreachable or disconnected during a build, it seamlessly falls back to `data/catalogue.json` to generate the complete sitemap without errors.
- **Change Frequencies & Priority:**
  - Homepage: `priority: 1.0`, `changeFrequency: 'daily'`
  - Programme & Subject Pages: `priority: 0.8`, `changeFrequency: 'weekly'`
  - Supporting Pages: `priority: 0.5`, `changeFrequency: 'monthly'`

---

### 2.2 Robots Directives (`src/app/robots.ts`)
- **Route:** `https://invertislearn.vercel.app/robots.txt`
- **Directives:**
  ```text
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api/admin/
  Disallow: /api/resources/submit

  Sitemap: https://invertislearn.vercel.app/sitemap.xml
  ```
- **Security Impact:** Protects administrative moderation portals and user submission APIs from search engine crawler indexing and scraping bots.

---

### 2.3 Structured Data (JSON-LD) in `src/app/layout.tsx`
- **Schema Type:** Schema.org `WebSite`
- **Properties:**
  - `name`: "Invertis Learn"
  - `url`: "https://invertislearn.vercel.app"
  - `description`: Academic resource platform for Invertis University Computer Science and Engineering students.
  - `potentialAction`: `SearchAction`
    - `target`: `https://invertislearn.vercel.app/search?q={search_term_string}`
    - `query-input`: `required name=search_term_string`
- **Rich Snippet Eligibility:** Qualifies the domain for Google Sitelinks Searchbox directly on Google Search results pages.

---

### 2.4 On-Page Meta & Accessibility Tags
- Clean `<title>` and `<meta name="description">` templates on all subject detail pages:
  `{subject.code} — {subject.name} Syllabus, Notes & PYQs | Invertis Learn`
- Canonical `<link rel="canonical" href="...">` configured across all dynamic routes.
- OpenGraph (`og:title`, `og:description`, `og:image`) and Twitter Card tags configured in root metadata.

---

## 3. Google Search Console (GSC) Submission Steps

To finalize indexing once deployed to production:

1. **Access GSC:** Log in to [Google Search Console](https://search.google.com/search-console).
2. **Select Property:** Select `https://invertislearn.vercel.app/` (or add property via URL prefix).
3. **Submit Sitemap:**
   - In the left sidebar, navigate to **Indexing &rarr; Sitemaps**.
   - Under "Add a new sitemap", enter: `sitemap.xml`
   - Click **Submit**.
4. **Verify Status:** GSC will report `Success` and display the count of discovered URLs (~420 URLs).
5. **URL Inspection:** Inspect `https://invertislearn.vercel.app/` and click "Request Indexing" to accelerate re-crawling.
