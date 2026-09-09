# React Fundamentals Workshop - Toyota Financial Services Edition

> **Slides:** [toyota-fs-workshop.vercel.app/react](toyota-fs-workshop.vercel.app/react)


Welcome to the TFS React fundamentals workshop! Learn React core concepts by refactoring a monolithic component into a well-structured application.

## Prerequisites

- Node.js 18+ installed
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VS Code recommended)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Visit http://localhost:3000
```

## Current Implementation

The TFS Inventory Directory currently works but has significant code quality issues:

- Everything is in a single giant component (`page.tsx`)
- Uses `any` everywhere instead of the types exported from `api.ts`
- No component extraction — all markup is inline
- Filters don't work together properly
- Generic empty state message regardless of active filters

## Tasks

### Task 1: Replace `any` with Proper Types

The page is full of `any` types. Import the `Vehicle` and `Segment` types from `api.ts` and replace every `any` in `page.tsx` — state declarations, callback parameters, and `.map()` variables should all be properly typed.

### Task 2: Extract Components with Typed Props

Break the monolithic page into reusable components in `src/components/`. Each component should have a named props interface:

- `SearchBar` — Search input with controlled state
- `SegmentFilter` — Segment filter buttons
- `VehicleCard` — Individual vehicle listing card
- `VehicleGrid` — Grid layout for vehicle cards

### Task 3: Vehicle Detail Modal

Refactor the inline vehicle detail overlay into a proper `VehicleDetail` component that shows:
- Vehicle name, photo, trim, segment
- Price, price badge, and the TFS estimated monthly payment
- Dealer, dealer location, listed date
- Features list

### Task 4: Combined Filtering

Ensure search and segment filters work together. Search should filter by vehicle name within the selected segment.

### Task 5: Empty State per Filter

Show a different empty state message depending on which filters are active. For example: "No vehicles found in SUVs matching 'tacoma'" vs "No vehicles found matching 'tacoma'" vs "No vehicles in Minivans".

### Task 6: Selection Context

After extracting components, you'll notice that `selectedVehicle` and `setSelectedVehicle` need to be passed through `VehicleGrid` down to each `VehicleCard`, and also to `VehicleDetail` at the page level. That's prop drilling.

Refactor it using **React Context**:

- Create `src/components/selection-context.tsx` exporting:
  - A `SelectionContext` (created with `createContext`)
  - A `SelectionProvider` component that holds the `selectedVehicle` state
  - A `useSelection()` hook that wraps `use(SelectionContext)` and throws if used outside the Provider
- Wrap the page content in `<SelectionProvider>`
- Inside `VehicleCard`, call `useSelection()` to get `setSelectedVehicle` directly — no more prop drilling
- Inside `VehicleDetail`, call `useSelection()` to read `selectedVehicle` and get `setSelectedVehicle` for closing

The page no longer has to thread the selection state through every component.

### Task 7: Bonus — Sort Toggle

Add a sort toggle that switches between:
- Name (A-Z)
- Listed date (newest first)

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Thinking in React](https://react.dev/learn/thinking-in-react)

---

**Happy coding!**
