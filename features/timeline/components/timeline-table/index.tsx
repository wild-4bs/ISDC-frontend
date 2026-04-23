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
import { useDebounce } from "@/hooks/debounce";
import { Activity, FilePen, Search, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import {
  ActionType,
  TimelineItem,
  useGetActionsTimeline,
} from "../../index.exports";
import { TimelineEmptyState } from "./TimelineEmptyState";
import { TimelinePagination } from "./TimelinePagination";
import { TimelineRow } from "./TimelineRow";
import { TimelineRowSkeletonList } from "./TimelineSkeleton";

// ── constants ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

const ACTION_OPTIONS: {
  label: string;
  value: ActionType | "ALL";
  icon: React.ReactNode;
}[] = [
  {
    label: "الكل",
    value: "ALL",
    icon: <Activity size={14} className="text-muted-foreground" />,
  },
  {
    label: "إنشاء",
    value: "CREATE",
    icon: <UserPlus size={14} className="text-success" />,
  },
  {
    label: "تحديث",
    value: "UPDATE",
    icon: <FilePen size={14} className="text-muted-foreground" />,
  },
  {
    label: "حذف",
    value: "DELETE",
    icon: <Trash2 size={14} className="text-destructive" />,
  },
];

// ── component ─────────────────────────────────────────────────────────────

export const TimelineTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState<ActionType | "ALL">("ALL");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending } = useGetActionsTimeline({
    page,
    limit: PAGE_SIZE,
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(actionFilter !== "ALL" ? { actionType: actionFilter } : {}),
  });

  const items: TimelineItem[] = data?.payload ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const isEmpty = !isPending && items.length === 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleActionFilter = (value: string) => {
    setActionFilter(value as ActionType | "ALL");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ── filters ── */}
      <div className="flex gap-2">
        <Input
          size="sm"
          className="flex-1"
          placeholder="البحث في الأحداث..."
          icon={<Search />}
          spellCheck={false}
          autoComplete="off"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Select value={actionFilter} onValueChange={handleActionFilter}>
          <SelectTrigger className="h-full! sm:min-w-[130px]">
            <SelectValue placeholder="نوع الحدث" />
          </SelectTrigger>
          <SelectContent>
            {ACTION_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                <div className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── table ── */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>العنوان</TableHead>
            <TableHead>الهدف</TableHead>
            <TableHead>نوع الكيان</TableHead>
            <TableHead>نوع الحدث</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TimelineRowSkeletonList count={PAGE_SIZE} />
          ) : isEmpty ? (
            <TimelineEmptyState search={debouncedSearch} />
          ) : (
            items.map((item) => (
              <TimelineRow
                key={item.id}
                item={item}
              />
            ))
          )}
        </TableBody>
      </Table>

      <TimelinePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
