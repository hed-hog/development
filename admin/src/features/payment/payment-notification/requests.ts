import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { PaymentNotification } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const paymentNotificationList = async (
    paymentId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<PaymentNotification>>({
      url: `/payment/${paymentId}/payment-notification`,
      params,
    }).then((res) => res.data)
  }

  const paymentNotificationCreate = async (params: {
    paymentId: number
    data: PaymentNotification
  }) => {
    const { paymentId, data } = params

    return request<PaymentNotification>({
      url: `/payment/${paymentId}/payment-notification`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const paymentNotificationUpdate = async (params: {
    paymentId: number
    id: number
    data: PaymentNotification
  }) => {
    const { paymentId, id, data } = params

    return request<PaymentNotification>({
      url: `/payment/${paymentId}/payment-notification/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const paymentNotificationDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/payment/${id}/payment-notification`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const paymentNotificationGet = async (params: {
    paymentId: number
    id: number
  }) => {
    const { paymentId, id } = params

    return request<PaymentNotification>({
      url: `/payment/${paymentId}/payment-notification/${id}`,
    }).then((res) => res.data)
  }

  return {
    paymentNotificationCreate,
    paymentNotificationUpdate,
    paymentNotificationDelete,
    paymentNotificationList,
    paymentNotificationGet,
  }
}
