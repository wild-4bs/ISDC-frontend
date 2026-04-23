"use client";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserStore } from "@/stores/userStore";
import { IdCard, Phone } from "lucide-react";
import { Treatments } from "./treatments";

export const PatientProfileFeature = () => {
  const { user } = useUserStore();

  return (
    <main>
      <header
        className="min-h-[25vh] flex items-center text-white"
        style={{ background: "linear-gradient(45deg, #3471DC, #214194)" }}
      >
        <Container>
          {!user ? (
            <div className="flex flex-col gap-3">
              <Skeleton className="h-9 w-64 bg-white/20" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-5 w-36 bg-white/20" />
                <Skeleton className="h-5 w-24 bg-white/20" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-2">{user?.name}</h1>
              <dl className="flex items-center gap-4 font-normal text-lg">
                {user?.phone && (
                  <div className="flex items-center gap-2">
                    <dt className="-translate-y-[0.14rem]">
                      <Phone size={18} strokeWidth={1.4} />
                    </dt>
                    <dd>{user?.phone}</dd>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <dt className="-translate-y-[0.14rem]">
                    <IdCard size={22} strokeWidth={1.4} />
                  </dt>
                  <dd>{user?.cardId}</dd>
                </div>
              </dl>
            </>
          )}
        </Container>
      </header>
      <Treatments />
    </main>
  );
};
