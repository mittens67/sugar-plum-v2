# Sugar Plum v2 — Next.js Concepts Showcase

A production-grade e-commerce platform demonstrating **19 modern Next.js/React concepts** used in real applications. Built with Next.js 16, React 19, and Supabase.

## Architecture Highlights

### Server-Side Rendering & Streaming
- **Server Components**: 31/57 files are server components; data fetching happens on the server, not the browser
- **Server Actions**: Mutations via `src/app/admin/actions.ts` (`"use server"`)—type-safe form handling without API route boilerplate
- **Streaming UI**: `loading.tsx` and `Suspense` boundaries enable progressive page rendering (product pages load faster than HTML serialization)
- **ISR/Revalidation**: Product pages cached for 1 hour (`revalidate: 3600`), invalidated on admin updates via `revalidateTag`

### Static Generation & Metadata
- **`generateStaticParams`**: 47 product pages pre-rendered at build time—O(1) response time on production
- **Dynamic Metadata**: Per-product SEO via `generateMetadata`—title, description, OG images unique to each product
- **OG Image Generation**: Dynamic 1200×630 images for social sharing (product image, price, rating)
- **Sitemap & Robots**: Search engines crawl all 47 products + static routes

### Caching Strategy
- **`unstable_cache`**: Database queries tagged ("products", "promotions") cached for 1 hour
- **`revalidateTag`**: Surgical cache invalidation—updating one product invalidates only product cache, not entire pages
- **Path-based Invalidation**: `revalidatePath` for full page refreshes (e.g., admin menu after bulk edits)

### Performance & Code-Splitting
- **`next/dynamic`**: Heavy Swiper carousel library lazy-loaded below-the-fold (FeaturedItems, Promotions)
- **Route Handlers**: 7 read-only GET endpoints (`/api/products`, `/api/promotions`, etc.) for public data
- **Middleware**: Session refresh + auth gating (`/admin` routes) on Edge runtime

### Error Handling & Edge Cases
- **Error Boundaries**: Route-level `error.tsx` + global `global-error.tsx` with retry logic
- **404 Handling**: Framework `not-found.tsx` replacing manual conditionals
- **Form State**: `useFormStatus` for clean submission UI without manual `useState` tracking

### Infrastructure & Type Safety
- **Environment Validation**: `src/lib/env.ts` validates required vars at module load; typed camelCase exports
- **Instrumentation**: `src/instrumentation.ts` hook ready for APM (Sentry, DataDog, New Relic)
- **Edge Runtime Analysis**: Documented trade-offs—Node.js for DB queries (persistent connections), Edge for stateless endpoints

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Frontend**: React 19, Tailwind CSS 4, Redux Toolkit
- **Backend**: Supabase (Auth, Database), Prisma ORM
- **Deployment**: Vercel

## 19 Concepts Implemented

Full details in [`CONCEPTS.md`](./CONCEPTS.md). Includes:

1. Server vs Client Components
2. Server Actions
3. `revalidatePath` (Cache Invalidation)
4. `next/font/google`
5. `next/image`
6. Dynamic Route Segments `[id]`
7. Route Segment Config (`dynamic`)
8. Middleware (Auth & Session)
9. Route Handlers (API)
10. Server-render `product/[id]`
11. `generateMetadata` (Dynamic SEO)
12. `generateStaticParams` (Static Generation)
13. `loading.tsx` (Streaming UI)
14. `error.tsx` & `global-error.tsx`
15. `not-found.tsx`
16. `Suspense` Boundaries
17. ISR / `revalidate`
18. `sitemap.ts` & `robots.ts` (SEO)
19. `opengraph-image.tsx` + `unstable_cache` + `revalidateTag` + `next/dynamic` + `useFormStatus` + `instrumentation.ts` + Environment Validation + Edge Runtime Optimization

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npx prisma db push # Sync schema
```

---
