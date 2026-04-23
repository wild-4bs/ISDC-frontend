import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface Props {
  isPending?: boolean;
}

export const StatsCard = ({
  isPending,
  children,
  className,
  ...props
}: ComponentProps<"div"> & Props) => {
  return (
    <div
      className={cn(
        "px-4 py-3 bg-background rounded-xl shadow-xs border border-input/70 w-full",
        className,
      )}
      {...props}
    >
      {isPending ? <StatsCardSkeleton /> : children}
    </div>
  );
};

const StatsCardSkeleton = () => (
  <div>
    <div className="flex items-center justify-between gap-2">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
    <Skeleton className="h-5 w-16 rounded" />
    <Skeleton className="h-2 w-32 rounded mt-1" />
  </div>
);

export const StatsCardHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex items-center justify-between gap-2 mb-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const StatsCardTitle = ({
  children,
  className,
  ...props
}: ComponentProps<"h3">) => {
  return (
    <h3 className={cn("font-normal text-base", className)} {...props}>
      {children}
    </h3>
  );
};

export const StatsCardValue = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div className={cn("font-bold text-2xl text-right", className)} {...props}>
      {children}
    </div>
  );
};

export const StatsCardCaption = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "font-normal text-xs text-muted-foreground mt-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
