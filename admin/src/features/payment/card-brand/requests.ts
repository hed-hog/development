import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentCardBrand } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const cardBrandList = async (params: PaginationParams) => {
    return request<PaginationResult<PaymentCardBrand>>({
      url: '/card-brand',
      params,
    }).then((res) => res.data)
  }

  const cardBrandGet = async (id: number) => {
    return request<PaymentCardBrand>({
      url: `/card-brand/${id}`,
    }).then((res) => res.data)
  }

  const cardBrandCreate = async (params: { data: PaymentCardBrand }) => {
    const { data } = params
    return request<PaymentCardBrand>({
      url: '/card-brand',
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const cardBrandDelete = async (ids: number[]) => {
    return request<Delete>({
      url: '/card-brand',
      data: { ids },
      method: HttpMethod.DELETE,
    }).then((res) => res.data)
  }

  const cardBrandUpdate = async (params: {
    id: number
    data: PaymentCardBrand
  }) => {
    const { id, data } = params
    return request<PaymentCardBrand>({
      url: `/card-brand/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  return {
    cardBrandCreate,
    cardBrandUpdate,
    cardBrandDelete,
    cardBrandList,
    cardBrandGet,
  }
}
