import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateDoctorPayload,
  Doctor,
  GetDoctorsParams,
} from "../types/index.types";

export const doctorKeys = {
  all: (params?: GetDoctorsParams) =>
    ["doctors", ...(params ? [params] : [])] as const,
  infinite: (params?: GetDoctorsParams) =>
    ["infinite-query-doctors", ...(params ? [params] : [])] as const,
};

const getDoctors = (params?: GetDoctorsParams) =>
  axiosInstance.get<SuccessResponse<Doctor, true>>("/v1/doctors", { params });

export const useGetDoctors = (params?: GetDoctorsParams) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<Doctor[]>>("/v1/doctors", { params }),
    queryKey: doctorKeys.all(params),
  });

export const useGetDoctorsInfinite = (params?: GetDoctorsParams) =>
  useInfiniteQuery({
    queryFn: ({ pageParam }) => getDoctors({ ...params, page: pageParam }),
    initialPageParam: 1,
    queryKey: doctorKeys.infinite(params),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

export const useCreateDoctor = () =>
  useMutation({
    mutationFn: (data: CreateDoctorPayload) =>
      axiosInstance.post<SuccessResponse<Doctor>, CreateDoctorPayload>(
        "/v1/doctors",
        data,
      ),
  });

export const useUpdateDoctor = () =>
  useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Partial<CreateDoctorPayload>;
      id: string;
    }) =>
      axiosInstance.put<SuccessResponse<Doctor>, Partial<CreateDoctorPayload>>(
        `/v1/doctors/${id}`,
        data,
      ),
  });

export const useDeleteDoctor = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<Doctor>>(`/v1/doctors/${id}`),
  });
