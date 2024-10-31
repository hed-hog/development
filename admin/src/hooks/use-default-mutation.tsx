import { queryClient } from '@/lib/query-provider'
import {
  InvalidateQueryFilters,
  MutationFunction,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { useApp } from './use-app'

export function useDefaultMutation<TData, TVariables>(
  scope: string,
  action: string,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, unknown, TVariables>, 'mutationFn'>
): UseMutationResult<TData, unknown, TVariables> {
  const { showToastHandler } = useApp()

  return useMutation<TData, unknown, TVariables>({
    mutationKey: [`${scope}-${action}`],
    mutationFn,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(scope as InvalidateQueryFilters)
      showToastHandler('success', scope, action)
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
    ...options,
  })
}
