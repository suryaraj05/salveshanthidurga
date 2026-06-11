/**
 * Register the Telegram webhook without using the Vercel setup URL.
 * Usage: node scripts/register-telegram-webhook.mjs
 *
 * Reads TELEGRAM_BOT_TOKEN, SITE_URL, TELEGRAM_WEBHOOK_SECRET from .env
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const env = Object.fromEntries(
  readFileSync(resolve(root, '.env'), 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const i = line.indexOf('=')
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    })
)

const token = env.TELEGRAM_BOT_TOKEN
const siteUrl = env.SITE_URL?.replace(/\/$/, '')
const webhookSecret = env.TELEGRAM_WEBHOOK_SECRET

if (!token || !siteUrl) {
  console.error('Set TELEGRAM_BOT_TOKEN and SITE_URL in .env')
  process.exit(1)
}

const me = await fetch(`https://api.telegram.org/bot${token}/getMe`).then((r) => r.json())
if (!me.ok) {
  console.error('Bot token is invalid (Telegram returned 401).')
  console.error('Open @BotFather → /mybots → your bot → API Token → copy the NEW token into .env and Vercel.')
  process.exit(1)
}

console.log(`Bot: @${me.result.username} (${me.result.first_name})`)

const body = { url: `${siteUrl}/api/telegram/webhook` }
if (webhookSecret) body.secret_token = webhookSecret

const set = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
}).then((r) => r.json())

console.log('setWebhook:', set)

const info = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`).then((r) => r.json())
console.log('webhook URL:', info.result?.url || '(none)')
if (info.result?.last_error_message) {
  console.log('last error:', info.result.last_error_message)
}

if (set.ok) {
  console.log('\nDone. Send /myid to your bot in Telegram.')
} else {
  process.exit(1)
}
