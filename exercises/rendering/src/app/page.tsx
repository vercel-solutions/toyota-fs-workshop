import Link from "next/link"

import { getNewToday, getTrendingListings } from "@/api"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const newToday = await getNewToday()
  const trendingListings = await getTrendingListings()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">TFS Storefront</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Find your next Toyota, with financing built in
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* New Today */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold tracking-tight uppercase">New Today</h2>
          <p className="text-muted-foreground mt-1 mb-4 text-sm">
            Here are the latest listings I&apos;ve found in the last 24 hours
          </p>
          <div className="space-y-6">
            {newToday.map(listing => (
              <Link
                key={listing.id}
                className="bg-card flex gap-4 overflow-hidden rounded-2xl p-4 transition-shadow hover:shadow-lg"
                href={`/articles/${listing.slug}`}
              >
                <img
                  alt={listing.title}
                  className="hidden h-32 w-48 rounded-xl object-cover sm:block"
                  src={listing.image}
                />
                <div className="flex-1">
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
                  <h3 className="mt-1 text-lg font-bold tracking-tight uppercase">
                    {listing.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {`${listing.year} • ${listing.mileage.toLocaleString()} mi`}
                  </p>
                  <p className="text-brand-strong mt-2 text-sm font-semibold">
                    {`$${listing.estimatedMonthly.toLocaleString()}/mo est.`}
                  </p>
                  <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                    <span>{listing.dealer}</span>
                    <span>{listing.dealerLocation}</span>
                    <span>{new Date(listing.listedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Sidebar */}
        <aside>
          <h2 className="mb-4 text-2xl font-bold tracking-tight uppercase">Trending Now</h2>
          <div className="space-y-4">
            {trendingListings.map((listing, index) => (
              <Link
                key={listing.id}
                className="bg-card block rounded-2xl p-4 transition-shadow hover:shadow-lg"
                href={`/articles/${listing.slug}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground text-2xl font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold tracking-tight uppercase">{listing.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {`${listing.views.toLocaleString()} shoppers viewed`}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
