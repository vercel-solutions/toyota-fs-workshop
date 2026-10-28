"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"

function SparkleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c.6 5.1 3.2 8.9 12 12-8.8 3.1-11.4 6.9-12 12-.6-5.1-3.2-8.9-12-12C8.8 8.9 11.4 5.1 12 0Z" />
    </svg>
  )
}

export default function HomePage() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then(res => res.json())
      .then((data) => {
        setVehicles(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <SparkleMark className="text-brand mx-auto size-6" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Find your next Toyota
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          I have pulled new matches from your recent searches, with a TFS payment
          estimate on every listing.
        </p>
        <div className="bg-card text-card-foreground mt-6 flex items-center gap-3 rounded-full px-5 py-3.5">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            aria-label="Search vehicles"
            className="w-full bg-transparent text-sm outline-none"
            placeholder="What are you looking for…"
            type="search"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-semibold tracking-widest uppercase">New today</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Here are the latest listings I have found in the last 24 hours
        </p>
      </div>

      {loading
        ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-muted h-72 animate-pulse rounded-2xl" />
              ))}
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((vehicle: any) => (
                <a
                  key={vehicle.id}
                  className="bg-card overflow-hidden rounded-2xl p-3 transition-opacity hover:opacity-90"
                  href={`/products/${vehicle.slug}`}
                >
                  <img
                    alt={vehicle.name}
                    className="bg-muted h-44 w-full rounded-xl object-cover"
                    src={vehicle.image}
                  />
                  <div className="px-1 pt-4 pb-2">
                    <p className="text-lg font-bold">
                      $
                      {vehicle.price.toLocaleString()}
                    </p>
                    <h3 className="mt-1 font-bold tracking-tight uppercase">
                      {vehicle.model}
                      {" "}
                      {vehicle.trim}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {vehicle.year}
                      {" • "}
                      {vehicle.mileage.toLocaleString()}
                      {" mi"}
                    </p>
                    <p className="text-brand-strong mt-2 text-sm font-medium">
                      $
                      {vehicle.estimatedMonthly}
                      /mo est.
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

      <div className="mt-12 text-center">
        <a
          className="bg-primary text-primary-foreground inline-flex items-center rounded-full px-6 py-3 font-medium transition-opacity hover:opacity-90"
          href="/products"
        >
          Browse all vehicles
        </a>
      </div>
    </div>
  )
}
