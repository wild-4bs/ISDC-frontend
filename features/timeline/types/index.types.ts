import { SuccessResponse } from "@/types/api";

export type TimelineEntityType =
  | "APPOINTMENT"
  | "BLOG"
  | "PROJECT"
  | "TREATMENT"
  | "PATIENT"
  | "DOCTOR";

export type ActionType = "CREATE" | "UPDATE" | "DELETE";

export interface TimelineItem {
  id: string;
  entityType: TimelineEntityType;
  entityId: string;
  title: string;
  actionType: ActionType;
  targetName: string;
  createdAt: string;
  updatedAt: string;
}

export type TimelineResponse = SuccessResponse<TimelineItem[], true>;
export type DeleteTimelineItemResponse = SuccessResponse<TimelineItem>;
