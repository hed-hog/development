import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/hooks/use-pagination-fetch'
import { queryClient } from '@/lib/query-provider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { requests } from './requests'

export function useLocale() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locale-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/locale/system/enable`,
      }),
  })
}

export function useLocaleAll() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locale-all-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/locale`,
      }),
  })
}

export function useLocaleTranslations(namespace = 'translation') {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locale-${language}-${namespace}`],
    queryFn: () =>
      request<any[]>({
        url: `/locale/${language}/${namespace}`,
      }),
  })
}

export function useLocaleEnabled() {
  const {
    i18n: { language },
  } = useTranslation()
  const { setEnabled } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['set-locale-enabled'],
    mutationFn: setEnabled,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['setting'] })
      queryClient.invalidateQueries({ queryKey: [`locale-${language}`] })
      toast.success(`set locale enabled`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}
