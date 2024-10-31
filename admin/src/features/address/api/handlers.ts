import { useDefaultMutation } from '@/hooks/use-default-mutation'
import { requests } from './requests'

const scope = 'address'

export function useAddressCreate() {
  const { addressCreate } = requests()
  return useDefaultMutation(scope, 'create', addressCreate)
}

export function useAddressDelete() {
  const { addressDelete } = requests()
  return useDefaultMutation(scope, 'delete', addressDelete)
}

export function useAddressUpdate() {
  const { addressUpdate } = requests()
  return useDefaultMutation(scope, 'update', addressUpdate)
}
