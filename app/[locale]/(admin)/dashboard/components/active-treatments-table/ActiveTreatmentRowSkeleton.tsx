// ActiveTreatmentRowSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const ActiveTreatmentRowSkeleton = () => (
  <TableRow>
    {/* Patient name */}
    <TableCell>
      <Skeleton className="h-4 w-24 rounded" />
    </TableCell>
    {/* Service type */}
    <TableCell>
      <Skeleton className="h-4 w-32 rounded" />
    </TableCell>
    {/* Session count  e.g. "2 / 10" */}
    <TableCell>
      <Skeleton className="h-3 w-6 rounded opacity-50" />
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-1.5">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-6 rounded opacity-50" />
      </div>
    </TableCell>
    {/* Badge */}
    <TableCell>
      <Skeleton className="h-5 w-16 rounded-full" />
    </TableCell>
    {/* Action icon button */}
    <TableCell>
      <div className="flex justify-center">
        <Skeleton className="size-7 rounded-md" />
      </div>
    </TableCell>
  </TableRow>
);

export const ActiveTreatmentSkeletonRows = ({
  count = 5,
}: {
  count?: number;
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <ActiveTreatmentRowSkeleton key={i} />
    ))}
  </>
);
