import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'
import { COLLECTIONS, DEFAULT_PROFILE } from '../utils/constants'

const PROFILE_DOC_ID = 'main'

export async function getProfile() {
  if (!isFirebaseConfigured || !db) {
    return DEFAULT_PROFILE
  }

  const snap = await getDoc(doc(db, COLLECTIONS.PROFILE, PROFILE_DOC_ID))
  if (snap.exists()) {
    return { ...DEFAULT_PROFILE, ...snap.data() }
  }
  return DEFAULT_PROFILE
}

export async function saveProfile(profileData) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured')
  }

  await setDoc(doc(db, COLLECTIONS.PROFILE, PROFILE_DOC_ID), profileData, { merge: true })
  return profileData
}
