# Invertis Learn — Production Deployment & Hosting Guide

## 1. Hosting Architecture Analysis

Before deploying **Invertis Learn**, it is vital to evaluate its actual architectural requirements based on the codebase:

### 1.1 Technical Requirements

| Requirement | Supported by Invertis Learn | Implication |
| :--- | :---: | :--- |
| **Static HTML Export (`output: 'export'`)** | **NO** | The platform utilizes dynamic API routes (`/api/syllabus/download`, `/api/pyq`, `/api/admin/session`), dynamic SSR segments, and streaming byte ranges (`Accept-Ranges: bytes`). |
| **Node.js Runtime Server** | **YES** | Requires a persistent Node.js environment (`>=22.14.0`) capable of running `next start`. |
| **Database Persistence** | **YES** | The default database is SQLite (`prisma/dev.db`). This file must reside on a **persistent disk volume**. |
| **File Storage Persistence** | **YES** | Uploaded subject PDFs, PYQs, and notes reside in `storage/uploads/`. The storage directory must persist across deployments. |

> [!CAUTION]
> **Ephemeral Filesystem Warning**:
> Standard serverless platforms such as **Vercel**, **Netlify**, or standard containerless PaaS use ephemeral execution environments. Any writes to SQLite or local disk directories are wiped whenever the function spins down or redeploys.
> 
> Deploying to an ephemeral platform requires migrating the database to hosted PostgreSQL (e.g. Supabase, Neon) and file storage to cloud object storage (e.g. AWS S3, Cloudflare R2).

---

## 2. Hosting Options Comparison

| Hosting Model | Recommended Platform | Compatibility with Current Codebase | Setup Complexity | Monthly Cost Est. |
| :--- | :--- | :---: | :---: | :---: |
| **Option A (Recommended)** | **Cloud VPS (DigitalOcean / Hetzner / AWS EC2)** | **100% Native** (Persistent SSD, SQLite & local file storage intact) | Moderate (Nginx, PM2, SSL) | \$4 – \$10 / mo |
| **Option B** | **Managed PaaS with Volume (Railway / Render)** | **High** (Requires mounting persistent volume for `storage/` and `prisma/`) | Low | \$7 – \$15 / mo |
| **Option C** | **Serverless Multi-Cloud (Vercel + Neon + S3)** | **Requires Code Adaptations** (PostgreSQL migration & S3 upload adapter) | Moderate | Free tier / Pay-per-use |

---

## 3. Option A: Production VPS Deployment (Recommended)

This guide walks through deploying Invertis Learn to an Ubuntu 22.04 LTS or 24.04 LTS VPS using **Node.js 22**, **PM2**, and **Nginx**.

### Step 1: Server Provisioning & Prerequisites
SSH into your server and install required packages:
```bash
# Update package lists
sudo apt update && sudo apt upgrade -y

# Install Node.js 22 via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git certbot python3-certbot-nginx

# Verify Node.js version (must be >= 22.14.0)
node -v
npm -v

# Install PM2 process manager globally
sudo npm install -g pm2
```

### Step 2: Clone and Configure Project
```bash
# Create application directory
sudo mkdir -p /var/www/invertis-learn
sudo chown -R $USER:$USER /var/www/invertis-learn

# Clone repository
git clone https://github.com/<your-username>/invertis-learn.git /var/www/invertis-learn
cd /var/www/invertis-learn

# Install dependencies and generate Prisma client
npm ci

# Configure production environment
cp .env.example .env
nano .env
```

Set the production variables in `.env`:
```ini
DATABASE_URL="file:./dev.db"
PRIVATE_STORAGE_PATH="./storage/uploads"
CURATOR_ACCESS_KEY="<generate-using-npm-run-curator:setup>"
APP_ORIGIN="https://learn.example.com"
NODE_ENV="production"
```

### Step 3: Initialize Database & Build Application
```bash
# Generate Prisma Client & apply schema
npm run db:push
npm run db:seed

# Generate curator secret key
npm run curator:setup

# Build optimized production bundle
npm run build
```

### Step 4: Configure PM2 Process Management
Create an ecosystem configuration file: `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [
    {
      name: "invertis-learn",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/invertis-learn",
      instances: 1, // Single instance required for SQLite locking safety
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
```

Start and persist the application:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Configure Nginx Reverse Proxy & SSL
Create Nginx configuration: `/etc/nginx/sites-available/invertis-learn`:
```nginx
server {
    server_name learn.example.com;

    # Maximum file upload size for syllabus PDFs and notes
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Range request support for PDF streaming
        proxy_set_header Range $http_range;
        proxy_set_header If-Range $http_if_range;
    }

    # Static caching for Next.js immutable assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Enable site and acquire SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/invertis-learn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Obtain free Let's Encrypt SSL
sudo certbot --nginx -d learn.example.com
```

---

## 4. Option B: Dockerized Deployment

Create `Dockerfile`:
```dockerfile
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/storage ./storage

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]
```

Compose configuration `docker-compose.yml` with persistent volume mount:
```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./prisma:/app/prisma
      - ./storage:/app/storage
    environment:
      - DATABASE_URL=file:/app/prisma/dev.db
      - PRIVATE_STORAGE_PATH=/app/storage/uploads
      - CURATOR_ACCESS_KEY=${CURATOR_ACCESS_KEY}
      - APP_ORIGIN=${APP_ORIGIN}
    restart: unless-stopped
```

---

## 5. Deployment Verification & Health Check

After deployment, verify the live installation:
```bash
# 1. Probe health check endpoint (Expected: 200 OK)
curl -i https://learn.example.com/api/health

# 2. Run automated PDF reliability verification against production
TEST_BASE_URL="https://learn.example.com" node scripts/test-pdf-reliability-global.cjs

# 3. Check PM2 logs for runtime errors
pm2 logs invertis-learn --lines 50
```

---

## 6. Continuous Deployment with GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy Invertis Learn

on:
  push:
    branches: [master]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Deploy to VPS
        if: success()
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/invertis-learn
            git pull origin master
            npm ci
            npx prisma generate
            npm run build
            pm2 reload invertis-learn
```

---

## 7. Backup, Disaster Recovery & Rollback

### Automated Cron Backup
Add to server crontab (`crontab -e`):
```bash
# Daily backup at 3:00 AM
0 3 * * * cd /var/www/invertis-learn && npm run db:backup >> /var/log/invertis-backup.log 2>&1
```

### Rollback Runbook
If a deployment fails:
```bash
cd /var/www/invertis-learn
git checkout <previous-stable-commit-hash>
npm ci
npm run build
pm2 reload invertis-learn
```

