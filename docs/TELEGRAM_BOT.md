# Telegram Import Bot Setup

Import portfolio activities from Telegram instead of the admin form — ideal when your content is already in a Telegram chat.

**Student / non-technical guide:** [HOW_TO_USE_TELEGRAM_BOT.md](./HOW_TO_USE_TELEGRAM_BOT.md)

## 1. Create the bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/newbot` and follow the steps
3. Copy the **bot token**

## 2. Firebase service account (server writes)

1. Firebase Console → Project Settings → Service accounts
2. Click **Generate new private key**
3. Copy the entire JSON file content

## 3. Vercel environment variables

Add these in Vercel → Project → Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Token from BotFather |
| `TELEGRAM_ALLOWED_CHAT_IDS` | Your Telegram chat ID (comma-separated for multiple) |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service account JSON as **one line** (minified) |
| `TELEGRAM_SETUP_SECRET` | Random string for one-time webhook setup |
| `TELEGRAM_WEBHOOK_SECRET` | Optional — random string for webhook security |
| `SITE_URL` | Your live URL e.g. `https://your-app.vercel.app` |

Keep all existing `VITE_FIREBASE_*` variables too.

### Get your chat ID

1. Deploy with `TELEGRAM_BOT_TOKEN` set
2. Message your bot: `/myid`
3. Copy the number into `TELEGRAM_ALLOWED_CHAT_IDS`

## 4. Deploy & register webhook

After deploying to Vercel, open in browser (replace values):

```
https://YOUR-SITE.vercel.app/api/telegram/setup-webhook?secret=YOUR_TELEGRAM_SETUP_SECRET
```

You should see `{ "ok": true }` from Telegram.

## 5. Deploy Firestore rules

Update rules in Firebase Console (includes `telegram_sessions` block) or:

```bash
firebase deploy --only firestore:rules
```

## Usage

### Guided import (recommended)

```
/import
→ Tap Semester 1
→ Tap Co-Curricular
→ Send: Self Introduction
→ Send photos (or description text, or /next)
→ Send next title...
→ /done
```

### Bulk paste from Telegram notes

```
/import → Semester → Type
/paste
```

Then paste:

```
Activity Title One
Description paragraph...

Activity Title Two
More description...
```

Blank line = new activity. Then send images per activity or `/skipimages`.

## Commands

| Command | Action |
|---------|--------|
| `/import` | Start import session |
| `/paste` | Bulk text import |
| `/next` | Save current activity, continue |
| `/done` | Finish session |
| `/cancel` | Cancel |
| `/myid` | Show your chat ID |
| `/skipimages` | Save bulk paste without images |

## Troubleshooting

### Bot does not reply at all (not even `/myid`)

1. **Webhook not registered** — Open in browser (use your real setup secret from Vercel):
   ```
   https://salveshanthidurga.vercel.app/api/telegram/setup-webhook?secret=YOUR_TELEGRAM_SETUP_SECRET
   ```
   Response should include `"ok": true` from Telegram.

2. **Wrong bot token** — If BotFather says *"Your token was replaced"*, copy the **new** token into Vercel `TELEGRAM_BOT_TOKEN` and redeploy.

3. **Missing Vercel env vars** — All of these must be set on Vercel (not only in local `.env`):
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_SETUP_SECRET`
   - `SITE_URL` = `https://salveshanthidurga.vercel.app`
   - `FIREBASE_SERVICE_ACCOUNT_JSON` (full JSON, one line)
   - Optional: `TELEGRAM_WEBHOOK_SECRET`, `TELEGRAM_ALLOWED_CHAT_IDS`

4. **Test webhook is alive** — Open:
   ```
   https://salveshanthidurga.vercel.app/api/telegram/webhook
   ```
   You should see `{"ok":true,"message":"Telegram webhook active"}`. If you see `FUNCTION_INVOCATION_FAILED`, redeploy after the latest code fix.

### Other issues

- **Unauthorized** — Add chat ID to `TELEGRAM_ALLOWED_CHAT_IDS` and redeploy
- **Webhook not working** — Re-run setup-webhook URL
- **Images fail** — Check `FIREBASE_SERVICE_ACCOUNT_JSON` is valid minified JSON
- **Activities not showing** — Refresh portfolio; check Firestore `curricular` / `cocurricular` collections
