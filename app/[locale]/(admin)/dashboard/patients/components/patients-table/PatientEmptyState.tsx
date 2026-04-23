// PatientsEmptyState.tsx
import { Users } from "lucide-react";

export const PatientsEmptyState = ({ search }: { search: string }) => (
  <tr>
    <td colSpan={6}>
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
        <Users size={36} strokeWidth={1.5} />
        <p className="font-medium text-sm">
          {search ? `لا توجد نتائج لـ "${search}"` : "لا يوجد مرضى مسجلون بعد"}
        </p>
        {search && <p className="text-xs">حاول البحث باسم مختلف</p>}
      </div>
    </td>
  </tr>
);
