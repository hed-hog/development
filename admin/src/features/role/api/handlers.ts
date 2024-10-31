import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCreateRole() {
  const { createRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-role'],
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('role')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('role')}` + error.message)
    },
  })
}

export function useDeleteRole<T>() {
  const { deleteRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-role'],
    mutationFn: deleteRole<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
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
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('role')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('role')}` + error.message)
    },
  })
}

export function useEditRoleRoute() {
  const { editRoleRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-route'],
    mutationFn: editRoleRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('roleRoute')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleRoute')}` + error.message)
    },
  })
}

export function useEditRoleMenu() {
  const { editRoleMenu } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-menu'],
    mutationFn: editRoleMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('roleMenu')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleMenu')}` + error.message)
    },
  })
}

export function useEditRoleScreen() {
  const { editRoleScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-screens'],
    mutationFn: editRoleScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('rolecreen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('rolecreen')}` + error.message)
    },
  })
}

export function useEditRoleUser() {
  const { editRoleUser } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-role-user'],
    mutationFn: editRoleUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['role'] })
      toast.success(`${moduleT('roleUser')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('roleUser')}` + error.message)
    },
  })
}

export function useGetRole() {
  const { getRole } = requests()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['role'],
    queryFn: () => getRole(),
  })

  return { data, isLoading, refetch }
}

export function useRoleShow(id: number) {
  const { showRole } = requests()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['role'],
    queryFn: () => showRole(id),
  })

  return { data, isLoading, refetch }
}
