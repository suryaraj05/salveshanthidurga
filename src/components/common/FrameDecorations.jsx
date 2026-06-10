/** Decorative corner flourishes for image frames */

export function FloralCorner({ className = '', color = '#e11d48' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="5" fill={color} opacity="0.85" />
      <circle cx="20" cy="8" r="4" fill={color} opacity="0.7" />
      <circle cx="8" cy="20" r="4" fill={color} opacity="0.7" />
      <circle cx="16" cy="18" r="3.5" fill={color} opacity="0.6" />
      <path
        d="M12 12 Q18 4 26 10 Q22 18 12 12"
        fill={color}
        opacity="0.5"
      />
      <path
        d="M12 12 Q4 18 10 26 Q18 22 12 12"
        fill={color}
        opacity="0.5"
      />
    </svg>
  )
}

export function LeafCorner({ className = '', color = '#16a34a' }) {
  return (
    <svg viewBox="0 0 36 36" className={className} fill="none" aria-hidden>
      <path
        d="M4 32 C4 20 12 8 28 4 C20 16 16 28 4 32Z"
        fill={color}
        opacity="0.75"
      />
      <path d="M8 24 Q16 16 24 8" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  )
}

export function StarCorner({ className = '', color = '#eab308' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M16 2 L19 12 L30 12 L21 19 L24 30 L16 23 L8 30 L11 19 L2 12 L13 12 Z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  )
}

export function ButterflyCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="14" cy="16" rx="10" ry="8" fill="#a855f7" opacity="0.7" />
      <ellipse cx="26" cy="16" rx="10" ry="8" fill="#ec4899" opacity="0.7" />
      <ellipse cx="12" cy="24" rx="7" ry="6" fill="#c084fc" opacity="0.6" />
      <ellipse cx="28" cy="24" rx="7" ry="6" fill="#f472b6" opacity="0.6" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="#7c3aed" strokeWidth="1.5" />
    </svg>
  )
}

export function FrameCorners({ type, color }) {
  const size = 'w-7 h-7 sm:w-8 sm:h-8'
  const corners = [
    { pos: 'top-0 left-0', rotate: '' },
    { pos: 'top-0 right-0', rotate: 'rotate-90' },
    { pos: 'bottom-0 right-0', rotate: 'rotate-180' },
    { pos: 'bottom-0 left-0', rotate: '-rotate-90' },
  ]

  const Corner = {
    floral: FloralCorner,
    leaf: LeafCorner,
    star: StarCorner,
    butterfly: ButterflyCorner,
  }[type]

  if (!Corner) return null

  return (
    <>
      {corners.map(({ pos, rotate }, i) => (
        <Corner
          key={i}
          className={`absolute ${pos} ${size} ${rotate} pointer-events-none z-10 drop-shadow-sm`}
          color={color}
        />
      ))}
    </>
  )
}

/** Washi tape strips along edges */
export function WashiTape({ color, position }) {
  const positions = {
    top: 'top-0 left-2 right-2 h-3 -translate-y-1/2 rotate-[-1deg]',
    bottom: 'bottom-0 left-3 right-1 h-3 translate-y-1/2 rotate-[1.5deg]',
    left: 'left-0 top-3 bottom-3 w-3 -translate-x-1/2 rotate-[2deg]',
  }
  return (
    <div
      className={`absolute ${positions[position]} rounded-sm opacity-90 shadow-sm pointer-events-none z-10`}
      style={{ backgroundColor: color }}
      aria-hidden
    />
  )
}
