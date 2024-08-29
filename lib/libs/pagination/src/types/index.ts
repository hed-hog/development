import { PaginationOrderDirection } from '../decorator/pagination.decorator';

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
  fields?: string[];
  orderDirection?: PaginationOrderDirection;
  orderField?: string;
};

export type PaginateFunction = <K, T>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;
