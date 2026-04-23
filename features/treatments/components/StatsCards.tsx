import {
  StatsCard,
  StatsCardHeader,
  StatsCardTitle,
  StatsCardValue,
} from "@/app/[locale]/(admin)/dashboard/components/stats-cards/StatsCard";
import { CalendarCheckIcon, CalendarClockIcon, ImageIcon } from "lucide-react";

interface Props {
  data: {
    expectedSessions?: string | number;
    completedAppointments?: string | number;
    totalClinicalImages?: string | number;
  };
  isPending?: boolean;
}

export const StatsCards = ({ data, isPending }: Props) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <StatsCard isPending={isPending}>
        <StatsCardHeader>
          <StatsCardTitle>الجلسات المتوقعة</StatsCardTitle>
          <CalendarClockIcon size={24} strokeWidth={1.4} />
        </StatsCardHeader>
        <StatsCardValue>{data.expectedSessions}</StatsCardValue>
      </StatsCard>

      <StatsCard isPending={isPending}>
        <StatsCardHeader>
          <StatsCardTitle>الجلسات المنجزة</StatsCardTitle>
          <CalendarCheckIcon size={24} strokeWidth={1.4} />
        </StatsCardHeader>
        <StatsCardValue>{data.completedAppointments}</StatsCardValue>
      </StatsCard>

      <StatsCard isPending={isPending}>
        <StatsCardHeader>
          <StatsCardTitle>الصور الطبية</StatsCardTitle>
          <ImageIcon size={24} strokeWidth={1.4} />
        </StatsCardHeader>
        <StatsCardValue>{data.totalClinicalImages}</StatsCardValue>
      </StatsCard>
    </div>
  );
};
