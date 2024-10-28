import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/hooks/use-pagination-fetch'
import { requests } from './requests'
import { queryClient } from '@/lib/query-provider'
import { toast } from 'sonner'

export function useLocales() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locales-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/locales/system/enables`,
      }),
  })
}

export function useLocalesAll() {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locales-all-${language}`],
    queryFn: () =>
      request<PaginationResult<any>>({
        url: `/locales`,
      }),
  })
}

export function useLocalesTranslations(namespace = 'translation') {
  const {
    i18n: { language },
  } = useTranslation()
  const { request } = useApp()

  return useQuery({
    queryKey: [`locales-${language}-${namespace}`],
    queryFn: () =>
      request<any[]>({
        url: `/locales/${language}/${namespace}`,
      }),
  })
}

export function useLocalesEnabled() {
  const {
    i18n: { language },
  } = useTranslation()
  const { setEnabled } = requests()
  //const { t: moduleT } = useTranslation('module')
  //const { t: successT } = useTranslation('success')
  //const { t: errorT } = useTranslation('error')

  return useMutation({
    mutationKey: ['set-locales-enabled'],
    mutationFn: setEnabled,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      queryClient.invalidateQueries({ queryKey: [`locales-${language}`] })
      toast.success(`set locales enabled`)
    },
    onError: (error: any) => {
      toast.error(`error` + error.message)
    },
  })
}
