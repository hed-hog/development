import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateDocument() {
  const { createDocument } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-document'],
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success(`${moduleT('document')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('document')}` + error.message)
    },
  })
}

export function useDeleteDocument() {
  const { deleteDocument } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-document'],
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success(`${moduleT('document')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('document')}` + error.message)
    },
  })
}

export function useEditDocument() {
  const { editDocument } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-document'],
    mutationFn: editDocument,
    onSuccess: () => {
      queryClient.invalidateQueries('document' as InvalidateQueryFilters)
      toast.success(`${moduleT('document')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('document')}` + error.message)
    },
  })
}
