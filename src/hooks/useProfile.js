import { useState, useEffect, useCallback } from 'react'
import { getProfile, saveProfile } from '../services/profileService'
import { DEFAULT_PROFILE } from '../utils/constants'

export function useProfile() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getProfile()
      setProfile(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = async (data) => {
    const saved = await saveProfile(data)
    setProfile(saved)
    return saved
  }

  return { profile, loading, error, fetchProfile, updateProfile }
}
