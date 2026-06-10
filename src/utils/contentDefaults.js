import { ACTIVITY_TYPES } from './constants'

const STORAGE_KEY = 'adminContentDefaults'

export const DEFAULT_CONTENT_DEFAULTS = {
  semester: 1,
  type: ACTIVITY_TYPES.COCURRICULAR,
}

export function getContentDefaults() {
  if (typeof window === 'undefined') return { ...DEFAULT_CONTENT_DEFAULTS }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT_CONTENT_DEFAULTS, ...JSON.parse(raw) }
  } catch {
    // ignore invalid stored data
  }
  return { ...DEFAULT_CONTENT_DEFAULTS }
}

export function saveContentDefaults(defaults) {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      semester: Number(defaults.semester),
      type: defaults.type,
    })
  )
}
