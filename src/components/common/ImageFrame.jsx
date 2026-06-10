import { useState } from 'react'
import { FRAME_STYLES } from '../../utils/constants'

const frameClasses = {
  polaroid:
    'bg-white p-3 pb-10 shadow-lg rotate-[-1deg] hover:rotate-0 border border-cream-300',
  notebook:
    'bg-cream-50 p-4 border-l-4 border-olive-400 shadow-md bg-[linear-gradient(#e8ecdb_1px,transparent_1px)] bg-[length:100%_24px]',
  wooden:
    'p-2 bg-gradient-to-br from-brown-500 to-brown-600 shadow-xl border-4 border-brown-400',
  scrapbook:
    'p-3 bg-cream-100 border-2 border-dashed border-olive-300 shadow-md rotate-[0.5deg] hover:rotate-0',
  shadow: 'p-1 bg-white dark:bg-olive-800 shadow-2xl rounded-lg hover:shadow-olive-300/30',
}

/**
 * Educational frame wrapper — style rotates by index for visual variety
 */
export default function ImageFrame({ src, alt = '', index = 0, className = '', caption }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const style = FRAME_STYLES[index % FRAME_STYLES.length]

  if (!src || error) {
    return (
      <div
        className={`${frameClasses[style]} rounded-lg transition-transform duration-500 hover:scale-[1.02] ${className}`}
      >
        <div className="aspect-[4/3] bg-olive-100 dark:bg-olive-700 rounded flex items-center justify-center text-olive-400">
          No image
        </div>
      </div>
    )
  }

  return (
    <figure
      className={`${frameClasses[style]} rounded-lg transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${className}`}
    >
      {!loaded && (
        <div className="aspect-[4/3] bg-olive-100 dark:bg-olive-700 animate-pulse rounded" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full aspect-[4/3] object-cover rounded-sm transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0 h-0'
        }`}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm font-display italic text-olive-600 dark:text-cream-300">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
