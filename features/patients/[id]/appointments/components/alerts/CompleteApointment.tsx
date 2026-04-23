import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StaticIcon } from "@/components/ui/StaticIcon";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { treatmentKeys } from "../../../treatments";
import { useUpdateAppointment } from "../../api/appointment.hook";

const schema = z.object({
  clinicalNotes: z
    .string()
    .min(1, "الملاحضات الطبية مطلوبة")
    .max(1000, "الملاحضات الطبية طويلة جدا"),
});

type SchemaInput = z.infer<typeof schema>;

export const AppointmentCompletedAlert = ({
  id,
  patientId,
  onSuccess,
}: {
  patientId?: string;
  id?: string;
  onSuccess?: () => void;
}) => {
  const {
    formState: { errors },
    setError,
    register,
    handleSubmit,
  } = useForm<SchemaInput>({ resolver: zodResolver(schema) });
  const queryClient = useQueryClient();

  const updateAppointment = useUpdateAppointment();

  const submit = (data: SchemaInput) => {
    if (!id || !patientId) {
      return toast.error("معرف الموعد و معرف المريض مطلوبان");
    }
    updateAppointment.mutate(
      {
        id,
        status: "completed",
        clinicalNotes: data?.clinicalNotes,
      },
      {
        onError: (error) => {
          toast?.error(error?.message);
          if (error?.errorFields) {
            Object.keys(error?.errorFields).forEach((field) => {
              setError(field as keyof SchemaInput, {
                type: "server",
                message: error?.errorFields?.[field][0],
              });
            });
          }
        },
        onSuccess: async (res) => {
          toast.success(res.message);
          onSuccess?.();
          await queryClient.invalidateQueries({
            queryKey: [treatmentKeys.byPatient(patientId)],
          });
          await queryClient.invalidateQueries({
            queryKey: ["appointments"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["statistics"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["timeline"],
          });
        },
      },
    );
  };

  return (
    <AlertDialogContent>
      <form onSubmit={handleSubmit(submit)}>
        <AlertDialogHeader>
          <StaticIcon
            variant={"soft"}
            theme={"success"}
            size={"lg"}
            shape={"circular"}
          >
            <CheckCircle2 />
          </StaticIcon>
          <AlertDialogTitle className="text-xl font-bold">
            إتمام الموعد الطبي
          </AlertDialogTitle>

          <AlertDialogDescription>
            هل أنت متأكد من إتمام هذا الموعد؟ يرجى كتابة الملخص الطبي أو
            الملاحظات حول حالة المريض لإنهاء الجلسة.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 space-y-2">
          <Label htmlFor="notes" className="text-right block font-semibold">
            الملاحظات الطبية <span className="text-destructive">*</span>
          </Label>
          <Textarea
            {...register("clinicalNotes")}
            id="notes"
            placeholder="اكتب التشخيص، الإجراء المتخذ، أو أي ملاحظات هامة..."
            className="resize-none"
            error={
              errors?.clinicalNotes?.message
                ? [errors?.clinicalNotes?.message]
                : []
            }
          />
        </div>

        <AlertDialogFooter>
          <Button
            theme={"primary"}
            type="submit"
            disabled={updateAppointment.isPending}
          >
            {updateAppointment.isPending ? "جاري الحفظ..." : "تأكيد الإتمام"}
          </Button>
          <AlertDialogCancel
            disabled={updateAppointment.isPending}
            type="button"
          >
            تراجع
          </AlertDialogCancel>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  );
};
