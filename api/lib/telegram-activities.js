import { getAdminDb } from './firebase-admin.js'
import { getCollectionName } from './telegram-constants.js'

function textToHtml(text) {
  if (!text?.trim()) return ''
  if (text.includes('<')) return text
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join('')
}

export async function saveActivity({ title, description, semester, type, images = [] }) {
  const db = getAdminDb()
  const col = getCollectionName(type)
  const docRef = await db.collection(col).add({
    title: title.trim(),
    description: textToHtml(description || ''),
    semester: Number(semester),
    type,
    images: images.slice(0, 4),
    order: Date.now(),
    createdAt: new Date().toISOString(),
    source: 'telegram',
  })
  return docRef.id
}

export async function saveActivities(activities) {
  const baseOrder = Date.now()
  const ids = []
  for (let i = 0; i < activities.length; i++) {
    const a = activities[i]
    const db = getAdminDb()
    const col = getCollectionName(a.type)
    const ref = await db.collection(col).add({
      title: a.title.trim(),
      description: textToHtml(a.description || ''),
      semester: Number(a.semester),
      type: a.type,
      images: a.images || [],
      order: baseOrder + i,
      createdAt: new Date().toISOString(),
      source: 'telegram',
    })
    ids.push(ref.id)
  }
  return ids
}

/** Parse bulk text: blank line between activities, first line = title, rest = description */
export function parseBulkActivities(text) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
      const title = lines[0] || 'Untitled'
      const description = lines.slice(1).join('\n')
      return { title, description }
    })
}

export function parseTitleMessage(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter((l) => l !== '')
  if (!lines.length) return null
  return {
    title: lines[0],
    description: lines.slice(1).join('\n'),
  }
}
