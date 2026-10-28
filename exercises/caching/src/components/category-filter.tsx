import type { Segment } from "@/api"

import Link from "next/link"

export default function SegmentFilter({ segments }: { segments: Segment[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        className="bg-secondary text-secondary-foreground hover:bg-accent rounded-full px-4 py-2 text-sm font-medium transition-colors"
        href="/blog"
      >
        {`All listings (${segments.reduce((sum, segment) => sum + segment.listingCount, 0)})`}
      </Link>
      {segments.map(segment => (
        <Link
          key={segment.id}
          className="bg-secondary text-secondary-foreground hover:bg-accent rounded-full px-4 py-2 text-sm font-medium transition-colors"
          href={`/blog?segment=${segment.slug}`}
        >
          {`${segment.name} (${segment.listingCount})`}
        </Link>
      ))}
    </div>
  )
}
