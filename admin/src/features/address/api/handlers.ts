import { useApp } from '@/hooks/use-app'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useAddress(personId: number) {
  const { request } = useApp()

  return useQuery({
    queryKey: ['address', personId],
    queryFn: () =>
      request({
        url: `/persons/${personId}/address`,
      }),
    enabled: !!personId,
  })
}

export function useCreateAddress() {
  const { createAddress } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['post-address'],
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries('address' as InvalidateQueryFilters)
      toast.success(`${moduleT('address')} ${successT('create')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('create')} ${moduleT('address')}` + error.message)
    },
  })
}

export function useDeleteAddress() {
  const { deleteAddress } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['delete-address'],
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries('address' as InvalidateQueryFilters)
      toast.success(`${moduleT('address')} ${successT('delete')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('delete')} ${moduleT('address')}` + error.message)
    },
  })
}

export function useEditAddress() {
  const { editAddress } = requests()
  const { t: moduleT } = useTranslation('module')
  const { t: successT } = useTranslation('success')
  const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['edit-address'],
    mutationFn: editAddress,
    onSuccess: () => {
      queryClient.invalidateQueries('address' as InvalidateQueryFilters)
      toast.success(`${moduleT('address')} ${successT('edit')}`)
    },
    onError: (error: any) => {
      toast.error(`${errorT('edit')} ${moduleT('address')}` + error.message)
    },
  })
}
