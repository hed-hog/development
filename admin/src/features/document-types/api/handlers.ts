import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

export function useDocumentTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['document-types'],
    queryFn: () =>
      request({
        url: `/document-types`,
      }),
  })
}

export function useCreateDocumentType() {
  const { createDocumentType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-document-type'],
    mutationFn: createDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success(`${moduleT('documentType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('create')} ${moduleT('documentType')}` + error.message
      )
    },
  })
}

export function useDeleteDocumentType<T>() {
  const { deleteDocumentTypes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-document-type'],
    mutationFn: deleteDocumentTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success(`${moduleT('documentType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('documentType')}` + error.message
      )
    },
  })
}

export function useEditDocumentType() {
  const { editDocumentType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-document-type'],
    mutationFn: editDocumentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-types'] })
      toast.success(`${moduleT('documentType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('edit')} ${moduleT('documentType')}` + error.message
      )
    },
  })
}
