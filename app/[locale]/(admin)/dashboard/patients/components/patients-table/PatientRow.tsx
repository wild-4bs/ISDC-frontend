// PatientRow.tsx
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { Patient } from "@/hooks/api/patients";
import { Link } from "@/i18n/routing";
import { arabicPlural } from "@/lib/arabic-plural";
import { useIsMutating } from "@tanstack/react-query";
import {
  ClipboardList,
  History,
  MoreVertical,
  Stethoscope,
  Trash2,
  UserPen,
} from "lucide-react";

export const treatmentPlurals = {
  zero: "علاج",
  one: "علاج",
  two: "علاجان",
  few: "علاجات",
  many: "علاجاً",
  other: "علاج",
};

const appointments = {
  zero: "موعد",
  one: "موعد",
  two: "موعدان",
  few: "مواعيد",
  many: "موعداً",
  other: "موعد",
};

export const PatientRow = ({
  patient,
  onDelete,
  onUpdate,
  onNewTreatment,
}: {
  patient: Patient;
  onDelete?: () => void;
  onUpdate?: () => void;
  onNewTreatment?: () => void;
}) => {
  const isDeleting = useIsMutating({
    mutationKey: [`delete-patient-${patient.id}`],
    predicate: (mutation) => mutation.state.variables === patient.id,
  });
  return (
    <TableRow>
      <TableCell className="font-medium">{patient.name}</TableCell>
      <TableCell className="text-muted-foreground">#{patient.cardId}</TableCell>
      <TableCell dir="ltr" className="text-right">
        {patient.phone ?? "—"}
      </TableCell>
      <TableCell>
        {arabicPlural(Number(patient?.totalAppointments), appointments)}
      </TableCell>
      <TableCell>
        {arabicPlural(Number(patient?.totalTreatments), treatmentPlurals)}
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon-sm"
                variant="ghost"
                className="text-foreground"
              >
                <MoreVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-1 w-52" align="end">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                إجراءات سريعة
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                onClick={onNewTreatment}
              >
                <Stethoscope size={16} className="text-emerald-500" />
                <span>إنشاء خطة علاج</span>
              </Button>

              <div className="my-1 border-t border-input" />

              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                السجلات
              </div>
              <Link href={`/dashboard/patients/${patient.id}/appointments`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-foreground gap-2 h-9 w-full"
                >
                  <ClipboardList size={16} className="text-blue-400" />
                  <span>سجل المواعيد</span>
                </Button>
              </Link>
              <Link href={`/dashboard/patients/${patient.id}/treatments`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-foreground gap-2 h-9 w-full"
                >
                  <History size={16} className="text-violet-400" />
                  <span>الخطط العلاجية</span>
                </Button>
              </Link>

              <div className="my-1 border-t border-input" />

              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                إدارة المريض
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9"
                onClick={onUpdate}
              >
                <UserPen size={16} className="text-amber-400" />
                <span>تعديل بيانات المريض</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="justify-start text-foreground gap-2 h-9 hover:text-destructive!"
                disabled={!!isDeleting}
                onClick={onDelete}
              >
                <Trash2 size={16} className="text-rose-400" />
                <span>حذف المريض</span>
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </TableCell>
    </TableRow>
  );
};
