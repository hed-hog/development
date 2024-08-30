import { SortOrder } from 'aws-sdk/clients/acm';

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
  sortOrder?: SortOrder;
  fields?: string[];
}

export type PaginateOptions = {
  page?: number | string;
  pageSize?: number | string;
};

export type BaseModel = {
  findMany: (args: any) => Promise<any[]>;
  count: (args: any) => Promise<number>;
  fields?: Record<string, any>;
};

export type FindManyArgs<M> = M extends { findMany: (args: infer A) => any }
  ? A
  : never;
