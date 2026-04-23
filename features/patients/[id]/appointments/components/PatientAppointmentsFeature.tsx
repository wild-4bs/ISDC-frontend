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
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Appointment } from "../types/appointments.type";
import { AppointmentsTable } from "./appointments-table";
import {
  NewAppointmentDialog,
  UpdateAppointmentDialog,
} from "./dialogs/appointments";

type DialogTypes = "new-appointment" | "edit-appointment" | null;

export const PatientAppointmentsFeature = () => {
  const { id }: { id: string } = useParams();
  const [patientName, setPatientName] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<DialogTypes>(null);
  const [appointment, setappointment] = useState<Appointment | undefined>(
    undefined,
  );

  const openDialog = (type: DialogTypes) => {
    setDialogType(type);
    setIsOpen(true);
  };

  return (
    <main>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {dialogType == "new-appointment" && (
          <NewAppointmentDialog
            onSuccess={() => setIsOpen(false)}
            patientId={id}
          />
        )}
        {dialogType == "edit-appointment" && (
          <UpdateAppointmentDialog
            onSuccess={() => setIsOpen(false)}
            patientId={id}
            appointment={appointment}
          />
        )}
      </Dialog>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle className="text-xl">
            {patientName ? (
              <h2>قائمة الحجوزات الخاصة ب{patientName}</h2>
            ) : (
              <Skeleton className="w-100 h-7 bg-gray-200" />
            )}
          </CardTitle>
          <CardAction onClick={() => openDialog("new-appointment")}>
            اظافة حجز <PlusIcon />
          </CardAction>
        </CardHeader>
        <CardContent>
          <AppointmentsTable
            onPatientNameLoad={setPatientName}
            onEdit={(appointment) => {
              setappointment(appointment);
              openDialog("edit-appointment");
            }}
          />
        </CardContent>
      </Card>
    </main>
  );
};
