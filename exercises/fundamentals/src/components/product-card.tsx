export function VehicleCard({ vehicle }: { vehicle: any }) {
  return (
    <a
      className="bg-card overflow-hidden rounded-2xl p-3 transition-opacity hover:opacity-90"
      href={`/products/${vehicle.slug}`}
    >
      <div className="relative">
        <img
          alt={vehicle.name}
          className="bg-muted h-44 w-full rounded-xl object-cover"
          src={vehicle.image}
        />
        <span
          className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
            vehicle.priceBadge === "Below market"
              ? "bg-brand text-brand-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {vehicle.priceBadge}
        </span>
      </div>
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
        <p className="text-muted-foreground mt-3 text-xs">
          {vehicle.dealer}
          {" — "}
          {vehicle.dealerLocation}
        </p>
      </div>
    </a>
  )
}
