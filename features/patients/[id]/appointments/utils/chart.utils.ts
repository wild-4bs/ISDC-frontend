import { DAY_NAMES, MONTH_NAMES } from "@/constants/date-names";
import { ChartDataResponse, ChartEntry } from "../types/appointments.type";

export const transformChartData = (data: ChartDataResponse): ChartEntry[] => {
  const shiftToIraqTime = (label: string): string => {
    const match = label.match(/^(\d{2})\s*(AM|PM)$/i);
    if (!match) return label;

    let hour = parseInt(match[1]);
    const period = match[2].toUpperCase();

    // Convert to 24h
    if (period === "AM") {
      hour = hour === 12 ? 0 : hour;
    } else {
      hour = hour === 12 ? 12 : hour + 12;
    }

    // Shift +3 for Iraq (Asia/Baghdad)
    hour = (hour + 3) % 24;

    // Convert back to 12h
    const newPeriod = hour >= 12 ? "PM" : "AM";
    const newHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${String(newHour).padStart(2, "0")} ${newPeriod}`;
  };

  const confirmedMap = Object.fromEntries(
    data.confirmed.map((d) => [d.label.trim(), d.count]),
  );

  return data.total.map((d) => {
    const trimmedLabel = d.label.trim();
    const shiftedLabel = shiftToIraqTime(trimmedLabel);
    const label =
      DAY_NAMES[shiftedLabel] ?? MONTH_NAMES[shiftedLabel] ?? shiftedLabel;

    return {
      label,
      مواعيد: d.count,
      مكتملة: confirmedMap[trimmedLabel] ?? 0,
    };
  });
};