import { queryClient } from '@/lib/query-provider'
import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { useApp } from './use-app'

export function useDefaultMutation(
  scope: string,
  action: string,
  mutationFn: any
) {
  const { showToastHandler } = useApp()

  return useMutation({
    mutationKey: [`${scope}-${action}`],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(scope as InvalidateQueryFilters)
      showToastHandler('success', scope, action)
    },
    onError: (error: any) => showToastHandler('error', scope, action, error),
  })
}
