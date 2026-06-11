/**
 * GET /api/telegram/env-status
 * Shows which server env vars are set (not their values). Use to debug Vercel config.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' })
  }

  const setupSecret = process.env.TELEGRAM_SETUP_SECRET?.trim()

  return res.status(200).json({
    ok: true,
    env: {
      TELEGRAM_BOT_TOKEN: Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()),
      TELEGRAM_SETUP_SECRET: Boolean(setupSecret),
      TELEGRAM_WEBHOOK_SECRET: Boolean(process.env.TELEGRAM_WEBHOOK_SECRET?.trim()),
      TELEGRAM_ALLOWED_CHAT_IDS: Boolean(process.env.TELEGRAM_ALLOWED_CHAT_IDS?.trim()),
      SITE_URL: Boolean(process.env.SITE_URL?.trim()),
      FIREBASE_SERVICE_ACCOUNT_JSON: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()),
      VERCEL_URL: process.env.VERCEL_URL || null,
    },
    setupSecretLength: setupSecret ? setupSecret.length : 0,
    hint:
      'If any value is false, add it in Vercel → Settings → Environment Variables → check Production → Redeploy.',
    siteUrl: process.env.SITE_URL?.trim() || null,
    setupUrlExample: process.env.SITE_URL
      ? `${process.env.SITE_URL.trim().replace(/\/$/, '')}/api/telegram/setup-webhook?secret=YOUR_SETUP_SECRET`
      : null,
    note: 'Use hyphens in the URL (portfolio-setup-2026), not spaces (portfolio setup 2026).',
  })
}
