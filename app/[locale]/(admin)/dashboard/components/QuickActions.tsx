"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewBlogDialog } from "@/features/blogs/components/dialogs";
import { NewDoctorDialog } from "@/features/doctors/components/dialogs";
import { NewProjectDialog } from "@/features/projects/components/dialogs";
import { cn } from "@/lib/utils";
import { DialogRegistry, DialogRenderer, useDialog } from "@/providers/dialog";
import {
  FolderPlus,
  LucideProps,
  Newspaper,
  Stethoscope,
  UserPlus,
} from "lucide-react";
import {
  ComponentProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import { NewPatientDialog } from "../../components/dialogs";

interface QuickAction {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  dialogKey: string;
}

const registry: DialogRegistry = {
  "new-patient": NewPatientDialog,
  "new-project": NewProjectDialog,
  "new-blog": NewBlogDialog,
  "new-doctor": NewDoctorDialog,
};

const QUICK_ACTIONS: QuickAction[] = [
  { label: "اضافة مريض", icon: UserPlus, dialogKey: "new-patient" },
  { label: "انشاء مشروع جديد", icon: FolderPlus, dialogKey: "new-project" },
  { label: "انشاء مقال", icon: Newspaper, dialogKey: "new-blog" },
  { label: "اضافة طبيب", icon: Stethoscope, dialogKey: "new-doctor" },
];

export const QuickActions = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { openDialog } = useDialog();

  return (
    <>
      <DialogRenderer registry={registry} />
      <Card {...props} className={cn(className)}>
        <CardHeader>
          <CardTitle className="text-lg text-right">
            الأجرائات السريعة
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              variant="soft"
              className="w-full justify-start"
              onClick={() => openDialog(action.dialogKey)}
            >
              <action.icon />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>
    </>
  );
};
