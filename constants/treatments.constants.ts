import { Treatment } from "@/features/patients/[id]/treatments";

export const TREATMENT_STATUS_MAP: Record<
  Treatment["status"],
  { label: string; theme: "primary" | "success" | "danger" | "secondary" }
> = {
  active: { label: "نشط", theme: "primary" },
  completed: { label: "مكتمل", theme: "success" },
  on_hold: { label: "معلق", theme: "secondary" },
  cancelled: { label: "ملغي", theme: "danger" },
};
