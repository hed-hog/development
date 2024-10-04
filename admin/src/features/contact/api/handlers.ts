import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateContact() {
  const { createContact } = requests()

  return useMutation({
    mutationKey: ['post-contact'],
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success('Contact created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating contact: ' + error.message)
    },
  })
}

export function useDeleteContact() {
  const { deleteContact } = requests()

  return useMutation({
    mutationKey: ['delete-contact'],
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success('Contact deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting contact: ' + error.message)
    },
  })
}

export function useEditContact() {
  const { editContact } = requests()

  return useMutation({
    mutationKey: ['edit-contact'],
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success('Contact edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating contact: ' + error.message)
    },
  })
}
