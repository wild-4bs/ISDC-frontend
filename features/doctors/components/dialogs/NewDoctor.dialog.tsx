"use client";

import {
  FileHandler,
  FileHandlerEmpty,
  FileHandlerIcon,
  FileHandlerImage,
  FileHandlerLabel,
} from "@/components/file-handler";
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
import { useUploadImages } from "@/hooks/api/files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { doctorKeys, useCreateDoctor } from "../../api/doctors.hook";
import { DoctorInput, createDoctorSchema } from "../../schemas/index.schema";

interface Props {
  onSuccess?: () => void;
}

export const NewDoctorDialog = ({ onSuccess }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<DoctorInput>({
    resolver: zodResolver(createDoctorSchema),
  });

  const queryClient = useQueryClient();
  const createDoctor = useCreateDoctor();
  const uploadImages = useUploadImages();

  const onSubmit = async (data: DoctorInput) => {
    if (!file) {
      setError("image", { type: "manual", message: "صورة الطبيب مطلوبة" });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadRes = await uploadImages.mutateAsync(formData);
      const imageUrl =
        uploadRes.payload.find((f) => f.fieldKey === "image")?.url || "";

      createDoctor.mutate(
        {
          ...data,
          image: imageUrl,
        },
        {
          onSuccess: async (res) => {
            reset();
            setFile(null);
            clearErrors();
            await queryClient.invalidateQueries({
              queryKey: doctorKeys.infinite(),
            });
            toast.success(res.message || "تم إضافة الطبيب بنجاح");
            onSuccess?.();
            await queryClient.invalidateQueries({ queryKey: ["timeline"] });
          },
          onError: (error: any) => {
            if (error?.errorFields) {
              Object.keys(error.errorFields).forEach((field) => {
                setError(field as keyof DoctorInput, {
                  type: "server",
                  message: error.errorFields[field][0],
                });
              });
            }
          },
        },
      );
    } catch (err: any) {
      toast.error(err?.message || "حدث خطأ أثناء رفع الصورة");
    }
  };

  const isUploading = uploadImages.isPending;
  const isCreating = createDoctor.isPending;

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة عضو جديد للفريق</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          {/* حقل رفع الصورة */}
          <div className="flex justify-center">
            <FileHandler
              onValueChange={(v) => {
                setFile(v);
                if (v) clearErrors("image");
              }}
              variant={errors.image?.message ? "danger" : "default"}
            >
              <FileHandlerImage className="object-cover" />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={24} />
                </FileHandlerIcon>
                <FileHandlerLabel className="text-[10px]">
                  الصورة
                </FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>
          </div>
          {errors.image?.message && (
            <p className="text-xs text-destructive text-center">
              {errors.image.message}
            </p>
          )}

          <div className="grid gap-2">
            <Label>اسم الطبيب / الموظف</Label>
            <Input
              {...register("name")}
              placeholder="مثلاً: د. محمد علي"
              error={errors.name?.message ? [errors.name.message] : []}
            />
          </div>

          <div className="grid gap-2">
            <Label>التخصص / المسمى الوظيفي</Label>
            <Input
              {...register("profession")}
              placeholder="مثلاً: إخصائي تقويم أسنان"
              error={
                errors.profession?.message ? [errors.profession.message] : []
              }
            />
          </div>
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button type="submit" disabled={isUploading || isCreating}>
            {isUploading
              ? "جاري رفع الصورة..."
              : isCreating
                ? "جاري الإضافة..."
                : "إضافة للفريق"}
          </Button>
          <DialogClose asChild>
            <Button variant="soft" type="button" onClick={() => clearErrors()}>
              إلغاء
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
