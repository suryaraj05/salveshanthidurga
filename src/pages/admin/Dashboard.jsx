import { useEffect, useState } from 'react'
import { FileText, BookOpen, Users, Layers } from 'lucide-react'
import StatsCard from '../../components/admin/StatsCard'
import { getActivityStats } from '../../services/activityService'
import LoadingSkeleton from '../../components/common/LoadingSkeleton'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getActivityStats()
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSkeleton count={4} />

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-olive-900 dark:text-cream-50 mb-2">
        Dashboard
      </h1>
      <p className="text-olive-600 dark:text-cream-300 mb-8">
        Overview of your portfolio content
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total Activities" value={stats?.total ?? 0} icon={Layers} />
        <StatsCard title="Curricular" value={stats?.curricular ?? 0} icon={BookOpen} color="olive" />
        <StatsCard
          title="Co-Curricular"
          value={stats?.cocurricular ?? 0}
          icon={Users}
          color="brown"
        />
        <StatsCard title="Semesters" value={4} icon={FileText} color="cream" />
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700">
        <h2 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 mb-4">
          Activities by Semester
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((sem) => (
            <div
              key={sem}
              className="p-4 rounded-xl bg-cream-100 dark:bg-olive-700/50 text-center"
            >
              <p className="text-2xl font-display font-bold text-olive-700 dark:text-cream-100">
                {stats?.bySemester?.[sem] ?? 0}
              </p>
              <p className="text-sm text-olive-500 dark:text-cream-400">Semester {sem}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
