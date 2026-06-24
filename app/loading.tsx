import { HeroSkeleton, RowSkeleton } from '@/components/ui/Skeleton'

// the loading state homepage
export default function HomeLoading() {
  return (
    <div>
      <HeroSkeleton />
      <div className="mt-6">
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
      </div>
    </div>
  )
}