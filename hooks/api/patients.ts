import { axiosInstance } from "@/lib/axios";
import { PaginationQuery } from "@/lib/pagination";
import { PaginationMetadata, SuccessResponse } from "@/types/api";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreatePatientPayload {
  cardId: string;
  name: string;
  phone?: string;
}

export interface Patient {
  id: string;
  cardId: string;
  name: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  totalTreatments: string;
  totalAppointments: string;
}

export const useCreatePatient = () =>
  useMutation({
    mutationFn: (data: CreatePatientPayload) =>
      axiosInstance.post<SuccessResponse<User>, CreatePatientPayload>(
        "/v1/patients",
        data,
      ),
  });

export const useEditPatient = () =>
  useMutation({
    mutationFn: (data: Partial<CreatePatientPayload> & { id: string }) =>
      axiosInstance.put<SuccessResponse<User>, Partial<CreatePatientPayload>>(
        `/v1/patients/${data?.id}`,
        data,
      ),
  });

// GET All
export const useGetPatients = (
  params?: PaginationQuery & { search?: string },
) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<
        SuccessResponse<Patient[]> & { pagination: PaginationMetadata }
      >("/v1/patients", {
        params,
      }),
    queryKey: ["patients", params?.page, params?.limit, params?.search],
  });

// GET By Id
export const useGetPatientById = (id: string) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<Patient>>(`/v1/patients/${id}`, {}),
    queryKey: ["patients", id],
  });

export const useDeletePatient = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<Patient>>(`/v1/patients/${id}`),
  });
