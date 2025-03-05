import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { Faq } from '@/types/models'
import { HttpMethod } from '@/types/http-method'
import { formatDataWithLocale } from '@hedhog/utils'

export function requests() {
  const { request } = useApp()

  const faqList = async (params: PaginationParams) => {
    return request<PaginationResult<Faq>>({
      url: '/faq',
      params,
    }).then((res) => res.data)
  }

  const faqGet = async (id: number) => {
    return request<Faq>({
      url: `/faq/${id}`,
    }).then((res) => res.data)
  }

  const faqCreate = async (params: { data: Faq }) => {
    const { data } = params
    return request<Faq>({
      url: '/faq',
      method: HttpMethod.POST,
      data: formatDataWithLocale(data),
    }).then((res) => res.data)
  }

  const faqDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/faq',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const faqUpdate = async (params: { id: number; data: Faq }) => {
    const { id, data } = params
    return request<Faq>({
      url: `/faq/${id}`,
      method: HttpMethod.PATCH,
      data: formatDataWithLocale(data),
    }).then((res) => res.data)
  }

  return {
    faqCreate,
    faqUpdate,
    faqDelete,
    faqList,
    faqGet,
  }
}
