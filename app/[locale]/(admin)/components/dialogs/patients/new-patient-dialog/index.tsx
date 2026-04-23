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
import { useCreatePatient } from "@/hooks/api/patients";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { NewPatientInput, newPatientSchema } from "./index.schema";

export const NewPatientDialog = ({ onSuccess }: { onSuccess?: () => void }) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    clearErrors,
    setError,
  } = useForm<NewPatientInput>({
    resolver: zodResolver(newPatientSchema),
  });

  const createPatient = useCreatePatient();
  const queryClient = useQueryClient();

  const onSubmit = (data: NewPatientInput) => {
    const payload = {
      ...data,
      ...(data.phone?.trim() !== "" ? { phone: data?.phone } : {}),
    };

    createPatient.mutate(payload, {
      onError: (error) => {
        if (error?.errorFields) {
          Object.keys(error.errorFields).forEach((field) => {
            setError(field as keyof NewPatientInput, {
              type: "server",
              message: error.errorFields?.[field][0],
            });
          });
        }
      },
      onSuccess: async (res) => {
        toast.success(res.message);
        onSuccess?.();

        await queryClient.invalidateQueries({ queryKey: ["patients"] });
        await queryClient.invalidateQueries({ queryKey: ["statistics"] });
        await queryClient.invalidateQueries({ queryKey: ["timeline"] });
      },
    });
  };

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة مريض جديد</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">اسم المريض</Label>
            <Input
              {...register("name")}
              id="fullName"
              placeholder="الاسم الثلاثي..."
              size="sm"
              autoComplete="off"
              spellCheck="false"
              error={errors?.name?.message ? [errors?.name?.message] : []}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">رقم الهاتف (اختياري)</Label>
            <Input
              {...register("phone")}
              id="phone"
              type="tel"
              dir="rtl"
              placeholder="0770..."
              size="sm"
              error={errors?.phone?.message ? [errors?.phone?.message] : []}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cardId">المعرف (ID)</Label>
            <Input
              {...register("cardId")}
              id="cardId"
              placeholder="رقم الهوية..."
              size="sm"
              error={errors?.cardId?.message ? [errors?.cardId?.message] : []}
            />
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button type="submit" disabled={createPatient.isPending}>
            إنشاء
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
