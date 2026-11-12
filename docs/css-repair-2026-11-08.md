# Global styling repair — 8 November 2026

## Diagnosis
Installed versions: Next.js 15.5.29, React 19.2.9, Tailwind CSS 3.4.19, PostCSS 8.5.32, Autoprefixer 10.6.2. npm dependency inspection showed one Tailwind version and deduplicated PostCSS.

The sole root layout imports globals.css; there are no additional route layouts or competing stylesheet imports. Tailwind v3 directives, PostCSS plugins, and app/component scanning paths were correct. Recent working-tree changes retained these imports. No dependency reinstall or version change was needed.

Two existing project Next.js servers (server PIDs 13064 and 15948) were listening on port 3000 on different interfaces, sharing the same .next directory. The initial route probe returned HTTP 500. Stopping those processes and rebuilding the generated output restored stylesheet delivery. This is strong evidence of conflicting build output; the original failed CSS response was not captured, so the precise historical missing asset cannot be identified retrospectively.

A separate confirmed font bug was present: :root definitions in globals.css overrode next/font's generated font variables. Browser computed styles after repair include Inter Fallback and Plus Jakarta Sans Fallback from next/font. A resources-page badge also exceeded the mobile viewport.

## Changes made in this repair
- next.config.mjs: development output now uses .next-dev; production retains .next, preventing development from overwriting production assets.
- package.json: dev explicitly binds 127.0.0.1:3000, so an occupied port fails rather than silently starting another project server elsewhere.
- .gitignore: ignore .next-dev.
- src/app/globals.css: remove competing root font-variable declarations; retain the original palette, containers and card styles.
- src/app/resources/page.tsx: constrain the existing badge to its parent width using max-w-full.
- scripts/verify-global-styles.cjs: repeatable Edge browser checks with fresh tabs for each route and viewport.

The identified project servers were stopped and only the resolved project .next generated directory was cleared. No academic content, database records, syllabus files, programme definitions or resource files were modified. Existing unrelated working-tree changes were preserved.

## Verification
TypeScript, ESLint and production build all passed after the changes. The repaired production server is at http://127.0.0.1:3000.

34 browser checks passed: each route below at 1440px and 390px widths:

- /
- /engineering
- /resources
- /career-pathways
- /about
- /programmes
- /programmes/BTECH-CSE
- /programmes/BTECH-CSE?entry=lateral
- /programmes/BTECH-CSE-AI
- /programmes/BTECH-CSE-CC
- /programmes/DIP-CSE
- /programmes/MTECH-CSE
- /programmes/BTECH-CSE-IOT
- /programmes/PHD-009
- /phd
- /syllabus
- /pyq

Every tested document and stylesheet returned HTTP 200. Computed body display was flex, all grid elements had grid display, navigation/footer were present, and no horizontal overflow, page exceptions, or failed requests were recorded in the final fresh-tab run. Computed background was #F7F9FC and footer background #101E3A. Engineering desktop/mobile screenshots were captured; desktop and mobile screenshots were visually inspected during the repair.

Evidence: test-results/global-styles.json and test-results/styles-1440.png / styles-390.png. Run node scripts/verify-global-styles.cjs against the running production server to repeat.

## Limits
No remaining styling failures were detected in the tested routes. This checks representative academic routes, not every programme in the database or every semester/subject detail URL. Google font fetching retried during the first build, but both builds completed. Builds still require access to Google Fonts when the font cache is empty. Initial cross-navigation browser probes saw a hydration error and cancelled prefetches; neither recurred in the final isolated-tab run.
