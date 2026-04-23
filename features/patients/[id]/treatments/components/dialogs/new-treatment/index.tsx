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
  NewTreatmentInput,
  newTreatmentSchema,
  TREATMENT_STATUS_CONFIG,
  treatmentKeys,
  treatmentStatusValues,
  useCreateTreatment,
} from "@/features/patients/[id]/treatments";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewTreatmentDialogProps {
  patientId?: string;
  onSuccess?: () => void;
}

export const NewTreatmentDialog = ({
  patientId,
  onSuccess,
}: NewTreatmentDialogProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
    setError,
    control,
  } = useForm<NewTreatmentInput>({
    resolver: zodResolver(newTreatmentSchema),
    defaultValues: { status: "active" },
  });

  const createTreatment = useCreateTreatment();
  const queryClient = useQueryClient();

  const invalidateAll = async (id: string) => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: treatmentKeys.byPatient(id),
      }),
      queryClient.invalidateQueries({ queryKey: treatmentKeys.all() }),
      queryClient.invalidateQueries({ queryKey: ["patients"] }),
      queryClient.invalidateQueries({ queryKey: ["statistics"] }),
      queryClient.invalidateQueries({ queryKey: ["timeline"] }),
    ]);
  };

  const onSubmit = (data: NewTreatmentInput) => {
    if (!patientId) {
      return toast.error("معرف المريض مطلوب");
    }
    createTreatment.mutate(
      { ...data, patientId },
      {
        onError: (error) => {
          if (error?.errorFields) {
            Object.keys(error.errorFields).forEach((field) => {
              setError(field as keyof NewTreatmentInput, {
                type: "server",
                message: error.errorFields?.[field][0],
              });
            });
          }
        },
        onSuccess: async (res) => {
          toast.success(res.message);
          onSuccess?.();
          await invalidateAll(patientId);
        },
      },
    );
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة علاج جديد</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <Label htmlFor="serviceType">نوع الخدمة</Label>
              <Input
                {...register("serviceType")}
                id="serviceType"
                placeholder="نوع العلاج..."
                size="sm"
                autoComplete="off"
                spellCheck="false"
                error={
                  errors?.serviceType?.message
                    ? [errors.serviceType.message]
                    : []
                }
              />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="status">حالة العلاج</Label>
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
                      <SelectValue placeholder="الحالة..." />
                    </SelectTrigger>
                    <SelectContent>
                      {treatmentStatusValues.map((status) => (
                        <SelectItem key={status} value={status}>
                          <span className="flex items-center gap-2">
                            {TREATMENT_STATUS_CONFIG[status].icon}
                            {TREATMENT_STATUS_CONFIG[status].label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="grid gap-1">
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

        <DialogFooter className="gap-2 pt-2">
          <Button type="submit" size="sm" disabled={createTreatment.isPending}>
            إنشاء
          </Button>
          <DialogClose asChild>
            <Button
              variant="soft"
              size="sm"
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
