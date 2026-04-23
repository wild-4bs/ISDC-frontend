import {
  ActivityIcon,
  BanIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from "lucide-react";
import { TreatmentStatus } from "../types/treatments.type";

// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for all treatment status display config
// ─────────────────────────────────────────────────────────────────────────────

export interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  actionIcon: React.ReactNode;
  badgeClassName: string;
}

export const TREATMENT_STATUS_CONFIG: Record<TreatmentStatus, StatusConfig> = {
  active: {
    label: "نشط",
    icon: <ActivityIcon className="size-4 text-emerald-500" />,
    actionIcon: <PlayCircleIcon size={16} className="text-emerald-500" />,
    badgeClassName: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  completed: {
    label: "مكتمل",
    icon: <CheckCircleIcon className="size-4 text-blue-500" />,
    actionIcon: <CheckCircleIcon size={16} className="text-blue-500" />,
    badgeClassName: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  on_hold: {
    label: "معلق",
    icon: <PauseCircleIcon className="size-4 text-amber-500" />,
    actionIcon: <PauseCircleIcon size={16} className="text-amber-500" />,
    badgeClassName: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  cancelled: {
    label: "ملغي",
    icon: <BanIcon className="size-4 text-rose-500" />,
    actionIcon: <BanIcon size={16} className="text-rose-500" />,
    badgeClassName: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
};

// Statuses that are terminal — no further transitions allowed from them
export const TERMINAL_STATUSES: TreatmentStatus[] = ["cancelled"];

// Statuses that block transitioning TO completed (must go through active first)
export const BLOCKED_FROM_COMPLETE: TreatmentStatus[] = [
  "cancelled",
  "completed",
];
