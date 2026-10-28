import { MapPinIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getListingBySlug } from "@/api"

export const dynamic = "force-dynamic"

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
        href="/articles"
      >
        ← Back to Listings
      </Link>

      <img
        alt={listing.title}
        className="mb-6 h-64 w-full rounded-2xl object-cover md:h-96"
        src={listing.image}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium uppercase">
          {listing.bodyStyle}
        </span>
        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium uppercase">
          {listing.powertrain}
        </span>
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

      <h1 className="text-4xl font-bold tracking-tight uppercase">
        {`${listing.year} ${listing.title}`}
      </h1>

      <p className="mt-2 text-3xl font-bold tracking-tight">
        {`$${listing.price.toLocaleString()}`}
      </p>

      <p className="text-brand-strong mt-1 text-lg font-semibold">
        {`$${listing.estimatedMonthly.toLocaleString()}/mo est.`}
      </p>

      <p className="text-muted-foreground mt-1 text-sm">
        {`Estimated with TFS financing: ${listing.apr}% APR for ${listing.termMonths} months`}
      </p>

      <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <MapPinIcon className="size-4" />
          <span>{`${listing.dealer} · ${listing.dealerLocation}`}</span>
        </div>
        <span>{`${listing.mileage.toLocaleString()} mi`}</span>
        <span>{`Listed ${new Date(listing.listedAt).toLocaleDateString()}`}</span>
        <span>{`${listing.views.toLocaleString()} views`}</span>
      </div>

      <p className="bg-muted text-muted-foreground mt-6 rounded-xl p-4 text-sm">
        {listing.spec}
      </p>

      <div className="prose prose-gray dark:prose-invert mt-8 max-w-none">
        {listing.description.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-foreground/80 mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
