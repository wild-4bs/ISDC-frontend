import { Skeleton } from "@/components/ui/skeleton";
import { Appointment } from "@/features/patient-profile/components/treatments/Appointment";
import { useGetAppointments } from "@/features/patients/[id]/appointments";
import { CalendarX } from "lucide-react";
import { useParams } from "next/navigation";

export const Appointments = () => {
  const { id }: { id: string } = useParams();
  const { data, isPending } = useGetAppointments({ treatmentId: id });

  const appointments = data?.payload ?? [];
  const isEmpty = !isPending && appointments.length === 0;

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 mt-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-muted-foreground">
        <CalendarX size={32} strokeWidth={1.3} />
        <p className="font-medium text-sm">لا توجد جلسات مسجلة</p>
        <p className="text-xs">ستظهر هنا الجلسات المضافة لهذا العلاج</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      {appointments.map((appointment) => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};
