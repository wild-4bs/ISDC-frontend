import { DAY_NAMES, MONTH_NAMES } from "@/constants/date-names";
import {
  ChartDataResponse,
  ChartEntry,
} from "@/features/patients/[id]/appointments";

export const transformChartData = (data: ChartDataResponse): ChartEntry[] => {
  const confirmedMap = Object.fromEntries(
    data.confirmed.map((d) => [d.label.trim(), d.count]),
  );

  return data.total.map((d) => {
    const trimmedLabel = d.label.trim();
    const label =
      DAY_NAMES[trimmedLabel] ?? MONTH_NAMES[trimmedLabel] ?? trimmedLabel;

    return {
      label,
      مواعيد: d.count,
      مكتملة: confirmedMap[trimmedLabel] ?? 0,
    };
  });
};
