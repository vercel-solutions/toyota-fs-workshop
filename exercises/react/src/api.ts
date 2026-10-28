import { faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Vehicle = ReturnType<typeof generateData>["vehicles"][number]

export type Segment = ReturnType<typeof generateData>["segments"][number]

function generateData() {
  faker.seed(123)

  const segments = [
    { name: "Sedans", slug: "sedans", vehicleCount: 0 },
    { name: "SUVs", slug: "suvs", vehicleCount: 0 },
    { name: "Trucks", slug: "trucks", vehicleCount: 0 },
    { name: "Hybrids & EVs", slug: "hybrids-evs", vehicleCount: 0 },
    { name: "Minivans", slug: "minivans", vehicleCount: 0 },
  ]

  const featurePool = [
    "Toyota Safety Sense 3.0",
    "Blind Spot Monitor",
    "Adaptive cruise control",
    "Heated steering wheel",
    "Ventilated front seats",
    "Heated rear seats",
    "Panoramic roof",
    "Apple CarPlay",
    "Android Auto",
    "JBL audio",
    "Wireless charging",
    "Power liftgate",
    "360-degree camera",
    "Head-up display",
    "Third-row seating",
    "Tow package",
    "Remote start",
    "All-weather floor liners",
    "Rain-sensing wipers",
    "Certified pre-owned",
  ]

  const dealers = [
    { name: "Longo Toyota", location: "El Monte, CA 91731" },
    { name: "Toyota of Downtown LA", location: "Los Angeles, CA 90015" },
    { name: "Hamer Toyota", location: "Mission Hills, CA 91345" },
    { name: "Toyota of Santa Monica", location: "Santa Monica, CA 90404" },
    { name: "Puente Hills Toyota", location: "City of Industry, CA 91748" },
    { name: "Toyota of Glendale", location: "Glendale, CA 91204" },
  ]

  // The inventory sheet the storefront is built from — one row per listing.
  const inventory = [
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
    { year: 2024, model: "Tacoma", trim: "TRD Off-Road", price: 44150, mileage: 27640, bodyStyle: "Truck", powertrain: "Gas", drivetrain: "Four Wheel Drive", segment: "trucks" },
    { year: 2025, model: "Sienna", trim: "Platinum", price: 51340, mileage: 11780, bodyStyle: "Minivan", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "minivans" },
    { year: 2022, model: "Corolla", trim: "SE", price: 20415, mileage: 46320, bodyStyle: "Sedan", powertrain: "Gas", drivetrain: "Front Wheel Drive", segment: "sedans" },
    { year: 2026, model: "RAV4", trim: "Limited", price: 38760, mileage: 5120, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "All Wheel Drive", segment: "suvs" },
    { year: 2023, model: "bZ4X", trim: "XLE", price: 28990, mileage: 28455, bodyStyle: "SUV", powertrain: "Electric", drivetrain: "Front Wheel Drive", segment: "hybrids-evs" },
    { year: 2025, model: "Sequoia", trim: "Limited", price: 68220, mileage: 14090, bodyStyle: "SUV", powertrain: "Hybrid", drivetrain: "Four Wheel Drive", segment: "suvs" },
  ]

  const vehicles = []

  for (let i = 0; i < inventory.length; i++) {
    const listing = inventory[i]
    const segment = segments.find(item => item.slug === listing.segment)

    if (!segment) {
      continue
    }

    const features = faker.helpers.arrayElements(featurePool, { min: 3, max: 5 })
    const dealer = faker.helpers.arrayElement(dealers)
    const apr = faker.helpers.arrayElement([3.9, 4.9, 5.9, 6.9, 7.9])
    const termMonths = faker.helpers.arrayElement([36, 48, 60, 72])
    const monthlyRate = apr / 100 / 12
    const slug = `${listing.year}-${listing.model}-${listing.trim}`.toLowerCase().replaceAll(" ", "-")

    vehicles.push({
      id: faker.string.uuid(),
      name: `${listing.model} ${listing.trim}`,
      year: listing.year,
      model: listing.model,
      trim: listing.trim,
      price: listing.price,
      mileage: listing.mileage,
      bodyStyle: listing.bodyStyle,
      powertrain: listing.powertrain,
      drivetrain: listing.drivetrain,
      image: `https://picsum.photos/seed/${slug}/800/600`,
      segment: segment.slug,
      segmentName: segment.name,
      priceBadge: faker.helpers.arrayElement(["Below market", "Fair price", "Above market"]),
      apr,
      termMonths,
      estimatedMonthly: Math.round(
        (listing.price * monthlyRate) / (1 - (1 + monthlyRate) ** -termMonths),
      ),
      dealer: dealer.name,
      dealerLocation: dealer.location,
      listedAt: faker.date.recent({ days: 90 }).toISOString(),
      features,
    })

    segment.vehicleCount++
  }

  return { segments, vehicles }
}

const { segments: SEGMENTS, vehicles: VEHICLES } = generateData()

export async function getVehicles(segment?: string): Promise<Vehicle[]> {
  console.info(
    `[API] Fetching vehicles${segment ? ` for segment: ${segment}` : ""} (250ms delay)`,
  )

  await delay(250)

  if (segment) {
    return VEHICLES.filter(vehicle => vehicle.segment === segment)
  }

  return VEHICLES
}

export async function getSegments(): Promise<Segment[]> {
  console.info("[API] Fetching segments (100ms delay)")

  await delay(100)

  return SEGMENTS
}
