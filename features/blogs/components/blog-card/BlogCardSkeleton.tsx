// BlogCardSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogCardSkeleton = () => (
  <Card className="p-0 overflow-hidden flex flex-col h-full">
    <CardHeader className="p-0 relative h-40 w-full">
      <Skeleton className="h-full w-full rounded-none" />
      <div className="absolute -bottom-6 right-4 z-10">
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-8 flex flex-col grow gap-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </CardContent>
  </Card>
);

export const BlogCardSkeletonList = () =>
  Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton key={i} />);
