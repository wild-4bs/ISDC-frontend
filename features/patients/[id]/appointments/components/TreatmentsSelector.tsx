"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetTreatmentsByPatient } from "../../treatments";

export const TreatmentsSelector = ({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) => {
  const { id }: { id: string } = useParams();
  const [enabled, setEnabled] = useState(false);

  const { data, isPending, refetch } = useGetTreatmentsByPatient(
    { patientId: id },
    {
      enabled,
      staleTime: 0,
    },
  );

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setEnabled(true);
      refetch();
    }
    props.onOpenChange?.(open);
  };

  return (
    <Select {...props} onOpenChange={handleOpenChange}>
      <SelectTrigger className="h-full! sm:min-w-[130px]">
        <SelectValue placeholder="الخطة العلاجية" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"all"}>الكل</SelectItem>
        {isPending && <Spinner className="mx-auto size-6 text-primary my-2" />}
        {!isPending &&
          data?.payload?.map((treatment) => (
            <SelectItem key={treatment.id} value={treatment.id}>
              {treatment.serviceType}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
