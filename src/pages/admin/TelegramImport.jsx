import { Bot, ExternalLink, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

const COMMANDS = [
  { cmd: '/import', desc: 'Start — pick semester & type' },
  { cmd: '/paste', desc: 'Bulk paste activities (blank line between each)' },
  { cmd: '/next', desc: 'Save current activity (after title/images)' },
  { cmd: '/done', desc: 'Finish and save session' },
  { cmd: '/cancel', desc: 'Cancel current session' },
  { cmd: '/myid', desc: 'Get your Telegram chat ID' },
]

export default function TelegramImport() {
  const copy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied')
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50 mb-2 flex items-center gap-2">
        <Bot className="text-olive-600" />
        Telegram Import
      </h1>
      <p className="text-olive-600 dark:text-cream-300 mb-4 max-w-2xl">
        Import activities from Telegram instead of typing each one in the admin panel. Perfect
        when your content is already in a Telegram chat.
      </p>
      <p className="text-sm text-olive-600 dark:text-cream-300 mb-8 max-w-2xl">
        <b>For students (no coding):</b> share{' '}
        <code className="text-xs bg-cream-200 dark:bg-olive-700 px-1 rounded">
          docs/HOW_TO_USE_TELEGRAM_BOT.md
        </code>{' '}
        or open{' '}
        <a
          href="https://t.me/PofolioBot"
          target="_blank"
          rel="noreferrer"
          className="text-olive-600 underline inline-flex items-center gap-1"
        >
          @PofolioBot <ExternalLink size={12} />
        </a>{' '}
        and follow the steps there.
      </p>

      <div className="space-y-6 max-w-3xl">
        <section className="p-6 rounded-2xl bg-white dark:bg-olive-800 border border-cream-300/50 dark:border-olive-700">
          <h2 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50 mb-4">
            Quick start
          </h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-olive-700 dark:text-cream-200">
            <li>Create a bot with <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-olive-600 underline inline-flex items-center gap-1">@BotFather <ExternalLink size={12} /></a></li>
            <li>Add env vars on Vercel (see <code className="text-xs bg-cream-200 dark:bg-olive-700 px-1 rounded">docs/TELEGRAM_BOT.md</code>)</li>
            <li>Deploy and run the webhook setup URL</li>
            <li>Message your bot: <code className="text-xs bg-cream-200 dark:bg-olive-700 px-1 rounded">/myid</code> → add chat ID to Vercel</li>
            <li>Send <code className="text-xs bg-cream-200 dark:bg-olive-700 px-1 rounded">/import</code> and follow prompts</li>
          </ol>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-olive-800 border border-cream-300/50 dark:border-olive-700">
          <h2 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50 mb-4">
            Guided flow (one by one)
          </h2>
          <div className="text-sm text-olive-700 dark:text-cream-200 space-y-3">
            <p>1. <b>/import</b> → Semester → Curricular or Co-Curricular</p>
            <p>2. Send <b>title</b> (or title + description on next lines)</p>
            <p>3. Send <b>photos</b>, or <b>description text</b> (no images), or <b>/next</b></p>
            <p>4. Repeat for each activity → <b>/done</b></p>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-cream-100 dark:bg-olive-900/50 border border-olive-200 dark:border-olive-700">
          <h2 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50 mb-4">
            Bulk paste (from Telegram notes)
          </h2>
          <p className="text-sm text-olive-700 dark:text-cream-200 mb-3">
            After choosing semester & type, send <b>/paste</b> then paste all activities separated
            by a <b>blank line</b>:
          </p>
          <pre className="text-xs p-4 rounded-xl bg-white dark:bg-olive-800 border border-olive-200 dark:border-olive-700 overflow-x-auto text-olive-800 dark:text-cream-200">
{`Self Introduction
Welcome speech at college...

Communication Game
Group activity details...

Lesson Plan
Micro teaching notes...`}
          </pre>
          <button
            type="button"
            onClick={() =>
              copy(
                'Self Introduction\nWelcome speech at college...\n\nCommunication Game\nGroup activity details...'
              )
            }
            className="mt-3 inline-flex items-center gap-1 text-sm text-olive-600 hover:underline"
          >
            <Copy size={14} /> Copy example
          </button>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-olive-800 border border-cream-300/50 dark:border-olive-700">
          <h2 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50 mb-4">
            Commands
          </h2>
          <ul className="space-y-2">
            {COMMANDS.map(({ cmd, desc }) => (
              <li key={cmd} className="flex gap-3 text-sm">
                <code className="shrink-0 px-2 py-0.5 rounded bg-cream-200 dark:bg-olive-700 text-olive-800 dark:text-cream-100">
                  {cmd}
                </code>
                <span className="text-olive-600 dark:text-cream-300">{desc}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
