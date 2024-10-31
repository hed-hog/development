import { queryClient } from '@/lib/query-provider'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCreateScreen() {
  const { createScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-screen'],
    mutationFn: createScreen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screen'] })
      toast.success(`${moduleT('screen')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('screen')}` + error.message)
    },
  })
}

export function useDeleteScreen<T>() {
  const { deleteScreen } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-screen'],
    mutationFn: deleteScreen<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screen'] })
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
      queryClient.invalidateQueries({ queryKey: ['screen'] })
      toast.success(`${moduleT('screen')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screen')}` + error.message)
    },
  })
}

export function useEditScreenRole() {
  const { editScreenRole } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-screen-role'],
    mutationFn: editScreenRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screen'] })
      toast.success(`${moduleT('screenRole')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screenRole')}` + error.message)
    },
  })
}

export function useEditScreenRoute() {
  const { editScreenRoute } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-screen-route'],
    mutationFn: editScreenRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['screen'] })
      toast.success(`${moduleT('screenRoute')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('screenRoute')}` + error.message)
    },
  })
}
