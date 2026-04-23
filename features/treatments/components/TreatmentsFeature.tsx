"use client";
import {
  FileHandler,
  FileHandlerEmpty,
  FileHandlerIcon,
  FileHandlerImage,
} from "@/components/file-handler";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  treatmentKeys,
  useGetTreatmentById,
} from "@/features/patients/[id]/treatments";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUploadManyByTreatment } from "../api/clinical-media.hook";
import { ClinicalMediaItem } from "./ClinicalMediaItem";
import { StatsCards } from "./StatsCards";
import { API_URL } from "@/lib/axios";

export const TreatmentsFeature = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { id }: { id: string } = useParams();
  const queryClient = useQueryClient();

  const { data, isPending } = useGetTreatmentById(id);
  const uploadOneByTreatment = useUploadManyByTreatment();

  const treatment = data?.payload;

  const handleFileChange = (files: File[]) => {
    if (files?.length < 1)
      return toast.warning("يرجى اختيار صورة واحدة على الاقل للرفع");
    const data = new FormData();
    files?.map((file) => {
      data.append("file", file);
    });
    uploadOneByTreatment.mutate(
      { id, data },
      {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries({
            queryKey: treatmentKeys.byId(id),
          });
          toast.success(res?.message);
          setFiles([]);
        },
      },
    );
  };

  return (
    <main className="p-4">
      <header className="mb-3">
        {isPending ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold leading-[150%]">
              {treatment?.patient.name}
            </h2>
            <div className="flex gap-2">
              <span className="font-medium text-muted-foreground inline-block leading-[100%]">
                رقم البطاقة: {treatment?.patient.cardId}
              </span>
              <div className="size-1 bg-muted-foreground rounded-full self-center" />
              <span className="font-medium text-muted-foreground inline-block leading-[100%]">
                {treatment?.serviceType}
              </span>
            </div>
          </>
        )}
      </header>

      <StatsCards
        data={{
          completedAppointments: treatment?.completedAppointmentsCount ?? "0",
          expectedSessions: treatment?.expectedSessions ?? "0",
          totalClinicalImages: treatment?.clinicalMedia?.length ?? "0",
        }}
        isPending={isPending}
      />

      <Card className="mt-3 pb-2 px-2">
        <CardHeader>
          <CardTitle>
            <h2>الصور الطبية</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-dashboard-bg px-4 py-4 m-2 rounded-lg">
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
            {isPending
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-[140px] rounded-md" />
                ))
              : treatment?.clinicalMedia.map((media) => (
                  <ClinicalMediaItem
                    key={media.id}
                    id={media.id}
                    url={media.url}
                    filename={media.filename}
                    onSelect={setSelectedImage}
                    treatmentId={id}
                  />
                ))}

            {!isPending && (
              <FileHandler
                className="w-full h-[140px] rounded-md"
                mode="multiple"
                value={files}
                onFilesChange={(files) => {
                  setFiles(files);
                  handleFileChange(files);
                }}
                isPending={files?.length > 0}
              >
                <FileHandlerImage />
                <FileHandlerEmpty>
                  <FileHandlerIcon />
                </FileHandlerEmpty>
              </FileHandler>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedImage && (
        <ImageLightbox
          src={`${API_URL}${selectedImage}`}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </main>
  );
};
