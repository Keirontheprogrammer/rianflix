// base skeleton block — animated shimmer effect
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-brand-card rounded-lg ${className ?? ''}`}
    />
  )
}

// single media card
export function CardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[140px] md:w-[160px] tv:w-[220px]">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <Skeleton className="w-3/4 h-3 mt-2 rounded" />
      <Skeleton className="w-1/2 h-2 mt-1 rounded" />
    </div>
  )
}

// full content row
export function RowSkeleton() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 px-4 md:px-8 tv:px-16 mb-4">
        <Skeleton className="w-1 h-5 rounded-full" />
        <Skeleton className="w-40 h-5 rounded" />
      </div>
      <div className="flex gap-3 px-4 md:px-8 tv:px-16 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// hero banner
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[56vw] min-h-[320px] max-h-[680px] tv:max-h-[860px] bg-brand-card animate-pulse">
      <div className="absolute bottom-12 left-4 md:left-8 tv:left-16 space-y-3">
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-72 h-10 rounded-lg" />
        <Skeleton className="w-48 h-4 rounded" />
        <Skeleton className="w-96 h-4 rounded" />
        <Skeleton className="w-80 h-4 rounded" />
        <div className="flex gap-3 mt-4">
          <Skeleton className="w-36 h-11 rounded-lg" />
          <Skeleton className="w-36 h-11 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// detail page
export function DetailSkeleton() {
  return (
    <div className="min-h-screen">
      <Skeleton className="w-full h-[50vw] min-h-[280px] max-h-[560px] rounded-none" />
      <div className="px-4 md:px-8 tv:px-16 -mt-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-40 md:w-52 aspect-[2/3] rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-3 pt-4">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-3/4 h-10 rounded-lg" />
            <Skeleton className="w-48 h-4 rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-7 rounded-full" />
              ))}
            </div>
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-2/3 h-4 rounded" />
            <div className="flex gap-3 mt-4">
              <Skeleton className="w-36 h-11 rounded-lg" />
              <Skeleton className="w-36 h-11 rounded-lg" />
              <Skeleton className="w-36 h-11 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}