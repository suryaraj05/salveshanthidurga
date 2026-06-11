import { getAdminDb } from './firebase-admin.js'
import { COLLECTIONS, STATES } from './telegram-constants.js'

function sessionRef(chatId) {
  return getAdminDb().collection(COLLECTIONS.SESSIONS).doc(String(chatId))
}

export async function getSession(chatId) {
  const snap = await sessionRef(chatId).get()
  return snap.exists ? snap.data() : null
}

export async function setSession(chatId, data) {
  await sessionRef(chatId).set({
    ...data,
    updatedAt: new Date().toISOString(),
  })
}

export async function clearSession(chatId) {
  await sessionRef(chatId).delete()
}

export function newSession() {
  return {
    state: STATES.SELECT_SEMESTER,
    semester: null,
    type: null,
    current: { title: '', description: '', images: [] },
    savedCount: 0,
  }
}
