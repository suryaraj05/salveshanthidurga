export default function StatsCard({ title, value, icon: Icon, color = 'olive' }) {
  const colors = {
    olive: 'bg-olive-100 dark:bg-olive-800 text-olive-700 dark:text-olive-300',
    brown: 'bg-cream-200 dark:bg-olive-700 text-brown-600 dark:text-cream-200',
    cream: 'bg-cream-100 dark:bg-olive-800 text-olive-800 dark:text-cream-100',
  }

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md border border-cream-300/50 dark:border-olive-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-olive-500 dark:text-cream-400">{title}</p>
          <p className="text-3xl font-display font-bold text-olive-900 dark:text-cream-50 mt-1">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  )
}
