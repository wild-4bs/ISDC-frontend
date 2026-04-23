// ActiveTreatmentRow.tsx
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { TREATMENT_STATUS_MAP } from "@/constants/treatments.constants";
import {
  FullTreatment,
  treatmentKeys,
  TreatmentStatus,
  useDeleteTreatment,
  useUpdateTreatment,
} from "@/features/patients/[id]/treatments";
import { Link } from "@/i18n/routing";
import { useQueryClient } from "@tanstack/react-query";
import {
  BanIcon,
  CheckCircleIcon,
  Folder,
  MoreVertical,
  PauseCircleIcon,
  PlayCircleIcon,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type ActiveTreatmentRowProps = {
  treatment: FullTreatment;
  patientId: string;
  id: string;
};

export const ActiveTreatmentRow = ({
  treatment,
  patientId,
  id,
}: ActiveTreatmentRowProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteTreatment = useDeleteTreatment();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateTreatment();

  const invalidate = async () =>
    Promise.all([
      queryClient.invalidateQueries({
        queryKey: treatmentKeys.byPatient(patientId),
      }),
      queryClient.invalidateQueries({ queryKey: ["treatments"] }),
    ]);

  const handleDelete = () => {
    deleteTreatment.mutate(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        invalidate();
      },
    });
  };

  const updateStatus = (status: TreatmentStatus) => {
    mutate(
      { id: id, status },

      {
        onSuccess: async (res) => {
          toast.success(res?.message);
          setIsOpen(false);
          await invalidate();
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
      <TableCell>{treatment?.patient?.name}</TableCell>
      <TableCell>{treatment?.serviceType}</TableCell>
      <TableCell>{treatment?.appointmentsCount}</TableCell>
      <TableCell>
        {treatment.completedAppointmentsCount}{" "}
        <span className="text-muted-foreground">
          / {treatment.expectedSessions ?? "∞"}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          theme={TREATMENT_STATUS_MAP[treatment.status].theme}
          variant="soft"
        >
          {TREATMENT_STATUS_MAP[treatment.status].label}
        </Badge>
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
                disabled={treatment.status === "active"}
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
                className="justify-start text-foreground gap-2 h-9 hover:text-destructive!"
                onClick={handleDelete}
                disabled={deleteTreatment.isPending}
              >
                <Trash2 size={16} className="text-rose-400" />
                <span>حذف الخطة</span>
              </Button>
              <Link href={`/dashboard/treatments/${id}`}>
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
