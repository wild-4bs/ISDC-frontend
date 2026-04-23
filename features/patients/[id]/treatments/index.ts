// ─────────────────────────────────────────────────────────────────────────────
// Public API — import from here only, never from internal paths
// ─────────────────────────────────────────────────────────────────────────────

// Components
export { PatientTreatmentsFeature } from "./components/PatientTreatmentsFeature";

// Hooks
export * from "./api/treatments.hook";

// Types
export type * from "./types/treatments.type";

// Utils
export * from "./utils/status-config.config";

// Schemas
export * from "./schemas/create-new-treatment.schema";
export {
  treatmentStatusValues,
  updateTreatmentSchema,
} from "./schemas/update-treatment.schema";

// Types
export type { NewTreatmentInput } from "./schemas/create-new-treatment.schema";
export type { UpdateTreatmentInput } from "./schemas/update-treatment.schema";
export type * from "./types/treatments.type";
