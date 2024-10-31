import { queryClient } from '@/lib/query-provider'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCreateMenu() {
  const { createMenu } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-menu'],
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success(`${moduleT('menu')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('menu')}` + error.message)
    },
  })
}

export function useDeleteMenu<T>() {
  const { deleteMenu } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-menu'],
    mutationFn: deleteMenu<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success(`${moduleT('menu')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('menu')}` + error.message)
    },
  })
}

export function useEditMenu() {
  const { editMenu } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-menu'],
    mutationFn: editMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success(`${moduleT('menu')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('menu')}` + error.message)
    },
  })
}

export function useEditMenuRole() {
  const { editMenuRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-menu-role'],
    mutationFn: editMenuRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success(`${moduleT('menuRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('menuRole')}` + error.message)
    },
  })
}

export function useEditMenuScreen() {
  const { editMenuScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-menu-screen'],
    mutationFn: editMenuScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] })
      toast.success(`${moduleT('menuScreen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('menuScreen')}` + error.message)
    },
  })
}
