"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetBlogById,
  useGetBlogsInfinite,
} from "@/features/blogs/api/blogs.hook";
import { AlertCircle, Newspaper } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Blog } from "./components/Blog";
import { BlogSkeleton } from "./components/BlogSkeleton";
import { API_URL } from "@/lib/axios";

export default function Page() {
  const { id }: { id: string } = useParams();
  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogError,
  } = useGetBlogById(id);

  const blog = blogData?.payload;
  const {
    data,
    isLoading: blogsLoading,
    isError: blogsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetBlogsInfinite();

  // Flatten pages and exclude current blog
  const allBlogs =
    data?.pages.flatMap((page) => page.payload).filter((b) => b.id !== id) ??
    [];

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    const el = sentinelRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main>
      <Container className="mt-12 mb-4">
        {/* ── Hero / current blog ── */}
        {blogLoading ? (
          <BlogHeroSkeleton />
        ) : blogError ? (
          <BlogHeroError />
        ) : blog ? (
          <>
            <header className="mb-8">
              <h1 className="font-bold max-md:text-2xl text-3xl mb-1">
                {blog?.title}
              </h1>
              <p className="text-subtitle-color">
                {new Date(blog.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </header>
            <Image
              src={`${API_URL}${blog.banner}`}
              width={1000}
              height={1000}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-xl max-h-[600px]"
            />
            <p className="mt-8 leading-relaxed text-base">{blog.description}</p>
          </>
        ) : null}

        {/* ── Related blogs grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-24 mb-10">
          {blogsLoading ? (
            Array.from({ length: 4 }).map((_, i) => <BlogSkeleton key={i} />)
          ) : blogsError ? (
            <RelatedBlogsError />
          ) : allBlogs.length === 0 ? (
            <EmptyBlogs />
          ) : (
            allBlogs.map((b) => <Blog key={b.id} blog={b} />)
          )}
        </div>

        {/* Infinite scroll sentinel + loading more */}
        {!blogsLoading && !blogsError && allBlogs.length > 0 && (
          <>
            <div ref={sentinelRef} className="h-1" />
            {isFetchingNextPage && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <BlogSkeleton key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </main>
  );
}

/* ── Inline helper components ── */

function BlogHeroSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <Skeleton className="h-9 w-2/3 rounded-lg" />
      <Skeleton className="h-4 w-32 rounded" />
      <Skeleton className="w-full h-[420px] rounded-xl" />
      <div className="space-y-2 mt-8">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </div>
    </div>
  );
}

function BlogHeroError() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <AlertCircle className="w-12 h-12 text-destructive" />
      <h2 className="text-xl font-semibold">تعذّر تحميل المقال</h2>
      <p className="text-subtitle-color">
        حدث خطأ أثناء جلب البيانات. يرجى إعادة تحميل الصفحة.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        إعادة المحاولة
      </Button>
    </div>
  );
}

function RelatedBlogsError() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center gap-3">
      <AlertCircle className="w-10 h-10 text-destructive" />
      <p className="text-subtitle-color">تعذّر تحميل المقالات الأخرى.</p>
    </div>
  );
}

function EmptyBlogs() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center gap-3">
      <Newspaper className="w-12 h-12 text-muted-foreground" />
      <h3 className="font-semibold text-lg">لا توجد مقالات أخرى</h3>
      <p className="text-subtitle-color text-sm">
        لم يتم نشر أي مقالات إضافية بعد.
      </p>
    </div>
  );
}
