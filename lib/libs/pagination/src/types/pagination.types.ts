export interface PaginatedResult<T> {
  total: number;
  lastPage: number;
  currentPage: number;
  pageSize: number;
  prev: number | null;
  next: number | null;
  data: T[];
}

export type PaginateFunction = <K, T>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  field?: string;
}
export type PaginateOptions = {
  page?: number | string;
  pageSize?: number | string;
};
