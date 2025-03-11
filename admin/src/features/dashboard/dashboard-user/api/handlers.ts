import { useDefaultMutation } from '@/hooks/use-default-mutation'
import { useQuery } from '@tanstack/react-query'
import { requests } from './requests'

const scope = 'dashboard-user'

export function useDashboardUserCreate() {
  const { dashboardUserCreate } = requests()
  return useDefaultMutation(scope, 'create', dashboardUserCreate)
}

export function useDashboardUserDelete() {
  const { dashboardUserDelete } = requests()
  return useDefaultMutation(scope, 'delete', dashboardUserDelete)
}

export function useDashboardUserUpdate() {
  const { dashboardUserUpdate } = requests()
  return useDefaultMutation(scope, 'update', dashboardUserUpdate)
}

export function useDashboardUserGet(id: number) {
  const { dashboardUserGet } = requests()
  return useQuery({
    queryKey: [scope, 'get'],
    queryFn: () => dashboardUserGet(id),
  })
}
