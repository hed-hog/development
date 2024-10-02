import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateCustomType() {
  const { createCustomType } = requests()

  return useMutation({
    mutationKey: ['post-custom-type'],
    mutationFn: createCustomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-types'] })
      toast.success('Custom Type created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating Custom Type: ' + error.message)
    },
  })
}

export function useDeleteCustomType<T>() {
  const { deleteCustomTypes } = requests()

  return useMutation({
    mutationKey: ['delete-custom-type'],
    mutationFn: deleteCustomTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-types'] })
      toast.success('Custom Type deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting Custom Type: ' + error.message)
    },
  })
}

export function useEditCustomType() {
  const { editCustomType } = requests()

  return useMutation({
    mutationKey: ['edit-custom-type'],
    mutationFn: editCustomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-types'] })
      toast.success('Custom Type edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating Custom Type: ' + error.message)
    },
  })
}
