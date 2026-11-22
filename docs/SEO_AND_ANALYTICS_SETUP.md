# Invertis Learn — SEO and Privacy-Friendly Analytics Setup Guide

**Project:** Invertis Learn  
**Domain:** `https://invertislearn.vercel.app/`  
**Status:** Production Ready  
**Date:** November 2026  

---

## 1. Analytics Architecture: GoatCounter Integration

Invertis Learn implements **GoatCounter**, an open-source, privacy-first, cookieless web analytics solution that provides accurate page-view insights without tracking personal data or requiring obtrusive cookie consent banners.

### Key Privacy & Compliance Highlights
- **Zero Cookies:** No cookies are written or read on the visitor's device.
- **GDPR & ePrivacy Compliant:** Does not collect personally identifiable information (PII) or IP addresses.
- **Lightweight:** Tiny script (~3 KB) loaded asynchronously via `next/script` (`strategy="afterInteractive"`).
- **Single Page Application (SPA) Support:** Custom React component (`src/components/common/GoatCounter.tsx`) automatically tracks route and query string changes across Next.js dynamic transitions without duplicating hits.
- **CSP Hardened:** `next.config.mjs` allows script and count beacons from `https://*.goatcounter.com` and `https://gc.zgo.at`.

### Configuration & Environment Variables

| Variable | Example Value | Description |
|---|---|---|
| `NEXT_PUBLIC_GOATCOUNTER_ENDPOINT` | `https://invertislearn.goatcounter.com/count` | Your GoatCounter count beacon endpoint |
| `NEXT_PUBLIC_GOATCOUNTER_ENABLED` | `true` | Explicit toggle to enable analytics tracking |

### Step-by-Step Activation

1. Sign up for a free account at [https://www.goatcounter.com](https://www.goatcounter.com) or deploy a self-hosted instance.
2. In the GoatCounter dashboard, set your site code (e.g., `invertislearn`).
3. Add the environment variable in your Vercel Project Settings:
   - Navigate to **Vercel Dashboard → Project Settings → Environment Variables**.
   - Key: `NEXT_PUBLIC_GOATCOUNTER_ENDPOINT`
   - Value: `https://invertislearn.goatcounter.com/count`
   - Environments: **Production, Preview**
4. Redeploy the application. Page views will automatically begin recording in real-time.

---

## 2. Technical SEO Architecture

### 2.1 Dynamic XML Sitemap (`/sitemap.xml`)
The sitemap is dynamically generated via `src/app/sitemap.ts` at build and request time. It enumerates:
- Core landing routes: `/`, `/engineering`, `/resources`, `/search`, `/career-pathways`, `/phd`, `/about`, `/pyq`
- Legal & statutory compliance routes: `/privacy`, `/terms`, `/disclaimer`, `/contact`
- Active academic programmes: `/programmes/[code]` and `/syllabus/[code]`
- Semester and subject pages across all 379 verified courses

### 2.2 Canonical URLs & Metadata
- Base URL is resolved dynamically via `NEXT_PUBLIC_APP_URL` or fallback `https://invertislearn.vercel.app`.
- Every page exports standardized Next.js `Metadata` objects containing title templates, descriptions, and OpenGraph / Twitter cards.
- Title template: `%s | Invertis Learn`.

### 2.3 Schema.org Structured Data (JSON-LD)
A standardized `WebSite` Schema.org entity with an interactive `SearchAction` is embedded in `src/app/layout.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Invertis Learn",
  "alternateName": "Invertis Academic Resource Companion",
  "url": "https://invertislearn.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://invertislearn.vercel.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

### 2.4 Robots.txt Configuration
`src/app/robots.ts` allows standard search engine crawlers access to public academic content while preventing crawling of internal curator routes:
```typescript
User-agent: *
Allow: /
Disallow: /curator/
Disallow: /api/
Sitemap: https://invertislearn.vercel.app/sitemap.xml
```
