"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAppointmentsChartData } from "@/features/patients/[id]/appointments";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ComponentProps, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

type Period = "today" | "this-week" | "this-month" | "last-6-months";

const chartConfig = {
  مواعيد: { label: "المواعيد", color: "var(--primary)" },
  مكتملة: { label: "المكتملة", color: "var(--chart-2)" },
} satisfies ChartConfig;

const PERIOD_LABELS: Record<Period, string> = {
  today: "اليوم",
  "this-week": "هذا الأسبوع",
  "this-month": "هذا الشهر",
  "last-6-months": "آخر 6 أشهر",
};

export const AppointmentsChart = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const [period, setPeriod] = useState<Period>("this-week");

  const { data = [], isPending } = useGetAppointmentsChartData({ period });

  return (
    <Card {...props} className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          حجوزات {PERIOD_LABELS[period]}
        </CardTitle>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="min-w-30">
            <SelectValue placeholder="اختر فترة زمنية" />
          </SelectTrigger>
          <SelectContent align="start">
            {Object.entries(PERIOD_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent
        className={clsx("ps-4", {
          "pe-0": !isPending,
          "pe-4": isPending,
        })}
      >
        {isPending ? (
          <Skeleton className="h-[250px] w-full rounded-md" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMواعيد" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorMكتملة" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickMargin={16}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="مواعيد"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#colorMواعيد)"
                animationDuration={400}
              />
              <Area
                type="monotone"
                dataKey="مكتملة"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#colorMكتملة)"
                animationDuration={400}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
