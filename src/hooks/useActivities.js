import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  reorderActivities,
  getActivityStats,
} from '../services/activityService'

export function useActivities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('')

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      const data = await getActivities()
      setActivities(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  const filteredActivities = useMemo(() => {
    let result = activities

    if (semesterFilter) {
      result = result.filter((a) => a.semester === Number(semesterFilter))
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      )
    }

    return result
  }, [activities, semesterFilter, searchQuery])

  const activityCounts = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 }
    activities.forEach((a) => {
      if (counts[a.semester] !== undefined) counts[a.semester]++
    })
    return counts
  }, [activities])

  const addActivity = async (activity) => {
    const created = await createActivity(activity)
    await fetchActivities()
    return created
  }

  const editActivity = async (id, type, updates) => {
    await updateActivity(id, type, updates)
    await fetchActivities()
  }

  const removeActivity = async (id, type) => {
    await deleteActivity(id, type)
    await fetchActivities()
  }

  const reorder = async (reorderedList) => {
    await reorderActivities(reorderedList)
    setActivities(reorderedList)
  }

  return {
    activities: filteredActivities,
    allActivities: activities,
    activityCounts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    semesterFilter,
    setSemesterFilter,
    fetchActivities,
    addActivity,
    editActivity,
    removeActivity,
    reorder,
    getStats: getActivityStats,
  }
}
