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
import {
  FullTreatment,
  TreatmentByPatient,
  treatmentKeys,
  treatmentStatusValues,
  UpdateTreatmentInput,
  updateTreatmentSchema,
  useUpdateTreatment,
} from "@/features/patients/[id]/treatments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  ActivityIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const statusConfig: Record<
  (typeof treatmentStatusValues)[number],
  { label: string; icon: React.ReactNode }
> = {
  active: {
    label: "نشط",
    icon: <ActivityIcon className="size-4 text-green-500" />,
  },
  completed: {
    label: "مكتمل",
    icon: <CheckCircleIcon className="size-4 text-blue-500" />,
  },
  on_hold: {
    label: "معلق",
    icon: <PauseCircleIcon className="size-4 text-yellow-500" />,
  },
  cancelled: {
    label: "ملغي",
    icon: <XCircleIcon className="size-4 text-red-500" />,
  },
};

export const UpdateTreatmentDialog = ({
  onSuccess,
  treatment,
}: {
  onSuccess?: () => void;
  treatment: TreatmentByPatient;
}) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
    setError,
    control,
  } = useForm<UpdateTreatmentInput>({
    resolver: zodResolver(updateTreatmentSchema),
    defaultValues: {
      serviceType: treatment.serviceType,
      expectedSessions: treatment.expectedSessions,
      status: treatment.status,
    },
  });

  const updateTreatment = useUpdateTreatment();
  const queryClient = useQueryClient();

  const onSubmit = (data: UpdateTreatmentInput) => {
    updateTreatment.mutate(
      { id: treatment.id, ...data },
      {
        onError: (error) => {
          if (error?.errorFields) {
            Object.keys(error.errorFields).forEach((field) => {
              setError(field as keyof UpdateTreatmentInput, {
                type: "server",
                message: error.errorFields?.[field][0],
              });
            });
          }
        },
        onSuccess: async (res) => {
          toast.success(res.message);
          onSuccess?.();

          await queryClient.invalidateQueries({
            queryKey: treatmentKeys.byPatient(treatment.patientId),
          });
          await queryClient.invalidateQueries({ queryKey: ["patients"] });
          await queryClient.invalidateQueries({ queryKey: ["treatments"] });
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
          <DialogTitle>تعديل خطة العلاج</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="serviceType">نوع الخدمة</Label>
            <Input
              {...register("serviceType")}
              id="serviceType"
              placeholder="نوع العلاج..."
              size="sm"
              autoComplete="off"
              spellCheck="false"
              error={
                errors?.serviceType?.message ? [errors.serviceType.message] : []
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>حالة العلاج</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  {...register("status")}
                  value={field.value}
                >
                  <SelectTrigger
                    id="status"
                    size="sm"
                    className="w-full"
                    error={
                      errors?.status?.message ? [errors.status.message] : []
                    }
                  >
                    <SelectValue placeholder="اختر حالة العلاج..." />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentStatusValues.map((status) => (
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
            <Label htmlFor="expectedSessions">عدد الجلسات المتوقعة</Label>
            <Input
              {...register("expectedSessions", { valueAsNumber: true })}
              id="expectedSessions"
              type="number"
              placeholder="عدد الجلسات..."
              size="sm"
              error={
                errors?.expectedSessions?.message
                  ? [errors.expectedSessions.message]
                  : []
              }
            />
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button type="submit" disabled={updateTreatment.isPending}>
            حفظ التعديلات
          </Button>
          <DialogClose asChild>
            <Button
              variant={"soft"}
              type="button"
              onClick={() => clearErrors()}
            >
              إغلاق
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
