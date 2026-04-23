"use client";

import Container from "@/components/Container";
import { useGetDoctorsInfinite } from "@/features/doctors/api/doctors.hook";
import { UserRoundX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Doctor, DoctorSkeleton } from "./Doctor";

export const Doctors = () => {
  const doctorsTrans = useTranslations("doctors.about");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetDoctorsInfinite();

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

  const doctors = data?.pages.flatMap((page) => page?.payload) ?? [];

  return (
    <section className="my-18">
      <Container className="text-center">
        <header className="mb-10">
          <h2 className="font-bold text-3xl">{doctorsTrans("title")}</h2>
          <p>{doctorsTrans("caption")}</p>
        </header>

        {/* Error */}
        {isError && (
          <p className="text-destructive py-10">{doctorsTrans("error")}</p>
        )}

        {/* Empty */}
        {!isLoading && !isError && doctors.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <UserRoundX size={48} strokeWidth={1.2} />
            <p>لا يوجد اطباء حاليا</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => <DoctorSkeleton key={i} />)}

          {doctors.map((doctor) => (
            <Doctor key={doctor.id} doctor={doctor} />
          ))}

          {isFetchingNextPage &&
            Array.from({ length: 4 }).map((_, i) => (
              <DoctorSkeleton key={`next-${i}`} />
            ))}
        </div>

        {/* Sentinel */}
        <div ref={sentinelRef} className="h-1 mt-4" aria-hidden="true" />
      </Container>
    </section>
  );
};
