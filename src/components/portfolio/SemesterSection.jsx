import { BookMarked, Users } from 'lucide-react'
import { ACTIVITY_TYPES } from '../../utils/constants'
import ActivityCard from './ActivityCard'
import SemesterTitlesTable from './SemesterTitlesTable'
import AnimatedSection from '../common/AnimatedSection'
import LoadingSkeleton from '../common/LoadingSkeleton'

function ActivityGroup({ title, icon: Icon, activities }) {
  if (!activities.length) {
    return (
      <div className="p-6 rounded-2xl border-2 border-dashed border-olive-300 dark:border-olive-600 bg-white/60 dark:bg-olive-800/40 text-center text-olive-700 dark:text-cream-300 text-sm">
        No {title.toLowerCase()} added yet.
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Icon className="text-olive-500" size={22} />
        <h3 className="font-display text-2xl font-semibold text-olive-800 dark:text-cream-100">
          {title}
        </h3>
        <span className="text-sm text-olive-500 dark:text-cream-400">({activities.length})</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  )
}

export default function SemesterSection({ semester, activities, loading }) {
  const curricular = activities.filter(
    (a) => a.semester === semester.id && a.type === ACTIVITY_TYPES.CURRICULAR
  )
  const cocurricular = activities.filter(
    (a) => a.semester === semester.id && a.type === ACTIVITY_TYPES.COCURRICULAR
  )

  return (
    <AnimatedSection
      id={`semester-${semester.id}`}
      className="py-16 px-4 scroll-mt-24 odd:bg-cream-200/40 dark:odd:bg-olive-800/20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 pb-6 border-b border-olive-300 dark:border-olive-600">
          <span className="text-sm font-semibold text-olive-600 dark:text-olive-300 uppercase tracking-wider">
            Semester {semester.id}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-olive-800 dark:text-cream-50 mt-1">
            {semester.title}
          </h2>
          <p className="text-olive-700 dark:text-cream-200 mt-2 font-medium">{semester.subtitle}</p>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <>
            <SemesterTitlesTable curricular={curricular} cocurricular={cocurricular} />

            <div className="space-y-12">
              <ActivityGroup
                title="Curricular Activities"
                icon={BookMarked}
                activities={curricular}
              />
              <ActivityGroup
                title="Co-Curricular Activities"
                icon={Users}
                activities={cocurricular}
              />
            </div>
          </>
        )}
      </div>
    </AnimatedSection>
  )
}
