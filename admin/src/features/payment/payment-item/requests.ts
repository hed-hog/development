import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentItem } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const paymentItemList = async (
    paymentId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<PaymentItem>>({
      url: `/payment/${paymentId}/payment-item`,
      params,
    }).then((res) => res.data)
  }

  const paymentItemCreate = async (params: {
    paymentId: number
    data: PaymentItem
  }) => {
    const { paymentId, data } = params

    return request<PaymentItem>({
      url: `/payment/${paymentId}/payment-item`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const paymentItemUpdate = async (params: {
    paymentId: number
    id: number
    data: PaymentItem
  }) => {
    const { paymentId, id, data } = params

    return request<PaymentItem>({
      url: `/payment/${paymentId}/payment-item/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const paymentItemDelete = async (params: { id: number; ids: number[] }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/payment/${id}/payment-item`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const paymentItemGet = async (params: { paymentId: number; id: number }) => {
    const { paymentId, id } = params

    return request<PaymentItem>({
      url: `/payment/${paymentId}/payment-item/${id}`,
    }).then((res) => res.data)
  }

  return {
    paymentItemCreate,
    paymentItemUpdate,
    paymentItemDelete,
    paymentItemList,
    paymentItemGet,
  }
}
