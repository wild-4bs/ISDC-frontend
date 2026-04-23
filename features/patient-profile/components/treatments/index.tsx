import { treatmentPlurals } from "@/app/[locale]/(admin)/dashboard/patients/components/patients-table/PatientRow";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyTreatments } from "@/features/patients/[id]/treatments";
import { arabicPlural } from "@/lib/arabic-plural";
import { Calendar, ShieldX } from "lucide-react";
import { Treatment } from "./Treatment";

export const Treatments = () => {
  const { data, isPending } = useGetMyTreatments();

  const treatments = data?.payload ?? [];
  const isEmpty = !isPending && treatments.length === 0;

  return (
    <section className="py-8 bg-primary/10 px-2">
      <Container className="px-5 py-4 rounded-2xl border border-input shadow-xs bg-background">
        <header className="flex justify-between pb-2 border-b border-b-input max-md:gap-2">
          <h2 className="flex items-center gap-2">
            <Calendar className="text-primary" width={20} strokeWidth={1.5} />
            <span className="font-semibold inline-block translate-y-0.5 text-lg">
              الخطط العلاجية
            </span>
          </h2>
          <span className="font-medium text-neutral-500 leading-[100%] flex items-end justify-center">
            {isPending ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              arabicPlural(Number(data?.pagination?.total), treatmentPlurals)
            )}
          </span>
        </header>

        <div className="flex flex-col gap-4 mt-3">
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-input overflow-hidden"
              >
                <div className="flex items-center justify-between p-3 border-b border-input">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="p-3 mx-1 my-2 rounded-lg border border-input flex flex-col gap-2">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
                <div className="flex justify-between px-2 py-1 border-t border-input">
                  <Skeleton className="h-7 w-28 rounded-md" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              </div>
            ))
          ) : isEmpty ? (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center text-muted-foreground">
              <ShieldX size={40} strokeWidth={1.3} />
              <div>
                <p className="font-medium text-sm">لا توجد خطط علاجية مسجلة</p>
                <p className="text-xs mt-1">
                  ستظهر هنا خططك العلاجية بمجرد إضافتها من قبل الطاقم الطبي
                </p>
              </div>
            </div>
          ) : (
            treatments.map((t) => <Treatment key={t.id} treatment={t} />)
          )}
        </div>
      </Container>
    </section>
  );
};
