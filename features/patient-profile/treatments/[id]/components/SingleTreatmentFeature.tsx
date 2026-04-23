"use client";
import Container from "@/components/Container";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTreatmentById } from "@/features/patients/[id]/treatments";
import { API_URL } from "@/lib/axios";
import { Calendar, ImageIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Appointments } from "./Appointments";
import { ClinicalMediaItem } from "./ClinicalMediaItem";

const STATUS_MAP = {
  active: { label: "نشط", theme: "success" },
  completed: { label: "مكتمل", theme: "secondary" },
  on_hold: { label: "معلق", theme: "warning" },
  cancelled: { label: "ملغي", theme: "danger" },
} as const;

export const SingleTreatmentFeature = () => {
  const { id }: { id: string } = useParams();
  const { data, isPending } = useGetTreatmentById(id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const status = data?.payload ? STATUS_MAP[data?.payload?.status] : null;
  const completed = Number(data?.payload?.completedAppointmentsCount ?? 0);
  const total = data?.payload?.expectedSessions ?? "؟";

  return (
    <main className="py-10">
      <Container>
        <header className="mb-1.5">
          {isPending ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-7 w-52" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : (
            <>
              <h1 className="font-bold text-2xl leading-5">
                {data?.payload?.serviceType}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(data?.payload?.createdAt ?? "").toLocaleDateString(
                  "ar-IQ-u-nu-latn",
                  { day: "numeric", month: "long", year: "numeric" },
                )}
              </p>
            </>
          )}
        </header>

        <div className="lg:grid grid-cols-12 gap-4">
          {/* ── clinical media ── */}
          <div className="p-5 border border-input rounded-xl bg-white shadow-xs mt-3 col-span-7">
            <header className="pb-3 border-b border-b-input flex items-center gap-2">
              <ImageIcon className="text-primary" />
              <h2 className="font-bold text-lg">الصور الطبية</h2>
            </header>

            {isPending ? (
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mt-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            ) : !data?.payload?.clinicalMedia?.length ? (
              <div className="flex flex-col items-center justify-center gap-2 py-14 text-center text-muted-foreground">
                <ImageIcon size={36} strokeWidth={1.3} />
                <p className="font-medium text-sm">لا توجد صور طبية مرفقة</p>
                <p className="text-xs">
                  ستظهر هنا الصور التي يرفعها الطاقم الطبي
                </p>
              </div>
            ) : (
              <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 mt-4 gap-4">
                {data?.payload?.clinicalMedia?.map((media) => (
                  <ClinicalMediaItem
                    key={media.id}
                    url={media.url}
                    id={media.id}
                    onSelect={setSelectedImage}
                    filename={media.filename}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── appointments ── */}
          <div className="p-5 border border-input rounded-xl bg-white shadow-xs mt-3 col-span-4">
            <header className="pb-3 border-b border-b-input flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" />
                <h2 className="font-bold text-lg">الجلسات</h2>
              </div>
              {isPending ? (
                <Skeleton className="h-5 w-24" />
              ) : (
                <div className="flex items-center gap-3">
                  <span className="translate-y-0.5 text-sm font-semibold text-neutral-500">
                    {completed} / {total} جلسات
                  </span>
                  {status && (
                    <Badge
                      theme={status.theme}
                      variant="soft"
                      className="px-2 py-1"
                    >
                      {status.label}
                    </Badge>
                  )}
                </div>
              )}
            </header>
            <Appointments />
          </div>
        </div>
      </Container>
      {selectedImage && (
        <ImageLightbox
          src={`${API_URL}${selectedImage}`}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
};
