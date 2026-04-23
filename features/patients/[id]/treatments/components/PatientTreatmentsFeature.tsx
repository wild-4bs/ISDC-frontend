"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Patient } from "@/hooks/api/patients";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FullTreatment, TreatmentByPatient } from "../types/treatments.type";
import { NewTreatmentDialog } from "./dialogs/new-treatment";
import { UpdateTreatmentDialog } from "./dialogs/update-treatment";
import { TreatmentsTable } from "./treatments-table";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type DialogTypes = "new-treatment" | "edit-treatment" | null;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export const PatientTreatmentsFeature = () => {
  const { id }: { id: string } = useParams();

  const [patient, setPatient] = useState<Patient | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogTypes>(null);
  const [treatment, setTreatment] = useState<TreatmentByPatient | undefined>(
    undefined,
  );

  const openDialog = (type: DialogTypes) => {
    setDialogType(type);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setDialogType(null);
    setIsOpen(false);
  };

  return (
    <main>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {dialogType === "new-treatment" && (
          <NewTreatmentDialog onSuccess={closeDialog} patientId={id} />
        )}
        {dialogType === "edit-treatment" && treatment && (
          <UpdateTreatmentDialog
            onSuccess={closeDialog}
            treatment={treatment}
          />
        )}
      </Dialog>

      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-xl">
            {patient?.name ? (
              <h2>قائمة العلاجات الخاصة ب{patient?.name}</h2>
            ) : (
              <Skeleton className="w-100 h-7 bg-gray-200" />
            )}
          </CardTitle>
          <CardAction onClick={() => openDialog("new-treatment")}>
            إضافة علاج <PlusIcon />
          </CardAction>
        </CardHeader>

        <CardContent>
          <TreatmentsTable
            onPatientLoad={setPatient}
            onEdit={(treatment) => {
              setTreatment(treatment);
              openDialog("edit-treatment");
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
};
