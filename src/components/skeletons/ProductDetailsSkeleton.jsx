export default function ProductDetailsSkeleton() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image Skeleton */}
        <div className="bg-base-200 rounded-2xl overflow-hidden">
          <div className="relative aspect-square animate-pulse bg-base-300" />
        </div>

        {/* Product Information Skeleton */}
        <div className="flex flex-col animate-pulse">
          {/* Title */}
          <div className="h-10 w-3/4 bg-base-300 rounded-lg" />

          {/* Rating */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-5 h-5 rounded-full bg-base-300" />
              ))}
            </div>

            <div className="h-5 w-10 bg-base-300 rounded" />
            <div className="h-5 w-24 bg-base-300 rounded" />
            <div className="h-5 w-16 bg-base-300 rounded" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-9 w-28 bg-base-300 rounded-lg" />
            <div className="h-6 w-20 bg-base-300 rounded" />
            <div className="h-6 w-14 bg-base-300 rounded-full" />
          </div>

          {/* Description */}
          <div className="mt-6">
            <div className="h-7 w-32 bg-base-300 rounded mb-3" />

            <div className="space-y-2">
              <div className="h-4 w-full bg-base-300 rounded" />
              <div className="h-4 w-full bg-base-300 rounded" />
              <div className="h-4 w-5/6 bg-base-300 rounded" />
              <div className="h-4 w-2/3 bg-base-300 rounded" />
            </div>
          </div>

          {/* Product Information */}
          <div className="mt-6">
            <div className="h-7 w-48 bg-base-300 rounded mb-4" />

            <ul className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-base-300" />
                  <div className="h-4 bg-base-300 rounded w-3/4" />
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <div className="h-12 w-full sm:w-40 bg-base-300 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
