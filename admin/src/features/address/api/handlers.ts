import { useApp } from '@/hooks/use-app'
import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useAddress(personId: number) {
  const { request } = useApp()

  return useQuery({
    queryKey: ['address', personId],
    queryFn: () =>
      request({
        url: `/persons/${personId}/address`,
      }),
    enabled: !!personId,
  })
}

export function useCreateAddress() {
  const { createAddress } = requests()

  return useMutation({
    mutationKey: ['post-address'],
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
      toast.success('Address created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating Address: ' + error.message)
    },
  })
}

export function useDeleteAddress() {
  const { deleteAddress } = requests()

  return useMutation({
    mutationKey: ['delete-address'],
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
      toast.success('Address deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting address: ' + error.message)
    },
  })
}

export function useEditAddress() {
  const { editAddress } = requests()

  return useMutation({
    mutationKey: ['edit-address'],
    mutationFn: editAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address'] })
      toast.success('Address edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating Address: ' + error.message)
    },
  })
}
