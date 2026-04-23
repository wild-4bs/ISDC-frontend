"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog as BlogType } from "@/features/blogs";
import { Link } from "@/i18n/routing";
import { API_URL } from "@/lib/axios";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";

export const Blog = ({ blog }: { blog: BlogType }) => {
  const date = new Date(blog.createdAt).toLocaleDateString("ar-IQ-u-nu-latn", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className="rounded-3xl overflow-hidden border border-muted shadow-sm"
      dir="rtl"
    >
      <div className="thumbnail">
        <Image
          src={`${API_URL}${blog.thumbnail}`}
          alt={blog.title}
          width={1000}
          height={1000}
          className="w-full h-[272px] object-cover"
        />
      </div>
      <div className="content p-4 pb-3 flex flex-col gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-primary font-semibold mb-3">
            <Calendar size={16} className="-translate-y-0.5" />
            <span>{date}</span>
          </div>
          <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
          <p className="text-subtitle-color text-lg font-normal line-clamp-2 leading-[120%]">
            {blog.description}
          </p>
        </div>
        <Link href={`/news/${blog.id}`}>
          <Button
            variant="ghost"
            className="w-fit text-primary hover:text-primary/90 hover:bg-primary/10 rounded-full"
          >
            اقرأ المزيد <ArrowLeft />
          </Button>
        </Link>
      </div>
    </article>
  );
};

export const BlogSkeleton = () => (
  <article className="rounded-3xl overflow-hidden border border-muted shadow-sm">
    <Skeleton className="w-full h-[272px]" />
    <div className="p-5 pb-3 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-9 w-28 rounded-full" />
    </div>
  </article>
);
