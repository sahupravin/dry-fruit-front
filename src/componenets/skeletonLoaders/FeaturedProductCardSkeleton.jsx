function FeaturedProductCardSkeleton({ maxWidth = true, className }) {
  return (
    <article
      className={`group relative m-0.5 w-full ${
        maxWidth && "max-w-[12rem] basis-[12rem]"
      } ${className} cursor-grab bg-white shadow-[0_0_1rem_2px_rgba(0,0,0,0.06)]`}
    >
      {/* Image skeleton */}
      <div className="relative h-56 w-full overflow-hidden">
        {/* Tag skeleton */}
        <div className="bg-grey-200 absolute top-4 left-3 h-8 w-8 animate-pulse rounded-full" />
        {/* Image block */}
        <div className="bg-grey-200 absolute inset-0 animate-pulse rounded" />
      </div>

      {/* Product details skeleton */}
      <div className="flex flex-col items-center justify-center p-8">
        {/* Title skeleton */}
        <div className="bg-grey-200 mb-4 h-6 w-28 animate-pulse rounded" />

        {/* Price skeletons */}
        <div className="flex w-full items-center justify-center gap-4">
          <div className="bg-grey-200 h-5 w-16 animate-pulse rounded" />
          <div className="bg-grey-200 h-4 w-12 animate-pulse rounded" />
        </div>
      </div>
    </article>
  );
}

export default FeaturedProductCardSkeleton;
