import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateUser() {
  const { createUser } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-user'],
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(`${moduleT('user')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('user')}` + error.message)
    },
  })
}

export function useDeleteUser<T>() {
  const { deleteUsers } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-user'],
    mutationFn: deleteUsers<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(`${moduleT('user')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('user')}` + error.message)
    },
  })
}

export function useEditUser() {
  const { editUser } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-user'],
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(`${moduleT('user')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('user')}` + error.message)
    },
  })
}

export function useEditUserRoles() {
  const { editUserRoles } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-user-roles'],
    mutationFn: editUserRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(`${moduleT('userRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('userRole')}` + error.message)
    },
  })
}
