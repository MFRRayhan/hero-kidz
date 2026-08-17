export default function ProductSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm">
      {/* Image Skeleton */}
      <div className="skeleton aspect-square w-full rounded-b-none" />

      <div className="card-body p-4">
        {/* Title */}
        <div className="skeleton h-5 w-4/5" />
        <div className="skeleton h-5 w-2/5" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-24" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <div className="skeleton h-6 w-20" />
          <div className="skeleton h-4 w-14" />
        </div>

        {/* Button */}
        <div className="skeleton h-10 w-full mt-2" />
      </div>
    </div>
  );
}
