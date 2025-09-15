import Section from "../ui/Section";


export default function ProductSkeleton() {
  return (
    <Section className="bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-pulse">
        {/* Title placeholder */}
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image placeholder */}
          <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-xl"></div>

          {/* Right column placeholders */}
          <div className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>

            {/* Info */}
            <div className="space-y-2">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
              <div className="h-9 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Add to cart */}
            <div className="h-10 w-32 bg-gray-200 rounded"></div>

            {/* Reviews */}
            <div className="space-y-3">
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
              <div className="flex gap-2">
                <div className="h-6 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
