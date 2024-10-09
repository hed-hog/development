import { useMutation, useQuery } from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useApp } from '@/hooks/use-app'
import { useTranslation } from 'react-i18next'

export function useAddressTypes() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['address-types'],
    queryFn: () =>
      request({
        url: `/address-types`,
      }),
  })
}

export function useCreateAddressType() {
  const { createAddressType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-address-type'],
    mutationFn: createAddressType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success(`${moduleT('addressType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('addressType')}` + error.message)
    },
  })
}

export function useDeleteAddressType<T>() {
  const { deleteAddressTypes } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-address-type'],
    mutationFn: deleteAddressTypes<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success(`${moduleT('addressType')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(
        `${errorT('delete')} ${moduleT('addressType')}` + error.message
      )
    },
  })
}

export function useEditAddressType() {
  const { editAddressType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-address-type'],
    mutationFn: editAddressType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-types'] })
      toast.success(`${moduleT('addressType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('addressType')}` + error.message)
    },
  })
}
