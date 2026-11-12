# Contributing to Invertis Learn

Thank you for your interest in contributing to **Invertis Learn**! We welcome bug reports, feature suggestions, documentation enhancements, and code contributions that help improve academic resource accessibility for students.

---

## 1. Code of Conduct & Academic Integrity

- Treat all contributors, students, and educators with respect.
- Ensure all uploaded curriculum documents, examination papers, and syllabus texts are sourced from official university publications or verified departmental records.
- Never upload plagiarized materials, copyrighted commercial textbooks, or unauthorized examination answer leaks.

---

## 2. Getting Started Locally

1. **Fork and Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/invertis-learn.git
   cd invertis-learn
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   ```bash
   cp .env.example .env
   npm run db:push
   npm run curator:setup
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 3. Branching Strategy

Create descriptive feature or fix branches from `master`:

- `feat/feature-name`: New user-facing capabilities or tools.
- `fix/bug-description`: Corrections to broken links, styling, or routing.
- `docs/topic-name`: Improvements to documentation or runbooks.
- `chore/task-name`: Dependency bumps or configuration maintenance.

Example:
```bash
git checkout -b feat/diploma-year-selector
```

---

## 4. Coding Conventions

- **TypeScript Strictness**: Do not use `any` unless absolutely necessary and documented. Ensure all interfaces and props are strongly typed.
- **React Server Components (RSC)**: Keep pages and layout components as Server Components by default. Only add `"use client"` when managing browser events, React hooks (`useState`, `useEffect`), or window objects.
- **Styling**: Use utility classes from Tailwind CSS. Avoid arbitrary inline styles.
- **Icons**: Import exclusively from `lucide-react`.
- **Database Access**: Always use the global Prisma singleton from `src/lib/db.ts`. Do not instantiate multiple `new PrismaClient()` instances in application code.

---

## 5. Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary in imperative mood>

[optional body explaining context or rationale]
```

### Common Types:
- `feat`: A new feature (e.g., `feat(syllabus): add unit duration badges`)
- `fix`: A bug fix (e.g., `fix(pdf): handle URL encoded subject codes`)
- `docs`: Documentation only changes (e.g., `docs(readme): update deployment guide`)
- `style`: Changes that do not affect code logic (white-space, formatting)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to build process or tooling

---

## 6. Pre-Commit Quality Checks

Before opening a pull request, verify that all quality gates pass:

```bash
# 1. Verify TypeScript compiles without errors
npm run typecheck

# 2. Run ESLint code standards check
npm run lint

# 3. Verify PDF reliability across catalogue
node scripts/audit-pdf-reliability.cjs

# 4. Confirm production build compiles successfully
npm run build
```

---

## 7. Pull Request Workflow

1. Push your branch to your forked repository:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `master` branch.
3. Fill out the pull request template completely, detailing:
   - What changed and why.
   - Related issues or feature requests.
   - Steps taken to test and verify the change.
4. Maintain a clean commit history. Squash unnecessary fixup commits if requested.

