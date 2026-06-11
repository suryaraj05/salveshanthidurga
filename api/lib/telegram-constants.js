export const ACTIVITY_TYPES = {
  CURRICULAR: 'curricular',
  COCURRICULAR: 'cocurricular',
}

export const COLLECTIONS = {
  CURRICULAR: 'curricular',
  COCURRICULAR: 'cocurricular',
  SESSIONS: 'telegram_sessions',
}

export const STATES = {
  SELECT_SEMESTER: 'SELECT_SEMESTER',
  SELECT_TYPE: 'SELECT_TYPE',
  AWAIT_TITLE: 'AWAIT_TITLE',
  AWAIT_MEDIA: 'AWAIT_MEDIA',
  AWAIT_BULK: 'AWAIT_BULK',
}

export function getCollectionName(type) {
  return type === ACTIVITY_TYPES.COCURRICULAR
    ? COLLECTIONS.COCURRICULAR
    : COLLECTIONS.CURRICULAR
}
