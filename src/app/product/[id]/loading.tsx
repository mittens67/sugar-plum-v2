import Section from "@/components/ui/Section";

export default function ProductLoading() {
  return (
    <Section className="bg-background min-h-screen pt-28 md:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Column: Image Skeleton */}
          <div className="relative group px-2 md:px-0">
            <div className="absolute -inset-2 md:-inset-4 bg-primary/10 rounded-card-lg blur-2xl" />
            <div className="relative w-full h-96 md:h-[32rem] bg-gradient-to-r from-plum/10 via-plum/5 to-plum/10 rounded-[1.5rem] md:rounded-card animate-pulse border border-white/40" />
          </div>

          {/* Right Column: Details Skeleton */}
          <div className="space-y-8 md:space-y-10 px-2 md:px-0">
            {/* Title */}
            <div className="space-y-4">
              <div className="h-3 w-32 bg-primary/20 rounded animate-pulse" />
              <div className="h-12 w-3/4 bg-plum/10 rounded-lg animate-pulse" />
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 bg-primary/20 rounded-full animate-pulse"
                    />
                  ))}
                </div>
                <div className="h-3 w-24 bg-plum/10 rounded animate-pulse" />
              </div>
            </div>

            {/* Price */}
            <div className="h-10 w-40 bg-plum/10 rounded-lg animate-pulse border-l-4 border-primary" />

            {/* Actions Card */}
            <div className="space-y-6 bg-white/30 backdrop-blur-md p-6 md:p-10 rounded-card md:rounded-card-lg border border-white/60">
              {/* Description */}
              <div className="space-y-3">
                <div className="h-3 w-20 bg-plum/20 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-plum/10 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-plum/10 rounded animate-pulse" />
                </div>
              </div>

              {/* Selection Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="h-2 w-16 bg-plum/20 rounded animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-8 w-16 bg-plum/10 rounded-full animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Cart Button */}
              <div className="h-12 w-full bg-primary/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
