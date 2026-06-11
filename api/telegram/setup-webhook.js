/**
 * One-time setup: GET /api/telegram/setup-webhook?secret=YOUR_SETUP_SECRET
 * Registers the Telegram webhook URL with Vercel.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' })
  }

  const setupSecret = process.env.TELEGRAM_SETUP_SECRET?.trim()
  const providedSecret = String(req.query.secret || '').trim()

  if (!setupSecret) {
    return res.status(500).json({
      error: 'TELEGRAM_SETUP_SECRET is not set on this server.',
      fix:
        'Vercel → Project → Settings → Environment Variables → add TELEGRAM_SETUP_SECRET for Production → Deployments → Redeploy (required after any env change).',
    })
  }

  if (!providedSecret || providedSecret !== setupSecret) {
    return res.status(401).json({
      error: 'Setup secret does not match TELEGRAM_SETUP_SECRET on this server.',
      fix:
        'Use the exact value from Vercel (hyphens, no spaces). Example URL: ?secret=portfolio-setup-2026 — not ?secret=portfolio setup 2026',
      redeploy:
        'If you just added or changed the variable, you must Redeploy before this URL will work.',
    })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  // Always use SITE_URL for webhooks — VERCEL_URL is a per-deployment preview hostname
  const siteUrl = process.env.SITE_URL?.trim()?.replace(/\/$/, '')

  if (!botToken || !siteUrl) {
    return res.status(500).json({
      error: 'Set TELEGRAM_BOT_TOKEN and SITE_URL on Vercel (your public site URL, e.g. https://salveshanthidurga-portfolio.vercel.app)',
    })
  }

  const webhookUrl = `${siteUrl}/api/telegram/webhook`
  const body = { url: webhookUrl }
  if (process.env.TELEGRAM_WEBHOOK_SECRET) {
    body.secret_token = process.env.TELEGRAM_WEBHOOK_SECRET
  }

  const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json())

  return res.status(200).json({ webhookUrl, telegram: tgRes })
}
