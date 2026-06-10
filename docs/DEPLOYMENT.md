# Deployment Guide — Vercel

Deploy your B.Ed Portfolio to Vercel in minutes.

## Prerequisites

- GitHub, GitLab, or Bitbucket account
- Firebase project configured (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
- Code pushed to a git repository

## Option A: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your repository
4. Framework preset: **Vite**
5. Build settings (auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add **Environment Variables** (all `VITE_*` from `.env`):

   | Name | Value |
   |------|-------|
   | `VITE_FIREBASE_API_KEY` | Your API key |
   | `VITE_FIREBASE_AUTH_DOMAIN` | your_project.firebaseapp.com |
   | `VITE_FIREBASE_PROJECT_ID` | your_project_id |
   | `VITE_FIREBASE_STORAGE_BUCKET` | your_project.appspot.com |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
   | `VITE_FIREBASE_APP_ID` | Your app ID |

7. Click **Deploy**

## Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts and add environment variables when asked.

## SPA Routing

The included `vercel.json` rewrites all routes to `index.html` so React Router works:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Firebase Authorized Domains

After deployment, add your Vercel domain to Firebase:

1. Firebase Console → **Authentication → Settings → Authorized domains**
2. Add your domain (e.g. `your-app.vercel.app`)

## Post-Deploy Checklist

- [ ] Portfolio loads at `/`
- [ ] Admin login works at `/admin/login`
- [ ] Image uploads succeed (saved as base64 in Firestore)
- [ ] Firestore rules deployed
- [ ] Custom domain configured (optional)

## Custom Domain

1. Vercel Project → **Settings → Domains**
2. Add your domain and configure DNS
3. Add the custom domain to Firebase authorized domains

## Build Locally Before Deploy

```bash
npm run build
npm run preview
```

Fix any build errors before pushing to production.
