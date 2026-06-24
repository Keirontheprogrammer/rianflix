import { RowSkeleton } from '@/components/ui/Skeleton'

export default function AnimeLoading() {
  return (
    <div className="pt-6">
      <div className="px-4 md:px-8 tv:px-16 mb-8">
        <div className="w-32 h-9 bg-brand-card animate-pulse rounded-lg mb-6" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-20 h-8 bg-brand-card animate-pulse rounded-full" />
          ))}
        </div>
      </div>
      <RowSkeleton />
      <RowSkeleton />
      <RowSkeleton />
    </div>
  )
}