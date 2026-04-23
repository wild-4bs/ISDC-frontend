import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectCardSkeleton = () => {
  return (
    <Card className="p-0 overflow-hidden gap-0">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-[220px] rounded-none" />
      </CardHeader>

      <CardContent className="p-0">
        <div className="border-b-input border-b p-2">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="size-7 rounded-md" />
          </div>
          <Skeleton className="h-5 w-3/4 rounded mb-1.5" />
          <Skeleton className="h-3.5 w-full rounded mb-1" />
          <Skeleton className="h-3.5 w-2/3 rounded" />
        </div>
      </CardContent>
    </Card>
  );
};

export const ProjectCardSkeletonList = ({ count = 6 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ProjectCardSkeleton key={i} />
    ))}
  </>
);
