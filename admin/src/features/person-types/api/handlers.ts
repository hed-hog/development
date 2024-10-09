import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

export function usePersonTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['person-types'],
    queryFn: () =>
      request({
        url: `/person-types`,
      }),
  })
}

export function useCreatePersonType() {
  const { createPersonType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-person-type'],
    mutationFn: createPersonType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success(`${moduleT('personType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('create')} ${moduleT('personType')}` + error.message
      )
    },
  })
}

export function useDeletePersonType<T>() {
  const { deletePersonTypes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-person-type'],
    mutationFn: deletePersonTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success(`${moduleT('personType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('personType')}` + error.message
      )
    },
  })
}

export function useEditPersonType() {
  const { editPersonType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-person-type'],
    mutationFn: editPersonType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-types'] })
      toast.success(`${moduleT('personType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('personType')}` + error.message)
    },
  })
}
