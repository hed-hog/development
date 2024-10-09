import { useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateSetting() {
  const { createSetting } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-setting'],
    mutationFn: createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`${moduleT('setting')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('setting')}` + error.message)
    },
  })
}

export function useDeleteSettings<T>() {
  const { deleteSettings } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-setting'],
    mutationFn: deleteSettings<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`${moduleT('setting')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('setting')}` + error.message)
    },
  })
}

export function useEditSetting() {
  const { editSetting } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-setting'],
    mutationFn: editSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success(`${moduleT('setting')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('setting')}` + error.message)
    },
  })
}
