export interface PaginatedResult<T> {
  data: T[];
  total: number;
  lastPage: number;
  currentPage: number;
  pageSize: number;
  prev: number | null;
  next: number | null;
}

export type PaginateOptions = {
  page?: number | string;
  pageSize?: number | string;
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;
