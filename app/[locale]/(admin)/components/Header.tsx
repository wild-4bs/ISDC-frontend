"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const segmentLabels: Record<string, string> = {
  dashboard: "لوحة التحكم",
  patients: "المرضى",
  appointments: "المواعيد",
  treatments: "العلاجات",
  settings: "الإعدادات",
  statistics: "الإحصائيات",
  projects: "الاعمال",
  blogs: "المقالات",
  doctors: "الاطباء",
  timeline: "سجل الاحداث",
};

const buildCrumbs = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isId = /^[0-9a-f-]{8,}$|^\d+$/.test(segment);
    const label = isId ? "التفاصيل" : (segmentLabels[segment] ?? segment);

    return { label, href, isLast: index === segments.length - 1 };
  });
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("ar-IQ-u-nu-latn", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("ar-IQ-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const Header = () => {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{ gridArea: "header" }}
      className="h-dashboard-header-height bg-background border-b border-b-input px-6 flex items-center justify-between"
    >
      <Breadcrumb>
        <BreadcrumbList>
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!crumb.isLast && <BreadcrumbSeparator />}
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col items-end">
        {now && (
          <>
            <span className="text-base font-medium text-foreground tabular-nums leading-[100%]">
              {formatTime(now)}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatDate(now)}
            </span>
          </>
        )}
      </div>
    </header>
  );
};
