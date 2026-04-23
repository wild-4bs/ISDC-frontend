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
import { API_URL } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { doctorKeys, useUpdateDoctor } from "../../api/doctors.hook";
import { createDoctorSchema, DoctorInput } from "../../schemas/index.schema";
import { Doctor } from "../../types/index.types";

interface Props {
  doctor?: Doctor;
  onSuccess?: () => void;
}

export const EditDoctorDialog = ({ doctor, onSuccess }: Props) => {
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
    defaultValues: {
      name: doctor?.name,
      profession: doctor?.profession,
      image: doctor?.image,
    },
  });

  const queryClient = useQueryClient();
  const updateDoctor = useUpdateDoctor();
  const uploadImages = useUploadImages();

  const onSubmit = async (data: DoctorInput) => {
    if (!doctor) {
      return toast.warning("معرف الطبيب مطلوب");
    }
    const doUpdate = (imageUrl?: string) => {
      updateDoctor.mutate(
        {
          id: doctor.id,
          data: {
            ...data,
            ...(imageUrl && { image: imageUrl }),
          },
        },
        {
          onSuccess: async (res) => {
            reset();
            setFile(null);
            clearErrors();
            await queryClient.invalidateQueries({
              queryKey: doctorKeys.infinite(),
            });
            toast.success(res.message || "تم تحديث بيانات الطبيب بنجاح");
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
    };

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const uploadRes = await uploadImages.mutateAsync(formData);
        const imageUrl = uploadRes.payload.find(
          (f) => f.fieldKey === "image",
        )?.url;
        doUpdate(imageUrl);
      } catch (err: any) {
        toast.error(err?.message || "حدث خطأ أثناء رفع الصورة");
      }
    } else {
      doUpdate();
    }
  };

  const isUploading = uploadImages.isPending;
  const isUpdating = updateDoctor.isPending;

  return (
    <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>تعديل بيانات الطبيب</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="flex justify-center">
            <FileHandler
              onValueChange={(v) => {
                setFile(v);
                if (v) clearErrors("image");
              }}
              variant={errors.image?.message ? "danger" : "default"}
            >
              <FileHandlerImage
                className="object-cover"
                defaultImage={`${API_URL}${doctor?.image}`}
              />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={24} />
                </FileHandlerIcon>
                <FileHandlerLabel className="text-[10px]">
                  {doctor?.image ? "تغيير الصورة" : "الصورة"}
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
              autoFocus
              error={errors.name?.message ? [errors.name.message] : []}
              autoComplete="off"
              autoCorrect="off"
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
          <Button type="submit" disabled={isUploading || isUpdating}>
            {isUploading
              ? "جاري رفع الصورة..."
              : isUpdating
                ? "جاري الحفظ..."
                : "حفظ التعديلات"}
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
