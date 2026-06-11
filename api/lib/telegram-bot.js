import { STATES, ACTIVITY_TYPES } from './telegram-constants.js'
import {
  getSession,
  setSession,
  clearSession,
  newSession,
} from './telegram-session.js'
import {
  saveActivity,
  saveActivities,
  parseBulkActivities,
  parseTitleMessage,
} from './telegram-activities.js'
import { telegramPhotoToBase64 } from './telegram-images.js'

async function sendMessage(botToken, chatId, text, extra = {}) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      ...extra,
    }),
  })
}

async function answerCallback(botToken, callbackQueryId, text = '') {
  await fetch(`https://api.telegram.org/bot${botToken}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  })
}

function semesterKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Semester 1', callback_data: 'sem_1' },
          { text: 'Semester 2', callback_data: 'sem_2' },
        ],
        [
          { text: 'Semester 3', callback_data: 'sem_3' },
          { text: 'Semester 4', callback_data: 'sem_4' },
        ],
      ],
    },
  }
}

function typeKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Curricular', callback_data: 'type_curricular' },
          { text: 'Co-Curricular', callback_data: 'type_cocurricular' },
        ],
      ],
    },
  }
}

const HELP_TEXT = `<b>B.Ed Portfolio Import Bot</b>

<b>Commands</b>
/import — Start importing activities
/paste — Bulk paste (after semester & type selected)
/cancel — Cancel current session
/help — Show this message

<b>Guided flow</b>
1. Choose semester & type
2. Send <b>title</b> (or title + description with line break)
3. Send <b>photos</b> OR send <b>description text</b> OR /next
4. Repeat for each activity
5. Send /done when finished

<b>Bulk paste (/paste)</b>
Send all activities in one message, separated by a <b>blank line</b>:
<code>Activity Title 1
Description line...

Activity Title 2
Description...</code>

Then add images one-by-one in order, or /skipimages`

export function isAuthorized(chatId) {
  const allowed = process.env.TELEGRAM_ALLOWED_CHAT_IDS || ''
  const ids = allowed.split(',').map((s) => s.trim()).filter(Boolean)
  if (!ids.length) return false
  return ids.includes(String(chatId))
}

async function commitCurrent(session, chatId, botToken) {
  const { current, semester, type } = session
  if (!current?.title?.trim()) return session

  await saveActivity({
    title: current.title,
    description: current.description,
    semester,
    type,
    images: current.images || [],
  })

  const savedCount = (session.savedCount || 0) + 1
  await sendMessage(
    botToken,
    chatId,
    `✅ Saved: <b>${escapeHtml(current.title)}</b> (${current.images?.length || 0} images)`
  )

  return {
    ...session,
    savedCount,
    current: { title: '', description: '', images: [] },
    state: STATES.AWAIT_TITLE,
  }
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function handleTelegramUpdate(update, botToken) {
  if (update.callback_query) {
    const cq = update.callback_query
    const chatId = cq.message?.chat?.id
    if (!chatId || !isAuthorized(chatId)) {
      await answerCallback(botToken, cq.id, 'Unauthorized')
      return
    }

    let session = (await getSession(chatId)) || newSession()
    const data = cq.data

    if (data.startsWith('sem_')) {
      session.semester = Number(data.replace('sem_', ''))
      session.state = STATES.SELECT_TYPE
      await setSession(chatId, session)
      await answerCallback(botToken, cq.id)
      await sendMessage(
        botToken,
        chatId,
        `Semester ${session.semester} selected.\nChoose activity type:`,
        typeKeyboard()
      )
      return
    }

    if (data.startsWith('type_')) {
      session.type = data.replace('type_', '')
      session.state = STATES.AWAIT_TITLE
      session.current = { title: '', description: '', images: [] }
      await setSession(chatId, session)
      const typeLabel =
        session.type === ACTIVITY_TYPES.COCURRICULAR ? 'Co-Curricular' : 'Curricular'
      await answerCallback(botToken, cq.id)
      await sendMessage(
        botToken,
        chatId,
        `<b>Semester ${session.semester}</b> · <b>${typeLabel}</b>\n\n` +
          `Send the <b>activity title</b>.\n` +
          `Or title + description (next lines).\n\n` +
          `<code>/paste</code> — bulk import from Telegram\n` +
          `<code>/done</code> — finish\n` +
          `<code>/cancel</code> — cancel`
      )
      return
    }

    await answerCallback(botToken, cq.id)
    return
  }

  const message = update.message
  if (!message?.chat?.id) return

  const chatId = message.chat.id
  const text = (message.text || message.caption || '').trim()
  const command = text.split(/\s/)[0]?.toLowerCase()

  if (command === '/myid') {
    await sendMessage(
      botToken,
      chatId,
      `Your Telegram chat ID:\n<code>${chatId}</code>\n\nAdd this to TELEGRAM_ALLOWED_CHAT_IDS in Vercel.`
    )
    return
  }

  if (!isAuthorized(chatId)) {
    await sendMessage(
      botToken,
      chatId,
      '⛔ Unauthorized.\nSend /myid to get your chat ID for the admin.'
    )
    return
  }

  if (command === '/start' || command === '/help') {
    await sendMessage(botToken, chatId, HELP_TEXT)
    return
  }

  if (command === '/cancel') {
    await clearSession(chatId)
    await sendMessage(botToken, chatId, 'Session cancelled.')
    return
  }

  if (command === '/import') {
    const session = newSession()
    await setSession(chatId, session)
    await sendMessage(
      botToken,
      chatId,
      '📚 <b>Portfolio Import</b>\n\nChoose semester:',
      semesterKeyboard()
    )
    return
  }

  let session = await getSession(chatId)
  if (!session) {
    if (command === '/paste') {
      await sendMessage(botToken, chatId, 'Run /import first to choose semester and type.')
      return
    }
    await sendMessage(botToken, chatId, 'Send /import to start, or /help for instructions.')
    return
  }

  if (command === '/paste') {
    if (!session.semester || !session.type) {
      await sendMessage(botToken, chatId, 'Complete semester & type selection first (/import).')
      return
    }
    session.state = STATES.AWAIT_BULK
    session.bulkQueue = []
    await setSession(chatId, session)
    await sendMessage(
      botToken,
      chatId,
      '📝 Paste all activities now.\n\nSeparate each activity with a <b>blank line</b>.\nFirst line = title, following lines = description.'
    )
    return
  }

  if (command === '/done') {
    if (session.state === STATES.AWAIT_MEDIA && session.current?.title) {
      session = await commitCurrent(session, chatId, botToken)
    }
    const count = session.savedCount || 0
    await clearSession(chatId)
    await sendMessage(
      botToken,
      chatId,
      `🎉 Done! <b>${count}</b> activities saved to your portfolio.\n\nSend /import to add more.`
    )
    return
  }

  if (command === '/next' || command === '/skip') {
    if (session.state === STATES.AWAIT_MEDIA && session.current?.title) {
      session = await commitCurrent(session, chatId, botToken)
      await setSession(chatId, session)
      await sendMessage(
        botToken,
        chatId,
        'Send next <b>title</b>, or /done to finish.'
      )
    }
    return
  }

  if (command === '/skipimages') {
    if (session.bulkQueue?.length) {
      const items = session.bulkQueue.map((a) => ({
        ...a,
        semester: session.semester,
        type: session.type,
        images: [],
      }))
      const ids = await saveActivities(items)
      const count = ids.length
      session.savedCount = (session.savedCount || 0) + count
      session.bulkQueue = []
      session.state = STATES.AWAIT_TITLE
      await setSession(chatId, session)
      await sendMessage(
        botToken,
        chatId,
        `✅ Saved <b>${count}</b> activities (no images).\n/import for another batch.`
      )
      await clearSession(chatId)
    }
    return
  }

  // Photo in AWAIT_MEDIA
  const photos = message.photo
  if (photos?.length && session.state === STATES.AWAIT_MEDIA) {
    if (!session.current?.title) {
      await sendMessage(botToken, chatId, 'Send the activity title first.')
      return
    }
    const largest = photos[photos.length - 1]
    try {
      const base64 = await telegramPhotoToBase64(largest.file_id, botToken)
      session.current.images = session.current.images || []
      if (session.current.images.length < 4) {
        session.current.images.push(base64)
        await setSession(chatId, session)
        await sendMessage(
          botToken,
          chatId,
          `📷 Image ${session.current.images.length}/4 added.\nSend more photos, /next when done, or text for description only.`
        )
      } else {
        await sendMessage(botToken, chatId, 'Max 4 images. Send /next to save this activity.')
      }
    } catch {
      await sendMessage(botToken, chatId, 'Failed to process image. Try again.')
    }
    return
  }

  // Bulk image assignment
  if (photos?.length && session.bulkQueue?.length) {
    const idx = session.bulkImageIndex || 0
    if (idx >= session.bulkQueue.length) {
      await sendMessage(botToken, chatId, 'All activities have images. /done')
      return
    }
    try {
      const base64 = await telegramPhotoToBase64(photos[photos.length - 1].file_id, botToken)
      if (!session.bulkQueue[idx].images) session.bulkQueue[idx].images = []
      session.bulkQueue[idx].images.push(base64)
      await setSession(chatId, session)
      await sendMessage(
        botToken,
        chatId,
        `📷 Image for "<b>${escapeHtml(session.bulkQueue[idx].title)}</b>" (${session.bulkQueue[idx].images.length}/4)\n` +
          `Send /nextimage when done with this activity's images.`
      )
    } catch {
      await sendMessage(botToken, chatId, 'Image failed.')
    }
    return
  }

  if (command === '/nextimage' && session.bulkQueue?.length) {
    session.bulkImageIndex = (session.bulkImageIndex || 0) + 1
    await setSession(chatId, session)
    const idx = session.bulkImageIndex
    if (idx < session.bulkQueue.length) {
      await sendMessage(
        botToken,
        chatId,
        `Now images for: <b>${escapeHtml(session.bulkQueue[idx].title)}</b> (${idx + 1}/${session.bulkQueue.length})`
      )
    } else {
      const items = session.bulkQueue.map((a) => ({
        ...a,
        semester: session.semester,
        type: session.type,
      }))
      await saveActivities(items)
      await clearSession(chatId)
      await sendMessage(botToken, chatId, `✅ Saved all ${items.length} activities with images!`)
    }
    return
  }

  if (!text || text.startsWith('/')) return

  if (session.state === STATES.SELECT_SEMESTER) {
    const n = parseInt(text, 10)
    if (n >= 1 && n <= 4) {
      session.semester = n
      session.state = STATES.SELECT_TYPE
      await setSession(chatId, session)
      await sendMessage(botToken, chatId, `Semester ${n} selected.\nChoose type:`, typeKeyboard())
    } else {
      await sendMessage(botToken, chatId, 'Tap a semester button or type 1–4.')
    }
    return
  }

  if (session.state === STATES.SELECT_TYPE) {
    const lower = text.toLowerCase()
    if (lower.includes('co')) session.type = ACTIVITY_TYPES.COCURRICULAR
    else if (lower.includes('cur')) session.type = ACTIVITY_TYPES.CURRICULAR
    else {
      await sendMessage(botToken, chatId, 'Tap Curricular or Co-Curricular.', typeKeyboard())
      return
    }
    session.state = STATES.AWAIT_TITLE
    session.current = { title: '', description: '', images: [] }
    await setSession(chatId, session)
    await sendMessage(
      botToken,
      chatId,
      `Ready! Send the <b>activity title</b> or <code>/paste</code> for bulk import.`
    )
    return
  }

  if (session.state === STATES.AWAIT_BULK) {
    const parsed = parseBulkActivities(text)
    if (!parsed.length) {
      await sendMessage(botToken, chatId, 'No activities found. Use blank lines between entries.')
      return
    }
    session.bulkQueue = parsed.map((p) => ({ ...p, images: [] }))
    session.bulkImageIndex = 0
    session.state = STATES.AWAIT_MEDIA
    await setSession(chatId, session)
    await sendMessage(
      botToken,
      chatId,
      `Found <b>${parsed.length}</b> activities:\n` +
        parsed.map((p, i) => `${i + 1}. ${escapeHtml(p.title)}`).join('\n') +
        `\n\nSend photos for "<b>${escapeHtml(parsed[0].title)}</b>" (1/${parsed.length})\n` +
        `Or <code>/skipimages</code> to save all without images.`
    )
    return
  }

  if (session.state === STATES.AWAIT_TITLE) {
    const parsed = parseTitleMessage(text)
    if (!parsed) {
      await sendMessage(botToken, chatId, 'Please send a valid title.')
      return
    }
    session.current = {
      title: parsed.title,
      description: parsed.description || '',
      images: [],
    }
    session.state = STATES.AWAIT_MEDIA
    await setSession(chatId, session)

    if (parsed.description) {
      await sendMessage(
        botToken,
        chatId,
        `<b>Title:</b> ${escapeHtml(parsed.title)}\n<b>Description:</b> saved\n\n` +
          `Send <b>photos</b>, or /next if no images.`
      )
    } else {
      await sendMessage(
        botToken,
        chatId,
        `<b>Title:</b> ${escapeHtml(parsed.title)}\n\n` +
          `Send <b>photos</b>, <b>description text</b>, or /next to skip images.`
      )
    }
    return
  }

  if (session.state === STATES.AWAIT_MEDIA) {
    if (!session.current?.title) {
      session.state = STATES.AWAIT_TITLE
      await setSession(chatId, session)
      await sendMessage(botToken, chatId, 'Send the activity title first.')
      return
    }

    // Text while awaiting media = description (no images), save immediately
    if (!photos?.length) {
      if (!session.current.description) {
        session.current.description = text
      } else {
        session.current.description += '\n' + text
      }
      session = await commitCurrent(session, chatId, botToken)
      await setSession(chatId, session)
      await sendMessage(botToken, chatId, 'Saved (no images). Send next <b>title</b> or /done.')
    }
  }
}
