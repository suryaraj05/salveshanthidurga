import ImageFrame from '../common/ImageFrame'

export default function ActivityCard({ activity, index = 0 }) {
  const images = activity.images || []

  return (
    <article className="p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md hover:shadow-xl border border-cream-300/50 dark:border-olive-700 transition-all duration-300 hover:-translate-y-0.5">
      <h4 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 mb-3">
        {activity.title}
      </h4>

      {images.length > 0 && (
        <div
          className={`grid gap-4 mb-4 ${
            images.length === 1
              ? 'grid-cols-1'
              : images.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {images.map((url, i) => (
            <ImageFrame
              key={url + i}
              src={url}
              alt={`${activity.title} - image ${i + 1}`}
              index={index + i}
            />
          ))}
        </div>
      )}

      {activity.description && (
        <div
          className="prose-portfolio text-olive-700 dark:text-cream-200 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: activity.description }}
        />
      )}
    </article>
  )
}
