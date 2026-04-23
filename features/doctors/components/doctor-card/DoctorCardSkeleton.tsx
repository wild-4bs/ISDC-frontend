// doctor-card/DoctorCardSkeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DoctorCardSkeleton = () => (
  <Card className="overflow-hidden p-0">
    <CardContent className="p-0">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardContent>
  </Card>
);

export const DoctorCardSkeletonList = () =>
  Array.from({ length: 8 }).map((_, i) => <DoctorCardSkeleton key={i} />);
