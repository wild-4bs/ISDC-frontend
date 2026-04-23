"use client";

import Container from "@/components/Container";
import { useGetProjectsInfinite } from "@/features/projects/api/projects.hook";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Project, ProjectSkeleton } from "./Project";

// ── Projects ──────────────────────────────────────────────────────────────

export const Projects = () => {
  const projectsTrans = useTranslations("projects.projects");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetProjectsInfinite();

  // Sentinel element – when it enters the viewport, load the next page.
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const projects = data?.pages.flatMap((page) => page?.payload) ?? [];

  return (
    <section className="mt-16 mb-14">
      <Container>
        <header className="mb-5">
          <h2 className="mb-1 font-bold text-3xl">{projectsTrans("title")}</h2>
          <p>{projectsTrans("caption")}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          {!isLoading &&
            projects.map((project) => (
              <Project key={project.id} project={project} />
            ))}
          {isFetchingNextPage &&
            Array.from({ length: 3 }).map((_, i) => (
              <ProjectSkeleton key={`next-${i}`} />
            ))}
        </div>
        {isError && (
          <p className="text-center text-destructive mt-6">
            {projectsTrans("error")}
          </p>
        )}
        <div ref={sentinelRef} className="h-1 mt-4" aria-hidden="true" />
      </Container>
    </section>
  );
};
