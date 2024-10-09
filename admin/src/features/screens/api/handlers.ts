import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateScreen() {
  const { createScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-screen'],
    mutationFn: createScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success(`${moduleT('screen')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('screen')}` + error.message)
    },
  })
}

export function useDeleteScreen<T>() {
  const { deleteScreens } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-screen'],
    mutationFn: deleteScreens<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success(`${moduleT('screen')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('screen')}` + error.message)
    },
  })
}

export function useEditScreen() {
  const { editScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-screen'],
    mutationFn: editScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success(`${moduleT('screen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screen')}` + error.message)
    },
  })
}

export function useEditScreenRoles() {
  const { editScreenRoles } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-screen-roles'],
    mutationFn: editScreenRoles,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success(`${moduleT('screenRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screenRole')}` + error.message)
    },
  })
}

export function useEditScreenRoutes() {
  const { editScreenRoutes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-screen-routes'],
    mutationFn: editScreenRoutes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screens'] })
      toast.success(`${moduleT('screenRoute')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screenRoute')}` + error.message)
    },
  })
}
