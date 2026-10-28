import { faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Segment = ReturnType<typeof generateData>["segments"][number]

export type Listing = ReturnType<typeof generateData>["listings"][number]

/** year, model, trim, price, mileage, bodyStyle, powertrain, drivetrain, segment */
type VehicleRow = [number, string, string, number, number, string, string, string, string]

const PRICE_BADGES = ["Below market", "Fair price", "Above market"] as const

const MARKET_DELTA_RANGES = {
  "Below market": { min: -9, max: -2.5 },
  "Fair price": { min: -1.5, max: 1.5 },
  "Above market": { min: 2.5, max: 8 },
}

const EFFICIENCY: Record<string, string> = {
  "Gas": "22/29 mpg",
  "Hybrid": "44/41 mpg",
  "Plug-in Hybrid": "38/94 MPGe",
  "Electric": "102/89 MPGe",
}

const FEATURES = [
  "Toyota Safety Sense 3.0",
  "Apple CarPlay",
  "Blind spot monitor",
  "Adaptive cruise control",
  "Heated front seats",
  "Panoramic sunroof",
  "Wireless charging",
  "Power liftgate",
  "360-degree camera",
  "Certified pre-owned",
  "One owner",
  "Tow package",
]

const DEALERS = [
  { name: "Longo Toyota", location: "El Monte, CA 91731" },
  { name: "Toyota of Downtown LA", location: "Los Angeles, CA 90015" },
  { name: "Hamer Toyota", location: "Mission Hills, CA 91345" },
  { name: "Toyota of Santa Monica", location: "Santa Monica, CA 90404" },
  { name: "Puente Hills Toyota", location: "City of Industry, CA 91748" },
  { name: "Toyota of Glendale", location: "Glendale, CA 91204" },
]

// The first seven rows come straight from the TFS Storefront designs and are kept verbatim.
const VEHICLE_ROWS: VehicleRow[] = [
  [2023, "Camry", "SE", 25488, 37954, "Sedan", "Gas", "Front Wheel Drive", "sedans"],
  [2025, "Grand Highlander", "XLE", 45988, 29219, "SUV", "Hybrid", "All Wheel Drive", "suvs"],
  [2025, "Corolla", "LE", 21988, 22080, "Sedan", "Gas", "Front Wheel Drive", "sedans"],
  [2025, "Corolla Hybrid", "LE", 24622, 78725, "Sedan", "Hybrid", "Front Wheel Drive", "hybrids-evs"],
  [2020, "Tundra", "Platinum", 46988, 89708, "Truck", "Gas", "Four Wheel Drive", "trucks"],
  [2026, "Tacoma", "SR5", 40283, 9, "Truck", "Gas", "Four Wheel Drive", "trucks"],
  [2027, "Land Cruiser", "Base", 77994, 251, "SUV", "Gas", "Four Wheel Drive", "suvs"],
  [2024, "RAV4", "XLE Premium", 32450, 18340, "SUV", "Hybrid", "All Wheel Drive", "suvs"],
  [2023, "Highlander", "Limited", 41775, 44120, "SUV", "Gas", "All Wheel Drive", "suvs"],
  [2022, "4Runner", "TRD Off-Road", 43910, 52608, "SUV", "Gas", "Four Wheel Drive", "suvs"],
  [2025, "Prius", "XLE", 29340, 12455, "Hatchback", "Hybrid", "Front Wheel Drive", "hybrids-evs"],
  [2024, "Sienna", "XLE", 44120, 26890, "Minivan", "Hybrid", "All Wheel Drive", "minivans"],
  [2025, "Crown", "Platinum", 52600, 8215, "Sedan", "Hybrid", "All Wheel Drive", "sedans"],
  [2024, "Camry", "XSE", 33980, 21470, "Sedan", "Gas", "Front Wheel Drive", "sedans"],
  [2023, "RAV4 Prime", "SE", 39650, 31205, "SUV", "Plug-in Hybrid", "All Wheel Drive", "hybrids-evs"],
  [2022, "Tacoma", "TRD Pro", 48315, 61940, "Truck", "Gas", "Four Wheel Drive", "trucks"],
  [2026, "Sequoia", "Capstone", 79450, 1820, "SUV", "Hybrid", "Four Wheel Drive", "suvs"],
  [2025, "bZ4X", "Limited", 36900, 9640, "SUV", "Electric", "All Wheel Drive", "hybrids-evs"],
  [2024, "Corolla Cross", "XLE", 28150, 24760, "SUV", "Hybrid", "All Wheel Drive", "suvs"],
  [2023, "Tundra", "SR5", 42600, 39880, "Truck", "Hybrid", "Four Wheel Drive", "trucks"],
  [2025, "Highlander", "XLE", 43200, 15330, "SUV", "Gas", "All Wheel Drive", "suvs"],
  [2024, "Prius Prime", "SE", 31480, 17905, "Hatchback", "Plug-in Hybrid", "Front Wheel Drive", "hybrids-evs"],
  [2026, "Camry", "LE", 29120, 3410, "Sedan", "Hybrid", "Front Wheel Drive", "sedans"],
  [2023, "Sienna", "Limited", 47880, 35215, "Minivan", "Hybrid", "All Wheel Drive", "minivans"],
]

function estimateMonthlyPayment(price: number, apr: number, termMonths: number) {
  const monthlyRate = apr / 100 / 12

  return Math.round((price * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths))
}

function toUniqueSlug(base: string, used: Set<string>) {
  let slug = base
  let attempt = 2

  while (used.has(slug)) {
    slug = `${base}-${attempt}`
    attempt++
  }

  used.add(slug)

  return slug
}

function generateData(listingCount: number = 50) {
  faker.seed(123)

  const segments = [
    {
      id: faker.string.uuid(),
      name: "Sedans",
      slug: "sedans",
      description: "Camry, Corolla, and Crown sedans",
      listingCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "SUVs",
      slug: "suvs",
      description: "RAV4, Highlander, 4Runner, and Land Cruiser",
      listingCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Trucks",
      slug: "trucks",
      description: "Tacoma and Tundra pickups",
      listingCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Hybrids & EVs",
      slug: "hybrids-evs",
      description: "Hybrid, plug-in hybrid, and battery electric",
      listingCount: 0,
    },
    {
      id: faker.string.uuid(),
      name: "Minivans",
      slug: "minivans",
      description: "Sienna family haulers",
      listingCount: 0,
    },
  ]

  const listings = []
  const usedSlugs = new Set<string>()
  const segmentCounts: Record<string, number> = {}

  for (let i = 0; i < listingCount; i++) {
    const row = VEHICLE_ROWS[i % VEHICLE_ROWS.length]
    const [baseYear, model, trim, basePrice, baseMileage, body, powertrain, drive, segment] = row
    // Every extra pass over the table becomes an older, higher-mileage, cheaper listing.
    const age = Math.floor(i / VEHICLE_ROWS.length)
    const year = baseYear - age
    const mileage = baseMileage + age * faker.number.int({ min: 6000, max: 24000 })
    const price = age === 0 ? basePrice : Math.round((basePrice * (1 - age * 0.07)) / 5) * 5
    const dealer = faker.helpers.arrayElement(DEALERS)
    const priceBadge = faker.helpers.arrayElement(PRICE_BADGES)
    const marketDelta = faker.number.float({ ...MARKET_DELTA_RANGES[priceBadge], fractionDigits: 1 })
    const features = faker.helpers.arrayElements(FEATURES, { min: 3, max: 5 })
    const apr = faker.number.float({ min: 3.9, max: 7.9, fractionDigits: 1 })
    const termMonths = faker.helpers.arrayElement([36, 48, 60, 72])
    const name = `${year} ${model} ${trim}`
    const slug = toUniqueSlug(faker.helpers.slugify(name).toLowerCase(), usedSlugs)
    const deltaLabel = `${marketDelta > 0 ? "+" : ""}${marketDelta}%`

    listings.push({
      id: faker.string.uuid(),
      title: `${model} ${trim}`,
      slug,
      year,
      model,
      trim,
      price,
      mileage,
      bodyStyle: body,
      powertrain,
      drivetrain: drive,
      segment,
      dealer: dealer.name,
      dealerLocation: dealer.location,
      priceBadge,
      apr,
      termMonths,
      estimatedMonthly: estimateMonthlyPayment(price, apr, termMonths),
      features,
      description: `Available now at ${dealer.name}. ${features.slice(0, 2).join(", ")}, ${powertrain.toLowerCase()} powertrain, ${drive.toLowerCase()}. Pre-qualify with Toyota Financial Services before you visit.`,
      specLine: [
        `${year} Toyota ${model} ${trim}`,
        `${body}/${powertrain}/${drive}`,
        `$${price.toLocaleString("en-US")} (${priceBadge}, ${deltaLabel})`,
        `${powertrain} (${EFFICIENCY[powertrain]})`,
        `${mileage.toLocaleString("en-US")} mi`,
        features.join(", "),
      ].join(" | "),
      image: `https://picsum.photos/seed/${slug}/800/600`,
      listedAt: faker.date.recent({ days: i < 7 ? 1 : 30 }).toISOString(),
    })

    segmentCounts[segment] = (segmentCounts[segment] ?? 0) + 1
  }

  for (const segment of segments) {
    segment.listingCount = segmentCounts[segment.slug] ?? 0
  }

  listings.sort((a, b) => new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime())

  return { segments, listings }
}

const { segments: SEGMENTS, listings: LISTINGS } = generateData(50)

export async function getListings(segment?: string): Promise<Listing[]> {
  console.info(`[API] Fetching listings${segment ? ` for segment: ${segment}` : ""} (250ms delay)`)

  await delay(250)

  if (segment) {
    return LISTINGS.filter(listing => listing.segment === segment)
  }

  return LISTINGS
}

export async function getNewTodayListings(): Promise<Listing[]> {
  console.info("[API] Fetching new today listings (1500ms delay)")

  await delay(1500)

  return LISTINGS.toSorted(() => Math.random() - 0.5).slice(0, 3)
}

export async function getSegments(): Promise<Segment[]> {
  console.info("[API] Fetching segments (250ms delay)")

  await delay(250)

  return SEGMENTS
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  console.info(`[API] Fetching listing with slug: ${slug} (250ms delay)`)

  await delay(250)

  return LISTINGS.find(listing => listing.slug === slug) ?? null
}
