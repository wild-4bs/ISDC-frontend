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
import { useGetProjectsInfinite } from "../api/projects.hook";
import { EditProjectDialog } from "./dialogs/EditProjectDialog";
import { NewProjectDialog } from "./dialogs/NewProjectDialog";
import { ProjectCard } from "./project-card";
import { ProjectCardSkeletonList } from "./project-card/ProjectCardSkeleton";
import { ProjectsEmptyState } from "./project-card/ProjectsEmptyState";

const registry: DialogRegistry = {
  "new-project": NewProjectDialog,
  "edit-project": EditProjectDialog,
};

export const ProjectsFeature = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetProjectsInfinite({ search: debouncedSearch });

  const { openDialog } = useDialog();

  const projects = data?.pages.flatMap((page) => page.payload) ?? [];

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
            <h1 className="text-xl">محفضة الاعمال</h1>
          </CardTitle>
          <CardAction onClick={() => openDialog("new-project")}>
            إضافة عمل جديد <Plus />
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
            {isPending && <ProjectCardSkeletonList />}
            {!isPending &&
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>

          {!isPending && projects.length === 0 && (
            <ProjectsEmptyState
              onAdd={() => openDialog("new-project")}
              isSearching={search.trim().length > 0}
              onClearSearch={() => setSearch("")}
            />
          )}

          {/* Sentinel — IntersectionObserver watches this to trigger next page */}
          <div ref={sentinelRef} className="h-1 w-full" />

          {isFetchingNextPage && (
            <div className="grid gap-4 grid-cols-4 mt-4">
              <ProjectCardSkeletonList />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};
