"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Project as ProjectType } from "@/features/projects/types/index.types";
import { API_URL } from "@/lib/axios";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// ── Skeleton ──────────────────────────────────────────────────────────────

export const ProjectSkeleton = () => (
  <article className="rounded-2xl border border-input shadow-xs overflow-hidden">
    <Skeleton className="w-full h-[345px]" />
    <div className="px-5 py-4 pb-3 space-y-2">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-32 rounded-full mt-4" />
    </div>
  </article>
);

// ── Card ──────────────────────────────────────────────────────────────────

interface ProjectProps {
  project?: ProjectType;
}

export const Project = ({ project }: ProjectProps) => {
  const commonTrans = useTranslations("common");

  return (
    <Link href={`/projects/${project?.id}`}>
      <article className="rounded-2xl border border-input shadow-xs overflow-hidden group">
        <div className="relative w-full h-[245px] overflow-hidden">
          <Image
            src={`${API_URL}${project?.imageAfter}`}
            alt={project?.title || ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-5 py-4 pb-3">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1 block">
            {project?.category}
          </span>
          <h2 className="mb-1 font-bold text-xl line-clamp-1">
            {project?.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project?.description}
          </p>
          <Button className="w-fit rounded-full mt-4">
            {commonTrans("readMore")}
            <ArrowLeft className="ltr:rotate-180" />
          </Button>
        </div>
      </article>
    </Link>
  );
};
