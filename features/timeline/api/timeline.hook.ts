import { axiosInstance } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteTimelineItemResponse,
  TimelineResponse,
} from "../types/index.types";

export const useGetActionsTimeline = (params?: {}) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<TimelineResponse>("/v1/actions/timeline", { params }),
    queryKey: ["timeline", ...(params ? [params] : [])],
  });

export const useDeleteTimelineItem = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<DeleteTimelineItemResponse>(
        `/v1/actions/timeline/${id}`,
      ),
  });
