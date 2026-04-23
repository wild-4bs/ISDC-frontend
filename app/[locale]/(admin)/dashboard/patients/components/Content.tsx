"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { NewPatientDialog } from "../../../components/dialogs";
import { PatientsTable } from "./patients-table";

type DialogTypes = "new-patient" | null;
export const Content = () => {
  const [dialogType, setDialogType] = useState<DialogTypes>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = (type: DialogTypes) => {
    setIsOpen(true);
    setDialogType(type);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogType(null);
  };

  return (
    <main>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {dialogType == "new-patient" && (
          <NewPatientDialog onSuccess={closeDialog} />
        )}
      </Dialog>
      <Card>
        <CardHeader className="mb-4">
          <CardTitle>
            <h2 className="text-xl">قائمة المرضى</h2>
          </CardTitle>
          <CardAction onClick={() => openDialog("new-patient")}>
            إضافة مريض <Plus />
          </CardAction>
        </CardHeader>
        <CardContent>
          <PatientsTable />
        </CardContent>
      </Card>
    </main>
  );
};
