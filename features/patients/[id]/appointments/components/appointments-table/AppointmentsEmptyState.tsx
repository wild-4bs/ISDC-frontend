import { CalendarOff } from "lucide-react";

export const AppointmentsEmptyState = ({ search }: { search: string }) => (
  <tr>
    <td colSpan={7}>
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
        <CalendarOff size={36} strokeWidth={1.5} />
        <p className="font-medium text-sm">
          {search ? `لا توجد نتائج لـ "${search}"` : "لا توجد مواعيد مسجلة بعد"}
        </p>
        {search && <p className="text-xs">حاول البحث بكلمة مختلفة</p>}
      </div>
    </td>
  </tr>
);
