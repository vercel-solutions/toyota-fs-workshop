import { faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Listing = ReturnType<typeof generateData>["listings"][number]

export type Segment = ReturnType<typeof generateData>["segments"][number]

const DEALERS = [
  { name: "Longo Toyota", location: "El Monte, CA 91731" },
  { name: "Toyota of Downtown LA", location: "Los Angeles, CA 90015" },
  { name: "Hamer Toyota", location: "Mission Hills, CA 91345" },
  { name: "Toyota of Santa Monica", location: "Santa Monica, CA 90404" },
  { name: "Puente Hills Toyota", location: "City of Industry, CA 91748" },
  { name: "Toyota of Glendale", location: "Glendale, CA 91204" },
]

const FEATURES = [
  "Adaptive cruise control",
  "Blind spot monitor",
  "Apple CarPlay",
  "Heated front seats",
  "Panoramic roof",
  "Tow package",
  "Third row seating",
  "360 degree camera",
  "Certified pre-owned",
  "Single owner",
]

const VEHICLES = [
  { year: 2023, model: "Camry", trim: "SE", price: 25488, mileage: 37954, bodyStyle: "Sedan", powertrain: "Gas", drivetrain: "Front Wheel Drive", segment: "sedans" },
  { year: 2025, model: "Grand Highlander", trim: "XLE", price: 45988, mileage: 29219, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "suvs" },
  { year: 2025, model: "Corolla", trim: "LE", price: 21988, mileage: 22080, bodyStyle: "Sedan", powertrain: "Gas", drivetrain: "Front Wheel Drive", segment: "sedans" },
  { year: 2025, model: "Corolla Hybrid", trim: "LE", price: 24622, mileage: 78725, bodyStyle: "Sedan", powertrain: "Hybrid", drivetrain: "Front Wheel Drive", segment: "hybrids-evs" },
  { year: 2020, model: "Tundra", trim: "Platinum", price: 46988, mileage: 89708, bodyStyle: "Truck", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "trucks" },
  { year: 2026, model: "Tacoma", trim: "SR5", price: 40283, mileage: 9, bodyStyle: "Truck", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "trucks" },
  { year: 2027, model: "Land Cruiser", trim: "Base", price: 77994, mileage: 251, bodyStyle: "SUV", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "suvs" },
  { year: 2024, model: "RAV4", trim: "XLE Premium", price: 32450, mileage: 18340, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "suvs" },
  { year: 2023, model: "Highlander", trim: "Limited", price: 41775, mileage: 44120, bodyStyle: "SUV", powertrain: "Gas", drivetrain: "All Wheel Drive", segment: "suvs" },
  { year: 2022, model: "4Runner", trim: "TRD Off-Road", price: 43910, mileage: 52608, bodyStyle: "SUV", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "suvs" },
  { year: 2025, model: "Prius", trim: "XLE", price: 29340, mileage: 12455, bodyStyle: "Hatchback", powertrain: "Hybrid", drivetrain: "Front Wheel Drive", segment: "hybrids-evs" },
  { year: 2024, model: "Sienna", trim: "XLE", price: 44120, mileage: 26890, bodyStyle: "Minivan", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "minivans" },
  { year: 2025, model: "Crown", trim: "Platinum", price: 52600, mileage: 8215, bodyStyle: "Sedan", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "sedans" },
  { year: 2024, model: "Camry", trim: "XSE", price: 33980, mileage: 21470, bodyStyle: "Sedan", powertrain: "Gas", drivetrain: "Front Wheel Drive", segment: "sedans" },
  { year: 2023, model: "RAV4 Prime", trim: "SE", price: 39650, mileage: 31205, bodyStyle: "SUV", powertrain: "Plug-in Hybrid", drivetrain: "All Wheel Drive", segment: "hybrids-evs" },
  { year: 2022, model: "Tacoma", trim: "TRD Pro", price: 48315, mileage: 61940, bodyStyle: "Truck", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "trucks" },
  { year: 2026, model: "Sequoia", trim: "Capstone", price: 79450, mileage: 1820, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "Four Wheel Drive", segment: "suvs" },
  { year: 2025, model: "bZ4X", trim: "Limited", price: 36900, mileage: 9640, bodyStyle: "SUV", powertrain: "Electric", drivetrain: "All Wheel Drive", segment: "hybrids-evs" },
  { year: 2024, model: "Corolla Cross", trim: "XLE", price: 28150, mileage: 24760, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "suvs" },
  { year: 2023, model: "Tundra", trim: "SR5", price: 42600, mileage: 39880, bodyStyle: "Truck", powertrain: "Hybrid", drivetrain: "Four Wheel Drive", segment: "trucks" },
  { year: 2025, model: "Highlander", trim: "XLE", price: 43200, mileage: 15330, bodyStyle: "SUV", powertrain: "Gas", drivetrain: "All Wheel Drive", segment: "suvs" },
  { year: 2024, model: "Prius Prime", trim: "SE", price: 31480, mileage: 17905, bodyStyle: "Hatchback", powertrain: "Plug-in Hybrid", drivetrain: "Front Wheel Drive", segment: "hybrids-evs" },
  { year: 2026, model: "Camry", trim: "LE", price: 29120, mileage: 3410, bodyStyle: "Sedan", powertrain: "Hybrid", drivetrain: "Front Wheel Drive", segment: "sedans" },
  { year: 2023, model: "Sienna", trim: "Limited", price: 47880, mileage: 35215, bodyStyle: "Minivan", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "minivans" },
  { year: 2025, model: "RAV4", trim: "XLE", price: 34700, mileage: 11240, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "suvs" },
]

function monthlyPayment(price: number, apr: number, termMonths: number) {
  const monthlyRate = apr / 100 / 12

  return Math.round((price * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths))
}

function generateData() {
  faker.seed(123)

  const segments = [
    { name: "Sedans", slug: "sedans", listingCount: 0 },
    { name: "SUVs", slug: "suvs", listingCount: 0 },
    { name: "Trucks", slug: "trucks", listingCount: 0 },
    { name: "Hybrids & EVs", slug: "hybrids-evs", listingCount: 0 },
    { name: "Minivans", slug: "minivans", listingCount: 0 },
  ]

  const listings = []

  for (const vehicle of VEHICLES) {
    const title = `${vehicle.model} ${vehicle.trim}`
    const slug = faker.helpers.slugify(`${vehicle.year} ${title}`).toLowerCase()
    const dealer = faker.helpers.arrayElement(DEALERS)
    const city = dealer.location.split(",")[0]
    const priceBadge = faker.helpers.weightedArrayElement([
      { value: "Below market", weight: 5 },
      { value: "Fair price", weight: 4 },
      { value: "Above market", weight: 1 },
    ])
    const apr = faker.number.float({ min: 3.9, max: 7.9, fractionDigits: 1 })
    const termMonths = faker.helpers.arrayElement([48, 60, 72])
    const estimatedMonthly = monthlyPayment(vehicle.price, apr, termMonths)
    const features = faker.helpers.arrayElements(FEATURES, { min: 3, max: 5 })
    const segment = segments.find(s => s.slug === vehicle.segment) ?? segments[0]

    listings.push({
      id: faker.string.uuid(),
      title,
      slug,
      year: vehicle.year,
      model: vehicle.model,
      trim: vehicle.trim,
      price: vehicle.price,
      mileage: vehicle.mileage,
      bodyStyle: vehicle.bodyStyle,
      powertrain: vehicle.powertrain,
      drivetrain: vehicle.drivetrain,
      segment: segment.slug,
      priceBadge,
      dealer: dealer.name,
      dealerLocation: dealer.location,
      estimatedMonthly,
      apr,
      termMonths,
      features,
      summary: `${vehicle.powertrain} ${vehicle.bodyStyle.toLowerCase()} with ${vehicle.drivetrain.toLowerCase()}, inspected and reconditioned at ${dealer.name}.`,
      spec: `${vehicle.year} Toyota ${title} | ${vehicle.bodyStyle}/${vehicle.powertrain}/${vehicle.drivetrain} | $${vehicle.price.toLocaleString()} (${priceBadge}) | ${vehicle.mileage.toLocaleString()} mi | ${features.join(", ")}`,
      description: [
        `This ${vehicle.year} Toyota ${title} is on the lot at ${dealer.name} in ${dealer.location}. It shows ${vehicle.mileage.toLocaleString()} miles and is listed at $${vehicle.price.toLocaleString()}, which our pricing model rates as ${priceBadge.toLowerCase()} for this trim and mileage around ${city}.`,
        `It is a ${vehicle.powertrain.toLowerCase()} ${vehicle.bodyStyle.toLowerCase()} with ${vehicle.drivetrain.toLowerCase()}. Equipment on this one includes ${features.join(", ")}.`,
        `Financing is available through Toyota Financial Services. At ${apr}% APR over ${termMonths} months the estimated payment is $${estimatedMonthly.toLocaleString()}/mo with approved credit. Pre-qualify online in a few minutes, then schedule a test drive at ${dealer.name}.`,
      ].join("\n\n"),
      image: `https://picsum.photos/seed/${slug}/800/600`,
      listedAt: faker.date.recent({ days: 30 }).toISOString(),
      views: faker.number.int({ min: 120, max: 9800 }),
    })

    segment.listingCount++
  }

  listings.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime())

  return { segments, listings }
}

