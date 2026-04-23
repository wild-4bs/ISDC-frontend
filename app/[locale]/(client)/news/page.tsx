"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetBlogsInfinite } from "@/features/blogs";
import { useDebounce } from "@/hooks/debounce";
import { AlertCircle, LayoutGrid, SearchX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Blog, BlogSkeleton } from "./components/Blog";

export default function Page() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetBlogsInfinite({ search: debouncedSearch });

  const blogs = data?.pages.flatMap((p) => p.payload) ?? [];
  const isEmpty = !isPending && !isError && blogs.length === 0;
  const isSearching = search.trim().length > 0;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main>
      <Container>
        <header className="pt-14 pb-6">
          <h1 className="font-bold text-2xl mb-4">المدونة</h1>
          <Input
            placeholder="ابحث عن مقال..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </header>

        {/* ── Error state ─────────────────────────────────────────────── */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-base">حدث خطأ ما</p>
              <p className="text-sm text-muted-foreground mt-1">
                {(error as any)?.message ??
                  "تعذّر تحميل المقالات، يرجى المحاولة مجدداً"}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              إعادة المحاولة
            </Button>
          </div>
        )}

        {/* ── Empty state ──────────────────────────────────────────────── */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-14 h-14 rounded-xl bg-muted border flex items-center justify-center">
              {isSearching ? (
                <SearchX className="w-6 h-6 text-muted-foreground" />
              ) : (
                <LayoutGrid className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-semibold text-base">
                {isSearching ? "لا توجد نتائج" : "لا توجد مقالات بعد"}
              </p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                {isSearching
                  ? "لم يتم العثور على مقالات تطابق بحثك، جرّب كلمة أخرى"
                  : "لم يتم نشر أي مقالات حتى الآن، تابعنا لاحقاً"}
              </p>
            </div>
            {isSearching && (
              <Button variant="outline" size="sm" onClick={() => setSearch("")}>
                <SearchX className="w-3.5 h-3.5 mr-1.5" />
                مسح البحث
              </Button>
            )}
          </div>
        )}

        {/* ── Grid ────────────────────────────────────────────────────── */}
        {!isError && (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5">
            {isPending &&
              Array.from({ length: 8 }).map((_, i) => <BlogSkeleton key={i} />)}
            {!isPending &&
              blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
          </div>
        )}

        <div ref={sentinelRef} className="h-1 w-full" />

        {/* ── Next page skeleton ───────────────────────────────────────── */}
        {isFetchingNextPage && (
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mb-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
