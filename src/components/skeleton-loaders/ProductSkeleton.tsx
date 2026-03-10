"use client";

import Section from "../ui/Section";

export default function ProductSkeleton() {
  return (
    <Section className="bg-background min-h-screen pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Image Skeleton */}
          <div className="relative">
            {/* The "Whimsical Shadow" placeholder */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl" />
            <div className="relative aspect-4/3 w-full bg-plum/5 rounded-[2rem] border border-white/40 animate-pulse" />
          </div>

          {/* Right Column: Details Skeleton */}
          <div className="space-y-10">
            <div className="space-y-4">
              {/* Artisanal Creation Tag */}
              <div className="h-3 w-32 bg-primary/10 rounded-full animate-pulse" />
              {/* Title */}
              <div className="h-12 w-3/4 bg-plum/10 rounded-xl animate-pulse" />
              {/* Stars */}
              <div className="h-4 w-40 bg-plum/5 rounded-full animate-pulse" />
            </div>

            {/* Price Tag */}
            <div className="h-10 w-24 bg-plum/10 border-l-4 border-primary/20 pl-4 animate-pulse" />

            {/* Glassmorphism Pane Skeleton */}
            <div className="space-y-8 bg-white/20 backdrop-blur-md p-8 rounded-[2rem] border border-white/40 shadow-xl">
              <div className="space-y-4">
                <div className="h-4 w-20 bg-plum/10 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-plum/5 rounded-full animate-pulse" />
                  <div className="h-3 w-full bg-plum/5 rounded-full animate-pulse" />
                  <div className="h-3 w-2/3 bg-plum/5 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Options (Size/Flavor) */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="h-2 w-10 bg-plum/5 rounded-full animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-primary/5 rounded-full animate-pulse" />
                    <div className="h-8 w-16 bg-primary/5 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-10 bg-plum/5 rounded-full animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-primary/5 rounded-full animate-pulse" />
                    <div className="h-8 w-16 bg-primary/5 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Button Placeholder */}
              <div className="pt-4">
                <div className="h-16 w-full bg-primary/10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Global Shimmer Animation */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Section>
  );
}