// BlogsFeature.tsx
"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/debounce";
import { DialogRegistry, DialogRenderer, useDialog } from "@/providers/dialog";
import { Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetBlogsInfinite } from "../api/blogs.hook";
import { BlogCard, BlogCardSkeletonList, BlogsEmptyState } from "./blog-card";
import { NewBlogDialog } from "./dialogs";
import { EditBlogDialog } from "./dialogs/EditBlog.dialog";

const registry: DialogRegistry = {
  "new-blog": NewBlogDialog,
  "edit-blog": EditBlogDialog,
};

export const BlogsFeature = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetBlogsInfinite({ search: debouncedSearch });

  const { openDialog } = useDialog();

  const blogs = data?.pages.flatMap((page) => page.payload) ?? [];

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
      <DialogRenderer registry={registry} />
      <Card className="gap-6">
        <CardHeader>
          <CardTitle>
            <h1 className="text-xl">المقالات</h1>
          </CardTitle>
          <CardAction onClick={() => openDialog("new-blog")}>
            إضافة مقالة جديدة <Plus />
          </CardAction>
        </CardHeader>
        <CardContent className="px-3">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Input
              type="search"
              placeholder="ابحث عن عنوان..."
              spellCheck="false"
              className="flex-1"
              icon={<Search />}
              autoComplete="off"
              size="sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {isPending && <BlogCardSkeletonList />}
            {!isPending &&
              blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>

          {!isPending && blogs.length === 0 && (
            <BlogsEmptyState
              onAdd={() => openDialog("new-blog")}
              isSearching={search.trim().length > 0}
              onClearSearch={() => setSearch("")}
            />
          )}

          <div ref={sentinelRef} className="h-1 w-full" />

          {isFetchingNextPage && (
            <div className="grid gap-4 grid-cols-4 mt-4">
              <BlogCardSkeletonList />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
