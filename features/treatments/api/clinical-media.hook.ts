import { ClinicalMedia } from "@/features/patients/[id]/treatments";
import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const useUploadOneByTreatment = () =>
  useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      axiosInstance.post<SuccessResponse<ClinicalMedia>>(
        `/v1/clinical-media/treatment/${id}/single`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ),
  });

export const useUploadManyByTreatment = () =>
  useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      axiosInstance.post<SuccessResponse<ClinicalMedia[]>>(
        `/v1/clinical-media/treatment/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ),
  });

export const useDeleteClinicalMediaRecord = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<{ message: string }>(
        `/v1/clinical-media/record/${id}`,
      ),
  });
