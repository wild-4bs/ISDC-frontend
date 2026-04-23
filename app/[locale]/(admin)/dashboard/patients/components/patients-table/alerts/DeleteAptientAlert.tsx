import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StaticIcon } from "@/components/ui/StaticIcon";
import { Trash } from "lucide-react";

export const DeleteAptientAlert = ({
  onConfirm,
  isPending,
}: {
  onConfirm: () => void;
  isPending: boolean;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <StaticIcon
          variant={"soft"}
          theme={"danger"}
          size={"lg"}
          shape={"circular"}
        >
          <Trash />
        </StaticIcon>
        <AlertDialogTitle className="text-xl font-bold">
          تأكيد حذف ملف المريض
        </AlertDialogTitle>

        <AlertDialogDescription className="">
          <br />
          <strong className="text-destructive">تنبيه:</strong> هذا الإجراء سيؤدي
          إلى حذف جميع البيانات المرتبطة بالمريض نهائياً، بما في ذلك{" "}
          <strong>السجلات العلاجية</strong> و <strong>المواعيد المحجوزة</strong>
          .
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="mt-4">
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            onConfirm();
          }}
          theme={"danger"}
          disabled={isPending}
        >
          {isPending ? "جاري الحذف..." : "تأكيد الحذف"}
        </AlertDialogAction>
        <AlertDialogCancel disabled={isPending}>تراجع</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
