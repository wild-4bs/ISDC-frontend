import { Skeleton } from "@/components/ui/skeleton";

export const BlogSkeleton = () => {
  return (
    <div
      className="rounded-3xl overflow-hidden border border-muted shadow-sm"
      dir="rtl"
    >
      {/* Thumbnail */}
      <Skeleton className="w-full h-[272px] rounded-none" />

      {/* Content */}
      <div className="p-5 pb-3 flex flex-col gap-5">
        {/* Date */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-28 rounded" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full rounded" />
          <Skeleton className="h-6 w-4/5 rounded" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-28 rounded-full" />
      </div>
    </div>
  );
};
