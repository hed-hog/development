import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreatePerson() {
  const { createPerson } = requests()

  return useMutation({
    mutationKey: ['post-person'],
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] })
      toast.success('Person created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating person: ' + error.message)
    },
  })
}

export function useDeletePerson<T>() {
  const { deletePersons } = requests()

  return useMutation({
    mutationKey: ['delete-person'],
    mutationFn: deletePersons<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] })
      toast.success('Persons deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting persons: ' + error.message)
    },
  })
}

export function useEditPerson() {
  const { editPerson } = requests()

  return useMutation({
    mutationKey: ['edit-person'],
    mutationFn: editPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['persons'] })
      toast.success('Person edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating person: ' + error.message)
    },
  })
}
