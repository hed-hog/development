import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateRole() {
  const { createRole } = requests()

  return useMutation({
    mutationKey: ['post-role'],
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Role created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating role: ' + error.message)
    },
  })
}

export function useDeleteRole<T>() {
  const { deleteRoles } = requests()

  return useMutation({
    mutationKey: ['delete-role'],
    mutationFn: deleteRoles<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Roles deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting roles: ' + error.message)
    },
  })
}

export function useEditRole() {
  const { editRole } = requests()

  return useMutation({
    mutationKey: ['edit-role'],
    mutationFn: editRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('role edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating role: ' + error.message)
    },
  })
}
