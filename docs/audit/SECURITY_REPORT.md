# Invertis Learn — Security Audit Report
**Document ID:** IL-AUDIT-SEC-001  
**Audit Date:** November 21, 2026  
**Target Production:** `https://invertislearn.vercel.app/`  
**Classification:** Confidential — Academic Platform Operations

---

## 1. Executive Summary

A comprehensive application security audit and remediation was conducted across the Invertis Learn web application in accordance with OWASP Top 10 guidelines and the Gemini Website Audit Report.

All identified vulnerabilities, administrative exposure points, and consent risks have been completely remediated.

---

## 2. Threat Analysis & Remediations

### 2.1 Administrative Endpoint Isolation & Route Protection (Gemini Finding #13)
- **Vulnerability:** The public student-facing website footer contained a direct hyperlink to `/admin`, exposing the curator portal to public discovery and crawler probing.
- **Remediation:**
  - Removed `<Link href="/admin">Curator review</Link>` from `src/components/layout/Footer.tsx`.
  - Configured `src/app/robots.ts` with strict disallow rules:
    ```typescript
    disallow: ["/admin", "/api/admin/", "/api/resources/submit"]
    ```
  - Strengthened curator session management in `src/lib/access.ts`:
    - Access key must meet entropy requirements (32+ characters).
    - Constant-time string comparison (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
    - Signed HTTP-only, SameSite=Strict cookies for authentication sessions.
    - CSRF protection via `sameOrigin(req)` validation on all mutable administrative routes (`PATCH`, `DELETE`).

### 2.2 Affirmative Copyright Consent Enforcement (Gemini Finding #14)
- **Vulnerability:** The user upload modal (`ResourceUploadModal.tsx`) initialized the copyright permission checkbox to `true`, violating affirmative consent standards under digital copyright frameworks.
- **Remediation:**
  - Client state initialized to `false` (unchecked by default).
  - Modal submission blocked on client if checkbox is not explicitly checked.
  - Server-side validation enforced in `src/app/api/resources/submit/route.ts`:
    ```typescript
    if (rawData.confirmedPermission !== "true") {
      return NextResponse.json(
        { error: "Explicit copyright permission and upload consent is mandatory." },
        { status: 400 }
      );
    }
    ```

### 2.3 File Upload Security & Sanitization
- **File Type Restrictions:** Upload endpoints strictly validate MIME types (`application/pdf`) and file signatures. Executable binaries (`.exe`, `.sh`, `.bat`, `.js`) and HTML scripts are strictly rejected.
- **File Size Limits:** Maximum upload size strictly enforced at 15 MB.
- **Storage Sanitization:** Uploaded filenames are sanitized with UUIDv4 prefixes and slugified names to prevent path traversal (`../`) attacks:
  ```typescript
  const safeFilename = `${crypto.randomUUID()}-${sanitizeFilename(file.name)}`;
  ```
- **Unverified Content Isolation:** All user uploads enter the database with `provenanceStatus: "PENDING"` and `isPublished: false`. No student submission is made publicly visible until an authenticated curator reviews and approves it.

### 2.4 Rate Limiting on Community Endpoints
- **Endpoints Protected:**
  - `/api/resources/submit` (resource uploads)
  - `/api/resources/request` (material requests)
  - `/api/resources/report` (discrepancy reports)
- **Mitigation:** In-memory client IP rate-limiting prevents automated spam, bot abuse, and denial-of-service (DoS) attempts against the platform.

### 2.5 Zero Iframe Player Policy
- **Risk:** Embedded third-party iframes pose Clickjacking risks, CSS injection, and unwanted third-party tracking.
- **Remediation:** 100% of video lecture links are served as direct external links (`target="_blank"` with `rel="noopener noreferrer"`), ensuring complete isolation of the client browsing context.

---

## 3. Security Checklist & Compliance

| Security Control | Implementation | Verification Status |
|---|---|---|
| Curator Authentication | 32+ char key + Timing-safe check + Signed cookie | **VERIFIED** |
| Administrative CSRF | `sameOrigin` header check | **VERIFIED** |
| Robots Crawler Directives | Disallow `/admin` and `/api/admin` | **VERIFIED** |
| Upload Consent | Unchecked by default + Server rejection | **VERIFIED** |
| Upload File Validation | Strict PDF MIME type + 15 MB ceiling | **VERIFIED** |
| SQL Injection Prevention | Prisma ORM parameterized queries | **VERIFIED** |
| XSS Prevention | React automatic JSX escaping + zero innerHTML | **VERIFIED** |
| Student Privacy | Zero mandatory student accounts or PII storage | **VERIFIED** |

---

*Audited by:* Security Specialist & Lead Full-Stack Architect  
*Date:* November 21, 2026
