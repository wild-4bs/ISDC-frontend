export type SuccessResponse<T, IsPaginated extends boolean = false> = {
  success: true;
  message: string;
  payload: T;
} & (IsPaginated extends true ? { pagination: PaginationMetadata } : {});

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
