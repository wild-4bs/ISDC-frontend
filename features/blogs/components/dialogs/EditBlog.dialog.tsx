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
import { blogKeys, useUpdateBlog } from "@/features/blogs/api/blogs.hook";
import { useUploadImages } from "@/hooks/api/files";
import { API_URL } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BlogPostInput, blogPostSchema } from "../../schemas/index.schema";
import { Blog } from "../../types/index.types";

interface Props {
  blog?: Blog;
  onSuccess?: () => void;
}

export const EditBlogDialog = ({ blog, onSuccess }: Props) => {
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
    defaultValues: {
      title: blog?.title,
      description: blog?.description,
      banner: blog?.banner,
      thumbnail: blog?.thumbnail,
    },
  });

  const queryClient = useQueryClient();
  const updateBlog = useUpdateBlog();
  const uploadImages = useUploadImages();

  const onSubmit = async (data: BlogPostInput) => {
    const needsUpload = files.banner || files.thumbnail;
    if (!blog) {
      return toast.warning("معرف المقال مطلوب");
    }

    const doUpdate = (urls: { banner?: string; thumbnail?: string }) => {
      updateBlog.mutate(
        {
          id: blog.id,
          data: {
            ...data,
            ...(urls.banner && { banner: urls.banner }),
            ...(urls.thumbnail && { thumbnail: urls.thumbnail }),
          },
        },
        {
          onSuccess: async (response) => {
            toast.success(response.message || "تم تحديث المقال بنجاح");
            reset();
            setFiles({});
            clearErrors();
            await queryClient.invalidateQueries({
              queryKey: blogKeys.infinite(),
            });
            onSuccess?.();
            await queryClient.invalidateQueries({ queryKey: ["statistics"] });
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
    };

    if (needsUpload) {
      const formData = new FormData();
      if (files.banner) formData.append("banner", files.banner);
      if (files.thumbnail) formData.append("thumbnail", files.thumbnail);

      try {
        const res = await uploadImages.mutateAsync(formData);
        doUpdate({
          banner: res.payload.find((f) => f.fieldKey === "banner")?.url,
          thumbnail: res.payload.find((f) => f.fieldKey === "thumbnail")?.url,
        });
      } catch (err: any) {
        toast.error(err?.message || "حدث خطأ أثناء رفع الصور");
      }
    } else {
      doUpdate({});
    }
  };

  const isUploading = uploadImages.isPending;
  const isUpdating = updateBlog.isPending;
  const isLoading = isUploading || isUpdating;

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>تعديل المقال</DialogTitle>
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
              <FileHandlerImage defaultImage={`${API_URL}${blog?.banner}`} />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <ImageIcon size={32} strokeWidth={1.5} />
                </FileHandlerIcon>
                <FileHandlerLabel>
                  {blog?.banner
                    ? "تغيير صورة البانر"
                    : "صورة البانر (الرئيسية)"}
                </FileHandlerLabel>
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
              <FileHandlerImage defaultImage={`${API_URL}${blog?.thumbnail}`} />
              <FileHandlerEmpty>
                <FileHandlerIcon>
                  <Camera size={32} strokeWidth={1.5} />
                </FileHandlerIcon>
                <FileHandlerLabel>
                  {blog?.thumbnail ? "تغيير الصورة المصغرة" : "الصورة المصغرة"}
                </FileHandlerLabel>
              </FileHandlerEmpty>
            </FileHandler>
          </div>
        </DialogBody>

        <DialogFooter className="gap-2">
          <Button type="submit" disabled={isLoading} className="min-w-[120px]">
            {isUploading
              ? "يتم رفع الصور..."
              : isUpdating
                ? "يتم التحديث..."
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
