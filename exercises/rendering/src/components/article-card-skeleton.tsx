export function ListingCardSkeleton() {
  return (
    <div className="bg-card overflow-hidden rounded-2xl">
      <div className="bg-muted h-48 w-full animate-pulse" />
      <div className="space-y-3 p-4">
        <div className="bg-muted h-7 w-24 animate-pulse rounded" />
        <div className="bg-muted h-5 w-3/4 animate-pulse rounded" />
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        <div className="flex justify-between">
          <div className="bg-muted h-3 w-24 animate-pulse rounded" />
          <div className="bg-muted h-3 w-16 animate-pulse rounded" />
        </div>
      </div>
    </div>
  )
}
