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
import { Textarea } from "@/components/ui/textarea";
import {
  projectKeys,
  useCreateProject,
} from "@/features/projects/api/projects.hook";
import { useUploadImages } from "@/hooks/api/files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  NewProjectInput,
  newProjectSchema,
} from "../../schemas/create-project.schema";

interface Props {
  onSuccess?: () => void;
}

export const NewProjectDialog = ({ onSuccess }: Props) => {
  const [files, setFiles] = useState<{
    imageBefore?: File | null;
    imageAfter?: File | null;
  }>({});
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<NewProjectInput>({
    resolver: zodResolver(newProjectSchema),
  });

  const queryClient = useQueryClient();
  const createProject = useCreateProject();
  const uploadImages = useUploadImages();

  const onSubmit = (data: NewProjectInput) => {
    const formData = new FormData();
    if (!files.imageAfter) {
      setError("imageAfter", {
        type: "server",
        message: "صورة ما قبل المشرو مطلوبة",
      });
    }
    if (!files.imageBefore) {
      setError("imageAfter", {
        type: "server",
        message: "صورة ما بعد المشرو مطلوبة",
      });
    }
    formData.append("imageBefore", files.imageBefore as File);
    formData.append("imageAfter", files.imageAfter as File);

    uploadImages
      .mutateAsync(formData)
      .then((res) => {
        createProject.mutate(
          {
            ...data,
            imageBefore:
              res.payload.find((f) => f.fieldKey === "imageBefore")?.url || "",
            imageAfter:
              res.payload.find((f) => f.fieldKey === "imageAfter")?.url || "",
          },
          {
            onSuccess: async (res) => {
              toast.success(res.message || "تم إضافة الحالة بنجاح");
              reset();
              clearErrors();
              onSuccess?.();
              await queryClient.invalidateQueries({
                queryKey: projectKeys.infinite(),
              });
              await queryClient.invalidateQueries({ queryKey: ["statistics"] });
              await queryClient.invalidateQueries({ queryKey: ["timeline"] });
            },
            onError: (error: any) => {
              if (error?.errorFields) {
                Object.keys(error.errorFields).forEach((field) => {
                  setError(field as keyof NewProjectInput, {
                    type: "server",
                    message: error.errorFields[field][0],
                  });
                });
              }
            },
          },
        );
      })
      .catch((err) => toast.error(err?.message));
  };

  const isUploading = uploadImages?.isPending;
  const isCreating = createProject.isPending;

  return (
    <DialogContent className="sm:max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة حالة جديدة</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label>العنوان</Label>
            <Input
              {...register("title")}
              placeholder="مثلاً: حالة فينير تجميلي - 8 سنين علوية"
              error={errors.title?.message ? [errors.title.message] : []}
            />
          </div>

          <div className="grid gap-2">
            <Label>التصنيف</Label>
            <Input
              {...register("category")}
              placeholder="مثلاً: تجميل الأسنان"
              error={errors.category?.message ? [errors.category.message] : []}
            />
          </div>

          <div className="grid gap-2">
            <Label>الوصف</Label>
            <Textarea
              {...register("description")}
              placeholder="وصف الحالة والإجراءات المستخدمة..."
              className="max-h-[200px]"
              error={
                errors.description?.message ? [errors.description.message] : []
              }
            />
          </div>
          <div className="flex h-40">
            <FileHandler
              onValueChange={(v) => {
                setFiles((prev) => ({ ...prev, imageBefore: v }));
                if (v) clearErrors("imageBefore");
                else
                  setError("imageBefore", {
                    type: "server",
                    message: "صورة ما قبل المشروع مطلوبة",
                  });
              }}
              className="w-full rounded-l-none"
              variant={errors?.imageBefore?.message ? "danger" : "default"}
            >
              <FileHandlerImage className="rounded-l-none" />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={36} strokeWidth={1.2} />
                </FileHandlerIcon>
                <FileHandlerLabel>صورة قبل</FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>
            <FileHandler
              onValueChange={(v) => {
                setFiles((prev) => ({ ...prev, imageAfter: v }));
                if (v) clearErrors("imageAfter");
                else
                  setError("imageAfter", {
                    type: "server",
                    message: "صورة ما بعد المشروع مطلوبة",
                  });
              }}
              className="w-full rounded-r-none border-r-0"
              variant={errors?.imageAfter?.message ? "danger" : "default"}
            >
              <FileHandlerImage className="h-full rounded-r-none" />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={36} strokeWidth={1.2} />
                </FileHandlerIcon>
                <FileHandlerLabel>صورة بعد</FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>
          </div>
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button type="submit" disabled={isUploading || isCreating}>
            {isUploading
              ? "يتم رفع الصور..."
              : isCreating
                ? "يتم الاضافة..."
                : "اضافة الحالة"}
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
