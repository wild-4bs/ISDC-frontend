import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const TimelineRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-40 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-28 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-20 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-16 rounded-md" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24 rounded" />
    </TableCell>
    <TableCell>
      <div className="flex justify-center">
        <Skeleton className="size-7 rounded-md" />
      </div>
    </TableCell>
  </TableRow>
);

export const TimelineRowSkeletonList = ({ count = 10 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <TimelineRowSkeleton key={i} />
    ))}
  </>
);
