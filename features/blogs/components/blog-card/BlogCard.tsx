"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { API_URL } from "@/lib/axios";
import { useDialog } from "@/providers/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, MoreVertical, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { blogKeys, useDeleteBlog, useUpdateBlog } from "../../api/blogs.hook";
import { Blog } from "../../types/index.types";

interface BlogCardProps {
  blog: Blog;
}

interface PendingState {
  isDeleting: boolean;
  isUpdating: boolean;
}

export const BlogCard = ({ blog }: BlogCardProps) => {
  const [pendingState, setPendingState] = useState<PendingState>({
    isDeleting: false,
    isUpdating: false,
  });

  const { openDialog, closeDialog } = useDialog();
  const queryClient = useQueryClient();
  const deleteBlog = useDeleteBlog();
  const updateBlog = useUpdateBlog();

  const handleDelete = () => {
    setPendingState((prev) => ({ ...prev, isDeleting: true }));
    deleteBlog.mutate(blog.id, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries({ queryKey: blogKeys.infinite() });
        toast.success(res?.message);
        setPendingState((prev) => ({ ...prev, isDeleting: false }));
        await queryClient.invalidateQueries({ queryKey: ["timeline"] });
        await queryClient.invalidateQueries({ queryKey: ["statistics"] });
      },
      onError: () => {
        setPendingState((prev) => ({ ...prev, isDeleting: false }));
      },
    });
  };

  return (
    <Card className="p-0 overflow-hidden group flex flex-col h-full hover:border-primary/50 transition-colors">
      <CardHeader className="p-0 relative h-40 w-full bg-muted">
        {blog.banner && (
          <Image
            src={`${API_URL}${blog.banner}`}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        )}
        <div className="absolute top-2 left-2 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                theme="secondary"
                className="h-8 w-8 rounded-full shadow-md backdrop-blur-sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="flex flex-col gap-1 w-[140px] p-1"
            >
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 text-sm font-normal text-foreground"
                onClick={() =>
                  openDialog("edit-blog", { blog, onSuccess: closeDialog })
                }
                disabled={pendingState.isUpdating}
              >
                <Pencil className="h-3.5 w-3.5" /> تعديل
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 text-sm font-normal text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleDelete}
                disabled={pendingState.isDeleting}
              >
                <Trash className="h-3.5 w-3.5" /> حذف
              </Button>
            </PopoverContent>
          </Popover>
        </div>

        {/* Thumbnail Overlay */}
        <div className="absolute -bottom-6 right-4 z-10">
          <div className="relative h-12 w-12 rounded-lg border-2 border-background overflow-hidden shadow-lg bg-white">
            {blog.thumbnail && (
              <Image
                src={`${API_URL}${blog.thumbnail}`}
                alt="author"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-8 flex flex-col grow gap-2">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          <Calendar className="h-3 w-3" />
          <span>{blog.createdAt}</span>
        </div>

        <h2 className="font-bold text-lg leading-tight line-clamp-1 text-foreground">
          {blog.title}
        </h2>

        {blog.description ? (
          <p className="text-sm leading-tight text-muted-foreground line-clamp-2">
            {blog.description}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground/50">
            لا يوجد وصف...
          </p>
        )}
      </CardContent>
    </Card>
  );
};
