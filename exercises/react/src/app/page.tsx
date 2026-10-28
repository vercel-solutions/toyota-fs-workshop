"use client"

import { useEffect, useState } from "react"

// TODO: This entire page is a single monolithic component.
// Your task is to decompose it into proper React components with typed props.
// Extract components into src/components/ and define TypeScript interfaces.

export default function InventoryDirectoryPage() {
  const [vehicles, setVehicles] = useState<any[]>([])
  const [segments, setSegments] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const { getVehicles, getSegments } = await import("@/api")
      const [vehs, segs] = await Promise.all([getVehicles(), getSegments()])

      setVehicles(vehs)
      setSegments(segs)
      setLoading(false)
    }

    loadData()
  }, [])

  // TODO: These filters work independently but don't combine properly.
  // When a segment is selected, search should filter within that segment.
  // Currently, selecting a segment ignores the search, and searching ignores the segment.
  const filteredVehicles = search
    ? vehicles.filter((vehicle: any) => vehicle.name.toLowerCase().includes(search.toLowerCase()))
    : selectedSegment
      ? vehicles.filter((vehicle: any) => vehicle.segment === selectedSegment)
      : vehicles

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Inventory Directory</h1>
          <p className="text-muted-foreground mt-2 text-lg">Browse Toyota inventory with TFS financing built in</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted h-64 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Inventory Directory</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Browse Toyota inventory with TFS financing built in (
          {filteredVehicles.length}
          {" "}
          of
          {" "}
          {vehicles.length}
          )
        </p>
      </div>

      {/* Search Bar - TODO: Extract into SearchBar component */}
      <div className="mb-6">
        <input
          className="bg-card border-input focus:ring-ring w-full rounded-full border px-5 py-3 text-sm focus:ring-2 focus:outline-none"
          placeholder="Search vehicles by name..."
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Segment Filter - TODO: Extract into SegmentFilter component */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedSegment === ""
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          onClick={() => setSelectedSegment("")}
        >
          All (
          {vehicles.length}
          )
        </button>
        {segments.map((seg: any) => (
          <button
            key={seg.slug}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedSegment === seg.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
            onClick={() => setSelectedSegment(seg.slug)}
          >
            {seg.name}
            {" "}
            (
            {seg.vehicleCount}
            )
          </button>
        ))}
      </div>

      {/* Vehicle Grid - TODO: Extract into VehicleGrid and VehicleCard components */}
      {filteredVehicles.length === 0
        ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No vehicles found matching your criteria.</p>
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVehicles.map((vehicle: any) => (
                <div
                  key={vehicle.id}
                  className="bg-card border-border cursor-pointer overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedVehicle(vehicle)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedVehicle(vehicle)
                  }}
                >
                  <img
                    alt={vehicle.name}
                    className="aspect-[4/3] w-full object-cover"
                    src={vehicle.image}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold tracking-tight uppercase">{vehicle.name}</h3>
                        <p className="text-muted-foreground truncate text-sm">
                          {vehicle.year}
                          {" · "}
                          {vehicle.mileage.toLocaleString()}
                          {" mi · "}
                          {vehicle.powertrain}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                          vehicle.priceBadge === "Below market"
                            ? "bg-brand text-brand-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {vehicle.priceBadge}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold tracking-tight">
                        $
                        {vehicle.price.toLocaleString()}
                      </p>
                      <p className="text-brand-strong text-sm font-medium">
                        $
                        {vehicle.estimatedMonthly}
                        /mo est. with TFS financing
                      </p>
                    </div>
                    <div className="mt-4">
                      <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium">
                        {vehicle.segmentName}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 3).map((feature: any) => (
                        <span
                          key={feature}
                          className="bg-accent text-accent-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                      {vehicle.features.length > 3 && (
                        <span className="text-muted-foreground text-xs">
                          +
                          {vehicle.features.length - 3}
                          {" "}
                          more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

      {/* Vehicle Detail Modal/Overlay - TODO: Extract into VehicleDetail component */}
      {selectedVehicle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedVehicle(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape")
              setSelectedVehicle(null)
          }}
        >
          <div
            className="bg-card border-border max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border shadow-xl"
            role="button"
            tabIndex={0}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight uppercase">
                    {`Toyota ${selectedVehicle.model} ${selectedVehicle.trim}`}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {selectedVehicle.year}
                    {" · "}
                    {selectedVehicle.mileage.toLocaleString()}
                    {" mi"}
                  </p>
                  <span className="bg-secondary text-secondary-foreground mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium">
                    {`${selectedVehicle.bodyStyle} / ${selectedVehicle.powertrain} / ${selectedVehicle.drivetrain}`}
                  </span>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground text-xl"
                  onClick={() => setSelectedVehicle(null)}
                >
                  ✕
                </button>
              </div>

              <img
                alt={selectedVehicle.name}
                className="mt-6 aspect-video w-full rounded-xl object-cover"
                src={selectedVehicle.image}
              />

              <div className="bg-primary text-primary-foreground mt-6 rounded-2xl p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-3xl font-bold tracking-tight">
                    $
                    {selectedVehicle.price.toLocaleString()}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      selectedVehicle.priceBadge === "Below market"
                        ? "bg-brand text-brand-foreground"
                        : "bg-primary-foreground/15"
                    }`}
                  >
                    {selectedVehicle.priceBadge}
                  </span>
                </div>
                <p className="text-primary-foreground/70 mt-2 text-sm">
                  $
                  {selectedVehicle.estimatedMonthly}
                  {"/mo est. · "}
                  {selectedVehicle.apr}
                  {"% APR for "}
                  {selectedVehicle.termMonths}
                  {" months, estimated with TFS financing"}
                </p>
                <button
                  type="button"
                  className="bg-card text-card-foreground mt-5 w-full rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Start your purchase
                </button>
                <p className="text-primary-foreground/70 mt-3 text-center text-xs">
                  {`Available at ${selectedVehicle.dealer}, ${selectedVehicle.dealerLocation}`}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Dealer</p>
                    <p className="mt-1 text-sm">{selectedVehicle.dealer}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Dealer location</p>
                    <p className="mt-1 text-sm">{selectedVehicle.dealerLocation}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Listed</p>
                    <p className="mt-1 text-sm">
                      {new Date(selectedVehicle.listedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Schedule a test drive</p>
                  <div className="flex flex-wrap gap-2">
                    {["Today 4:00 PM", "Tomorrow 10:30 AM", "Saturday 1:00 PM"].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-full px-3 py-1.5 text-sm transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Key features</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVehicle.features.map((feature: any) => (
                      <span
                        key={feature}
                        className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
