"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ActionType,
  TimelineEntityType,
  TimelineItem,
  useGetActionsTimeline,
} from "@/features/timeline/index.exports";
import { Link } from "@/i18n/routing";
import { formatRelativeTime } from "@/lib/date-fns";
import { cn } from "@/lib/utils";
import {
  Activity,
  BookText,
  CalendarCheck,
  Camera,
  FilePen,
  Stethoscope,
  Trash2,
  UserPlus,
  UserRound,
} from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import {
  TimelineAction,
  TimelineActionEmptyState,
  TimelineActionSkeletonList,
} from "./TimelineAction";

// Icon per entity type
const ENTITY_ICON: Record<TimelineEntityType, ReactNode> = {
  PATIENT: <UserPlus size={18} />,
  APPOINTMENT: <CalendarCheck size={18} />,
  PROJECT: <Camera size={18} />,
  TREATMENT: <Stethoscope size={18} />,
  DOCTOR: <UserRound size={18} />,
  BLOG: <BookText size={18} />,
};

// Theme per action type
const ACTION_THEME: Record<
  ActionType,
  "primary" | "secondary" | "danger" | "success"
> = {
  CREATE: "success",
  UPDATE: "secondary",
  DELETE: "danger",
};

// Fallback icon per action type (used when entityType is unknown)
const ACTION_ICON: Record<ActionType, ReactNode> = {
  CREATE: <UserPlus size={18} />,
  UPDATE: <FilePen size={18} />,
  DELETE: <Trash2 size={18} />,
};

function resolveConfig(action: TimelineItem) {
  return {
    icon: ENTITY_ICON[action.entityType] ?? ACTION_ICON[action.actionType] ?? (
      <Activity size={18} />
    ),
    theme: ACTION_THEME[action.actionType] ?? "primary",
  };
}

export const ActionsTimeline = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data, isPending } = useGetActionsTimeline({ limit: 4 });

  return (
    <Card {...props} className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-lg text-right whitespace-nowrap">
          سجل الأحداث
        </CardTitle>
        <Link href="/dashboard/timeline">
          <CardAction size="sm" variant="ghost" className="text-xs">
            عرض الكل
          </CardAction>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isPending ? (
          <TimelineActionSkeletonList />
        ) : (
          data &&
          data?.payload?.length > 0 &&
          data?.payload?.map((action: TimelineItem) => {
            const { icon, theme } = resolveConfig(action);
            return (
              <TimelineAction
                key={action.id}
                title={action.title}
                targetName={action.targetName}
                createdAt={formatRelativeTime(action.createdAt)}
                icon={icon}
                theme={theme}
              />
            );
          })
        )}

        {!isPending && data && data?.payload?.length < 1 && (
          <TimelineActionEmptyState />
        )}
      </CardContent>
    </Card>
  );
};
