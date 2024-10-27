import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useApp } from '@/hooks/use-app'
import { PaginationResult } from '@/hooks/use-pagination-fetch'

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
