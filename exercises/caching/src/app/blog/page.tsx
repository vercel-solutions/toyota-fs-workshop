import { getListings, getSegments } from "@/api"
import ListingsGrid from "@/components/blog-posts"
import SegmentFilter from "@/components/category-filter"

export const dynamic = "force-dynamic"

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string }>
}) {
  const { segment } = await searchParams
  const [segments, listings] = await Promise.all([getSegments(), getListings(segment)])

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <header>
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Listings</h1>
        <p className="text-muted-foreground">
          Browse new and used Toyota inventory from dealers near you. Every listing shows the market
          price evaluation and an estimated monthly payment with Toyota Financial Services
          financing, so you know what a vehicle costs before you ever walk onto a lot.
        </p>
      </header>

      <SegmentFilter segments={segments} />

      <ListingsGrid listings={listings} />
    </div>
  )
}
