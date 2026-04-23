import { Badge } from "@/components/ui/badge";
import { Appointment as AppointmentType } from "@/features/patients/[id]/appointments";
import { Clock } from "lucide-react";

const STATUS_MAP: Record<
  AppointmentType["status"],
  { label: string; theme: "success" | "warning" | "danger" | "secondary" }
> = {
  scheduled: { label: "قادم",    theme: "warning" },
  completed: { label: "مكتمل",  theme: "success" },
  cancelled: { label: "ملغي",   theme: "danger" },
  no_show:   { label: "لم تحضر",   theme: "secondary" },
};

export const Appointment = ({ appointment }: { appointment: AppointmentType }) => {
  const date = new Date(appointment.appointmentDate);
  const status = STATUS_MAP[appointment.status];

  const dayAndDate = date.toLocaleDateString("ar-IQ-u-nu-latn", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("ar-IQ-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between gap-4 py-2 not-last:border-b border-b-input">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Clock size={16} />
        {dayAndDate}
      </div>
      <div className="flex items-center gap-2">
        <Badge size="sm" className="px-2 py-1">
          {time}
        </Badge>
        <Badge size="sm" variant="soft" theme={status.theme} className="px-2 py-1">
          {status.label}
        </Badge>
      </div>
    </div>
  );
};