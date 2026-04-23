// ActiveTreatmentsTable.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTreatments } from "@/features/patients/[id]/treatments";
import { cn } from "@/lib/utils";
import { Stethoscope } from "lucide-react";
import { ComponentProps } from "react";
import { ActiveTreatmentRow } from "./ActiveTreatmentRow";
import { ActiveTreatmentSkeletonRows } from "./ActiveTreatmentRowSkeleton";

export const ActiveTreatmentsTable = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { data, isPending } = useGetAllTreatments({
    status: "active",
  });

  return (
    <Card {...props} className={cn("h-fit pb-2", className)}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <h2>خطط علاجية قيد التنفيذ</h2>
        </CardTitle>
        {/* <Link href="/dashboard/treatments">
          <CardAction size="sm" variant="soft">
            <span className="max-sm:hidden">عرض جميع الخطط العلاجية</span>
            <ArrowLeft size={14} />
          </CardAction>
        </Link> */}
      </CardHeader>
      <CardContent className="p-2! pb-0!">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>اسم المريض</TableHead>
              <TableHead>الخطة العلاجية</TableHead>
              <TableHead>مجموع المواعيد</TableHead>
              <TableHead>المواعيد المكتملة</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-center">الاجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!data || isPending ? (
              <ActiveTreatmentSkeletonRows count={5} />
            ) : data?.payload?.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={999} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Stethoscope size={32} className="opacity-30" />
                    <p className="text-sm">لا توجد خطط علاجية نشطة حالياً</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.payload?.map((treatment) => (
                <ActiveTreatmentRow
                  treatment={treatment}
                  key={treatment.id}
                  id={treatment.id}
                  patientId={treatment.patientId}
                />
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
