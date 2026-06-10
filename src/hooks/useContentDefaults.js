import { useState, useCallback, useEffect } from 'react'
import {
  getContentDefaults,
  saveContentDefaults,
  DEFAULT_CONTENT_DEFAULTS,
} from '../utils/contentDefaults'

export function useContentDefaults() {
  const [defaults, setDefaultsState] = useState(DEFAULT_CONTENT_DEFAULTS)

  useEffect(() => {
    setDefaultsState(getContentDefaults())
  }, [])

  const setDefaults = useCallback((next) => {
    const merged = { ...getContentDefaults(), ...next }
    saveContentDefaults(merged)
    setDefaultsState(merged)
    return merged
  }, [])

  const resetDefaults = useCallback(() => {
    saveContentDefaults(DEFAULT_CONTENT_DEFAULTS)
    setDefaultsState({ ...DEFAULT_CONTENT_DEFAULTS })
  }, [])

  return { defaults, setDefaults, resetDefaults }
}
