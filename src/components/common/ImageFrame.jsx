import { useState, useCallback } from 'react'
import { FRAME_STYLES } from '../../utils/constants'
import { FrameCorners, WashiTape } from './FrameDecorations'

const FRAMES = {
  'floral-rose': {
    wrapper:
      'bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-rose-900/40 p-2.5 sm:p-3 shadow-lg shadow-rose-200/50 dark:shadow-rose-900/30 border-2 border-rose-300 dark:border-rose-600',
    inner: 'ring-2 ring-rose-400/60 ring-offset-1 ring-offset-rose-50 dark:ring-offset-rose-950',
    corner: { type: 'floral', color: '#f43f5e' },
    rotate: '-rotate-1 hover:rotate-0',
  },
  'floral-sunflower': {
    wrapper:
      'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 dark:from-amber-950/40 dark:to-orange-900/30 p-2.5 sm:p-3 shadow-lg shadow-amber-200/60 border-2 border-amber-400 dark:border-amber-600',
    inner: 'ring-2 ring-amber-400/70 ring-offset-1 ring-offset-amber-50',
    corner: { type: 'floral', color: '#f59e0b' },
    rotate: 'rotate-1 hover:rotate-0',
  },
  'floral-lavender': {
    wrapper:
      'bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 dark:from-violet-950/40 dark:to-indigo-900/30 p-2.5 sm:p-3 shadow-lg shadow-purple-200/50 border-2 border-purple-300 dark:border-purple-600',
    inner: 'ring-2 ring-purple-400/60 ring-offset-1 ring-offset-violet-50',
    corner: { type: 'floral', color: '#a855f7' },
    rotate: '-rotate-[0.5deg] hover:rotate-0',
  },
  'garden-leaves': {
    wrapper:
      'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 dark:from-emerald-950/40 dark:to-teal-900/30 p-2.5 sm:p-3 shadow-lg shadow-green-200/50 border-2 border-emerald-400 dark:border-emerald-600',
    inner: 'ring-2 ring-emerald-400/50 ring-offset-1 ring-offset-emerald-50',
    corner: { type: 'leaf', color: '#22c55e' },
    rotate: 'rotate-[0.5deg] hover:rotate-0',
  },
  butterfly: {
    wrapper:
      'bg-gradient-to-br from-fuchsia-50 via-pink-50 to-sky-100 dark:from-fuchsia-950/30 dark:to-sky-900/30 p-2.5 sm:p-3 shadow-lg shadow-fuchsia-200/50 border-2 border-fuchsia-300 dark:border-fuchsia-600',
    inner: 'ring-2 ring-fuchsia-400/50 ring-offset-1',
    corner: { type: 'butterfly' },
    rotate: '-rotate-1 hover:rotate-0',
  },
  rainbow: {
    wrapper:
      'p-[3px] bg-[conic-gradient(from_180deg,#f87171,#fbbf24,#4ade80,#38bdf8,#a78bfa,#f472b6,#f87171)] shadow-lg shadow-purple-200/40 animate-gradient-border',
    inner: 'ring-0 bg-white dark:bg-olive-900',
    corner: { type: 'star', color: '#eab308' },
    rotate: 'hover:scale-[1.03]',
  },
  golden: {
    wrapper:
      'bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-200 dark:from-amber-950/50 dark:to-yellow-900/30 p-2.5 sm:p-3 shadow-xl shadow-amber-300/50 border-2 border-amber-500 dark:border-amber-600',
    inner: 'ring-2 ring-amber-500/80 ring-offset-1 ring-offset-amber-50',
    corner: { type: 'star', color: '#ca8a04' },
    rotate: 'rotate-0',
  },
  'stained-glass': {
    wrapper:
      'bg-gradient-to-br from-cyan-200 via-blue-300 to-indigo-400 dark:from-cyan-900/50 dark:to-indigo-800/50 p-2 sm:p-2.5 shadow-lg border-2 border-indigo-400',
    inner: 'ring-1 ring-white/50',
    corner: { type: 'star', color: '#38bdf8' },
    rotate: 'rotate-[0.5deg] hover:rotate-0',
  },
  scrapbook: {
    wrapper:
      'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-3 shadow-md border-2 border-dashed border-orange-300 dark:border-orange-600 relative',
    inner: '',
    tapes: ['#f9a8d4', '#fcd34d', '#86efac'],
    rotate: '-rotate-1 hover:rotate-0',
  },
  polaroid: {
    wrapper:
      'bg-white dark:bg-cream-100 p-2 pb-5 sm:pb-6 shadow-xl shadow-olive-300/30 border border-cream-200',
    inner: '',
    tape: true,
    rotate: '-rotate-2 hover:rotate-0',
    caption: true,
  },
  notebook: {
    wrapper:
      'bg-sky-50 dark:bg-sky-950/30 p-2 pl-4 border-l-[6px] border-l-sky-500 shadow-md bg-[linear-gradient(#bae6fd_1px,transparent_1px)] bg-[length:100%_18px] border border-sky-200 dark:border-sky-700',
    inner: '',
    rotate: 'rotate-[0.5deg] hover:rotate-0',
  },
  wooden: {
    wrapper:
      'p-1.5 bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-900 shadow-lg border-[3px] border-amber-600',
    inner: 'ring-1 ring-amber-400/40',
    rotate: 'rotate-0',
  },
}

function getOrientation(width, height) {
  const ratio = width / height
  if (ratio < 0.85) return 'portrait'
  if (ratio > 1.2) return 'landscape'
  return 'square'
}

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

  const styleKey = FRAME_STYLES[index % FRAME_STYLES.length]
  const frame = FRAMES[styleKey] || FRAMES['floral-rose']
  const cardSize = CARD_SIZE[size]?.[orientation] || CARD_SIZE.compact.landscape

  const handleLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target
    setOrientation(getOrientation(naturalWidth, naturalHeight))
    setLoaded(true)
  }, [])

  const imageArea = (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-sm bg-white/90 dark:bg-olive-900/60 ${frame.inner} ${cardSize}`}
    >
      {frame.corner && (
        <FrameCorners type={frame.corner.type} color={frame.corner.color} />
      )}
      {frame.tapes?.map((color, i) => (
        <WashiTape key={i} color={color} position={['top', 'bottom', 'left'][i]} />
      ))}
      {frame.tape && (
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-300/80 rounded-sm rotate-[-2deg] shadow-sm z-10"
          aria-hidden
        />
      )}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-olive-100 to-cream-200 dark:from-olive-700 dark:to-olive-800 animate-pulse" />
      )}
      {src && !error && (
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
      )}
      {error && (
        <span className="text-xs text-olive-400">Failed to load</span>
      )}
    </div>
  )

  if (!src || error) {
    return (
      <div
        className={`${frame.wrapper} rounded-xl shrink-0 transition-all duration-300 ${frame.rotate} ${className}`}
      >
        <div className="w-[160px] h-[120px] bg-olive-100/50 rounded-sm flex items-center justify-center text-olive-400 text-xs">
          No image
        </div>
      </div>
    )
  }

  return (
    <figure
      className={`${frame.wrapper} rounded-xl shrink-0 inline-block transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${frame.rotate} ${className}`}
    >
      {imageArea}
      {(caption || frame.caption) && alt && (
        <figcaption className="mt-2 text-center text-xs font-display italic text-olive-600 dark:text-cream-300 max-w-[200px] mx-auto line-clamp-1">
          {caption || alt}
        </figcaption>
      )}
    </figure>
  )
}
