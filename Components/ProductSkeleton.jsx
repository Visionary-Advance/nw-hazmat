'use client';

export default function ProductSkeleton() {
  return (
    <div className="w-64 h-[460px] mx-auto relative shadow-md rounded-[20px] bg-white border border-black/20 flex flex-col justify-between p-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center">
        <div className="w-60 h-60 bg-gray-200 border border-black shadow rounded-[16px]"></div>
      </div>

      {/* Name Skeleton */}
      <div className="mt-2">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="bg-black h-[1px] w-12 mt-1"></div>
      </div>

      {/* Description Skeleton */}
      <div className="text-sm mt-2 flex-grow space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Price + Button Skeleton */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="w-[150px] h-10 bg-gray-200 rounded-[10px]"></div>
      </div>
    </div>
  );
}

// Grid of skeletons for loading state
export function ProductSkeletonGrid({ count = 6 }) {
  return (
    <div className="mt-10 w-3/4 gap-y-4 mx-auto grid grid-cols-1 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}