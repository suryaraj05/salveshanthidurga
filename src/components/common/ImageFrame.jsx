import { useState, useCallback } from 'react'

const FRAME =
  'rounded-lg overflow-hidden border border-olive-200/90 dark:border-olive-600 bg-white dark:bg-olive-800 shadow-sm hover:shadow-md transition-shadow duration-300'

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
  className = '',
  caption,
  size = 'compact',
  rounded = 'lg',
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [orientation, setOrientation] = useState('landscape')
  const cardSize = CARD_SIZE[size]?.[orientation] || CARD_SIZE.compact.landscape
  const roundClass = rounded === 'full' ? 'rounded-full' : 'rounded-lg'

  const handleLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target
    setOrientation(getOrientation(naturalWidth, naturalHeight))
    setLoaded(true)
  }, [])

  if (!src || error) {
    return (
      <div className={`${FRAME} ${roundClass} shrink-0 ${className}`}>
        <div className="w-[160px] h-[120px] bg-cream-100 dark:bg-olive-700 flex items-center justify-center text-olive-400 text-xs">
          No image
        </div>
      </div>
    )
  }

  return (
    <figure className={`${FRAME} ${roundClass} shrink-0 inline-block ${className}`}>
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-cream-50 dark:bg-olive-900/40 ${cardSize} ${roundClass}`}
      >
        {!loaded && <div className="absolute inset-0 bg-cream-100 dark:bg-olive-700 animate-pulse" />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={() => setError(true)}
          className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${roundClass === 'rounded-full' ? 'rounded-full' : ''}`}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-olive-600 dark:text-cream-400 max-w-[200px]">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
