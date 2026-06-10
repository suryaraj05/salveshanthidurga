import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase/config'
import { COLLECTIONS, ACTIVITY_TYPES } from '../utils/constants'

function getCollectionName(type) {
  return type === ACTIVITY_TYPES.COCURRICULAR
    ? COLLECTIONS.COCURRICULAR
    : COLLECTIONS.CURRICULAR
}

export async function getActivities() {
  if (!isFirebaseConfigured || !db) return []

  const types = [ACTIVITY_TYPES.CURRICULAR, ACTIVITY_TYPES.COCURRICULAR]
  const allActivities = []

  for (const type of types) {
    const colRef = collection(db, getCollectionName(type))
    const q = query(colRef, orderBy('order', 'asc'))
    const snap = await getDocs(q)
    snap.docs.forEach((d) => {
      allActivities.push({ id: d.id, type, ...d.data() })
    })
  }

  return allActivities.sort((a, b) => {
    if (a.semester !== b.semester) return a.semester - b.semester
    if (a.type !== b.type) return a.type.localeCompare(b.type)
    return (a.order ?? 0) - (b.order ?? 0)
  })
}

export async function createActivity(activity) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured')
  }

  const colRef = collection(db, getCollectionName(activity.type))
  const docRef = await addDoc(colRef, {
    title: activity.title,
    description: activity.description || '',
    semester: Number(activity.semester),
    type: activity.type,
    images: activity.images || [],
    order: activity.order ?? Date.now(),
    createdAt: new Date().toISOString(),
  })

  return { id: docRef.id, ...activity }
}

/** Create multiple activities in one go */
export async function createActivities(activities) {
  const baseOrder = Date.now()
  const results = []
  for (let i = 0; i < activities.length; i++) {
    const created = await createActivity({ ...activities[i], order: baseOrder + i })
    results.push(created)
  }
  return results
}

export async function updateActivity(id, type, updates) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured')
  }

  const docRef = doc(db, getCollectionName(type), id)
  await updateDoc(docRef, updates)
}

export async function deleteActivity(id, type) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase is not configured')
  }

  await deleteDoc(doc(db, getCollectionName(type), id))
}

/** Batch update order after drag-and-drop reorder */
export async function reorderActivities(activities) {
  if (!isFirebaseConfigured || !db) return

  const batch = writeBatch(db)
  activities.forEach((activity, index) => {
    const docRef = doc(db, getCollectionName(activity.type), activity.id)
    batch.update(docRef, { order: index })
  })
  await batch.commit()
}

export async function getActivityStats() {
  const activities = await getActivities()
  const stats = {
    total: activities.length,
    curricular: activities.filter((a) => a.type === ACTIVITY_TYPES.CURRICULAR).length,
    cocurricular: activities.filter((a) => a.type === ACTIVITY_TYPES.COCURRICULAR).length,
    bySemester: { 1: 0, 2: 0, 3: 0, 4: 0 },
  }

  activities.forEach((a) => {
    if (stats.bySemester[a.semester] !== undefined) {
      stats.bySemester[a.semester]++
    }
  })

  return stats
}
