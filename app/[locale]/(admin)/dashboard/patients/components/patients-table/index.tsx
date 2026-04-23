// PatientsTable.tsx
"use client";
import { EditPatientDialog } from "@/app/[locale]/(admin)/components/dialogs/patients/edit-patient-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewTreatmentDialog } from "@/features/patients/[id]/treatments/components/dialogs/new-treatment";
import {
  Patient,
  useDeletePatient,
  useGetPatients,
} from "@/hooks/api/patients";
import { useDebounce } from "@/hooks/debounce";
import { useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteAptientAlert } from "./alerts/DeleteAptientAlert";
import { PatientsEmptyState } from "./PatientEmptyState";
import { PatientsPagination } from "./PatientPagination";
import { PatientRow } from "./PatientRow";
import { PatientRowSkeletonList } from "./PatientRowSkeleton";

const PAGE_SIZE = 10;

type AlertTypes = "delete-patient" | null;
type DialogTypes = "edit-patient" | "new-treatment" | null;

export const PatientsTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<AlertTypes>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogTypes>(null);

  const { data, isPending } = useGetPatients({
    search: debouncedSearch,
    page,
    limit: PAGE_SIZE,
  });

  const deletePatient = useDeletePatient();
  const queryClient = useQueryClient();

  const patients = data?.payload ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const isEmpty = !isPending && patients && patients?.length === 0;

  const openAlert = (type: AlertTypes) => {
    setIsAlertOpen(true);
    setAlertType(type);
  };

  const openDialog = (type: DialogTypes) => {
    setIsDialogOpen(true);
    setDialogType(type);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-3">
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        {alertType == "delete-patient" && (
          <DeleteAptientAlert
            onConfirm={() =>
              patient &&
              deletePatient.mutate(patient?.id, {
                onSuccess: async (res) => {
                  setIsAlertOpen(false);
                  setPatient(null);
                  setAlertType(null);
                  toast.success(res?.message);
                  await queryClient.invalidateQueries({
                    queryKey: ["patients"],
                  });
                },
              })
            }
            isPending={deletePatient.isPending}
          />
        )}
      </AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {dialogType == "edit-patient" && (
          <EditPatientDialog onSuccess={closeDialog} patient={patient} />
        )}
        {dialogType == "new-treatment" && (
          <NewTreatmentDialog onSuccess={closeDialog} patientId={patient?.id} />
        )}
      </Dialog>
      <Input
        size="sm"
        className="w-full"
        placeholder="ادخل اسم المريض..."
        aria-label="بحث في سجل المرضى"
        icon={<Search />}
        spellCheck={false}
        autoComplete="off"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>اسم المريض</TableHead>
            <TableHead>المعرف</TableHead>
            <TableHead>رقم الهاتف</TableHead>
            <TableHead>عدد المواعيد الكلي</TableHead>
            <TableHead>عدد العلاجات الكلي</TableHead>
            <TableHead className="text-center">الاجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <PatientRowSkeletonList count={PAGE_SIZE} />
          ) : isEmpty ? (
            <PatientsEmptyState search={debouncedSearch} />
          ) : (
            patients.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                onDelete={() => {
                  setPatient(patient);
                  openAlert("delete-patient");
                }}
                onUpdate={() => {
                  setPatient(patient);
                  openDialog("edit-patient");
                }}
                onNewTreatment={() => {
                  setPatient(patient);
                  openDialog("new-treatment");
                }}
              />
            ))
          )}
        </TableBody>
      </Table>

      <PatientsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
