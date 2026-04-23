import { Button } from "@/components/ui/button";
import { Blog as BlogType } from "@/features/blogs/types/index.types";
import { API_URL } from "@/lib/axios";
import { ArrowLeft, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogProps {
  blog: BlogType;
}

export const Blog = ({ blog }: BlogProps) => {
  const commonTrans = useTranslations("common");
  const router = useRouter();

  return (
    <article
      className="rounded-3xl overflow-hidden border border-muted shadow-sm"
      dir="rtl"
    >
      <Image
        src={`${API_URL}${blog.thumbnail}`}
        alt={blog.title}
        width={1000}
        height={1000}
        className="w-full h-[272px] object-cover"
      />
      <div className="content p-5 pb-3 flex flex-col gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <Calendar />
            <span>
              {new Date(blog.createdAt).toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-bold text-xl mb-1 line-clamp-2">{blog.title}</h3>
          <p className="text-subtitle-color text-lg font-normal line-clamp-2">
            {blog.description}
          </p>
        </div>
        <Button
          variant="ghost"
          className="w-fit text-primary hover:text-primary/90 hover:bg-primary/10 rounded-full"
          onClick={() => router.push(`/news/${blog.id}`)}
        >
          {commonTrans("readMore")} <ArrowLeft />
        </Button>
      </div>
    </article>
  );
};
