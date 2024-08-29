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

export const useFetch = (
  endpoint: string,
  start: number,
  end: number,
  queryKey: string
): IUseFetchReturn => {
  const fetchItems = async (
    endpoint: string,
    start: number,
    end: number
  ): Promise<any[]> => {
    const { data } = await axios.get(endpoint, {
      params: { _start: start, _end: end },
    })
    return data
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey, endpoint, start, end],
    queryFn: () => fetchItems(endpoint, start, end),
  })

  return {
    data,
    isLoading,
    refetch,
  }
}
