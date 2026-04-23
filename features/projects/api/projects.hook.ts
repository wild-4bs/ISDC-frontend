import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  CreateProjectPayload,
  GetProjectsParams,
  Project,
} from "../types/index.types";

export const projectKeys = {
  single: (id: string, params?: GetProjectsParams) =>
    ["project", id, ...(params ? [params] : [])] as const,
  all: (params?: GetProjectsParams) =>
    ["projects", ...(params ? [params] : [])] as const,
  infinite: (params?: GetProjectsParams) =>
    ["infinite-query-projects", ...(params ? [params] : [])] as const,
};

const getProjects = (params?: GetProjectsParams) =>
  axiosInstance.get<SuccessResponse<Project, true>>("/v1/projects", { params });

export const useGetProjects = (params?: GetProjectsParams) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<Project[]>>("/v1/projects", { params }),
    queryKey: projectKeys.all(params),
  });

export const useGetProjectById = (id: string) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<Project>>(`/v1/projects/${id}`),
    queryKey: projectKeys.single(id),
  });

export const useGetProjectsInfinite = (params?: GetProjectsParams) =>
  useInfiniteQuery({
    queryFn: ({ pageParam }) => getProjects({ ...params, page: pageParam }),
    initialPageParam: 1,
    queryKey: projectKeys.infinite(params),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

export const useCreateProject = () =>
  useMutation({
    mutationFn: (body: CreateProjectPayload) =>
      axiosInstance.post<SuccessResponse<Project>, CreateProjectPayload>(
        "/v1/projects",
        body,
      ),
  });

export const useUpdateProject = () =>
  useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Partial<CreateProjectPayload>;
      id: string;
    }) =>
      axiosInstance.put<
        SuccessResponse<Project>,
        Partial<CreateProjectPayload>
      >(`/v1/projects/${id}`, data),
  });

export const useDeleteProject = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<Project>>(`/v1/projects/${id}`),
  });
