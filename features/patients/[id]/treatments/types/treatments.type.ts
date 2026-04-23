import { Patient } from "@/hooks/api/patients";
import { SuccessResponse } from "@/types/api";
import { Appointment } from "../../appointments";

// ─────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────

export type TreatmentStatus = "active" | "completed" | "on_hold" | "cancelled";

// ─────────────────────────────────────────────────────────────────────────────
// Models
// ─────────────────────────────────────────────────────────────────────────────

export interface Treatment {
  id: string;
  patientId: string;
  serviceType: string;
  expectedSessions: number;
  status: TreatmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FullTreatment extends Treatment {
  appointmentsCount: number;
  completedAppointmentsCount: number;
  patient: Patient;
}

export interface TreatmentByPatient extends Treatment {
  appointmentsCount: string;
  completedAppointmentsCount: string;
  upcomingAppointments: Appointment[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Payloads
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateTreatmentPayload {
  serviceType: string;
  patientId: string;
  expectedSessions: number;
}

export interface UpdateTreatmentPayload {
  id: string;
  serviceType?: string;
  status?: TreatmentStatus;
}

// ─────────────────────────────────────────────────────────────────────────────
// Query Params
// ─────────────────────────────────────────────────────────────────────────────

export interface TreatmentsByPatientParams {
  patientId: string;
  status?: TreatmentStatus;
  search?: string;
  page?: number;
  limit?: number;
}
export interface MyTreatmentsParams {
  status?: TreatmentStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AllTreatmentsParams {
  status?: TreatmentStatus;
  search?: string;
  page?: number;
  limit?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Responses
// ─────────────────────────────────────────────────────────────────────────────

export type GetAllTreatmentsResponse = SuccessResponse<FullTreatment[], true>;

export type GetTreatmentsByPatientResponse = SuccessResponse<
  TreatmentByPatient[],
  true
> & {
  patient: Patient;
};

export interface ClinicalMedia {
  id: string;
  treatmentId: string;
  fieldKey: string;
  filename: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentById extends TreatmentByPatient {
  patient: Patient;
  clinicalMedia: ClinicalMedia[];
}
