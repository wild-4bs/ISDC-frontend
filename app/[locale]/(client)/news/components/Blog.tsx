import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog as BlogType } from "@/features/blogs";
import { API_URL } from "@/lib/axios";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const BlogSkeleton = () => (
  <article className="rounded-xl overflow-hidden border border-muted shadow-sm">
    <Skeleton className="w-full h-[272px]" />
    <div className="p-5 pb-3 flex flex-col gap-4">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-9 w-28 rounded-full" />
    </div>
  </article>
);

interface BlogProps {
  blog: BlogType;
}

export const Blog = ({ blog }: BlogProps) => {
  const commonTrans = useTranslations("common");

  return (
    <article
      className="rounded-xl overflow-hidden border border-muted shadow-sm"
      dir="rtl"
    >
      <div className="relative w-full h-[272px]">
        <Image
          src={`${API_URL}${blog.thumbnail}`}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 pb-3 flex flex-col gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <Calendar size={16} />
            <span className="text-sm">{formatDate(blog.createdAt)}</span>
          </div>
          <h3 className="font-bold text-xl mb-1 line-clamp-2">{blog.title}</h3>
          <p className="text-muted-foreground text-base font-normal line-clamp-3">
            {blog.description}
          </p>
        </div>
        <Link href={`/news/${blog.id}`}>
          <Button
            variant="ghost"
            className="w-fit text-primary hover:text-primary/90 hover:bg-primary/10 rounded-full"
          >
            {commonTrans("readMore")} <ArrowLeft />
          </Button>
        </Link>
      </div>
    </article>
  );
};
