export function SegmentFilter({
  segments,
  selected,
}: {
  segments: any[]
  selected: string
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <a
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selected === ""
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-accent"
        }`}
        href="/products"
      >
        All
      </a>
      {segments.map((segment: any) => (
        <a
          key={segment.slug}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === segment.slug
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          href={`/products?segment=${segment.slug}`}
        >
          {segment.name}
          {" "}
          (
          {segment.vehicleCount}
          )
        </a>
      ))}
    </div>
  )
}
