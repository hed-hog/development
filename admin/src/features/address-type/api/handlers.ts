import { useApp } from '@/hooks/use-app'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useAddressType() {
  const { request } = useApp()

  return useQuery({
    queryKey: ['address-type'],
    queryFn: () =>
      request({
        url: `/address-type`,
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
      queryClient.invalidateQueries({ queryKey: ['address-type'] })
      toast.success(`${moduleT('addressType')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('addressType')}` + error.message)
    },
  })
}

export function useDeleteAddressType<T>() {
  const { deleteAddressType } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-address-type'],
    mutationFn: deleteAddressType<T>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['address-type'] })
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
      queryClient.invalidateQueries({ queryKey: ['address-type'] })
      toast.success(`${moduleT('addressType')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('addressType')}` + error.message)
    },
  })
}
