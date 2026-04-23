import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "@/i18n/routing";
import { useQueryClient } from "@tanstack/react-query";
import {
  BanIcon,
  CheckCircleIcon,
  Folder,
  MoreVertical,
  PauseCircleIcon,
  PencilIcon,
  PlayCircleIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  treatmentKeys,
  useDeleteTreatment,
  useUpdateTreatment,
} from "../../api/treatments.hook";
import {
  TreatmentByPatient,
  TreatmentStatus,
} from "../../types/treatments.type";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const statusConfig: Record<
  TreatmentStatus,
  { label: string; className: string }
> = {
  active: {
    label: "نشط",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  completed: {
    label: "مكتمل",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  on_hold: {
    label: "معلق",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  cancelled: {
    label: "ملغي",
    className: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface TreatmentRowProps {
  treatment: TreatmentByPatient;
  onEdit?: () => void;
}

export const TreatmentRow = ({ treatment, onEdit }: TreatmentRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteTreatment = useDeleteTreatment();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateTreatment();

  const config = statusConfig[treatment.status];

  const invalidate = async () =>
    await queryClient.invalidateQueries({
      queryKey: treatmentKeys.byPatient(treatment.patientId),
    });

  const handleDelete = () => {
    deleteTreatment.mutate(treatment.id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        invalidate();
      },
    });
  };

  const updateStatus = (status: TreatmentStatus) => {
    mutate(
      { id: treatment.id, status },

      {
        onSuccess: (res) => {
          toast.success(res?.message);
          setIsOpen(false);
          invalidate();
        },
        onError: (error) => {
          toast.error(error?.errorFields?.status || "حدث خطأ ما.");
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{treatment.serviceType}</TableCell>
      <TableCell className="text-muted-foreground">
        {treatment.expectedSessions ?? "—"}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {treatment.appointmentsCount ?? 0}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {treatment.completedAppointmentsCount ?? 0}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(treatment.createdAt).toLocaleDateString("ar-IQ-u-nu-latn", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-foreground"
              >
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-1 w-52" align="center">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                تغيير الحالة
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={isPending || treatment.status === "active"}
                onClick={() => updateStatus("active")}
              >
                <PlayCircleIcon size={16} className="text-emerald-500" />
                <span>تفعيل</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={
                  isPending ||
                  treatment.status === "completed" ||
                  treatment.status === "cancelled"
                }
                onClick={() => updateStatus("completed")}
              >
                <CheckCircleIcon size={16} className="text-blue-500" />
                <span>مكتمل</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={
                  isPending ||
                  treatment.status === "on_hold" ||
                  treatment.status === "cancelled"
                }
                onClick={() => updateStatus("on_hold")}
              >
                <PauseCircleIcon size={16} className="text-amber-500" />
                <span>تعليق</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={isPending || treatment.status === "cancelled"}
                onClick={() => updateStatus("cancelled")}
              >
                <BanIcon size={16} className="text-rose-500" />
                <span>إلغاء</span>
              </Button>

              <div className="my-1 border-t border-input" />

              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                إدارة الخطة
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                onClick={onEdit}
              >
                <PencilIcon size={16} className="text-amber-400" />
                <span>تعديل الخطة</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9 hover:text-destructive!"
                onClick={handleDelete}
                disabled={deleteTreatment.isPending}
              >
                <Trash2 size={16} className="text-rose-400" />
                <span>حذف الخطة</span>
              </Button>
              <Link href={`/dashboard/treatments/${treatment.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-foreground gap-2 h-9 w-full"
                >
                  <Folder size={16} />
                  <span>عرض التفاصيل</span>
                </Button>
              </Link>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};
