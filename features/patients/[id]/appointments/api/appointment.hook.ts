import {
  Appointment,
  AppointmentParams,
  ChartEntry,
  ChartPeriod,
  CreateAppointmentPayload,
  GetAppointmentsChartResponse,
  GetAppointmentsResponse,
  transformChartData,
  UpdateAppointmentPayload,
} from "@/features/patients/[id]/appointments";
import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

// ─────────────────────────────────────────────────────────────────────────────
// Query Keys
// ─────────────────────────────────────────────────────────────────────────────

export const appointmentKeys = {
  all: () => ["appointments"] as const,
  list: (params?: AppointmentParams) =>
    [...appointmentKeys.all(), params] as const,
  chart: (period: ChartPeriod) => ["appointments-chart", period] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Mutations
// ─────────────────────────────────────────────────────────────────────────────

export const useCreateAppointment = () =>
  useMutation({
    mutationFn: (data: Partial<CreateAppointmentPayload>) =>
      axiosInstance.post<
        SuccessResponse<Appointment>,
        Partial<CreateAppointmentPayload>
      >("/v1/appointments", data),
  });

export const useUpdateAppointment = () =>
  useMutation({
    mutationFn: ({ id, ...data }: UpdateAppointmentPayload) =>
      axiosInstance.put<
        SuccessResponse<Appointment>,
        Omit<UpdateAppointmentPayload, "id">
      >(`/v1/appointments/${id}`, data),
  });

export const useDeleteAppointment = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<Appointment>>(
        `/v1/appointments/${id}`,
      ),
  });

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

export const useGetAppointments = (
  params?: AppointmentParams,
  options?: Omit<
    UseQueryOptions<GetAppointmentsResponse>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery({
    ...options,
    queryKey: appointmentKeys.list(params),
    queryFn: () =>
      axiosInstance.get<GetAppointmentsResponse>("/v1/appointments", {
        params,
      }),
  });

export const useGetAppointmentsChartData = (
  { period }: { period: ChartPeriod },
  options?: Omit<
    UseQueryOptions<GetAppointmentsChartResponse, unknown, ChartEntry[]>,
    "queryKey" | "queryFn" | "select"
  >,
) =>
  useQuery({
    ...options,
    queryKey: appointmentKeys.chart(period),
    queryFn: () =>
      axiosInstance.get<GetAppointmentsChartResponse>(
        "/v1/statistics/chart-data",
        { params: { period } },
      ),
    select: (res) => transformChartData(res.payload),
    staleTime: 0,
    gcTime: 0,
  });
