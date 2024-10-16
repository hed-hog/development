import { useApp } from '@/hooks/use-app'
import { useQuery } from '@tanstack/react-query'

export function useCountries() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      request<any[]>({
        url: `/countries`,
      }),
  })
}
