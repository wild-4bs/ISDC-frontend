import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  AllTreatmentsParams,
  CreateTreatmentPayload,
  GetAllTreatmentsResponse,
  GetTreatmentsByPatientResponse,
  MyTreatmentsParams,
  Treatment,
  TreatmentById,
  TreatmentsByPatientParams,
  UpdateTreatmentPayload,
} from "../types/treatments.type";

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

export const treatmentKeys = {
  all: (params?: AllTreatmentsParams) =>
    ["treatments", ...(params ? [params] : [])] as const,
  byPatient: (patientId: string, params?: TreatmentsByPatientParams) =>
    ["patient-treatments", patientId, ...(params ? [params] : [])] as const,
  byId: (id: string) => ["single-treatment", id] as const,
  my: () => ["my-treatments"] as const,
};
// ─────────────────────────────────────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────────────────────────────────────

export const useCreateTreatment = () =>
  useMutation({
    mutationFn: (data: CreateTreatmentPayload) =>
      axiosInstance.post<SuccessResponse<Treatment>, CreateTreatmentPayload>(
        "/v1/treatments",
        data,
      ),
  });

export const useUpdateTreatment = () =>
  useMutation({
    mutationFn: ({ id, ...data }: UpdateTreatmentPayload) =>
      axiosInstance.put<
        SuccessResponse<Treatment>,
        Omit<UpdateTreatmentPayload, "id">
      >(`/v1/treatments/${id}`, data),
  });

export const useDeleteTreatment = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<null>>(`/v1/treatments/${id}`),
  });

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

export const useGetTreatmentsByPatient = (
  params: TreatmentsByPatientParams,
  options?: Omit<
    UseQueryOptions<GetTreatmentsByPatientResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    ...options,
    queryFn: () =>
      axiosInstance.get<GetTreatmentsByPatientResponse>("/v1/treatments", {
        params,
      }),
    queryKey: treatmentKeys.byPatient(params.patientId, params),
  });

export const useGetMyTreatments = (
  params?: MyTreatmentsParams,
  options?: Omit<
    UseQueryOptions<GetTreatmentsByPatientResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    ...options,
    queryFn: () =>
      axiosInstance.get<GetTreatmentsByPatientResponse>("/v1/treatments/me", {
        params,
      }),
    queryKey: treatmentKeys.my(),
  });

export const useGetAllTreatments = (
  params?: AllTreatmentsParams,
  options?: Omit<
    UseQueryOptions<GetAllTreatmentsResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    ...options,
    queryFn: () =>
      axiosInstance.get<GetAllTreatmentsResponse>("/v1/treatments/all", {
        params,
      }),
    queryKey: treatmentKeys.all(params),
  });

export const useGetTreatmentById = (id: string) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<TreatmentById>>(`/v1/treatments/${id}`),
    queryKey: treatmentKeys.byId(id),
    select: (res): SuccessResponse<TreatmentById> => {
      const data = res.payload;
      const formatter = new Intl.NumberFormat("ar");
      return {
        ...res,
        payload: {
          ...data,
          appointmentsCount: formatter.format(Number(data.appointmentsCount)),
          completedAppointmentsCount: formatter.format(
            Number(data.appointmentsCount),
          ),
        },
      };
    },
  });
