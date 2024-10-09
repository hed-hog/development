import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateRole() {
  const { createRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-role'],
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('role')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('role')}` + error.message)
    },
  })
}

export function useDeleteRole<T>() {
  const { deleteRoles } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-role'],
    mutationFn: deleteRoles<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('role')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('role')}` + error.message)
    },
  })
}

export function useEditRole() {
  const { editRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role'],
    mutationFn: editRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('role')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('role')}` + error.message)
    },
  })
}

export function useEditRoleRoutes() {
  const { editRoleRoutes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-routes'],
    mutationFn: editRoleRoutes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('roleRoute')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleRoute')}` + error.message)
    },
  })
}

export function useEditRoleMenus() {
  const { editRoleMenus } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-menus'],
    mutationFn: editRoleMenus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('roleMenu')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleMenu')}` + error.message)
    },
  })
}

export function useEditRoleScreens() {
  const { editRoleScreens } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-screens'],
    mutationFn: editRoleScreens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('roleScreen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleScreen')}` + error.message)
    },
  })
}

export function useEditRoleUsers() {
  const { editRoleUsers } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-users'],
    mutationFn: editRoleUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success(`${moduleT('roleUser')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleUser')}` + error.message)
    },
  })
}

export function useGetRoles() {
  const { getRoles } = requests()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  })

  return { data, isLoading, refetch }
}
