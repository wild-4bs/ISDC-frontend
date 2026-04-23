import { DialogProvider } from "@/providers/dialog";
import { ActionsTimeline } from "./actions-timeline";
import { ActiveTreatmentsTable } from "./active-treatments-table";
import { AppointmentsChart } from "./AppointmentsChart";
import { QuickActions } from "./QuickActions";
import { StatsCards } from "./stats-cards";

export const Content = () => {
  return (
    <main className="space-y-2">
      <DialogProvider>
        <StatsCards />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
          <QuickActions className="md:col-span-4 lg:col-span-3" />
          <AppointmentsChart className="md:col-span-8 lg:col-span-9" />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
          <ActionsTimeline className="md:col-span-4 lg:col-span-3" />
          <ActiveTreatmentsTable className="md:col-span-8 lg:col-span-9" />
        </div>
      </DialogProvider>
    </main>
  );
};
