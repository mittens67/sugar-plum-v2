"use client";

function FeaturedItemCardSkeleton() {
  return (
    /* We match the padding (p-6) and rounded corners of the real card */
    <div className="bg-white/30 backdrop-blur-sm border border-white/60 p-6 rounded-[2.5rem] flex flex-col h-[450px] w-full shadow-sm relative overflow-hidden">
      
      {/* 1. Image Area: Uses aspect-square to reserve the exact space */}
      <div className="relative w-full aspect-square rounded-2xl bg-plum/5 animate-pulse mb-6" />
      
      {/* 2. Title Area: Fixed height to prevent line-jump */}
      <div className="space-y-3 flex flex-col items-center">
        <div className="h-7 w-3/4 bg-plum/10 rounded-full animate-pulse" />
        
        {/* 3. Description Area: Matching the 'line-clamp-2' height */}
        <div className="space-y-2 w-full mt-2">
          <div className="h-3 w-full bg-plum/5 rounded-full animate-pulse" />
          <div className="h-3 w-4/5 bg-plum/5 rounded-full mx-auto animate-pulse" />
        </div>
      </div>

      {/* 4. Footer Area: Pushed to bottom with mt-auto */}
      <div className="mt-auto pt-6 border-t border-plum/20 flex justify-center">
        <div className="h-3 w-24 bg-primary/20 rounded-full animate-pulse" />
      </div>

      {/* Branded Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <style jsx>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default FeaturedItemCardSkeleton;