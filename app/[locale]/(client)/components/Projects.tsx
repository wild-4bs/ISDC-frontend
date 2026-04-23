"use client";
import ArrowTopRight from "@/assets/icons/arrow-top-right.svg";
import Container from "@/components/Container";
import { Layer } from "@/components/Layer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/features/projects";
import { useGetProjects } from "@/features/projects/api/projects.hook";
import { Link } from "@/i18n/routing";
import { API_URL } from "@/lib/axios";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, FolderOpen } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Projects = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const locale = useLocale?.() || "en";
  const isRTL = locale === "ar";
  const { data, isPending } = useGetProjects({ limit: 8 });

  const projects: Project[] = data?.payload ?? [];
  const isEmpty = !isPending && projects.length === 0;

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <section className="my-24">
      <Container>
        <header className="text-center mb-12">
          <h2 className="text-4xl font-semibold">أعمالنا</h2>
          <p className="text-xl font-normal">
            تصفح أحدث أعمالنا ونتائجنا المميزة
          </p>
        </header>

        {isPending && (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="min-w-[calc(33.333%-11px)] h-[190px] rounded-xl"
              />
            ))}
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center gap-3 py-5 text-center text-muted-foreground">
            <FolderOpen size={48} strokeWidth={1.3} />
            <p className="font-medium text-lg">لا توجد أعمال حالياً</p>
            <p className="text-sm">سيتم إضافة الأعمال قريباً، تابعونا</p>
          </div>
        )}

        {!isPending && !isEmpty && (
          <Carousel
            opts={{
              align: isRTL ? "end" : "start",
              direction: isRTL ? "rtl" : "ltr",
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-1/2 group lg:basis-1/3"
                  suppressHydrationWarning
                >
                  <div className="w-full bg-primary/70 h-[190px] relative rounded-xl overflow-hidden p-4">
                    <Link href={`/projects/${project.id}`}>
                      <header className="flex justify-between items-start gap-4 z-10 relative h-full">
                        <div>
                          <h3 className="text-white font-bold text-2xl">
                            {project.title}
                          </h3>
                        </div>
                        <div className="size-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:-translate-x-2 rtl:rotate-270">
                          <ArrowTopRight />
                        </div>
                      </header>
                      <Image
                        src={`${API_URL}${project.imageAfter}`}
                        width={1000}
                        height={1000}
                        alt={project.title}
                        className="absolute top-0 left-0 w-full h-full rounded-xl z-0 pointer-events-none object-cover"
                      />
                      <Layer variant="linear" className="opacity-40" />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="controllers flex items-center gap-4 mt-4 justify-center md:justify-start">
              <Button
                variant="ghost"
                className="size-14"
                onClick={() => api?.scrollPrev()}
              >
                {isRTL ? (
                  <ArrowRight
                    className={clsx("cursor-pointer scale-200", {
                      "opacity-50": current === 1,
                    })}
                  />
                ) : (
                  <ArrowLeft
                    className={clsx("cursor-pointer scale-200", {
                      "opacity-50": current === 1,
                    })}
                  />
                )}
              </Button>
              <Button
                variant="ghost"
                className="size-14"
                onClick={() => api?.scrollNext()}
              >
                {isRTL ? (
                  <ArrowLeft
                    className={clsx("cursor-pointer scale-200", {
                      "opacity-50": current === count,
                    })}
                  />
                ) : (
                  <ArrowRight
                    className={clsx("cursor-pointer scale-200", {
                      "opacity-50": current === count,
                    })}
                  />
                )}
              </Button>
            </div>
          </Carousel>
        )}
      </Container>
    </section>
  );
};
