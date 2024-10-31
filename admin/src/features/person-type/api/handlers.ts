import { useDefaultMutation } from '@/hooks/use-default-mutation'
import { useQuery } from '@tanstack/react-query'
import { requests } from './requests'

const scope = 'person-type'

export function usePersonTypeCreate() {
  const { personTypeCreate } = requests()
  return useDefaultMutation(scope, 'create', personTypeCreate)
}

export function usePersonTypeDelete() {
  const { personTypeDelete } = requests()
  return useDefaultMutation(scope, 'delete', personTypeDelete)
}

export function usePersonTypeUpdate() {
  const { personTypeUpdate } = requests()
  return useDefaultMutation(scope, 'update', personTypeUpdate)
}

export function usePersonTypeGet(id: number) {
  const { personTypeGet } = requests()
  return useQuery({
    queryKey: [scope, 'get'],
    queryFn: () => personTypeGet(id),
  })
}
