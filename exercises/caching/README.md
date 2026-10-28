# Next.js 16 Caching Migration Workshop - TFS Storefront Edition

> **Slides:** [https://toyota-fs-workshop.vercel.app/caching](https://toyota-fs-workshop.vercel.app/caching)


Welcome to the Toyota Financial Services Next.js 16 workshop! Learn how to migrate the TFS Storefront to Cache Components and make every navigation instant.

## Prerequisites

- Node.js 20.9+ installed
- Basic knowledge of Next.js App Router
- Understanding of React Server Components

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000/blog
```

> The listings index lives at `/blog` and the components are still named `blog-posts.tsx` and
> `category-filter.tsx`. Those paths are left alone on purpose — this workshop is about caching,
> not routing, and keeping them stable keeps your migration diff small.

## Current Implementation

The TFS Storefront runs on Next.js 16, but Cache Components is still **disabled** (`cacheComponents: false` in `next.config.ts`). The app uses the old patterns:

- `export const dynamic = 'force-dynamic'` for the listings page
- `export const dynamic = 'force-static'` for the home page
- Mocked inventory data with simulated API delays

Check the console to see API calls being logged.

## Why One Cache Strategy Is Not Enough

A vehicle storefront is the perfect place to learn `cacheLife`, because the data on a single page
changes at wildly different speeds. A Land Cruiser's spec sheet never changes. Its market price
moves every hour. Whether it is still on the lot can change in the next minute.

| Data | How often it changes | Cache strategy |
|------|----------------------|----------------|
| Segment taxonomy (Sedans, SUVs, Trucks, Hybrids & EVs, Minivans) | Almost never | Cached with a long `cacheLife` — lives in the static shell |
| Listing details (specs, features, photos) | Only when a vehicle sells or is re-priced | Cached and tagged with `listing-${slug}`, invalidated on demand with `revalidateTag` |
| Market pricing and the "Below market" evaluation | Hourly | Cached with a short `cacheLife`, tagged (for example `market-pricing`) |
| Inventory counts and NEW TODAY listings | Minute to minute | Short `cacheLife` on the home page, fully dynamic inside `Suspense` on the listing detail page |
| Saved vehicles and pre-qualification | Per shopper | Never cached — always dynamic |

The tasks below walk you through applying exactly this.

## Migration Tasks

### Task 1: Enable Cache Components

Turn on the new caching model in `next.config.ts`:

```typescript
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: false, // you turn this on in Task 8
}
```

Restart the dev server and visit each page. The old `dynamic` and `revalidate` exports now fail with `Route segment config "..." is not compatible with nextConfig.cacheComponents. Please remove it.` That message doesn't say what to use instead — the next tasks walk you through the replacements. Once those exports are gone, read the errors that follow carefully: they link to a `nextjs.org/docs/messages/...` page with the exact fix.

### Task 2: Home page

Migrate the home page to the [`"use cache"`](https://nextjs.org/docs/app/api-reference/directives/use-cache) directive. Remember to keep the original [revalidation time](https://nextjs.org/docs/app/api-reference/functions/cacheLife) of 60 seconds.

### Task 3: Listings page

Migrate the listings page to Cache Components. Currently the entire page is dynamic because the listings depend on the selected segment in `searchParams`. Find a way of making the heading, layout, and segment filter static while keeping the listings dynamic.

> Hint: don't await `searchParams` at the top of the page — pass the promise into a Suspense-wrapped child and await it there. There's already a `ListingsGridSkeleton` you can use as the fallback.

### Task 4: Listing detail page

Create a listing detail page at `/blog/[slug]` where the listing content is fully cached. Use [`cacheTag`](https://nextjs.org/docs/app/api-reference/functions/cacheTag) to tag the cached data with a `listing-${slug}` tag.

> Hint: this route has no `generateStaticParams`, so the slug is only known at request time. Cache the data function, and keep the `params` read inside a Suspense boundary.

### Task 5: Revalidate the cache

Create a secured `POST` route at `/api/revalidate` to revalidate the cache of at least the listing detail page — this is what would run when a dealer marks a vehicle as sold or drops its price. Protect it with a bearer token read from an environment variable (for example `REVALIDATE_TOKEN` in `.env.local`), never a secret in the URL. Use [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag) with the `'max'` profile — `revalidateTag(tag, 'max')` serves the old content while the fresh version is prepared in the background. Calling it without the second argument is deprecated.

### Task 6: Add a dynamic NEW TODAY section to the listing detail page

Add a dynamic section to the end of the listing detail page to show the newest listings. It should fetch fresh data on every request and stream in behind a fallback, while the cached listing content stays instant.

> Hint: `getNewTodayListings()` shuffles with `Math.random()`, which Next.js won't run during prerendering. Mark the section as request-time with [`await connection()`](https://nextjs.org/docs/app/api-reference/functions/connection) before calling it.

### Task 7: Verify instant navigation

Prove your work with the tools from the slides:

1. Run `pnpm build` and read the route glyphs: `/` should be `○ (Static)`, `/blog` and `/blog/[slug]` should be `◐ (Partial Prerender)`.
2. In dev, open the Next.js DevTools → **Navigation Inspector** → turn on **Pause on navigations**. Click from the home page to the listings: the heading and segment filter must appear frozen in the shell, with the listings skeleton where content will stream in.

Remember: `◐` only says a shell exists — the Inspector shows what's actually in it.

### Task 8: Enable Partial Prefetching

Flip [`partialPrefetching`](https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching) from `false` to `true` in `next.config.ts`. Now every `<Link>` prefetches one shared App Shell per route.

Then upgrade the three NEW TODAY listing cards on the home page with [`prefetch={true}`](https://nextjs.org/docs/app/api-reference/components/link#prefetch), so their listing content is ready before the click. Think about why you should **not** do the same for the 50 cards on the listings index.

### Task 9: Bonus

- Add one easter egg to the application.
- Show the active segment in the `category-filter` component.
- Create a custom cache profile in `next.config.ts` and use it.
- Add `generateStaticParams` to `/blog/[slug]` so the newest listings get fully prerendered pages.
- Write an [`instant()`](https://nextjs.org/docs/app/guides/instant-navigation#prevent-regressions-with-e2e-tests) e2e test with `@next/playwright` that guards the listings navigation. Write it against `next dev`, then get the real verdict from `next build && next start` with [`exposeTestingApiInProductionBuild`](https://nextjs.org/docs/app/api-reference/config/next-config-js/exposeTestingApiInProductionBuild) enabled for that build (dev doesn't prefetch).
- Use the Navigation Inspector to verify the listing detail App Shell.
- Compare default shared-shell prefetching with `prefetch={true}` on listing links.
- Deploy the application and verify everything works.

## Resources

- [Next.js 16 Documentation](https://nextjs.org/docs)
- ["use cache" Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [cacheLife Function](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [cacheTag Function](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [revalidateTag Function](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next.js 16.3](https://nextjs.org/blog/next-16-3)
- [Instant Navigation Guide](https://nextjs.org/docs/app/guides/instant-navigation)
- [Adopting Partial Prefetching](https://nextjs.org/docs/app/guides/adopting-partial-prefetching)

---

**Happy coding!**
