import { readFileSync } from 'fs'
import { resolve } from 'path'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

function loadServiceAccount() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  if (json) return JSON.parse(json)

  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  if (filePath) {
    const absolute = resolve(process.cwd(), filePath)
    return JSON.parse(readFileSync(absolute, 'utf8'))
  }

  throw new Error(
    'Set FIREBASE_SERVICE_ACCOUNT_JSON (Vercel) or FIREBASE_SERVICE_ACCOUNT_PATH (local)'
  )
}

export function getAdminDb() {
  if (getApps().length) return getFirestore()

  const serviceAccount = loadServiceAccount()
  initializeApp({ credential: cert(serviceAccount) })
  return getFirestore()
}
