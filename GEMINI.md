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
- **Aesthetics:** Use `rounded-4xl` or `rounded-[2.5rem]` for main containers to maintain the project's whimsical, soft aesthetic. Glassmorphism is preferred for overlay elements using `bg-white/30 backdrop-blur-md border border-white/60`.

### API & Data Fetching
- Use the Supabase server client (`src/utils/supabase/server.ts`) for server-side data fetching in pages and API routes.
- Centralize complex data fetching logic in `src/app/api` to keep components clean.

### State Management
- Use Redux for global UI state like the shopping cart.
- Prefer local state (`useState`, `useReducer`) for component-specific logic.

## Admin Dashboard & Management

### Features
- **Menu Management:** Add, edit, and soft-delete products.
- **Marketing:** Manage active promotions and marketing banners.
- **Database:** Type-safe database access using Prisma.
- **Authentication:** Protected `/admin` routes via Supabase Auth and a custom `profiles` table.

### Setup Admin Role
To access the dashboard, a user must have `is_admin: true` in the `profiles` table.
1. Sign up/Login via the public site or `/admin/login`.
2. In the Supabase SQL Editor, run:
   ```sql
   INSERT INTO profiles (id, user_id, is_admin)
   VALUES (gen_random_uuid(), 'YOUR_USER_ID', true)
   ON CONFLICT (user_id) DO UPDATE SET is_admin = true;
   ```

### Prisma Commands
- **Sync DB:** `npx prisma db push` (updates DB to match schema).
- **Introspect:** `npx prisma db pull` (updates schema to match DB).
- **Client:** `npx prisma generate` (updates TypeScript types).

## Architecture Updates
- **Prisma Singleton:** `src/lib/prisma.ts` for database access.
- **Middleware:** `src/middleware.ts` handles session refresh and admin authorization.
- **Server Actions:** `src/app/admin/actions.ts` for secure mutations.
