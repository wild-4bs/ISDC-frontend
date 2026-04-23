import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Appointment,
  APPOINTMENT_STATUS_CONFIG,
  AppointmentStatus,
  useDeleteAppointment,
  useUpdateAppointment,
} from "@/features/patients/[id]/appointments";
import { useQueryClient } from "@tanstack/react-query";
import {
  BanIcon,
  CheckCircleIcon,
  ClipboardXIcon,
  MoreVertical,
  PencilIcon,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { AlertType } from ".";

export const AppointmentRow = ({
  appointment,
  onEdit,
  openAlert,
}: {
  appointment: Appointment;
  onEdit?: () => void;
  openAlert: (type: AlertType, appointment: Appointment) => void;
}) => {
  const deleteAppointment = useDeleteAppointment();
  const updateAppointment = useUpdateAppointment();
  const queryClient = useQueryClient();

  const config = APPOINTMENT_STATUS_CONFIG[appointment.status];

  const handleDelete = () =>
    deleteAppointment.mutate(appointment.id, {
      onSuccess: (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries({
          queryKey: ["appointments"],
        });
      },
    });

  const updateStatus = (status: AppointmentStatus) => {
    if (status == "completed" && appointment.status != "cancelled") {
      openAlert("appointment-completed", appointment);
      return;
    }
    updateAppointment.mutate(
      { id: appointment?.id, status },
      {
        onSuccess: (res) => {
          toast.success(res?.message);
          queryClient.invalidateQueries({
            queryKey: ["appointments"],
          });
        },
        onError: (error) => {
          toast.error(error?.errorFields?.status || "حدث خطأ ما.");
        },
      },
    );
  };

  const isPending = updateAppointment.isPending;
  const isDeleting = deleteAppointment.isPending;
  const isAppointmentCompleted = appointment.status == "completed";
  const isAppointmentCancelled = appointment.status == "cancelled";
  const isAppointmentNoShow = appointment.status == "no_show";

  return (
    <TableRow>
      <TableCell className="font-medium">
        {new Date(appointment.appointmentDate).toLocaleDateString(
          "ar-IQ-u-nu-latn",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          },
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(appointment.appointmentDate).toLocaleTimeString(
          "ar-IQ-u-nu-latn",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )}
      </TableCell>
      <TableCell className="max-w-64 truncate font-medium">
        {appointment?.treatment?.serviceType}
      </TableCell>
      <TableCell className="max-w-64 truncate text-muted-foreground">
        {`الجلسة ${appointment?.sessionNumber} من ${appointment?.treatment?.expectedSessions}`}
      </TableCell>
      <TableCell className="max-w-64 truncate text-muted-foreground">
        {appointment?.clinicalNotes ?? "—"}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Popover>
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
                disabled={
                  isPending || isAppointmentCompleted || isAppointmentCancelled
                }
                onClick={() => updateStatus("completed")}
              >
                <CheckCircleIcon size={16} className="text-emerald-500" />
                <span>مكتمل</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={
                  isPending || isAppointmentCancelled || isAppointmentCompleted
                }
                onClick={() => updateStatus("cancelled")}
              >
                <BanIcon size={16} className="text-yellow-500" />
                <span>إلغاء</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                disabled={
                  isPending ||
                  isAppointmentNoShow ||
                  isAppointmentCancelled ||
                  isAppointmentCompleted
                }
                onClick={() => updateStatus("no_show")}
              >
                <ClipboardXIcon size={16} className="text-orange-500" />
                <span>لم يحضر</span>
              </Button>

              <div className="my-1 border-t border-input" />

              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                إدارة الموعد
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                onClick={onEdit}
                disabled={isAppointmentCompleted}
              >
                <PencilIcon size={16} className="text-amber-400" />
                <span>تعديل الموعد</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9 hover:text-destructive!"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 size={16} className="text-rose-400" />
                <span>حذف الموعد</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};
