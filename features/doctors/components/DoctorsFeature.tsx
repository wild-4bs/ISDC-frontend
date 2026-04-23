// DoctorsFeature.tsx
"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/debounce";
import { DialogRegistry, DialogRenderer, useDialog } from "@/providers/dialog";
import { PlusIcon, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGetDoctorsInfinite } from "../api/doctors.hook";
import { EditDoctorDialog, NewDoctorDialog } from "./dialogs";
import {
  DoctorCard,
  DoctorCardSkeletonList,
  DoctorsEmptyState,
} from "./doctor-card";

const registry: DialogRegistry = {
  "new-doctor": NewDoctorDialog,
  "edit-doctor": EditDoctorDialog,
};

export const DoctorsFeature = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetDoctorsInfinite({ search: debouncedSearch });

  const { openDialog } = useDialog();

  const doctors = data?.pages.flatMap((page) => page.payload) ?? [];

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <main>
      <DialogRenderer registry={registry} />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            <h1>إدارة الطاقم الطبي</h1>
          </CardTitle>
          <CardAction onClick={() => openDialog("new-doctor")}>
            إضافة طبيب جديد <PlusIcon />
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Input
              size="sm"
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="ابحث عن اسم الطبيب"
              icon={<Search />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
              {isPending && <DoctorCardSkeletonList />}
              {!isPending &&
                doctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>

            {!isPending && doctors.length === 0 && (
              <DoctorsEmptyState
                onAdd={() => openDialog("new-doctor")}
                isSearching={search.trim().length > 0}
                onClearSearch={() => setSearch("")}
              />
            )}

            <div ref={sentinelRef} className="h-1 w-full" />

            {isFetchingNextPage && (
              <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-2">
                <DoctorCardSkeletonList />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
