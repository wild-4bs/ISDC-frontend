"use client";

import { useGetProjectsInfinite } from "@/features/projects/api/projects.hook";
import { FolderOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Project, ProjectSkeleton } from "../../components/projects/Project";

interface RelatedProjectsProps {
  excludeId: string;
}

export function RelatedProjects({ excludeId }: RelatedProjectsProps) {
  const projectsTrans = useTranslations("projects.projects");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetProjectsInfinite();

  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const projects =
    data?.pages
      .flatMap((page) => page.payload)
      .filter((p) => p.id !== excludeId) ?? [];

  return (
    <section>
      <h2 className="font-bold text-2xl mb-6">{projectsTrans("title")}</h2>

      {/* Error */}
      {isError && (
        <p className="text-center text-destructive py-10">
          {projectsTrans("error")}
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
          <FolderOpen size={48} strokeWidth={1.2} />
          <p>لا يوجد مشاريع حاليا</p>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)}

        {projects.map((p) => (
          <Project key={p.id} project={p} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 2 }).map((_, i) => (
            <ProjectSkeleton key={`next-${i}`} />
          ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-1 mt-4" aria-hidden="true" />
    </section>
  );
}
