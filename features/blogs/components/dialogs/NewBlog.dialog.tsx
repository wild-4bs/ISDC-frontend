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
import { blogKeys, useCreateBlog } from "@/features/blogs/api/blogs.hook";
import { useUploadImages } from "@/hooks/api/files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BlogPostInput, blogPostSchema } from "../../schemas/index.schema";

interface Props {
  onSuccess?: () => void;
}

export const NewBlogDialog = ({ onSuccess }: Props) => {
  const [files, setFiles] = useState<{
    banner?: File | null;
    thumbnail?: File | null;
  }>({});

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostSchema),
  });

  const queryClient = useQueryClient();
  const createBlogPost = useCreateBlog();
  const uploadImages = useUploadImages();

  const onSubmit = async (data: BlogPostInput) => {
    if (!files.banner || !files.thumbnail) {
      if (!files.banner) {
        setError("banner", { type: "manual", message: "صورة البانر مطلوبة" });
      }
      if (!files.thumbnail) {
        setError("thumbnail", {
          type: "manual",
          message: "الصورة المصغرة مطلوبة",
        });
      }
      return;
    }

    const formData = new FormData();
    formData.append("banner", files.banner);
    formData.append("thumbnail", files.thumbnail);

    try {
      uploadImages
        .mutateAsync(formData)
        .then((res) => {
          createBlogPost.mutate(
            {
              ...data,
              banner:
                res.payload.find((f) => f.fieldKey === "banner")?.url || "",
              thumbnail:
                res.payload.find((f) => f.fieldKey === "thumbnail")?.url || "",
            },
            {
              onSuccess: async (response) => {
                reset();
                setFiles({});
                clearErrors();
                await queryClient.invalidateQueries({
                  queryKey: blogKeys.infinite(),
                });
                toast.success(response.message || "تم نشر المقال بنجاح");
                onSuccess?.();
                await queryClient.invalidateQueries({
                  queryKey: ["statistics"],
                });
                await queryClient.invalidateQueries({ queryKey: ["timeline"] });
              },
              onError: (error: any) => {
                if (error?.errorFields) {
                  Object.keys(error.errorFields).forEach((field) => {
                    setError(field as keyof BlogPostInput, {
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
    } catch (err: any) {
      toast.error(err?.message || "حدث خطأ أثناء رفع الصور");
    }
  };

  const isUploading = uploadImages?.isPending;
  const isCreating = createBlogPost.isPending;
  const isLoading = isUploading || isCreating;

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>إضافة مقال جديد</DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">عنوان المقال</Label>
            <Input
              id="title"
              {...register("title")}
              placeholder="مثلاً: أهمية العناية بالأسنان..."
              error={errors.title?.message ? [errors.title.message] : []}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">محتوى المقال / الوصف</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="اكتب تفاصيل المقال هنا..."
              error={
                errors.description?.message ? [errors.description.message] : []
              }
            />
          </div>

          <div className="flex max-sm:flex-col gap-2">
            <FileHandler
              onValueChange={(v) => {
                setFiles((prev) => ({ ...prev, banner: v }));
                if (v) clearErrors("banner");
              }}
              variant={errors?.banner?.message ? "danger" : "default"}
              className="flex-1"
            >
              <FileHandlerImage />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <ImageIcon size={32} strokeWidth={1.5} />
                </FileHandlerIcon>
                <FileHandlerLabel>صورة البانر (الرئيسية)</FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>

            <FileHandler
              onValueChange={(v) => {
                setFiles((prev) => ({ ...prev, thumbnail: v }));
                if (v) clearErrors("thumbnail");
              }}
              variant={errors?.thumbnail?.message ? "danger" : "default"}
              className="sm:w-40"
            >
              <FileHandlerImage />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={32} strokeWidth={1.5} />
                </FileHandlerIcon>
                <FileHandlerLabel>الصورة المصغرة</FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>
          </div>
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button type="submit" disabled={isLoading} className="min-w-[120px]">
            {isUploading
              ? "يتم رفع الصور..."
              : isCreating
                ? "يتم النشر..."
                : "نشر المقال"}
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
