import Link from "next/link"

import { getListings, getSegments } from "@/api"

export const dynamic = "force-dynamic"

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string }>
}) {
  const { segment } = await searchParams
  const [listings, segments] = await Promise.all([getListings(segment), getSegments()])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
        <p className="text-muted-foreground mt-2">Every Toyota available near 90210</p>
      </div>

      {/* Segment Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !segment
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          href="/articles"
        >
          All
        </Link>
        {segments.map(seg => (
          <Link
            key={seg.slug}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              segment === seg.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
            href={`/articles?segment=${seg.slug}`}
          >
            {`${seg.name} (${seg.listingCount})`}
          </Link>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map(listing => (
          <Link
            key={listing.id}
            className="bg-card overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
            href={`/articles/${listing.slug}`}
          >
            <img
              alt={listing.title}
              className="h-48 w-full object-cover"
              src={listing.image}
            />
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-2xl font-bold tracking-tight">
                  {`$${listing.price.toLocaleString()}`}
                </p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    listing.priceBadge === "Below market"
                      ? "bg-brand text-brand-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {listing.priceBadge}
                </span>
              </div>
              <h3 className="mt-1 font-bold tracking-tight uppercase">{listing.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {`${listing.year} • ${listing.mileage.toLocaleString()} mi`}
              </p>
              <p className="text-brand-strong mt-2 text-sm font-semibold">
                {`$${listing.estimatedMonthly.toLocaleString()}/mo est.`}
              </p>
              <div className="text-muted-foreground mt-3 flex items-center justify-between text-xs">
                <span>{listing.dealer}</span>
                <span>{listing.dealerLocation}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
