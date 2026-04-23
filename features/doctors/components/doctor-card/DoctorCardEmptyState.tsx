// doctor-card/DoctorsEmptyState.tsx
import { Button } from "@/components/ui/button";
import { Plus, SearchX, Stethoscope } from "lucide-react";

interface DoctorsEmptyStateProps {
  isSearching?: boolean;
  onAdd?: () => void;
  onClearSearch?: () => void;
}

export const DoctorsEmptyState = ({
  isSearching = false,
  onAdd,
  onClearSearch,
}: DoctorsEmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-5 mx-auto">
    <div className="w-16 h-16 rounded-xl bg-muted border flex items-center justify-center">
      {isSearching ? (
        <SearchX className="w-7 h-7 text-muted-foreground" />
      ) : (
        <Stethoscope className="w-7 h-7 text-muted-foreground" />
      )}
    </div>

    <div className="flex flex-col">
      <p className="text-sm font-medium text-foreground">
        {isSearching ? "لا توجد نتائج" : "لا يوجد أطباء بعد"}
      </p>
      <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed">
        {isSearching
          ? "لم يتم العثور على أطباء يطابقون بحثك"
          : "أضف أول طبيب وابدأ ببناء طاقمك الطبي"}
      </p>
    </div>

    <div className="flex items-center gap-2">
      {isSearching && (
        <Button variant="outline" size="sm" onClick={onClearSearch} className="gap-1.5">
          <SearchX className="w-3.5 h-3.5" />
          مسح البحث
        </Button>
      )}
      {!isSearching && (
        <Button variant="outline" size="sm" onClick={onAdd} className="gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          إضافة طبيب
        </Button>
      )}
    </div>
  </div>
);