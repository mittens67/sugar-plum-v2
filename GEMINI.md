# Sugar Plum v2 - Project Context

## Project Overview
Sugar Plum v2 is a modern e-commerce platform for a bakery/patisserie specializing in cakes, pastries, and cookies. The project is built with a focus on a magical and visually appealing user experience, utilizing a modern tech stack for performance and scalability.

### Core Technologies
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend/Database:** [Supabase](https://supabase.com/) with SSR support
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations/Interactive:** [React Typed](https://github.com/ssbeefeater/react-typed), [Swiper](https://swiperjs.com/)

### Architecture
- **App Router:** Located in `src/app`, follows Next.js directory-based routing.
- **Components:** 
  - `src/components/ui`: Atomic, reusable UI primitives (Button, Card, Section).
  - `src/components/home-page`: Feature-specific components for the landing page.
  - `src/components/skeleton-loaders`: Loading states for various UI elements.
- **State Management:** `src/lib/store.ts` configures Redux, with slices in `src/lib/slices` (e.g., `cartSlice.ts`).
- **Data Layer:** 
  - `src/utils/supabase`: Configuration for server and client-side Supabase interactions.
  - `src/app/api`: Next.js Route Handlers that serve as an internal API layer, interacting with Supabase.
- **Public Assets:** Static assets like videos and images are stored in `public/`.

## Building and Running

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

## Development Conventions

### Coding Style
- **TypeScript:** Use TypeScript for all new components and logic.
- **Client vs. Server Components:** Explicitly use `"use client"` at the top of files that require interactivity or React hooks. Default to Server Components for data fetching and static layout.
- **Styling:** Use Tailwind CSS utility classes for styling. Follow the established spacing and color patterns in `src/app/globals.css`.
- **Icons:** Prefer `lucide-react` for consistent iconography.

### UI Component Conventions
- **Card Component:** Supports both standalone usage (for whimsical glassmorphism cards) and modular usage (for admin dashboards).
  - Standalone: `<Card glass className="p-6">...</Card>`
  - Modular: Uses `<CardHeader>`, `<CardTitle>`, and `<CardContent>`.
  - *Note:* The base `Card` does not include default padding to remain compatible with modular sub-components.
- **Promotions Carousel:** Uses Swiper for an infinite, auto-playing showcase of active offers.
  - **Dimensions:** Fixed height of `h-[500px]` (mobile) and `h-[600px]` (desktop) to ensure layout stability.
  - **Display Types:** 
    - `SPLIT`: Displays text, a CTA button, and an image side-by-side.
    - `IMAGE_ONLY`: Displays a clean, full-width banner. In this mode, text overlays are hidden, and the entire banner is clickable.
  - **Animations:** Uses standard slide transitions to avoid ghosting issues with transparent/glassmorphic elements.
- **Aesthetics:** Use `rounded-4xl` or `rounded-[2.5rem]` for main containers to maintain the project's whimsical, soft aesthetic. Glassmorphism is preferred for overlay elements using `bg-white/30 backdrop-blur-md border border-white/60`.

### Prisma & Type Safety
- **Enum Usage:** When using Prisma enums (like `category` or `promo_display_type`) in TypeScript files, **always import them from `$Enums`** (e.g., `import { $Enums } from "@prisma/client"`). Direct imports of enum values can lead to "Module has no exported member" errors during production builds on platforms like Vercel.
- **Prisma Commands:**
  - Sync DB: `npx prisma db push`
  - Introspect: `npx prisma db pull`
  - Client: `npx prisma generate` (updates TypeScript types).

## Architecture Updates
- **Prisma Singleton:** `src/lib/prisma.ts` for database access.
- **Middleware:** `src/middleware.ts` handles session refresh and admin authorization via Supabase.
- **Server Actions:** `src/app/admin/actions.ts` (marked with `"use server"`) handles secure mutations like adding/editing products and `signOut`.
- **Admin Layout:** `src/app/admin/layout.tsx` is a Client Component that utilizes `usePathname` to conditionally render the management sidebar/header based on the route (e.g., hiding them on the login page).
- **Navigation:** The public `Navbar` and `Footer` are conditionally hidden on `/admin` routes to ensure a dedicated management workspace.
