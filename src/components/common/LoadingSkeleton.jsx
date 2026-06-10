export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-olive-200/60 dark:bg-olive-700/60 rounded-lg ${className}`}
      aria-hidden="true"
    />
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full">
        <Skeleton className="w-48 h-48 rounded-full shrink-0" />
        <div className="flex-1 space-y-4 w-full">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3 p-6 rounded-2xl bg-white dark:bg-olive-800 shadow-sm">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ))}
    </div>
  )
}

export default function LoadingSkeleton({ variant = 'card', count = 3 }) {
  if (variant === 'hero') return <HeroSkeleton />
  return <CardSkeleton count={count} />
}
