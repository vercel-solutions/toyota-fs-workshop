import type { Listing } from "@/api"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"

const PRICE_BADGE_CLASSES: Record<string, string> = {
  "Below market": "bg-brand text-brand-foreground",
  "Fair price": "bg-card text-card-foreground",
  "Above market": "bg-card text-card-foreground",
}

export default function ListingsGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No listings found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map(listing => (
        <article key={listing.id} className="group relative flex h-full flex-col">
          <Link className="block h-full" href={`/blog/${listing.slug}`}>
            <div className="bg-card flex h-full flex-col overflow-hidden rounded-2xl border">
              <div className="bg-muted relative aspect-video overflow-hidden">
                <Image
                  fill
                  alt={`${listing.year} Toyota ${listing.title}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={listing.image}
                />
                <span
                  className={clsx(
                    "absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold",
                    PRICE_BADGE_CLASSES[listing.priceBadge],
                  )}
                >
                  {listing.priceBadge}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold tracking-tight">
                      {`$${listing.price.toLocaleString("en-US")}`}
                    </p>
                    <p className="text-brand-strong text-sm font-medium">
                      {`$${listing.estimatedMonthly}/mo est.`}
                    </p>
                  </div>
                  <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
                    {`${listing.bodyStyle}/${listing.powertrain}`}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h2 className="group-hover:text-brand text-lg font-bold tracking-tight uppercase transition-colors">
                    {listing.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {`${listing.year} • ${listing.mileage.toLocaleString("en-US")} mi`}
                  </p>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                    {listing.description}
                  </p>
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 border-t pt-3">
                  <div className="text-sm">
                    <p className="font-medium">{listing.dealer}</p>
                    <p className="text-muted-foreground text-xs">{listing.dealerLocation}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {new Date(listing.listedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export function ListingsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-card overflow-hidden rounded-2xl border">
          <div className="bg-muted aspect-video animate-pulse" />
          <div className="flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-7 w-28 animate-pulse rounded" />
                <div className="bg-muted h-4 w-20 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-6 w-24 animate-pulse rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-muted h-6 w-40 animate-pulse rounded" />
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            </div>
            <div className="bg-muted h-4 animate-pulse rounded" />
            <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
            <div className="flex items-end justify-between gap-3 border-t pt-3">
              <div className="flex flex-col gap-2">
                <div className="bg-muted h-4 w-28 animate-pulse rounded" />
                <div className="bg-muted h-3 w-36 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-3 w-20 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
