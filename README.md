# Sugar Plum v2 ✨

Sugar Plum v2 is a modern, magical e-commerce platform for a premium bakery specializing in cakes, pastries, and artisanal cookies. Built with Next.js 15 and React 19, it combines high performance with a whimsical, interactive user experience.

## 🍰 Features

- **Interactive Menu:** Browse a wide range of baked goods with real-time filtering and search.
- **Magical UI:** Soft aesthetics with glassmorphism, smooth animations (Swiper, React Typed), and tailored responsive design.
- **Admin Dashboard:** Full management suite for products, promotions, and marketing banners.
- **Type-Safe Backend:** Powered by Supabase and Prisma for robust data handling and real-time updates.
- **Optimized Imagery:** Automatic image resizing and WebP conversion for fast loading.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19, Tailwind CSS 4, Redux Toolkit
- **Backend:** Supabase (Auth, Database, Storage)
- **ORM:** Prisma with `@prisma/adapter-pg`
- **Animations:** Swiper, Lucide React, React Typed
- **Deployment:** Vercel

## 🛠️ Recent Improvements

- **Promotions Carousel:** 
  - Unified carousel height across all devices for layout stability.
  - Support for "Clean Banners" (Image Only) and "Split View" (Text + Image) layouts.
  - Infinite auto-playing loop with smooth slide transitions.
- **Production Stability:** Fixed Prisma enum export issues that caused Vercel build failures by implementing `$Enums` namespace usage.
- **Refined Admin UX:** Improved product and promotion forms with real-time previews and safety-zone indicators for banners.

## 📖 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Sync database schema (Prisma)
npx prisma db push
```

---
*Casting spells and baking magic, one byte at a time.* 🪄🧁
