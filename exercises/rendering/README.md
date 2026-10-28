# Rendering Strategies Workshop - Toyota Financial Services Edition

> **Slides:** [https://toyota-fs-workshop.vercel.app/rendering](https://toyota-fs-workshop.vercel.app/rendering)


Welcome to the TFS rendering strategies workshop! Learn when and how to use static, dynamic, and streaming rendering in Next.js.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of Next.js App Router
- Understanding of React Server Components

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000
```

## Current Implementation

The TFS Storefront application makes every page dynamic with `force-dynamic`:

- Nothing is prerendered, so every shopper waits for data that rarely changes
- The storefront landing page fetches its two sections one after the other
- The genuinely dynamic pages show nothing until their slowest fetch finishes

Check the console to see API calls and their delays.

### The pages, and how their content behaves

A vehicle storefront is a great fit for this lesson because each page has a very
different freshness requirement:

| Route | What it is | How its content behaves |
|-------|------------|-------------------------|
| `/` | Storefront landing: "New Today" plus a "Trending Now" panel | Same for every shopper; inventory turns over through the day |
| `/articles` | The vehicle listings index, filtered by segment via `?segment=` | Depends on the segment chip in the URL; the shell and chips never change |
| `/articles/[slug]` | A vehicle detail page (photos, spec line, TFS payment estimate) | Fixed while the vehicle is on the lot; changes only when it sells or is repriced |
| `/dashboard` | "Your Garage": saved vehicles and matches, read from a cookie | Different for every shopper, on every request |

## Tasks

### Task 1: Prerender Vehicle Detail Pages

A vehicle's specs are fixed while it is on the lot, and every slug is known ahead of time. Add `generateStaticParams` to `/articles/[slug]` using `getAllListingSlugs()`, and remove the `force-dynamic` export.

### Task 2: Homepage ISR

The storefront landing page shouldn't rebuild for every shopper, but it can't be frozen at build time either — inventory turns over through the day. Cache it with a `revalidate` time of 60 seconds.

Also render `new Date().toLocaleTimeString()` on the page to see if the cache is working.

### Task 3: Fix the Homepage Waterfall

The homepage awaits `getNewToday()` and `getTrendingListings()` in sequence: 500ms, then 1500ms. They don't depend on each other, so run them together.

### Task 4: Revalidate on Demand

A 60-second cycle is too slow for a vehicle that just sold, and the now-static detail pages never refresh on their own. Add a `/api/revalidate` route handler — the endpoint a dealer inventory webhook would call — that:

- Takes a slug and a secret, and rejects the request when the secret doesn't match `process.env.REVALIDATE_SECRET`
- Calls `revalidatePath` for the vehicle detail page and the homepage

Call it manually from the browser to see if it works.

### Task 5: Listings Loading State

`/articles` reads `searchParams`, so it's dynamic — that part is correct. But it renders nothing until the listings arrive. Add `loading.tsx` with a grid of `ListingCardSkeleton`.

### Task 6: Stream "Your Garage"

`/dashboard` reads `cookies()` and has to stay dynamic, but its three fetches (800ms, 600ms, 500ms) run back to back before anything appears. Move each section into its own `async` component wrapped in `<Suspense>` so they stream in separately.

### Task 7: Read the Build Output

Run `pnpm build` and check the route table: `/` static with a 1m revalidate, `/articles/[slug]` prerendered once per slug, `/articles` and `/dashboard` dynamic.

For each route, be ready to say what made it static or dynamic.

### Task 8: Bonus

- Add `dynamicParams = false` to `/articles/[slug]` so unknown slugs return a 404 page.
- Create components for pieces of UI you think are reusable.
- Add one easter egg to the application.

## Resources

- [Caching and Revalidating (Previous Model)](https://nextjs.org/docs/app/guides/caching-without-cache-components) — the model this workshop uses
- [Incremental Static Regeneration](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
- [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
- [Streaming](https://nextjs.org/docs/app/guides/streaming)

---

**Happy coding!**