const { segments: SEGMENTS, listings: LISTINGS } = generateData()

export async function getNewToday(): Promise<Listing[]> {
  console.info("[API] Fetching new today listings (500ms delay)")

  await delay(500)

  return LISTINGS.slice(0, 10)
}

export async function getTrendingListings(): Promise<Listing[]> {
  console.info("[API] Fetching trending listings (1500ms delay)")

  await delay(1500)

  return LISTINGS.toSorted((a, b) => b.views - a.views).slice(0, 5)
}

export async function getListings(segment?: string): Promise<Listing[]> {
  console.info(
    `[API] Fetching listings${segment ? ` for segment: ${segment}` : ""} (500ms delay)`,
  )

  await delay(500)

  if (segment) {
    return LISTINGS.filter(l => l.segment === segment)
  }

  return LISTINGS
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  console.info(`[API] Fetching listing: ${slug} (200ms delay)`)

  await delay(200)

  return LISTINGS.find(l => l.slug === slug) ?? null
}

export async function getAllListingSlugs(): Promise<string[]> {
  return LISTINGS.map(l => l.slug)
}

export async function getSegments(): Promise<Segment[]> {
  console.info("[API] Fetching segments (100ms delay)")

  await delay(100)

  return SEGMENTS
}

export async function getDashboardStats(): Promise<{
  totalListings: number
  totalViews: number
  topSegment: string
  recentlyListed: number
}> {
  console.info("[API] Fetching dashboard stats (800ms delay)")

  await delay(800)

  const totalViews = LISTINGS.reduce((sum, l) => sum + l.views, 0)
  const segmentCounts = SEGMENTS.toSorted((a, b) => b.listingCount - a.listingCount)

  return {
    totalListings: LISTINGS.length,
    totalViews,
    topSegment: segmentCounts[0].name,
    recentlyListed: LISTINGS.filter(
      l => new Date(l.listedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length,
  }
}

export async function getUserPreferences(): Promise<{
  savedListings: string[]
  preferredSegments: string[]
  lastVisited: string
}> {
  console.info("[API] Fetching user preferences (600ms delay)")

  await delay(600)

  return {
    savedListings: LISTINGS.slice(0, 3).map(l => l.slug),
    preferredSegments: ["SUVs", "Hybrids & EVs"],
    lastVisited: new Date().toISOString(),
  }
}
