import ImageFrame from '../common/ImageFrame'

function hasTextContent(html) {
  if (!html) return false
  const text = html.replace(/<[^>]*>/g, '').trim()
  return text.length > 0
}

export default function ActivityCard({ activity, index = 0 }) {
  const images = activity.images || []
  const description = activity.description
  const showDescription = hasTextContent(description)
  const singleImage = images.length === 1

  return (
    <article
      id={`activity-${activity.id}`}
      className="scroll-mt-28 h-full flex flex-col p-4 sm:p-5 rounded-2xl bg-white dark:bg-olive-800 shadow-md hover:shadow-lg border border-cream-300/50 dark:border-olive-700 transition-all duration-300"
    >
      <h4 className="font-display text-lg font-semibold text-olive-900 dark:text-cream-50 mb-3 line-clamp-2">
        {activity.title}
      </h4>

      {images.length > 0 && (
        <div
          className={`mb-3 ${
            singleImage ? 'flex justify-center' : 'flex flex-wrap gap-2 justify-center'
          }`}
        >
          {images.map((url, i) => (
            <ImageFrame
              key={url + i}
              src={url}
              alt={`${activity.title} - image ${i + 1}`}
              index={index + i}
              size="compact"
            />
          ))}
        </div>
      )}

      {showDescription && (
        <div
          className="prose-portfolio text-olive-700 dark:text-cream-200 text-sm leading-relaxed line-clamp-4 mt-auto"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </article>
  )
}
