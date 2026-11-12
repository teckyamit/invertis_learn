# Invertis Learn — Deployment Guide

This document provides quick-start deployment instructions for **Invertis Learn**. For full architectural evaluations, persistent volume setup, and advanced server configurations, refer to [**Comprehensive Deployment Architecture (`docs/DEPLOYMENT.md`)**](docs/DEPLOYMENT.md).

---

## Deployment Options at a Glance

| Deployment Target | Best Suited For | Architecture | Persistence Requirements |
| :--- | :--- | :--- | :--- |
| **Vercel (Recommended for Serverless)** | Fast global CDN, zero-maintenance scaling | Next.js Serverless Functions + Edge CDN | Requires external PostgreSQL (e.g. Neon, Supabase) for database writes |
| **Cloud VPS (DigitalOcean / Hetzner / AWS)** | Full native compatibility, lowest cost | Node.js 22 + PM2 + Nginx | Native persistent SSD preserves SQLite (`prisma/dev.db`) and local files |
| **Railway / Render** | Easy containerized deployment | Docker / Nixpacks container | Requires mounting a persistent disk volume for `/storage` and `/prisma` |

---

## 1. Deploying to Vercel

Invertis Learn is built on **Next.js 15 (App Router)** and is optimized for deployment on Vercel.

### Prerequisites for Vercel
1. A GitHub repository containing the clean Invertis Learn codebase.
2. A free [Neon](https://neon.tech) or [Supabase](https://supabase.com) PostgreSQL database instance (for production database persistence).
3. A Vercel account linked to your GitHub.

### Step-by-Step Vercel Deployment

1. **Import Repository**:
   - In the [Vercel Dashboard](https://vercel.com/new), select **Import Git Repository**.
   - Select your newly created repository `invertis-learn`.

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (or `npm ci`)

3. **Set Environment Variables in Vercel Dashboard**:
   Add the following variables in **Project Settings > Environment Variables**:

   | Variable Name | Value / Description |
   | :--- | :--- |
   | `DATABASE_URL` | Neon pooled connection string (`-pooler`) for serverless queries |
   | `DIRECT_URL` | Neon direct connection string (unpooled) for Prisma schema migrations |
   | `PRIVATE_STORAGE_PATH` | `./public/uploads` |
   | `CURATOR_ACCESS_KEY` | Strong 64-character secret key (generate with `npm run curator:setup`) |
   | `APP_ORIGIN` | Your production Vercel URL (e.g. `https://invertis-learn.vercel.app`) |
   | `NODE_ENV` | `production` |

4. **Static PDF Assets on Vercel**:
   All official syllabi and previous-year examination PDFs are stored under `public/uploads/` and tracked in Git. When Vercel builds the project, these assets are automatically bundled and served globally via Vercel's Edge CDN with high availability and low latency.

5. **Deploy**:
   - Click **Deploy**.
   - Vercel will run `npm install`, compile the Next.js production bundle, and deploy to your custom domain or `*.vercel.app`.

---

## 2. Deploying to a Cloud VPS (Hetzner / DigitalOcean / AWS EC2)

A Cloud VPS provides 100% native compatibility with Invertis Learn's default SQLite database and local persistent storage.

### Quick Commands for Ubuntu 22.04 / 24.04:

```bash
# 1. Install Node.js 22 & PM2
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# 2. Clone repository & install dependencies
git clone https://github.com/<your-username>/invertis-learn.git /var/www/invertis-learn
cd /var/www/invertis-learn
npm ci

# 3. Setup environment & database
cp .env.example .env
# Edit .env with your domain and curator key:
npm run db:push
npm run db:seed
npm run curator:setup

# 4. Build & start with PM2
npm run build
pm2 start npm --name "invertis-learn" -- start
pm2 save
pm2 startup
```

---

## 3. Pre-Deployment Verification Checklist

Before deploying, run the complete verification suite locally:

```bash
# Check TypeScript compilation
npm run typecheck

# Check ESLint standards
npm run lint

# Verify all 79 PYQs and PDF streaming routes
node scripts/test-pyq-integration.cjs

# Verify production build compilation
npm run build
```

When all checks pass with **0 errors**, your project is ready for immediate deployment.

