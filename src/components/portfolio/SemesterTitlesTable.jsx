import { BookMarked, Users, List } from 'lucide-react'

function TitleList({ title, icon: Icon, activities, onNavigate }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-olive-200 dark:border-olive-600">
        <Icon className="text-olive-500 shrink-0" size={18} />
        <h4 className="font-display text-base font-semibold text-olive-800 dark:text-cream-100">
          {title}
        </h4>
        <span className="text-xs text-olive-500 dark:text-cream-400 ml-auto">
          {activities.length}
        </span>
      </div>
      {activities.length === 0 ? (
        <p className="text-sm text-olive-500 dark:text-cream-400 italic">No entries yet</p>
      ) : (
        <ol className="space-y-1.5">
          {activities.map((activity, i) => (
            <li key={activity.id} className="flex gap-2 text-sm">
              <span className="text-olive-400 dark:text-olive-500 font-medium shrink-0 w-5">
                {i + 1}.
              </span>
              <button
                type="button"
                onClick={() => onNavigate(activity.id)}
                className="text-left text-olive-700 dark:text-cream-200 hover:text-olive-600 dark:hover:text-cream-50 hover:underline underline-offset-2 transition-colors"
              >
                {activity.title}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default function SemesterTitlesTable({ curricular, cocurricular }) {
  const scrollToActivity = (id) => {
    document.getElementById(`activity-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!curricular.length && !cocurricular.length) return null

  return (
    <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-sm border border-cream-300/60 dark:border-olive-700">
      <div className="flex items-center gap-2 mb-5">
        <List className="text-olive-500" size={20} />
        <h3 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50">
          Semester Contents
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
        <TitleList
          title="Curricular Activities"
          icon={BookMarked}
          activities={curricular}
          onNavigate={scrollToActivity}
        />
        <TitleList
          title="Co-Curricular Activities"
          icon={Users}
          activities={cocurricular}
          onNavigate={scrollToActivity}
        />
      </div>
    </div>
  )
}
