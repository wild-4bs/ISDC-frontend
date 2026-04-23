"use client";
import { useGetStatistics } from "@/hooks/api/statistics";
import { ClipboardList, FolderKanban, NotebookPen, Users2 } from "lucide-react";
import {
  StatsCard,
  StatsCardHeader,
  StatsCardTitle,
  StatsCardValue,
} from "./StatsCard";

export const StatsCards = () => {
  const { data, isFetching } = useGetStatistics();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      <StatsCard isPending={isFetching || !data}>
        <StatsCardHeader>
          <StatsCardTitle>اجمالي المقالات</StatsCardTitle>
          <NotebookPen size={24} strokeWidth={1} />
        </StatsCardHeader>
        <StatsCardValue>{data?.totalArticles}</StatsCardValue>
      </StatsCard>

      <StatsCard isPending={isFetching || !data}>
        <StatsCardHeader>
          <StatsCardTitle>اجمالي المشاريع</StatsCardTitle>
          <FolderKanban size={24} strokeWidth={1} />
        </StatsCardHeader>
        <StatsCardValue>{data?.totalProjects}</StatsCardValue>
      </StatsCard>

      <StatsCard isPending={isFetching || !data}>
        <StatsCardHeader>
          <StatsCardTitle>الخطط العلاجية</StatsCardTitle>
          <ClipboardList size={24} strokeWidth={1} />
        </StatsCardHeader>
        <StatsCardValue>{data?.totalTreatmentPlans}</StatsCardValue>
      </StatsCard>

      <StatsCard isPending={isFetching || !data}>
        <StatsCardHeader>
          <StatsCardTitle>اجمالي المرضى</StatsCardTitle>
          <Users2 size={24} strokeWidth={1} />
        </StatsCardHeader>
        <StatsCardValue>{data?.totalPatients}</StatsCardValue>
      </StatsCard>
    </div>
  );
};
