import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

export function useContactTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['contact-types'],
    queryFn: () =>
      request({
        url: `/contact-types`,
      }),
  })
}

export function useCreateContactType() {
  const { createContactType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-contact-type'],
    mutationFn: createContactType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success(`${moduleT('contactType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('create')} ${moduleT('contactType')}` + error.message
      )
    },
  })
}

export function useDeleteContactType<T>() {
  const { deleteContactTypes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-contact-type'],
    mutationFn: deleteContactTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success(`${moduleT('contactType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('contactType')}` + error.message
      )
    },
  })
}

export function useEditContactType() {
  const { editContactType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-contact-type'],
    mutationFn: editContactType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-types'] })
      toast.success(`${moduleT('contactType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('contactType')}` + error.message)
    },
  })
}
