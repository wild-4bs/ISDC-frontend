import { Skeleton } from "@/components/ui/skeleton";
import { StaticIcon } from "@/components/ui/StaticIcon";
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { ReactNode } from "react";

export interface TimelineActionType {
  title: string;
  targetName?: string;
  createdAt: string;
  icon: ReactNode;
  theme?: "primary" | "secondary" | "danger" | "success";
}

export const TimelineAction = ({
  title,
  targetName,
  createdAt,
  icon,
  theme,
}: TimelineActionType) => {
  return (
    <div className="flex gap-2 not-last:border-b border-b-input not-last:pb-2">
      <StaticIcon theme={theme}>{icon}</StaticIcon>
      <div>
        <div className={cn({ "mb-2": targetName })}>
          <h3 className="font-medium text-sm leading-tight">{title}</h3>
          {targetName && (
            <dl className="text-muted-foreground text-xs font-normal flex gap-1">
              <dd>{targetName}</dd>
            </dl>
          )}
        </div>
        <dl className="text-muted-foreground text-xs font-normal flex gap-1">
          <dt>منذ:</dt>
          <dd>{createdAt}</dd>
        </dl>
      </div>
    </div>
  );
};

export const TimelineActionSkeleton = () => (
  <div className="flex gap-2 not-last:border-b border-b-input not-last:pb-2">
    <Skeleton className="size-9 shrink-0 rounded-lg" />
    <div className="flex flex-col justify-between py-0.5 w-full">
      <Skeleton className="h-3.5 w-2/3 rounded" />
      <Skeleton className="h-3 w-1/3 rounded" />
    </div>
  </div>
);

export const TimelineActionSkeletonList = ({
  count = 5,
}: {
  count?: number;
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <TimelineActionSkeleton key={i} />
    ))}
  </>
);

export const TimelineActionEmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
    <FolderOpen size={32} strokeWidth={1.5} />
    <p className="font-medium text-sm">لا توجد أحداث مسجلة بعد</p>
  </div>
);
