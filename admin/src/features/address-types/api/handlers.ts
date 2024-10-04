import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'

export function useAddressTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['address-types'],
    queryFn: () =>
      request({
        url: `/address-types`,
      }),
  })
}

export function useCreateAddressType() {
  const { createAddressType } = requests()

  return useMutation({
    mutationKey: ['post-address-type'],
    mutationFn: createAddressType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success('Address type created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating address type: ' + error.message)
    },
  })
}

export function useDeleteAddressType<T>() {
  const { deleteAddressTypes } = requests()

  return useMutation({
    mutationKey: ['delete-address-type'],
    mutationFn: deleteAddressTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success('Address Type deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting Address Type: ' + error.message)
    },
  })
}

export function useEditAddressType() {
  const { editAddressType } = requests()

  return useMutation({
    mutationKey: ['edit-address-type'],
    mutationFn: editAddressType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success('Address Type edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating address type: ' + error.message)
    },
  })
}
