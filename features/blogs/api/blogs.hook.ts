import { axiosInstance } from "@/lib/axios";
import { SuccessResponse } from "@/types/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Blog, CreateBlogPayload, GetBlogsParams } from "../types/index.types";

export const blogKeys = {
  single: (id: string) => ["single-blog", id] as const,
  all: (params?: GetBlogsParams) =>
    ["blogs", ...(params ? [params] : [])] as const,
  infinite: (params?: GetBlogsParams) =>
    ["infinite-query-blogs", ...(params ? [params] : [])] as const,
};

const getBlogs = (params?: GetBlogsParams) =>
  axiosInstance.get<SuccessResponse<Blog, true>>("/v1/blogs", { params });

export const useGetBlogs = (params?: GetBlogsParams) =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<Blog[]>>("/v1/blogs", { params }),
    queryKey: blogKeys.all(params),
  });

export const useGetBlogById = (id: string) =>
  useQuery({
    queryFn: () => axiosInstance.get<SuccessResponse<Blog>>(`/v1/blogs/${id}`),
    queryKey: blogKeys.single(id),
  });

export const useGetBlogsInfinite = (params?: GetBlogsParams) =>
  useInfiniteQuery({
    queryFn: ({ pageParam }) => getBlogs({ ...params, page: pageParam }),
    initialPageParam: 1,
    queryKey: blogKeys.infinite(params),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });

export const useCreateBlog = () =>
  useMutation({
    mutationFn: (data: CreateBlogPayload) =>
      axiosInstance.post<SuccessResponse<Blog>, CreateBlogPayload>(
        "/v1/blogs",
        data,
      ),
  });

export const useUpdateBlog = () =>
  useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: Partial<CreateBlogPayload>;
      id: string;
    }) =>
      axiosInstance.put<SuccessResponse<Blog>, Partial<CreateBlogPayload>>(
        `/v1/blogs/${id}`,
        data,
      ),
  });

export const useDeleteBlog = () =>
  useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete<SuccessResponse<Blog>>(`/v1/blogs/${id}`),
  });
