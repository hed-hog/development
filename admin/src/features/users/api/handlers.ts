import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useCreateUser() {
  const { createUser } = requests()

  return useMutation({
    mutationKey: ['post-user'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully!')
    },
    onError: (error: any) => {
      toast.error('Error creating user: ' + error.message)
    },
  })
}

export function useDeleteUser<T>() {
  const { deleteUsers } = requests()

  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUsers<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Users deleted successfully!')
    },
    onError: (error: any) => {
      toast.error('Error deleting users: ' + error.message)
    },
  })
}

export function useEditUser() {
  const { editUser } = requests()

  return useMutation({
    mutationKey: ['edit-user'],
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating user: ' + error.message)
    },
  })
}

export function useGetUserRoles(userId: string) {
  const { getUserRoles } = requests()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-roles'],
    queryFn: () => getUserRoles({ userId }),
  })

  return { data, isLoading, refetch }
}

export function useEditUserRoles(userId: string, roleIds: number[]) {
  const { editUserRoles } = requests()

  return useMutation({
    mutationKey: ['edit-user-roles'],
    mutationFn: () => editUserRoles({ userId, roleIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User edited successfully!')
    },
    onError: (error: any) => {
      toast.error('Error updating user: ' + error.message)
    },
  })
}
