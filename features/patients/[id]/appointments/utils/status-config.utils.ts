import { AppointmentStatus } from "../";

export const APPOINTMENT_STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  scheduled: {
    label: "مجدول",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  completed: {
    label: "مكتمل",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  cancelled: {
    label: "ملغي",
    className: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  no_show: {
    label: "لم يحضر",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
};

export const APPOINTMENT_STATUS_OPTIONS: {
  label: string;
  value: AppointmentStatus | "all";
}[] = [
  { label: "الكل", value: "all" },
  { label: "مجدول", value: "scheduled" },
  { label: "مكتمل", value: "completed" },
  { label: "ملغي", value: "cancelled" },
  { label: "لم يحضر", value: "no_show" },
];
