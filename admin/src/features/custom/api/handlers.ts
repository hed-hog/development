import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateCustom() {
  const { createCustom } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-custom'],
    mutationFn: createCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success(`${moduleT('custom')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('custom')}` + error.message)
    },
  })
}

export function useDeleteCustom() {
  const { deleteCustom } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-custom'],
    mutationFn: deleteCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success(`${moduleT('custom')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('custom')}` + error.message)
    },
  })
}

export function useEditCustom() {
  const { editCustom } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-custom'],
    mutationFn: editCustom,
    onSuccess: () => {
      queryClient.invalidateQueries('custom' as InvalidateQueryFilters)
      toast.success(`${moduleT('custom')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('custom')}` + error.message)
    },
  })
}
