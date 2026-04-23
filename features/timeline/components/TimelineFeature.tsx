"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineTable } from "./timeline-table";

export const TimelineFeature = () => {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            <h1>سجل الأحداث</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TimelineTable />
        </CardContent>
      </Card>
    </main>
  );
};
