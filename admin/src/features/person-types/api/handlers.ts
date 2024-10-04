import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'

export function usePersonTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['person-types'],
    queryFn: () =>
      request({
        url: `/person-types`,
      }),
  })
}

export function useCreatePersonType() {
  const { createPersonType } = requests()

  return useMutation({
    mutationKey: ['post-person-type'],
    mutationFn: createPersonType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success('Person Type created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating Person Type: ' + error.message)
    },
  })
}

export function useDeletePersonType<T>() {
  const { deletePersonTypes } = requests()

  return useMutation({
    mutationKey: ['delete-person-type'],
    mutationFn: deletePersonTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success('Person Type deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting Person Type: ' + error.message)
    },
  })
}

export function useEditPersonType() {
  const { editPersonType } = requests()

  return useMutation({
    mutationKey: ['edit-person-type'],
    mutationFn: editPersonType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success('Person Type edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating Person Type: ' + error.message)
    },
  })
}
