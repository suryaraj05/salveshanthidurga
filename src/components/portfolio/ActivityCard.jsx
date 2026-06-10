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
  const sideBySide = singleImage && showDescription

  return (
    <article className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-md hover:shadow-lg border border-cream-300/50 dark:border-olive-700 transition-all duration-300">
      {/* Side-by-side: title on top, image card + description row */}
      {sideBySide ? (
        <>
          <h4 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 mb-4">
            {activity.title}
          </h4>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
            <ImageFrame
              src={images[0]}
              alt={activity.title}
              index={index}
              size="compact"
            />
            <div
              className="prose-portfolio flex-1 min-w-0 text-olive-700 dark:text-cream-200 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </>
      ) : (
        <>
          <h4 className="font-display text-xl font-semibold text-olive-900 dark:text-cream-50 mb-4">
            {activity.title}
          </h4>

          {images.length > 0 && (
            <div
              className={`mb-4 ${
                singleImage
                  ? 'flex justify-start sm:justify-center'
                  : 'flex flex-wrap gap-4 justify-center sm:justify-start'
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
              className="prose-portfolio text-olive-700 dark:text-cream-200 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </>
      )}
    </article>
  )
}
