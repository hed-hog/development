import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useDocumentType() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['document-type'],
    queryFn: () =>
      request({
        url: `/document-type`,
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
      queryClient.invalidateQueries({ queryKey: ['document-type'] })
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
  const { deleteDocumentType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-document-type'],
    mutationFn: deleteDocumentType<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-type'] })
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
      queryClient.invalidateQueries({ queryKey: ['document-type'] })
      toast.success(`${moduleT('documentType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('edit')} ${moduleT('documentType')}` + error.message
      )
    },
  })
}
