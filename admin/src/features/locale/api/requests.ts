import { useApp } from '@/hooks/use-app'
import { Locale, PaginationParams, PaginationResult } from '@/types'

export function requests() {
  const { request } = useApp()

  const localeListEnabled = async (params?: PaginationParams) => {
    return request<PaginationResult<Locale>>({
      url: '/locale/system/enabled',
      params,
    }).then((res) => res.data)
  }

  const setEnabled = async (params: { codes: string[] }) => {
    const { codes } = params
    return request({
      url: `/locale`,
      method: 'put',
      data: {
        codes,
      },
    }).then((res) => res.data)
  }

  return {
    setEnabled,
    localeListEnabled,
  }
}
