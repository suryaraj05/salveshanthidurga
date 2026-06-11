/**
 * One-time setup: GET /api/telegram/setup-webhook?secret=YOUR_SETUP_SECRET
 * Registers the Telegram webhook URL with Vercel.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'GET only' })
  }

  const setupSecret = process.env.TELEGRAM_SETUP_SECRET
  if (!setupSecret || req.query.secret !== setupSecret) {
    return res.status(401).json({ error: 'Invalid setup secret' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.SITE_URL

  if (!botToken || !siteUrl) {
    return res.status(500).json({
      error: 'Set TELEGRAM_BOT_TOKEN and SITE_URL (or deploy to Vercel)',
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
