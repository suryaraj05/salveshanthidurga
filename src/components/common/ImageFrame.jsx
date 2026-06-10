import { useState, useCallback } from 'react'
import { FRAME_STYLES } from '../../utils/constants'

const frameClasses = {
  polaroid:
    'bg-white p-2 pb-6 shadow-md rotate-[-1deg] hover:rotate-0 border border-cream-300',
  notebook:
    'bg-cream-50 p-2 border-l-4 border-olive-400 shadow-sm bg-[linear-gradient(#e8ecdb_1px,transparent_1px)] bg-[length:100%_20px]',
  wooden:
    'p-1.5 bg-gradient-to-br from-brown-500 to-brown-600 shadow-lg border-2 border-brown-400',
  scrapbook:
    'p-2 bg-cream-100 border-2 border-dashed border-olive-300 shadow-sm rotate-[0.5deg] hover:rotate-0',
  shadow: 'p-1.5 bg-white dark:bg-olive-800 shadow-lg rounded-lg',
}

function getOrientation(width, height) {
  const ratio = width / height
  if (ratio < 0.85) return 'portrait'
  if (ratio > 1.2) return 'landscape'
  return 'square'
}

/** Fixed card dimensions — never stretches to full width */
const CARD_SIZE = {
  compact: {
    portrait: 'w-[140px] h-[200px] sm:w-[160px] sm:h-[230px]',
    landscape: 'w-[200px] h-[150px] sm:w-[240px] sm:h-[170px]',
    square: 'w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]',
  },
  featured: {
    portrait: 'w-[160px] h-[230px] sm:w-[180px] sm:h-[260px]',
    landscape: 'w-[220px] h-[165px] sm:w-[260px] sm:h-[195px]',
    square: 'w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]',
  },
}

export default function ImageFrame({
  src,
  alt = '',
  index = 0,
  className = '',
  caption,
  size = 'compact',
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [orientation, setOrientation] = useState('landscape')
  const style = FRAME_STYLES[index % FRAME_STYLES.length]
  const cardSize = CARD_SIZE[size]?.[orientation] || CARD_SIZE.compact.landscape

  const handleLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target
    setOrientation(getOrientation(naturalWidth, naturalHeight))
    setLoaded(true)
  }, [])

  if (!src || error) {
    return (
      <div
        className={`${frameClasses[style]} rounded-lg shrink-0 transition-transform duration-300 hover:scale-[1.02] ${className}`}
      >
        <div className="w-[160px] h-[120px] bg-olive-100 dark:bg-olive-700 rounded-sm flex items-center justify-center text-olive-400 text-xs">
          No image
        </div>
      </div>
    )
  }

  return (
    <figure
      className={`${frameClasses[style]} rounded-lg shrink-0 inline-block transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${className}`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-sm bg-olive-50/90 dark:bg-olive-900/50 ${cardSize}`}
      >
        {!loaded && <div className="absolute inset-0 bg-olive-100 dark:bg-olive-700 animate-pulse" />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={() => setError(true)}
          className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      {caption && (
        <figcaption className="mt-1.5 text-center text-xs font-display italic text-olive-600 dark:text-cream-300 max-w-[200px]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
