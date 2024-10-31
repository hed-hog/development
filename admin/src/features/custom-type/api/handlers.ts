import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useCustomType() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['custom-type'],
    queryFn: () =>
      request({
        url: `/custom-type`,
      }),
  })
}

export function useCreateCustomType() {
  const { createCustomType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-custom-type'],
    mutationFn: createCustomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-type'] })
      toast.success(`${moduleT('customType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('create')} ${moduleT('customType')}` + error.message
      )
    },
  })
}

export function useDeleteCustomType<T>() {
  const { deleteCustomType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-custom-type'],
    mutationFn: deleteCustomType<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-type'] })
      toast.success(`${moduleT('customType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('customType')}` + error.message
      )
    },
  })
}

export function useEditCustomType() {
  const { editCustomType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-custom-type'],
    mutationFn: editCustomType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['custom-type'] })
      toast.success(`${moduleT('customType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('customType')}` + error.message)
    },
  })
}
