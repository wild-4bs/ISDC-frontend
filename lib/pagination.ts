import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export function paginate(query: PaginationQuery) {
  return {
    limit: query.limit,
    offset: (query.page - 1) * query.limit,
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function paginatedResponse<T>(
  payload: T[],
  total: number,
  query: PaginationQuery,
): { payload: T[]; pagination: PaginationMeta } {
  return {
    payload,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}
