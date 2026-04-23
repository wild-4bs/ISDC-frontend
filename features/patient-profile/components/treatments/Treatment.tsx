import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GetTreatmentsByPatientResponse,
  TreatmentById,
} from "@/features/patients/[id]/treatments";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/date-fns";
import { Calendar, Shield } from "lucide-react";
import { Appointment } from "./Appointment";

const STATUS_MAP: Record<
  TreatmentById["status"],
  { label: string; theme: "success" | "warning" | "danger" | "secondary" }
> = {
  active: { label: "نشط", theme: "success" },
  completed: { label: "مكتمل", theme: "secondary" },
  on_hold: { label: "معلق", theme: "warning" },
  cancelled: { label: "ملغي", theme: "danger" },
};

export const Treatment = ({
  treatment,
}: {
  treatment: GetTreatmentsByPatientResponse["payload"][0];
}) => {
  const status = STATUS_MAP[treatment.status];
  const total = treatment.expectedSessions ?? "؟";
  const completed = Number(treatment.completedAppointmentsCount ?? 0);

  return (
    <div className="rounded-xl bg-dashboard-bg/20 border border-input overflow-hidden">
      <header className="flex items-center justify-between gap-4 p-3 border-b border-b-input">
        <div className="flex items-center gap-2 font-medium text-base">
          <Shield size={20} strokeWidth={1.4} />
          <h2>{treatment.serviceType}</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
            <Calendar size={14} strokeWidth={1.7} />
            <span className="translate-y-0.5">
              {completed} / {total} جلسات
            </span>
          </div>
          <Badge
            size="sm"
            theme={status.theme}
            variant="soft"
            className="px-2 py-1"
          >
            {status.label}
          </Badge>
        </div>
      </header>

      <div className="p-3 bg-background rounded-lg mx-1 my-2 border border-input">
        <h3 className="font-medium text-sm mb-2">الجلسات القادمة</h3>
        {treatment?.upcomingAppointments.length > 0 ? (
          treatment?.upcomingAppointments.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <p className="text-xs text-muted-foreground py-2 text-center">
            لا توجد جلسات قادمة
          </p>
        )}
      </div>

      <footer className="flex items-center justify-between gap-4 py-1 px-2 border-t border-t-input">
        <Link href={`/profile/treatments/${treatment.id}`}>
          <Button size="sm" variant="ghost">
            عرض تفاصيل العلاج
          </Button>
        </Link>
        <span className="font-medium text-xs text-neutral-500">
          أُنشئت في {formatDate(treatment.createdAt)}
        </span>
      </footer>
    </div>
  );
};
