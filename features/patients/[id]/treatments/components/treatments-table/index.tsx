"use client";
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
import { Patient } from "@/hooks/api/patients";
import { useDebounce } from "@/hooks/debounce";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetTreatmentsByPatient } from "../../api/treatments.hook";
import {
  TreatmentByPatient,
  TreatmentStatus,
} from "../../types/treatments.type";
import { TreatmentsEmptyState } from "./TreatmentsEmptyState";
import { TreatmentsPagination } from "./TreatmentsPagination";
import { TreatmentRow } from "./TreatmentsRow";
import { TreatmentRowSkeletonList } from "./TreatmentsRowSkeleton";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const STATUS_OPTIONS: { label: string; value: TreatmentStatus | "all" }[] = [
  { label: "الكل", value: "all" },
  { label: "نشط", value: "active" },
  { label: "مكتمل", value: "completed" },
  { label: "معلق", value: "on_hold" },
  { label: "ملغي", value: "cancelled" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface TreatmentsTableProps {
  onEdit: (treatment: TreatmentByPatient) => void;
  onPatientLoad: (patient: Patient) => void;
}

export const TreatmentsTable = ({
  onEdit,
  onPatientLoad,
}: TreatmentsTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TreatmentStatus | "all">("all");

  const { id }: { id: string } = useParams();
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending } = useGetTreatmentsByPatient({
    patientId: id,
    ...(status !== "all" ? { status } : {}),
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    page,
  });

  useEffect(() => {
    if (data?.patient) onPatientLoad(data.patient);
  }, [data?.patient]);

  const treatments = data?.payload ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const isEmpty = !isPending && treatments.length === 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as TreatmentStatus | "all");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          size="sm"
          className="flex-1"
          placeholder="البحث في الخطط العلاجية..."
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
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نوع الخدمة</TableHead>
            <TableHead>الجلسات المتوقعة</TableHead>
            <TableHead>عدد الجلسات</TableHead>
            <TableHead>الجلسات المنجزة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>تاريخ الإنشاء</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TreatmentRowSkeletonList count={PAGE_SIZE} />
          ) : isEmpty ? (
            <TreatmentsEmptyState search={debouncedSearch} />
          ) : (
            treatments.map((treatment) => (
              <TreatmentRow
                key={treatment.id}
                treatment={treatment}
                onEdit={() => onEdit(treatment)}
              />
            ))
          )}
        </TableBody>
      </Table>
      <TreatmentsPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
