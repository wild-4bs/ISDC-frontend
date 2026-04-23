import { Button } from "@/components/ui/button";
import { LayoutGrid, Plus, SearchX } from "lucide-react";

interface ProjectsEmptyStateProps {
  isSearching?: boolean;
  onAdd?: () => void;
  onClearSearch?: () => void;
}

export const ProjectsEmptyState = ({
  isSearching = false,
  onAdd,
  onClearSearch,
}: ProjectsEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-5 mx-auto">
      <div className="w-16 h-16 rounded-xl bg-muted border flex items-center justify-center">
        {isSearching ? (
          <SearchX className="w-7 h-7 text-muted-foreground" />
        ) : (
          <LayoutGrid className="w-7 h-7 text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-foreground">
          {isSearching ? "لا توجد نتائج" : "لا توجد مشاريع بعد"}
        </p>
        <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
          {isSearching
            ? "لم يتم العثور على مشاريع تطابق بحثك"
            : "أضف مشروعك الأول وابدأ بعرض أعمالك"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {isSearching && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSearch}
            className="gap-1.5"
          >
            <SearchX className="w-3.5 h-3.5" />
            مسح البحث
          </Button>
        )}
        {!isSearching && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            إضافة مشروع
          </Button>
        )}
      </div>
    </div>
  );
};
