import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateCustom() {
  const { createCustom } = requests()

  return useMutation({
    mutationKey: ['post-custom'],
    mutationFn: createCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success('Custom created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating custom: ' + error.message)
    },
  })
}

export function useDeleteCustom() {
  const { deleteCustom } = requests()

  return useMutation({
    mutationKey: ['delete-custom'],
    mutationFn: deleteCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success('Custom deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting custom: ' + error.message)
    },
  })
}

export function useEditCustom() {
  const { editCustom } = requests()

  return useMutation({
    mutationKey: ['edit-custom'],
    mutationFn: editCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success('Custom edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating custom: ' + error.message)
    },
  })
}
