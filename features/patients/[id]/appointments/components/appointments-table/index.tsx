"use client";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Appointment,
  APPOINTMENT_STATUS_OPTIONS,
  AppointmentStatus,
  useGetAppointments,
} from "@/features/patients/[id]/appointments";
import { useDebounce } from "@/hooks/debounce";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AppointmentCompletedAlert } from "../alerts/CompleteApointment";
import { TreatmentsSelector } from "../TreatmentsSelector";
import { AppointmentRow } from "./AppointmentRow";
import { AppointmentRowSkeletonList } from "./AppointmentRowSkeleton";
import { AppointmentsEmptyState } from "./AppointmentsEmptyState";
import { AppointmentsPagination } from "./AppointmentsPagination";

const PAGE_SIZE = 10;

export interface AppointmentsTableRef {
  patientName?: string;
}
export type AlertType = "appointment-completed" | null;

export const AppointmentsTable = ({
  onPatientNameLoad,
  onEdit,
}: {
  onPatientNameLoad?: (name: string) => void;
  onEdit: (appointment: Appointment) => void;
}) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<AppointmentStatus | "all">("all");
  const [treatmentId, setTreatmentId] = useState<string | "all">("all");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  const { id }: { id: string } = useParams();
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending } = useGetAppointments({
    patientId: id,
    ...(status != "all" ? { status } : {}),
    ...(treatmentId != "all" ? { treatmentId } : {}),
    page,
    limit: PAGE_SIZE,
  });

  useEffect(() => {
    if (data?.patientName) onPatientNameLoad?.(data.patientName);
  }, [data?.patientName]);

  const appointments = data?.payload ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const isEmpty = !isPending && appointments.length === 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as AppointmentStatus | "all");
    setPage(1);
  };

  const openAlert = (type: AlertType, appointment: Appointment) => {
    setAppointment(appointment);
    setAlertType(type);
    setIsAlertOpen(true);
  };
  const closeAlert = () => {
    setIsAlertOpen(false);
    setAppointment(null);
    setAlertType(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        {alertType == "appointment-completed" && (
          <AppointmentCompletedAlert
            id={appointment?.id}
            onSuccess={closeAlert}
            patientId={id}
          />
        )}
      </AlertDialog>
      <div className="flex gap-2">
        <Input
          size="sm"
          className="flex-1"
          placeholder="البحث في الملاحظات الطبية..."
          icon={<Search />}
          spellCheck={false}
          autoComplete="off"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-full! sm:min-w-[130px]">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            {APPOINTMENT_STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TreatmentsSelector
          value={treatmentId}
          onValueChange={setTreatmentId}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>التاريخ</TableHead>
            <TableHead>الوقت</TableHead>
            <TableHead>الخطة العلاجية</TableHead>
            <TableHead>مستوى التقدم</TableHead>
            <TableHead>الملاحظات الطبية</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <AppointmentRowSkeletonList count={PAGE_SIZE} />
          ) : isEmpty ? (
            <AppointmentsEmptyState search={debouncedSearch} />
          ) : (
            appointments.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onEdit={() => onEdit(appointment)}
                openAlert={openAlert}
              />
            ))
          )}
        </TableBody>
      </Table>

      <AppointmentsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
