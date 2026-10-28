import { NextResponse } from "next/server"

import { getFeaturedVehicles, getSegments, getVehicles } from "@/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const featured = searchParams.get("featured")
  const segment = searchParams.get("segment")

  if (type === "segments") {
    const segments = await getSegments()

    return NextResponse.json(segments)
  }

  if (featured === "true") {
    const featuredVehicles = await getFeaturedVehicles()

    return NextResponse.json(featuredVehicles)
  }

  const vehicles = await getVehicles(segment ?? undefined)

  return NextResponse.json(vehicles)
}
