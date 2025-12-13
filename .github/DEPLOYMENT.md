# Deployment Guide

This repository is configured for automatic deployment to Vercel when you push
to the `main` branch.

## 🚀 Vercel Deployment

### Option 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Click Deploy
5. **Done!** Every push to `main` will automatically deploy

Vercel will automatically detect Next.js and configure everything.

### Option 2: GitHub Actions

1. **Get Vercel credentials:**
   - Vercel Dashboard → Settings → Tokens → Create token
   - Project Settings → General → Copy Organization ID and Project ID

2. **Add GitHub Secrets:**
   - Repository → Settings → Secrets and variables → Actions
   - Add: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

3. **Push to main:**
   ```bash
   git push origin main
   ```

## How It Works

On push to `main`:

1. Quality checks (ESLint, TypeScript, Formatting, Security)
2. Build (`npm run build`)
3. Deploy to Vercel

On pull requests: Quality checks only (no deployment)

## Troubleshooting

- **Deployment not triggering?** Check branch name (must be `main` or `master`)
- **Build fails?** Run `npm run validate` locally
- **Vercel issues?** Check Vercel dashboard for build logs
