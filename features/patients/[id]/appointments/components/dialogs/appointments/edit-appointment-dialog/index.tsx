'use client'
import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Appointment,
  appointmentStatusValues,
  UpdateAppointmentInput,
  updateAppointmentSchema,
  useUpdateAppointment,
} from "@/features/patients/[id]/appointments";
import { treatmentKeys } from "@/features/patients/[id]/treatments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  BanIcon,
  CalendarClockIcon,
  CheckCircleIcon,
  ClipboardXIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const statusConfig: Record<
  (typeof appointmentStatusValues)[number],
  { label: string; icon: React.ReactNode }
> = {
  scheduled: {
    label: "مجدول",
    icon: <CalendarClockIcon className="size-4 text-blue-500" />,
  },
  completed: {
    label: "مكتمل",
    icon: <CheckCircleIcon className="size-4 text-emerald-500" />,
  },
  cancelled: {
    label: "ملغي",
    icon: <BanIcon className="size-4 text-yellow-500" />,
  },
  no_show: {
    label: "لم يحضر",
    icon: <ClipboardXIcon className="size-4 text-orange-500" />,
  },
};

// datetime-local input يحتاج هذا الشكل: "YYYY-MM-DDTHH:mm"
const toDatetimeLocal = (isoString: string) => {
  const date = new Date(isoString);
  const baghdadDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Baghdad" }),
  );
  const yyyy = baghdadDate.getFullYear();
  const MM = String(baghdadDate.getMonth() + 1).padStart(2, "0");
  const dd = String(baghdadDate.getDate()).padStart(2, "0");
  const HH = String(baghdadDate.getHours()).padStart(2, "0");
  const mm = String(baghdadDate.getMinutes()).padStart(2, "0");
  return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const UpdateAppointmentDialog = ({
  appointment,
  patientId,
  onSuccess,
}: {
  appointment?: Appointment;
  patientId: string;
  onSuccess?: () => void;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
    setError,
    control,
  } = useForm<UpdateAppointmentInput>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      appointmentDate:
        appointment && toDatetimeLocal(appointment?.appointmentDate),
      status: appointment?.status,
      clinicalNotes: appointment?.clinicalNotes ?? "",
    },
  });

  const updateAppointment = useUpdateAppointment();
  const queryClient = useQueryClient();

  const onSubmit = (data: UpdateAppointmentInput) => {
    appointment &&
      updateAppointment.mutate(
        { id: appointment.id, ...data },
        {
          onError: (error) => {
            if (error?.errorFields) {
              Object.keys(error.errorFields).forEach((field) => {
                setError(field as keyof UpdateAppointmentInput, {
                  type: "server",
                  message: error.errorFields?.[field][0],
                });
              });
            }
          },
          onSuccess: async (res) => {
            toast.success(res.message);
            onSuccess?.();

            await queryClient.invalidateQueries({ queryKey: ["appointments"] });
            await queryClient.invalidateQueries({
              queryKey: treatmentKeys.byPatient(patientId),
            });
            await queryClient.invalidateQueries({ queryKey: ["statistics"] });
            await queryClient.invalidateQueries({ queryKey: ["timeline"] });
          },
        },
      );
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>تعديل الموعد</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="appointmentDate">تاريخ الموعد</Label>
            <Input
              {...register("appointmentDate")}
              id="appointmentDate"
              type="datetime-local"
              className="justify-end"
              size="sm"
              error={
                errors?.appointmentDate?.message
                  ? [errors.appointmentDate.message]
                  : []
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">الحالة</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="status"
                    size="sm"
                    className="w-full"
                    error={
                      errors?.status?.message ? [errors.status.message] : []
                    }
                  >
                    <SelectValue placeholder="اختر حالة الموعد..." />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentStatusValues.map((status) => (
                      <SelectItem key={status} value={status}>
                        <span className="flex items-center gap-2">
                          {statusConfig[status].icon}
                          {statusConfig[status].label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clinicalNotes">الملاحظات الطبية (اختياري)</Label>
            <Textarea
              {...register("clinicalNotes")}
              id="clinicalNotes"
              placeholder="الملاحظات..."
              size="sm"
              autoComplete="off"
              spellCheck="false"
              error={
                errors?.clinicalNotes?.message
                  ? [errors.clinicalNotes.message]
                  : []
              }
            />
          </div>
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button type="submit" disabled={updateAppointment.isPending}>
            {updateAppointment.isPending ? "يرجى الانتظار..." : "حفظ التعديلات"}
          </Button>
          <DialogClose asChild>
            <Button variant="soft" type="button" onClick={() => clearErrors()}>
              إغلاق
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
