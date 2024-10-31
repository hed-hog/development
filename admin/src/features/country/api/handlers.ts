import { useApp } from '@/hooks/use-app'
import { useQuery } from '@tanstack/react-query'

export function useCountry() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['country'],
    queryFn: () =>
      request<any[]>({
        url: `/country`,
      }),
  })
}
