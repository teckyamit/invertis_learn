# Invertis Learn — Non-Negotiable Regression Checklist

Every item in this checklist must be verified before declaring production readiness.

---

## 1. Academic Data Integrity & Safety Guardrails
- [ ] Zero database records dropped, corrupted, or overwritten with mock/dummy data.
- [ ] All 379 academic subjects remain accessible at their canonical route URLs.
- [ ] All 6 canonical CSE programmes preserve their valid identifiers (`DIP-CSE`, `BTECH-CSE`, `BTECH-CSE-AI`, `BTECH-CSE-CC`, `MTECH-CSE`, `PHD-009`).
- [ ] No force-reset or destructive migrations executed against production database.
- [ ] Practice materials are strictly labeled as practice/unverified and not masqueraded as official university originals.

## 2. Navigation & User Experience
- [ ] Homepage loads cleanly with one-click *My Semester Shortcut* functionality intact.
- [ ] Desktop navigation order strictly preserved: `Logo → Home → CSE Programmes → Resources → Career Pathways → Ph.D. Hub → About → Search → University ERP`.
- [ ] Search button in desktop navbar retains magnifying glass icon and active highlight when on `/search`.
- [ ] Mobile navigation contains exactly one search button in header, zero duplicate search links in slide-out drawer.
- [ ] Navigation transitions display top progress bar feedback within 150 ms.
- [ ] All 6+ tabs on `/phd` remain visible and unclipped without page-level horizontal overflow.
- [ ] Programme cards on `/engineering` display badges cleanly without line-splitting or orphan bullet characters.

## 3. Academic Programme & Curriculum Routing
- [ ] Diploma CSE displays `REGULAR 3-YEAR SCHEME` (Semesters I–VI, 3 Academic Years).
- [ ] Diploma CSE Lateral Entry displays Semesters III–VI (2 Academic Years).
- [ ] B.Tech CSE displays `REGULAR 4-YEAR SCHEME` (Semesters I–VIII, 4 Academic Years).
- [ ] B.Tech CSE Lateral Entry displays Semesters III–VIII (3 Academic Years).
- [ ] Unified lateral entry route `/syllabus/[CODE]?entry=lateral` works without duplicate cards.

## 4. Resource Security & Access Control
- [ ] `/api/pyq/download` rejects directory traversal attempts (`..`, `/`, `\`).
- [ ] Unapproved and rejected documents are strictly inaccessible to public requests.
- [ ] Public uploads reject non-PDF files, files > 10 MB, and corrupted PDF streams.
- [ ] Public uploads enforce rate limiting to prevent free-tier storage exhaustion.
- [ ] Curator mutation endpoints reject unauthenticated requests with HTTP 401/403.
- [ ] No server credentials or access keys are leaked in client-side JavaScript bundles or git logs.

## 5. External Resources & Media
- [ ] MCS-101 Advanced Computer Architecture displays verified, playable video lecture links.
- [ ] No broken YouTube playlist URLs on primary subject pages.
- [ ] BCS-351 practice lab manual displays clean formatting with zero `â€¢` mojibake artifacts.

## 6. Search & Personalization
- [ ] Search handles subject codes (`BCS-301`, `MCS102`), subject titles (`Data Structures`), acronyms (`DBMS`, `OS`, `CN`), programme queries (`M.Tech CSE`), and common spelling typos.
- [ ] Programme and semester dropdowns synchronize with search query URL parameters.
- [ ] My Semester Shortcut preferences persist across browser reloads via localStorage.

## 7. SEO, Legal & Analytics
- [ ] `/robots.txt` returns valid HTTP 200 directives and sitemap declaration.
- [ ] `/sitemap.xml` generates valid XML covering canonical pages and subject routes.
- [ ] Global footer links to `/privacy`, `/terms`, `/disclaimer`, and `/contact`.
- [ ] Unofficial student companion notice is clearly displayed on all pages.
- [ ] GoatCounter privacy analytics loads asynchronously without cookies or duplicate pageviews.

## 8. Code Quality & Build Verification
- [ ] `npm run typecheck` (`tsc --noEmit`) passes with 0 errors.
- [ ] `npm run lint` (`eslint src --max-warnings=0`) passes with 0 warnings.
- [ ] `npm run build` (`next build`) exits with code 0 and successful static route generation.
