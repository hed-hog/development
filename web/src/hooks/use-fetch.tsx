import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'

interface IUseFetchReturn {
  data: any
  isLoading: boolean
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>
}

interface IFetchItemsReturn {
  data: any[]
  total: number
}

export const useFetch = (
  endpoint: string,
  page: number,
  pageSize: number,
  queryKey: string
): IUseFetchReturn => {
  const fetchItems = async (
    endpoint: string,
    page: number,
    pageSize: number
  ): Promise<IFetchItemsReturn> => {
    const { data } = await axios.get(endpoint, {
      params: { page, pageSize },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiQWRtaW5pc3RyYWRvciIsImVtYWlsIjoicm9vdEBoY29kZS5jb20uYnIiLCJtdWx0aWZhY3Rvcl9pZCI6bnVsbCwiY29kZSI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjQtMDktMDNUMTY6NDk6NDAuMzM1WiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA5LTAzVDE2OjQ5OjQwLjMzNVoifSwiaWF0IjoxNzI1MzgyMzczLCJleHAiOjE3Mjc5NzQzNzN9.95-2DZv3awv4Q7U_4g9XogRZlT0_J5P-XXX8f8ou19o`,
      },
    })
    return data.data
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey, endpoint, page, pageSize],
    queryFn: () => fetchItems(endpoint, page, pageSize),
  })

  return {
    data,
    isLoading,
    refetch,
  }
}
