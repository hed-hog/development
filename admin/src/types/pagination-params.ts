export enum PageOrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type PaginationParams = {
  page?: number
  pageSize?: number
  search?: string
  sortField?: string
  sortOrder?: PageOrderDirection
  fields: string
}
