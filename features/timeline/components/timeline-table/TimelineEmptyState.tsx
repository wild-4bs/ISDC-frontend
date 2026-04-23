import { FolderOpen } from "lucide-react";

export const TimelineEmptyState = ({ search }: { search: string }) => (
  <tr>
    <td colSpan={6}>
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
        <FolderOpen size={36} strokeWidth={1.5} />
        <p className="font-medium text-sm">
          {search ? `لا توجد نتائج لـ "${search}"` : "لا توجد أحداث مسجلة بعد"}
        </p>
        {search && <p className="text-xs">حاول البحث بكلمة مختلفة</p>}
      </div>
    </td>
  </tr>
);
