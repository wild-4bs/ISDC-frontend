import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatRelativeTime } from "@/lib/date-fns";
import { useQueryClient } from "@tanstack/react-query";
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
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { useDeleteTimelineItem } from "../../api/timeline.hook";
import {
  ActionType,
  TimelineEntityType,
  TimelineItem,
} from "../../types/index.types";

// ── maps ──────────────────────────────────────────────────────────────────

const ENTITY_ICON: Record<TimelineEntityType, ReactNode> = {
  PATIENT: <UserPlus size={14} />,
  APPOINTMENT: <CalendarCheck size={14} />,
  PROJECT: <Camera size={14} />,
  TREATMENT: <Stethoscope size={14} />,
  DOCTOR: <UserRound size={14} />,
  BLOG: <BookText size={14} />,
};

const ENTITY_LABEL: Record<TimelineEntityType, string> = {
  PATIENT: "مريض",
  APPOINTMENT: "موعد",
  PROJECT: "مشروع",
  TREATMENT: "علاج",
  DOCTOR: "طبيب",
  BLOG: "مقالة",
};

const ACTION_CONFIG: Record<
  ActionType,
  { label: string; icon: ReactNode; className: string }
> = {
  CREATE: {
    label: "إنشاء",
    icon: <UserPlus size={12} />,
    className: "text-green-600 bg-green-600/10",
  },
  UPDATE: {
    label: "تحديث",
    icon: <FilePen size={12} />,
    className: "text-muted-foreground bg-muted",
  },
  DELETE: {
    label: "حذف",
    icon: <Trash2 size={12} />,
    className: "text-destructive bg-destructive/10",
  },
};

// ── sub-components ────────────────────────────────────────────────────────

function ActionBadge({ type }: { type: ActionType }) {
  const { label, icon, className } = ACTION_CONFIG[type];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

function EntityCell({ type }: { type: TimelineEntityType }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      {ENTITY_ICON[type] ?? <Activity size={14} />}
      {ENTITY_LABEL[type] ?? type}
    </span>
  );
}

// ── component ─────────────────────────────────────────────────────────────

interface TimelineRowProps {
  item: TimelineItem;
}

export const TimelineRow = ({ item }: TimelineRowProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { mutate: deleteAction } = useDeleteTimelineItem();

  const queryClient = useQueryClient();

  const handleDelete = () => {
    setIsDeleting(true);
    deleteAction(item.id, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({ queryKey: ["timeline"] });
        toast.success(res?.message || "تم حذف العنصر بنجاح!");
        setIsDeleting(false);
      },
      onError: () => {
        setIsDeleting(false);
        toast.error("حدث خطأ أثناء الحذف.");
      },
    });
  };
  return (
    <TableRow>
      <TableCell className="font-medium text-sm">{item.title}</TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {item.targetName ?? "—"}
      </TableCell>
      <TableCell>
        <EntityCell type={item.entityType} />
      </TableCell>
      <TableCell>
        <ActionBadge type={item.actionType} />
      </TableCell>
      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
        {formatRelativeTime(item.createdAt)}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
