// PatientRowSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const PatientRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-28 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-14 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-24 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-16 rounded" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-14 rounded" />
    </TableCell>
    <TableCell>
      <div className="flex justify-center">
        <Skeleton className="size-7 rounded-md" />
      </div>
    </TableCell>
  </TableRow>
);

export const PatientRowSkeletonList = ({ count = 8 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <PatientRowSkeleton key={i} />
    ))}
  </>
);
