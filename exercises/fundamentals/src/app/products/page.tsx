"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

import { SegmentFilter } from "@/components/category-filter"
import { VehicleCard } from "@/components/product-card"

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageContent />
    </Suspense>
  )
}

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const selectedSegment = searchParams.get("segment") ?? ""

  const [vehicles, setVehicles] = useState<any[]>([])
  const [segments, setSegments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/products").then(res => res.json()),
      fetch("/api/products?type=segments").then(res => res.json()),
    ]).then(([vehiclesData, segmentsData]) => {
      setVehicles(vehiclesData)
      setSegments(segmentsData)
      setLoading(false)
    })
  }, [])

  const filteredVehicles = selectedSegment
    ? vehicles.filter((v: any) => v.segment === selectedSegment)
    : vehicles

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All vehicles</h1>
        <p className="text-muted-foreground mt-2">
          Every listing includes a TFS payment estimate
        </p>
      </div>

      <SegmentFilter segments={segments} selected={selectedSegment} />

      {loading
        ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-muted h-80 animate-pulse rounded-2xl" />
              ))}
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVehicles.map((vehicle: any) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
    </div>
  )
}
