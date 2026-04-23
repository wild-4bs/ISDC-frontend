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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  appointmentStatusValues,
  NewAppointmentInput,
  newAppointmentSchema,
  useCreateAppointment,
} from "@/features/patients/[id]/appointments";
import {
  treatmentKeys,
  useGetTreatmentsByPatient,
} from "@/features/patients/[id]/treatments";
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

export const NewAppointmentDialog = ({
  onSuccess,
  patientId,
}: {
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
  } = useForm<NewAppointmentInput>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      status: "scheduled",
    },
  });

  const createAppointment = useCreateAppointment();
  const queryClient = useQueryClient();

  const {
    data: treatmentsData,
    isPending: isTreatmentsPending,
    refetch,
  } = useGetTreatmentsByPatient({ patientId }, { enabled: false });

  const onSubmit = (data: NewAppointmentInput) => {
    createAppointment.mutate(data, {
      onError: (error) => {
        if (error?.errorFields) {
          Object.keys(error.errorFields).forEach((field) => {
            setError(field as keyof NewAppointmentInput, {
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
    });
  };
  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة موعد جديد</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="treatmentId">العلاج</Label>
            <Controller
              control={control}
              name="treatmentId"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  onOpenChange={(open) => open && !treatmentsData && refetch()}
                >
                  <SelectTrigger
                    className="h-full! w-full"
                    error={
                      errors?.treatmentId?.message
                        ? [errors?.treatmentId?.message]
                        : []
                    }
                  >
                    <SelectValue placeholder="الخطة العلاجية" />
                  </SelectTrigger>
                  <SelectContent>
                    {isTreatmentsPending && (
                      <Spinner className="mx-auto size-6 text-primary my-2" />
                    )}
                    {!isTreatmentsPending &&
                      treatmentsData?.payload?.map((treatment) => (
                        <SelectItem key={treatment.id} value={treatment.id}>
                          {treatment.serviceType}
                        </SelectItem>
                      ))}
                    {!isTreatmentsPending &&
                      treatmentsData &&
                      treatmentsData?.payload?.length < 1 && (
                        <span className="mt-4 text-sm w-full inline-block text-muted-foreground text-center">
                          لا يوجد خطط علاجية
                        </span>
                      )}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

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
          <Button type="submit" disabled={createAppointment.isPending}>
            {createAppointment?.isPending ? "يرجى الانتضار..." : "إنشاء"}
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
