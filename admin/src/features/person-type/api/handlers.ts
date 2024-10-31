import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function usePersonType() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['person-type'],
    queryFn: () =>
      request({
        url: `/person-type`,
      }),
  })
}

export function usePersonTypeCreate() {
  const { personTypeCreate } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-person-type'],
    mutationFn: personTypeCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-type'] })
      toast.success(`${moduleT('personType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('create')} ${moduleT('personType')}` + error.message
      )
    },
  })
}

export function usePersonTypeDelete<T>() {
  const { personTypeDelete } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-person-type'],
    mutationFn: personTypeDelete<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-type'] })
      toast.success(`${moduleT('personType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('personType')}` + error.message
      )
    },
  })
}

export function usePersonTypeUpdate() {
  const { personTypeUpdate } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-person-type'],
    mutationFn: personTypeUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['person-type'] })
      toast.success(`${moduleT('personType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('personType')}` + error.message)
    },
  })
}
