export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, message: 'Telegram webhook active' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const webhookSecret = process.env.TELEGRAM_WEBHOOK_SECRET

  if (!botToken) {
    return res.status(500).json({ error: 'TELEGRAM_BOT_TOKEN not configured' })
  }

  if (webhookSecret && req.headers['x-telegram-bot-api-secret-token'] !== webhookSecret) {
    return res.status(401).json({ error: 'Invalid webhook secret' })
  }

  try {
    const update = req.body
    const message = update?.message
    const text = (message?.text || message?.caption || '').trim()
    const command = text.split(/\s/)[0]?.toLowerCase()

    // Lightweight path — works even if heavier bot modules fail to load
    if (command === '/myid' && message?.chat?.id) {
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: message.chat.id,
          text: `Your Telegram chat ID:\n${message.chat.id}\n\nAdd this to TELEGRAM_ALLOWED_CHAT_IDS in Vercel.`,
          parse_mode: 'HTML',
        }),
      })
      return res.status(200).json({ ok: true })
    }

    const { handleTelegramUpdate } = await import('../lib/telegram-bot.js')
    await handleTelegramUpdate(update, botToken)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Telegram webhook error:', err)
    return res.status(200).json({ ok: true })
  }
}
