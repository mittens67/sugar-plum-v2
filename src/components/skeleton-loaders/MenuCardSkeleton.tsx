"use client";

interface Prop {
  index?: number;
}

function MenuCardSkeleton({ index }: Prop) {
  return (
    <div
      key={index}
      className="bg-white/40 backdrop-blur-md rounded-card-lg p-6 border border-white/60 shadow-lg flex flex-col items-center w-full min-h-[380px] relative overflow-hidden"
    >
      {/* 1. Image Placeholder: Aspect-square matches the real product cards */}
      <div className="relative w-full aspect-square bg-plum/5 rounded-2xl mb-4 animate-pulse" />
      
      {/* 2. Title Placeholder */}
      <div className="h-5 w-3/4 bg-plum/10 rounded-full mb-3 animate-pulse" />
      
      {/* 3. Price Placeholder */}
      <div className="h-6 w-1/4 bg-primary/10 rounded-full mb-4 animate-pulse" />

      {/* 4. "View Creation" text placeholder */}
      <div className="mt-auto h-2 w-1/3 bg-plum/5 rounded-full animate-pulse" />

      {/* Shimmer Effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default MenuCardSkeleton;