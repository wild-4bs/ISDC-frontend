import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

interface ImageType {
  fieldKey: string;
  filename: string;
  url: string;
}

export const useUploadImage = () =>
  useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.post<SuccessResponse<ImageType>, FormData>(
        "/v1/upload/image",
        data,
      ),
  });

export const useUploadImages = () =>
  useMutation({
    mutationFn: (data: FormData) =>
      axiosInstance.post<SuccessResponse<ImageType[]>, FormData>(
        "/v1/upload/images",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ),
  });
