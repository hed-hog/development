import { InvalidateQueryFilters, useMutation } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useCreateContact() {
  const { createContact } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-contact'],
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success(`${moduleT('contact')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('contact')}` + error.message)
    },
  })
}

export function useDeleteContact() {
  const { deleteContact } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-contact'],
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success(`${moduleT('contact')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('contact')}` + error.message)
    },
  })
}

export function useEditContact() {
  const { editContact } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-contact'],
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries('contact' as InvalidateQueryFilters)
      toast.success(`${moduleT('contact')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('contact')}` + error.message)
    },
  })
}
