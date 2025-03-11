import { useDefaultMutation } from '@/hooks/use-default-mutation'
import { useQuery } from '@tanstack/react-query'
import { requests } from './requests'

const scope = 'dashboard'

export function useDashboardCreate() {
  const { dashboardCreate } = requests()
  return useDefaultMutation(scope, 'create', dashboardCreate)
}

export function useDashboardDelete() {
  const { dashboardDelete } = requests()
  return useDefaultMutation(scope, 'delete', dashboardDelete)
}

export function useDashboardUpdate() {
  const { dashboardUpdate } = requests()
  return useDefaultMutation(scope, 'update', dashboardUpdate)
}

export function useDashboardGet(id: number) {
  const { dashboardGet } = requests()
  return useQuery({
    queryKey: [scope, 'get'],
    queryFn: () => dashboardGet(id),
  })
}
