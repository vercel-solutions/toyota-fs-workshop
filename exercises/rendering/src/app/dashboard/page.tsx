import { cookies } from "next/headers"

import { getDashboardStats, getNewToday, getUserPreferences } from "@/api"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const theme = cookieStore.get("theme")?.value ?? "system"

  const stats = await getDashboardStats()
  const preferences = await getUserPreferences()
  const recentListings = await getNewToday()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Garage</h1>
        <p className="text-muted-foreground mt-2">
          Saved vehicles and matches picked for you (theme:
          {" "}
          {theme}
          )
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-card rounded-2xl p-6">
          <p className="text-muted-foreground text-sm font-medium">Listings Nearby</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalListings}</p>
        </div>
        <div className="bg-card rounded-2xl p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Views</p>
          <p className="mt-2 text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-2xl p-6">
          <p className="text-muted-foreground text-sm font-medium">Top Segment</p>
          <p className="mt-2 text-3xl font-bold">{stats.topSegment}</p>
        </div>
        <div className="bg-card rounded-2xl p-6">
          <p className="text-muted-foreground text-sm font-medium">Listed This Week</p>
          <p className="mt-2 text-3xl font-bold">{stats.recentlyListed}</p>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">Your Preferences</h2>
        <div className="bg-card rounded-2xl p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Preferred Segments</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {preferences.preferredSegments.map(seg => (
                  <span
                    key={seg}
                    className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                  >
                    {seg}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-sm font-medium">Saved Vehicles</p>
              <p className="mt-2 text-lg font-semibold">
                {preferences.savedListings.length}
                {" "}
                saved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings */}
      <div>
        <h2 className="mb-4 text-xl font-bold">Recent Listings</h2>
        <div className="space-y-3">
          {recentListings.slice(0, 5).map(listing => (
            <div
              key={listing.id}
              className="bg-card flex items-center justify-between rounded-2xl p-4"
            >
              <div>
                <h3 className="font-bold tracking-tight uppercase">
                  {`${listing.year} ${listing.title}`}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {`$${listing.price.toLocaleString()} · $${listing.estimatedMonthly.toLocaleString()}/mo est.`}
                </p>
              </div>
              <span className="text-muted-foreground text-sm">
                {`${listing.views.toLocaleString()} views`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
