"use client";
import Container from "@/components/Container";
import { useGetBlogs } from "@/features/blogs";
import { FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Blog, BlogSkeleton } from "./Blog";

const SKELETON_COUNT = 4;

export const Blogs = () => {
  const { data, isPending } = useGetBlogs({ limit: 8 });
  const blogsTrans = useTranslations("home.blogs");

  const blogs = data?.payload ?? [];
  const isEmpty = !isPending && blogs.length === 0;

  return (
    <section>
      <Container>
        <header className="mb-5 max-md:text-center max-w-4xl">
          <h2 className="font-bold text-6xl max-md:text-4xl">
            {blogsTrans.rich("title", {
              span: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h2>
          <p className="font-medium text-xl max-md:text-lg">
            {blogsTrans("caption")}
          </p>
        </header>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {isPending ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))
          ) : isEmpty ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 py-20 text-center text-muted-foreground">
              <FolderOpen size={48} strokeWidth={1.3} />
              <p className="font-medium text-lg">لا توجد مقالات حالياً</p>
              <p className="text-sm">سيتم نشر المقالات قريباً، تابعونا</p>
            </div>
          ) : (
            blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
          )}
        </div>
      </Container>
    </section>
  );
};
