"use client";
import Container from "@/components/Container";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "@/i18n/routing";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import ArrowTopRight from "@/assets/icons/arrow-top-right.svg";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layer } from "@/components/Layer";

export const Projects = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const locale = useLocale?.() || "en";
  const isRTL = locale === "ar";

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const projectsTrans = useTranslations("home.projects");
  return (
    <section className="my-24">
      <Container>
        <header className="text-center mb-12">
          <h2 className="text-4xl font-semibold">{projectsTrans("title")}</h2>
          <p className="text-xl font-normal">{projectsTrans("caption")}</p>
        </header>
        <Carousel
          opts={{
            align: isRTL ? "end" : "start",
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i: number) => (
              <CarouselItem
                key={i}
                className={clsx(
                  "md:basis-1/2 lg:basis-1/3 bg-primary/70 h-[190px] relative rounded-xl overflow-hidden p-4",
                  isRTL ? "not-last:me-4" : "not-last:ms-4 "
                )}
                suppressHydrationWarning
              >
                <Link href={"/projects/id"}>
                  <header className="flex justify-between items-start gap-4 z-10 relative h-full">
                    <h3 className="text-white font-bold text-2xl">
                      تبييض الأسنان
                    </h3>
                    <div className="size-10 bg-white rounded-full flex items-center justify-center rtl:rotate-270">
                      <ArrowTopRight />
                    </div>
                  </header>
                  <Image
                    src={"/home/projects/1.png"}
                    width={1000}
                    height={1000}
                    alt="project"
                    className="absolute top-0 left-0 w-full h-full rounded-xl z-0 pointer-events-none"
                  />
                  <Layer variant={"dark"} className="opacity-10" />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div
            className={clsx(
              "controllers flex items-center gap-4 mt-6 justify-center md:justify-start"
            )}
          >
            <Button
              variant={"ghost"}
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
              variant={"ghost"}
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
      </Container>
    </section>
  );
};
