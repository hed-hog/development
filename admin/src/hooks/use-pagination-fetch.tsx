import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { useApp } from './use-app'

interface IUseFetchReturn {
  data: {
    data: any[]
    total: number
    lastPage: number
    page: number
    pageSize: number
    prev: number | null
    next: number | null
  }
  isLoading: boolean
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>
}

interface IFetchItemsReturn {
  data: any[]
  total: number
}

export type PaginationResult<T> = {
  total: number
  lastPage: number
  page: number
  pageSize: number
  prev: number | null
  next: number | null
  data: T[]
}

type PaginationFetchProps = {
  url: string
  page?: number
  pageSize?: number
  search?: string
  sortField?: string
  sortOrder?: string
  fields?: string[]
  queryKey: string
}

export const usePaginationFetch = (
  props: PaginationFetchProps
): IUseFetchReturn => {
  const { request } = useApp()

  const fetchItems = async ({
    url,
    page,
    pageSize,
    fields,
    search,
    sortField,
    sortOrder,
  }: PaginationFetchProps): Promise<any> => {
    const { data } = await request<IFetchItemsReturn>({
      url,
      params: { page, pageSize, fields, search, sortField, sortOrder },
    })

    return data
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', props.queryKey],
    queryFn: () => fetchItems(props),
  })

  return {
    data,
    isLoading,
    refetch,
  }
}
