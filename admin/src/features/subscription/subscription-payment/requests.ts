import { useApp } from '@/hooks/use-app'
import { Delete, PaginationParams, PaginationResult } from '@/types'
import { SubscriptionPayment } from '@/types/models'
import { HttpMethod } from '@/types/http-method'

export function requests() {
  const { request } = useApp()

  const subscriptionPaymentList = async (
    subscriptionId: number,
    params: PaginationParams & { id?: number }
  ) => {
    return request<PaginationResult<SubscriptionPayment>>({
      url: `/subscription/${subscriptionId}/subscription-payment`,
      params,
    }).then((res) => res.data)
  }

  const subscriptionPaymentCreate = async (params: {
    subscriptionId: number
    data: SubscriptionPayment
  }) => {
    const { subscriptionId, data } = params

    return request<SubscriptionPayment>({
      url: `/subscription/${subscriptionId}/subscription-payment`,
      method: HttpMethod.POST,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPaymentUpdate = async (params: {
    subscriptionId: number
    id: number
    data: SubscriptionPayment
  }) => {
    const { subscriptionId, id, data } = params

    return request<SubscriptionPayment>({
      url: `/subscription/${subscriptionId}/subscription-payment/${id}`,
      method: HttpMethod.PATCH,
      data: data,
    }).then((res) => res.data)
  }

  const subscriptionPaymentDelete = async (params: {
    id: number
    ids: number[]
  }) => {
    const { id, ids } = params

    return request<Delete>({
      url: `/subscription/${id}/subscription-payment`,
      method: HttpMethod.DELETE,
      data: { ids },
    }).then((res) => res.data)
  }

  const subscriptionPaymentGet = async (params: {
    subscriptionId: number
    id: number
  }) => {
    const { subscriptionId, id } = params

    return request<SubscriptionPayment>({
      url: `/subscription/${subscriptionId}/subscription-payment/${id}`,
    }).then((res) => res.data)
  }

  return {
    subscriptionPaymentCreate,
    subscriptionPaymentUpdate,
    subscriptionPaymentDelete,
    subscriptionPaymentList,
    subscriptionPaymentGet,
  }
}
