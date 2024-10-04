import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'

export function useContactTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['contact-types'],
    queryFn: () =>
      request({
        url: `/contact-types`,
      }),
  })
}

export function useCreateContactType() {
  const { createContactType } = requests()

  return useMutation({
    mutationKey: ['post-contact-type'],
    mutationFn: createContactType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success('Contact Type created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating Contact Type: ' + error.message)
    },
  })
}

export function useDeleteContactType<T>() {
  const { deleteContactTypes } = requests()

  return useMutation({
    mutationKey: ['delete-contact-type'],
    mutationFn: deleteContactTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success('Contact type deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting contact type: ' + error.message)
    },
  })
}

export function useEditContactType() {
  const { editContactType } = requests()

  return useMutation({
    mutationKey: ['edit-contact-type'],
    mutationFn: editContactType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success('Contact Type edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating Contact Type: ' + error.message)
    },
  })
}
