# Next.js Fundamentals Workshop - Toyota Financial Services Edition

> **Slides:** [toyota-fs-workshop.vercel.app/fundamentals](toyota-fs-workshop.vercel.app/fundamentals)


Welcome to the TFS Next.js fundamentals workshop! Learn core Next.js concepts by migrating a client-side React app to use proper Next.js patterns.

The app is **TFS Storefront** — the vehicle catalog for Toyota Financial Services. It lists Toyota inventory from Southern California dealers with a TFS payment estimate on every listing.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of React
- Understanding of client vs server rendering concepts

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000
```

## Current Implementation (Anti-Patterns)

The vehicle catalog currently works but uses several anti-patterns.

## Tasks

### Task 1: Convert Homepage to Server Component

Remove `'use client'` and `useEffect` from the homepage. Import data functions directly and make the component `async`.

### Task 2: Replace `<a>` with `<Link>`

Replace all `<a>` tags with Next.js `<Link>` components for client-side navigation. Update both `product-card.tsx` and `category-filter.tsx`.

### Task 3: Create Vehicle Detail Page

Create `/products/[slug]/page.tsx` as a dynamic route:
- Use `params` to get the vehicle slug (for example `2027-land-cruiser-base`)
- Fetch the vehicle using `getVehicleBySlug()`
- Call `notFound()` if the listing doesn't exist
- Display full vehicle details

Aim for the storefront's detail layout:
- A price badge — `Below market` in Toyota red (`bg-brand text-brand-foreground`), `bg-muted` otherwise
- The name in bold uppercase: `TOYOTA LAND CRUISER BASE`
- `2027 · 251 mi` underneath, then the price and the `estimatedMonthly` TFS estimate as `$X/mo est.`
- A white pill CTA: "Start your purchase"
- Dealer availability: "Available at Longo Toyota — El Monte, CA 91731"
- "Schedule a test drive" with a row of time-slot pills
- A spec line built from the vehicle fields, in this shape:

  ```
  2027 Toyota Land Cruiser Base | SUV/Gas/Four Wheel Drive | $77,994 (Below market)
  | Standard Gas (22/25 mpg) | 251 mi (low) | 5 seats, certified
  ```

### Task 4: Add Loading States

Add `loading.tsx` to the products route for instant loading feedback. Consider adding Suspense boundaries for individual sections.

### Task 5: Add Error Handling

Add `error.tsx` for runtime errors and ensure `not-found.tsx` works for missing listings.

### Task 6: Server Action Form

Add a "Pre-qualify with Toyota Financial Services" form on the vehicle detail page using a Server Action.

### Task 7: Bonus

- Add `generateStaticParams` to the vehicle detail page to pre-generate featured listings at build time.
- Add one easter egg to the application.

## Resources

- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

---

**Happy coding!**
