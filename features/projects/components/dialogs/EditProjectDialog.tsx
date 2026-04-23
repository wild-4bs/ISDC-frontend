// UpdateProjectDialog.tsx
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
import { Project } from "@/features/projects";
import { useUploadImages } from "@/hooks/api/files";
import { API_URL } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { projectKeys, useUpdateProject } from "../../api/projects.hook";
import {
  UpdateProjectInput,
  updateProjectSchema,
} from "../../schemas/edit-project.schema";

interface Props {
  project?: Project;
  onSuccess?: () => void;
}

export const EditProjectDialog = ({ project, onSuccess }: Props) => {
  // null  = no new file picked, keep existing
  // File  = user picked a new file, upload it
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
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      title: project?.title,
      category: project?.category,
      description: project?.description ?? "",
      imageBefore: project?.imageBefore,
      imageAfter: project?.imageAfter,
    },
  });

  const queryClient = useQueryClient();
  const updateProject = useUpdateProject();
  const uploadImages = useUploadImages();

  const onSubmit = async (data: UpdateProjectInput) => {
    if (!project) {
      return toast.warning("معرف المشروع مطلوب");
    }
    const hasNewBefore = !!files.imageBefore;
    const hasNewAfter = !!files.imageAfter;

    // Start with existing URLs, overwrite only if a new file was picked
    let imageBefore = project.imageBefore;
    let imageAfter = project.imageAfter;

    if (hasNewBefore || hasNewAfter) {
      const formData = new FormData();
      if (hasNewBefore)
        formData.append("imageBefore", files.imageBefore as File);
      if (hasNewAfter) formData.append("imageAfter", files.imageAfter as File);

      try {
        const res = await uploadImages.mutateAsync(formData);
        if (hasNewBefore) {
          imageBefore =
            res.payload.find((f) => f.fieldKey === "imageBefore")?.url ||
            imageBefore;
        }
        if (hasNewAfter) {
          imageAfter =
            res.payload.find((f) => f.fieldKey === "imageAfter")?.url ||
            imageAfter;
        }
      } catch (err: any) {
        toast.error(err?.message);
        return;
      }
    }

    updateProject.mutate(
      { id: project.id, data: { ...data, imageBefore, imageAfter } },
      {
        onSuccess: async (res) => {
          toast.success(res.message || "تم تحديث الحالة بنجاح");
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
              setError(field as keyof UpdateProjectInput, {
                type: "server",
                message: error.errorFields[field][0],
              });
            });
          }
        },
      },
    );
  };

  const isUploading = uploadImages.isPending;
  const isUpdating = updateProject.isPending;

  return (
    <DialogContent className="sm:max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>تعديل الحالة</DialogTitle>
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
              }}
              className="w-full rounded-l-none"
              variant={errors?.imageBefore?.message ? "danger" : "default"}
            >
              <FileHandlerImage
                className="rounded-l-none"
                defaultImage={
                  !files.imageBefore
                    ? `${API_URL}${project?.imageBefore}`
                    : undefined
                }
              />
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
              }}
              className="w-full rounded-r-none border-r-0"
              variant={errors?.imageAfter?.message ? "danger" : "default"}
            >
              <FileHandlerImage
                className="h-full rounded-r-none"
                defaultImage={
                  !files.imageAfter
                    ? `${API_URL}${project?.imageAfter}`
                    : undefined
                }
              />
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
          <Button type="submit" disabled={isUploading || isUpdating}>
            {isUploading
              ? "يتم رفع الصور..."
              : isUpdating
                ? "يتم التحديث..."
                : "حفظ التعديلات"}
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
