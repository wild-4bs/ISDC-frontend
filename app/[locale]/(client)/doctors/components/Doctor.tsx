import { Skeleton } from "@/components/ui/skeleton";
import { Doctor as DoctorType } from "@/features/doctors/types/index.types";
import { API_URL } from "@/lib/axios";
import Image from "next/image";

// ── Skeleton ──────────────────────────────────────────────────────────────

export const DoctorSkeleton = () => (
  <article className="rounded-lg overflow-hidden border border-input shadow-xs">
    <Skeleton className="w-full aspect-square" />
    <div className="p-4 space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </article>
);

// ── Card ──────────────────────────────────────────────────────────────────

interface DoctorProps {
  doctor: DoctorType;
}

export const Doctor = ({ doctor }: DoctorProps) => {
  return (
    <article className="rounded-lg overflow-hidden border border-input shadow-xs">
      <div className="relative w-full aspect-square">
        <Image
          src={`${API_URL}${doctor.image}`}
          width={1000}
          height={1000}
          alt={doctor.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-start">
        <h3 className="font-medium text-xl">{doctor.name}</h3>
        <p className="text-primary">{doctor.profession}</p>
      </div>
    </article>
  );
};
