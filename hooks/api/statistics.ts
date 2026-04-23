import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

interface StatisticsResponse {
  totalPatients: number;
  totalTreatmentPlans: number;
  totalProjects: number;
  totalArticles: number;
}

export interface FormattedStatistics {
  totalPatients: string;
  totalTreatmentPlans: string;
  totalProjects: string;
  totalArticles: string;
}

export const useGetStatistics = () =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<StatisticsResponse>>("/v1/statistics"),
    queryKey: ["statistics"],
    staleTime: 0,
    gcTime: 0,
    select: (res): FormattedStatistics => {
      const data = res.payload;
      const formatter = new Intl.NumberFormat("ar");
      return {
        totalPatients: formatter.format(data.totalPatients),
        totalTreatmentPlans: formatter.format(data.totalTreatmentPlans),
        totalProjects: formatter.format(data.totalProjects),
        totalArticles: formatter.format(data.totalArticles),
      };
    },
  });
