import { Treatment } from "@/features/patients/[id]/treatments";
import { SuccessResponse } from "@/types/api";

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "no_show";

export type ChartPeriod =
  | "today"
  | "this-week"
  | "this-month"
  | "last-6-months";

// ─────────────────────────────────────────────────────────────────────────────
// Models
// ─────────────────────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  treatmentId: string;
  appointmentDate: string;
  clinicalNotes: string;
  status: AppointmentStatus;
  sessionNumber: string;
  createdAt: string;
  updatedAt: string;
  treatment: Treatment;
}

// ─────────────────────────────────────────────────────────────────────────────
// Payloads
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateAppointmentPayload {
  treatmentId: string;
  appointmentDate: string;
  status: AppointmentStatus;
  clinicalNotes: string;
}

export interface UpdateAppointmentPayload extends Partial<CreateAppointmentPayload> {
  id: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query Params
// ─────────────────────────────────────────────────────────────────────────────

export interface AppointmentFilters {
  treatmentId?: string;
  patientId?: string;
  status?: AppointmentStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AppointmentParams extends AppointmentFilters {
  page?: number;
  limit?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Responses
// ─────────────────────────────────────────────────────────────────────────────

export type GetAppointmentsResponse = SuccessResponse<Appointment[], true> & {
  patientName?: string;
};

export interface ChartDataPoint {
  label: string;
  count: number;
}

export interface ChartDataResponse {
  total: ChartDataPoint[];
  confirmed: ChartDataPoint[];
}

export type GetAppointmentsChartResponse = SuccessResponse<ChartDataResponse>;

// ─────────────────────────────────────────────────────────────────────────────
// Derived / UI
// ─────────────────────────────────────────────────────────────────────────────

export interface ChartEntry {
  label: string;
  مواعيد: number;
  مكتملة: number;
}
