import Link from "next/link"

import { getListings, getNewTodayListings, getSegments } from "@/api"
import ListingsGrid from "@/components/blog-posts"

export const dynamic = "force-static"

export const revalidate = 60

async function getInventoryStats() {
  const [listings, segments] = await Promise.all([getListings(), getSegments()])

  return {
    totalListings: listings.length,
    totalSegments: segments.length,
    avgPrice: Math.round(listings.reduce((acc, listing) => acc + listing.price, 0) / listings.length),
  }
}

export default async function HomePage() {
  const [newTodayListings, stats] = await Promise.all([getNewTodayListings(), getInventoryStats()])

  return (
    <main className="space-y-16">
      <section className="bg-card rounded-2xl border px-6 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          TFS Storefront
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg sm:text-xl">
          Find your next Toyota and see what it costs per month before you talk to anyone. Every
          listing pairs real dealer inventory with a market price evaluation and an estimated payment
          from Toyota Financial Services, so financing stops being the last surprise of the buying
          process.
        </p>
        <Link
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-11 items-center justify-center rounded-full px-8 text-sm font-medium transition-colors"
          href="/blog"
        >
          Browse all listings
        </Link>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-card rounded-2xl border p-6 text-center">
          <div className="text-brand text-3xl font-bold">{stats.totalListings}</div>
          <div className="text-muted-foreground mt-2 text-sm">Listings in inventory</div>
        </div>
        <div className="bg-card rounded-2xl border p-6 text-center">
          <div className="text-brand text-3xl font-bold">{stats.totalSegments}</div>
          <div className="text-muted-foreground mt-2 text-sm">Segments</div>
        </div>
        <div className="bg-card rounded-2xl border p-6 text-center">
          <div className="text-brand text-3xl font-bold">
            {`$${stats.avgPrice.toLocaleString("en-US")}`}
          </div>
          <div className="text-muted-foreground mt-2 text-sm">Average price</div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-3xl font-bold tracking-tight uppercase">New today</h2>
        <p className="text-muted-foreground mb-8">
          Here are the latest listings I've found in the last 24 hours
        </p>
        <ListingsGrid listings={newTodayListings} />
      </section>
    </main>
  )
}
